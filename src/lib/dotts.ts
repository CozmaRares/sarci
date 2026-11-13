export type DottList = Record<string, DottValue>;
export type Dott = keyof typeof dotts;
export type DottValue = {
    name: string;
    url: string;
    keepSlashes?: boolean;
    empty?: string;
};

const dotts = {
    g: {
        name: "Google",
        url: "https://www.google.com/search?q=%s",
    },
    y: {
        name: "YouTube",
        url: "https://www.youtube.com/results?search_query=%s",
    },
    ym: {
        name: "YouTube Music Liked Music Playlist",
        url: "https://music.youtube.com/search?q=%s",
        empty: "https://music.youtube.com/playlist?list=LM",
    },
    gi: {
        name: "Google Images",
        url: "https://google.com/search?tbm=isch&q=%s&tbs=imgo:1",
    },
    npm: {
        name: "NPM",
        url: "https://www.npmjs.com/search?q=%s",
    },
    rs: {
        name: "Docs.rs",
        url: "https://docs.rs/releases/search?query=%s",
    },
    gh: {
        name: "GitHub Repo",
        url: "https://github.com/%s",
        keepSlashes: true,
        empty: "https://github.com/cozmarares",
    },
    gl: {
        name: "GitLab Repo",
        url: "https://gitlab.com/%s",
        keepSlashes: true,
        empty: "https://gitlab.com/cozmarares",
    },
    ghs: {
        name: "GitHub Search",
        url: "https://github.com/search?q=%s",
        empty: "https://github.com/search",
    },
    mdn: {
        name: "MDN Web Docs",
        url: "https://developer.mozilla.org/search?q=%s",
        empty: "https://developer.mozilla.org/search",
    },
    can: {
        name: "Can I Use",
        url: "https://caniuse.com/?search=%s",
    },
    tr: {
        name: "Google Translate (auto to en)",
        url: "https://translate.google.com/?sl=auto&tl=en&text=%s&op=translate",
        empty: "https://translate.google.com/?sl=auto&tl=en&op=translate",
    },
    ter: {
        name: "Google Translate (en to ro)",
        url: "https://translate.google.com/?sl=en&tl=ro&text=%s&op=translate",
        empty: "https://translate.google.com/?sl=en&tl=ro&op=translate",
    },
    tre: {
        name: "Google Translate (ro to en)",
        url: "https://translate.google.com/?sl=ro&tl=en&text=%s&op=translate",
        empty: "https://translate.google.com/?sl=ro&tl=en&op=translate",
    },
    orar: {
        name: "Orar",
        url: "https://docs.google.com/spreadsheets/d/1xssn6PC5ODqIjowpPb8lQ6zphXDOzZsYR4wOw9yPfEI/edit?pli=1&gid=1829921421#gid=1829921421",
        keepSlashes: true,
    },
    mal: {
        name: "My Anime List",
        url: "https://myanimelist.net/anime.php?q=%s",
        empty: "https://myanimelist.net/anime/season",
    },
    ctp: {
        name: "CTP Cluj",
        url: "https://ctpcj.ro/index.php/ro/orare-linii/linii-urbane/linia-%s",
    },
    we: {
        name: "WeebCentral",
        url: "https://weebcentral.com/search?text=%s",
    },
    mdex: {
        name: "MangaDex",
        url: "https://mangadex.org/search?q=%s",
    },
    ss: {
        name: "Sărci",
        url: "https://sarci.raru.dev/",
    },
    gpt: {
        name: "ChatGPT",
        url: "https://chatgpt.com/?prompt=%s",
        empty: "https://chatgpt.com/?temporary-chat=true",
    },
    koto: {
        name: "Anikoto TV",
        url: "https://anikototv.to/filter?keyword=%s",
        empty: "https://anikototv.to/home",
    },
    bnr: {
        name: "Curs BNR",
        url: "https://www.cursbnr.ro/",
    },
    marcr: {
        name: "Bucmarc",
        url: "https://bucmarc.raru.dev/api/mark/save/%s",
    },
    marc: {
        name: "Bucmarc (no redirect)",
        url: "https://bucmarc.raru.dev/api/mark/save/%s?no-redirect",
    },
    ttv: {
        name: "Twitch",
        url: "https://www.twitch.tv/search?term=%s",
        empty: "https://www.twitch.tv/noarmwhatley",
        keepSlashes: true,
    },
    eon: {
        name: "E.ON",
        url: "https://www.eon.ro/transmitere-index",
    },
    cx: {
        name: "Comix",
        url: "https://comix.to/browse?q=%s&sort=relevance%3Adesc",
    },
    gsw: {
        name: "Google Stopwatch",
        url: "https://www.google.com/search?q=stopwatch",
    },
    netstat: {
        name: "Netstat W10 driver",
        url: "https://support-netstat.ro/en/NETSTAT-W10/",
    },
    formctp: {
        name: "Form Decont CTP",
        url: "https://formforyou.utcluj.ro/ctp",
    },
    tt: {
        name: "tt",
        url: "https://teams.cloud.microsoft",
    },
    ugg: {
        name: "U.gg",
        url: "https://u.gg/opensearch/?query=%s",
    },
} as const satisfies DottList;

const typedDotts: Record<Dott, DottValue> = dotts;
export { typedDotts as dotts };

export const defaultDott = "g" satisfies Dott;

export function getSystemDott(dott: string): DottValue | undefined {
    if (!(dott in dotts)) return undefined;
    const selectedDott = dotts[dott as Dott];
    return selectedDott;
}
