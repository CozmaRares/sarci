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
    empty?: string;
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
        url: "https://music.youtube.com/search?q=%s",
        category: "Music",
        empty: "https://music.youtube.com/playlist?list=LM",
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
        empty: "https://github.com/cozmarares",
    },
    gl: {
        name: "GitLab Repo",
        url: "https://gitlab.com/%s",
        keepSlashes: true,
        category: "Code",
        empty: "https://gitlab.com/cozmarares",
    },
    ghs: {
        name: "GitHub Search",
        url: "https://github.com/search?q=%s",
        category: "Code",
        empty: "https://github.com/search",
    },
    mdn: {
        name: "MDN Web Docs",
        url: "https://developer.mozilla.org/search?q=%s",
        category: "Code",
        empty: "https://developer.mozilla.org/search",
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
        empty: "https://translate.google.com/?sl=auto&tl=en&op=translate",
    },
    ter: {
        name: "Google Translate (en to ro)",
        url: "https://translate.google.com/?sl=en&tl=ro&text=%s&op=translate",
        category: "Misc",
        empty: "https://translate.google.com/?sl=en&tl=ro&op=translate",
    },
    tre: {
        name: "Google Translate (ro to en)",
        url: "https://translate.google.com/?sl=ro&tl=en&text=%s&op=translate",
        category: "Misc",
        empty: "https://translate.google.com/?sl=ro&tl=en&op=translate",
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
        category: "Misc",
    },
    ms: {
        name: "MangaSkin",
        url: "https://manga.skin/",
        category: "Manga/Anime",
    },
    we: {
        name: "WeebCentral",
        url: "https://weebcentral.com/search?text=%s",
        category: "Manga/Anime",
    },
    mdex: {
        name: "MangaDex",
        url: "https://mangadex.org/search?q=%s",
        category: "Manga/Anime",
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
    koto: {
        name: "Anikoto TV",
        url: "https://anikototv.to/filter?keyword=%s",
        category: "Manga/Anime",
        empty: "https://anikototv.to/home",
    },
    bnr: {
        name: "Curs BNR",
        url: "https://www.cursbnr.ro/",
        category: "Misc",
    },
    marc: {
        name: "Bucmarc",
        url: "http://bucmarc.raru.dev/api/mark/save/%s",
        category: "Misc",
    },
    marcn: {
        name: "Bucmarc (no redirect)",
        url: "http://bucmarc.raru.dev/api/mark/save/%s?no-redirect",
        category: "Misc",
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
