type Category =
    | "Search"
    | "Music"
    | "AI"
    | "Code"
    | "Misc"
    | "Manga/Anime"
    | "Custom";

export type DottList = Record<string, DottValue>;
export type Dott = keyof typeof dotts;
export type DottValue = {
    name: string;
    url: string;
    category: Category;
    keepSlashes?: boolean;
};

const dotts = {
    g: {
        name: "Google",
        url: "https://www.google.com/search?q=%s",
        category: "Search",
    },
    y: {
        name: "YouTube",
        url: "https://www.youtube.com/results?search_query=%s",
        category: "Search",
    },
    ym: {
        name: "YouTube Music Liked Music Playlist",
        url: "https://music.youtube.com/playlist?list=LM",
        category: "Music",
    },
    yms: {
        name: "YouTube Music",
        url: "https://music.youtube.com/search?q=%s",
        category: "Music",
    },
    gi: {
        name: "Google Images",
        url: "https://google.com/search?tbm=isch&q=%s&tbs=imgo:1",
        category: "Search",
    },
    npm: {
        name: "NPM",
        url: "https://www.npmjs.com/search?q=%s",
        category: "Code",
    },
    rs: {
        name: "Docs.rs",
        url: "https://docs.rs/releases/search?query=%s",
        category: "Code",
    },
    gh: {
        name: "GitHub Repo",
        url: "https://github.com/%s",
        keepSlashes: true,
        category: "Code",
    },
    ghs: {
        name: "GitHub Search",
        url: "https://github.com/search?q=%s",
        category: "Code",
    },
    mdn: {
        name: "MDN Web Docs",
        url: "https://developer.mozilla.org/search?q=%s",
        category: "Code",
    },
    can: {
        name: "Can I Use",
        url: "https://caniuse.com/?search=%s",
        category: "Code",
    },
    tr: {
        name: "Google Translate (auto to en)",
        url: "https://translate.google.com/?sl=auto&tl=en&text=%s&op=translate",
        category: "Misc",
    },
    ter: {
        name: "Google Translate (en to ro)",
        url: "https://translate.google.com/?sl=en&tl=ro&text=%s&op=translate",
        category: "Misc",
    },
    tre: {
        name: "Google Translate (ro to en)",
        url: "https://translate.google.com/?sl=ro&tl=en&text=%s&op=translate",
        category: "Misc",
    },
    ac: {
        name: "AC UTCN",
        url: "https://ac.utcluj.ro/%s.html",
        keepSlashes: true,
        category: "Misc",
    },
    mal: {
        name: "My Anime List",
        url: "https://myanimelist.net/anime.php?q=%s",
        category: "Manga/Anime",
    },
    ctp: {
        name: "CTP Cluj",
        url: "https://ctpcj.ro/index.php/ro/orare-linii/linii-urbane/linia-%s",
        category: "Manga/Anime",
    },
    tc: {
        name: "MangaClash",
        url: "https://mangaclash.com/?s=%s&post_type=wp-manga",
        category: "Manga/Anime",
    },
    mdex: {
        name: "MangaDex",
        url: "https://mangadex.org/search?q=%s",
        category: "Manga/Anime",
    },
    formctp: {
        name: "Decontare CTP",
        url: "https://formforyou.utcluj.ro/#",
        category: "Misc",
    },
    ss: {
        name: "Sărci",
        url: "https://sarci.raru.dev/",
        category: "Misc",
    },
    gpt: {
        name: "ChatGPT",
        url: "https://chatgpt.com/?prompt=%s",
        category: "AI",
    },
    eonidx: {
        name: "E-ON Transmitere Index",
        url: "https://www.eon.ro/transmitere-index",
        category: "Misc",
    },
    koto: {
        name: "Anikoto TV",
        url: "https://anikototv.to/filter?keyword=%s",
        category: "Manga/Anime",
    }

} as const satisfies DottList;

const typedDotts: Record<Dott, DottValue> = dotts;
export { typedDotts as dotts };

export const defaultDott = "g" satisfies Dott;

export function getDefaultDott(dott: string): DottValue | undefined {
    if (!(dott in dotts)) return undefined;
    const selectedDott = dotts[dott as Dott];
    return selectedDott;
}
