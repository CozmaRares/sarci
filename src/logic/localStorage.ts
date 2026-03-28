import { createMutable } from "solid-js/store";
import type { DottList, DottValue } from "./dotts";

const CUSTOM_DOTTS_KEY = "customDotts";
const DEFAULT_CATEGORY = "Custom";

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

export function addCustomDott(key: string, value: DottValueInput): void {
    if (value.keepSlashes === false) delete value.keepSlashes;

    customDotts[key] = { ...value, category: DEFAULT_CATEGORY };
    saveCustomDotts();
}

export function deleteCustomDott(key: string): void {
    if (key in customDotts) {
        delete customDotts[key];
        saveCustomDotts();
    }
}

export function encodeDotts(data: string) {
    return btoa(data);
}

export function importDotts(data: string) {
    const imported = JSON.parse(data);

    for (const [key, value] of Object.entries(imported)) {
        addCustomDott(key, value as DottValueInput);
    }
}

export function hasCustomDotts(): boolean {
    return Object.keys(customDotts).length !== 0;
}
