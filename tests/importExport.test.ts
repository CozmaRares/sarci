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

    it("should export and import an empty list", () => {
        const exported = exportDotts();
        importDotts(exported);
        expect(Object.keys(customDotts).length).toBe(0);
    });

    it("should handle a single dott", () => {
        const key = "g";
        const dott = {
            name: "Google",
            url: "https://www.google.com/search?q=%s",
        };
        addCustomDott(key, dott);

        const exported = exportDotts();
        deleteAllDotts();
        expect(customDotts[key]).toBeUndefined();

        importDotts(exported);
        expect(customDotts[key]).toBeDefined();
        expect(customDotts[key].name).toBe(dott.name);
        expect(customDotts[key].url).toBe(dott.url);
    });

    it("should handle the default dotts ", async () => {
        const dotts = await import("../src/lib/dotts").then(m => m.dotts);

        Object.entries(dotts).forEach(([key, value]) =>
            addCustomDott(key, value),
        );

        const exported = exportDotts();
        deleteAllDotts();
        importDotts(exported);

        Object.entries(dotts).forEach(([key, value]) => {
            expect(customDotts[key]).toBeDefined();
            expect(customDotts[key].name).toBe(value.name);
            expect(customDotts[key].url).toBe(value.url);
            expect(!!customDotts[key].keepSlashes).toBe(!!value.keepSlashes);
        });
    });

    it("should handle unicode characters in names and urls", () => {
        const key = "uni";
        const dott = {
            name: "Sărci 🚀",
            url: "https://example.com/search?q=țârâi&emoji=🔥",
        };
        addCustomDott(key, dott);

        const exported = exportDotts();
        deleteAllDotts();
        importDotts(exported);

        expect(customDotts[key]).toBeDefined();
        expect(customDotts[key].name).toBe(dott.name);
        expect(customDotts[key].url).toBe(dott.url);
    });

    it("should compress common patterns using the dictionary", () => {
        const key = "test";
        const dott = {
            name: "Test",
            url: "https://www.google.com/search?q=%s",
        };
        addCustomDott(key, dott);

        const exported = exportDotts();
        const decoded = atob(exported);

        // "https://www." is \x03
        // ".com/" is \x07
        // "search" is \x0c
        // "?q=" is \x0f
        // "%s" is \x12
        // Expecting these characters to be present in the decoded string
        expect(decoded).toContain("\x03");
        expect(decoded).toContain("\x07");
        expect(decoded).toContain("\x0c");
        expect(decoded).toContain("\x0f");
        expect(decoded).toContain("\x12");
    });

    it("should handle keepSlashes flag correctly", () => {
        const data = {
            ks1: {
                name: "KS True",
                url: "https://a.b/%s",
                keepSlashes: true,
            },
            ks2: {
                name: "KS False",
                url: "https://a.b/%s",
                keepSlashes: false,
            },
            ks3: {
                name: "KS Undefined",
                url: "https://a.b/%s",
            },
        };

        Object.entries(data).forEach(([key, value]) =>
            addCustomDott(key, value),
        );

        const exported = exportDotts();
        deleteAllDotts();
        importDotts(exported);

        Object.entries(data).forEach(([key, value]) => {
            expect(customDotts[key]).toBeDefined();
            expect(customDotts[key].name).toBe(value.name);
            expect(customDotts[key].url).toBe(value.url);
            expect(!!customDotts[key].keepSlashes).toBe(!!value["keepSlashes"]);
        });
    });

    it("should handle unusual URLs not in dictionary", () => {
        const key = "rare";
        const dott = {
            name: "Rare",
            url: "ftp://files.local/data",
        };
        addCustomDott(key, dott);

        const exported = exportDotts();
        deleteAllDotts();
        importDotts(exported);

        expect(customDotts[key].url).toBe(dott.url);
    });

    it("should not crash on malformed data", () => {
        expect(() => importDotts("")).not.toThrow();
        expect(() => importDotts("bm90IHZhbGlkIGRhdGE=")).not.toThrow(); // "not valid data" in base64
    });
});
