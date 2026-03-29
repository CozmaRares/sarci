import { readFileSync } from "fs";
import path from "path";
import { describe, it, expect, vi, afterAll } from "vitest";

const localStorageMock = (() => {
    let store = new Map<string, string>();
    return {
        getItem: vi.fn((key: string) => store.get(key) || null),
        setItem: vi.fn((key: string, value: string) => store.set(key, value)),
    };
})();

vi.stubGlobal("localStorage", localStorageMock);

import {
    exportDotts,
    importDotts,
    customDotts,
    addCustomDott,
    deleteCustomDott,
} from "../src/lib/localStorage";

describe("Import/Export Logic", () => {
    const deleteAllDotts = () => {
        const keys = Object.keys(customDotts);
        keys.forEach((key, idx) =>
            deleteCustomDott(key, idx >= keys.length - 1),
        );
    };

    afterAll(() => {
        deleteAllDotts();
    });

    const searchEngines = readFileSync(
        path.join(__dirname, "search_engines.txt"),
        "utf8",
    )
        .split("\n")
        .map(line => line.trim())
        .filter(line => line);

    const batches: string[][] = [];
    while (searchEngines.length) {
        const batch = searchEngines.splice(0, 10);
        batches.push(batch);
    }

    it.each(batches.map((b, i) => [b, i]))(
        "should handle batch %s of urls in search_engines.txt",
        (batch: string[], batchIdx: number) => {
            const keyCreator = (idx: number) => `batch${batchIdx}_test${idx}`;

            batch.forEach((url, idx) => {
                const key = keyCreator(idx);
                addCustomDott(
                    key,
                    {
                        name: key,
                        url,
                    },
                    idx === batch.length - 1,
                );
            });

            const exported = exportDotts();
            deleteAllDotts();
            importDotts(exported);

            batch.forEach((url, idx) => {
                const key = keyCreator(idx);
                expect(customDotts[key]).toBeDefined();
                expect(customDotts[key].url).toBe(url);
                expect(customDotts[key].name).toBe(key);
            });

            deleteAllDotts();
        },
    );
});
