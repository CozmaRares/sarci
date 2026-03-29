import { defaultDott, getDefaultDott } from "./dotts";
import { getCustomDott } from "./localStorage";

const DOTT_REGEX = /\.(\S+)/gi;

export function redirect(query: string) {
    const candidates = query.matchAll(DOTT_REGEX);

    // keep trying for each candidate
    for (const candidate of candidates)
        if (tryDott(candidate[1].toLowerCase(), query)) return;

    // use default
    tryDott(defaultDott, query);
}

function tryDott(dott: string, query: string) {
    let selectedDott = getDefaultDott(dott);

    if (!selectedDott) {
        selectedDott = getCustomDott(dott);
        if (!selectedDott) return false;
    }

    query = query.replace("." + dott, "").trim();
    query = encodeURIComponent(query);

    if (selectedDott.keepSlashes === true) query = query.replace(/%2F/g, "/");

    let searchUrl: string;

    if (query.length != 0) {
        searchUrl = selectedDott.url.replace("%s", query);
    } else if (selectedDott.url.includes("%s")) {
        const url = new URL(selectedDott.url);
        searchUrl = url.protocol + "//" + url.hostname;
    } else {
        searchUrl = selectedDott.url;
    }

    window.location.replace(searchUrl);
    return true;
}
