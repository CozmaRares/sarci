import { createMutable } from "solid-js/store";
import type { DottList, DottValue } from "./dotts";

const CUSTOM_DOTTS_KEY = "customDotts";
const DEFAULT_CATEGORY = "Custom";
const FIELD_SEP = "\x01";
const RECORD_SEP = "\x02";

const DICTIONARY: [string, string][] = [
    ["https://www.", "\x03"],
    ["http://www.", "\x04"],
    ["https://", "\x05"],
    ["http://", "\x06"],
    [".com/", "\x07"],
    [".org/", "\x08"],
    [".net/", "\x0b"],
    ["search", "\x0c"],
    ["?query=", "\x0e"],
    ["?q=", "\x0f"],
    ["?s=", "\x10"],
    ["&q=", "\x11"],
    ["%s", "\x12"],
];

export type DottValueInput = Omit<DottValue, "category">;

export const customDotts = createMutable<DottList>(
    JSON.parse(localStorage.getItem(CUSTOM_DOTTS_KEY) ?? "{}"),
);

export function getCustomDott(key: string): DottValue | undefined {
    return customDotts[key];
}

function saveCustomDotts(): void {
    localStorage.setItem(CUSTOM_DOTTS_KEY, JSON.stringify(customDotts));
}

export function addCustomDott(
    key: string,
    value: DottValueInput,
    save = true,
): void {
    if (value.keepSlashes === false) delete value.keepSlashes;

    customDotts[key] = { ...value, category: DEFAULT_CATEGORY };

    if (save) saveCustomDotts();
}

export function deleteCustomDott(key: string, save = true): void {
    if (key in customDotts) {
        delete customDotts[key];
        if (save) saveCustomDotts();
    }
}

function toBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    const binString = Array.from(bytes, byte =>
        String.fromCodePoint(byte),
    ).join("");
    return btoa(binString);
}

function fromBase64(base64: string): string {
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, m => m.codePointAt(0)!);
    return new TextDecoder().decode(bytes);
}

export function exportDotts() {
    const entries = Object.entries(customDotts).map(([key, value]) =>
        [key, value.name, value.url, ...(value.keepSlashes ? ["1"] : [])].join(
            FIELD_SEP,
        ),
    );

    let data = entries.join(RECORD_SEP);
    for (const [pattern, char] of DICTIONARY) {
        data = data.replaceAll(pattern, char);
    }

    return toBase64(data);
}

export function importDotts(data: string) {
    let decoded = fromBase64(data);

    for (const [pattern, char] of [...DICTIONARY].reverse()) {
        decoded = decoded.replaceAll(char, pattern);
    }

    const records = decoded.split(RECORD_SEP);

    records.forEach(record => {
        const [key, name, url, keepSlashes] = record.split(FIELD_SEP);
        if (key && name && url) {
            addCustomDott(key, {
                name,
                url,
                keepSlashes: keepSlashes === "1",
            });
        }
    });

    saveCustomDotts();
}

export function hasCustomDotts(): boolean {
    return Object.keys(customDotts).length !== 0;
}
