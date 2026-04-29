import { defaultDott, getDefaultDott } from "./dotts";
import { getCustomDott } from "./localStorage";

const DOTT_REGEX = /\.(\S+)/gi;


export function redirect(query: string) {
    const candidates = Array.from(query.matchAll(DOTT_REGEX)).map(x => x[1].toLowerCase());

    // push default dott
    candidates.push(defaultDott);

    // keep trying for each candidate
    for (const candidate of candidates) {
        const url = tryDott(candidate, query);
        if (!url) continue;
        window.location.replace(url);
        break;
    }
}

function tryDott(dott: string, query: string): string | false {
    let selectedDott = getDefaultDott(dott);

    if (!selectedDott) {
        selectedDott = getCustomDott(dott);
        if (!selectedDott) return false;
    }

    query = query.replace("." + dott, "").trim();
    query = encodeURIComponent(query);

    if (selectedDott.keepSlashes === true) query = query.replace(/%2F/g, "/");

    if (selectedDott.url.includes("%s") && query.length != 0) 
        return selectedDott.url.replace("%s", query);

    if (selectedDott.empty) return selectedDott.empty;

    const url = new URL(selectedDott.url);
    return url.protocol + "//" + url.hostname;
}
