import { routes } from "../src/lib/routes";
import vercelConfig from "../vercel.json";

interface Rewrite {
    source: string;
    destination: string;
}

interface Redirect {
    source: string;
    destination: string;
    permanent?: boolean;
}

interface VercelConfig {
    rewrites?: Rewrite[];
    redirects?: Redirect[];
}

const config = vercelConfig as VercelConfig;

// Get paths from the routes object directly
const appPaths = routes
    .map(r => r.path)
    .filter(p => p !== "/")
    .map(p => p.replace(/^\//, ""));

let hasError = false;

// 1. Validate Rewrites
const rewrites = config.rewrites || [];
const rewriteSources = rewrites.map(r => r.source.replace(/^\//, ""));

const missingRewrites = appPaths.filter(p => !rewriteSources.includes(p));
const extraRewrites = rewriteSources.filter(s => !appPaths.includes(s));

if (missingRewrites.length > 0) {
    console.error(`Error: Missing rewrites in vercel.json for: ${missingRewrites.map(p => `/${p}`).join(", ")}`);
    hasError = true;
}
if (extraRewrites.length > 0) {
    console.error(`Error: Extra rewrites in vercel.json (not in routes.ts): ${extraRewrites.map(s => `/${s}`).join(", ")}`);
    hasError = true;
}

// 2. Validate Catch-all Redirect
const STATIC_ASSETS = [
    'last-updated.txt',
    'sw.js',
    'workbox-.*.js',
    'manifest.webmanifest',
    'icon.svg',
    'search.svg',
    'opensearch.xml',
    'assets/',
    '$'
];

const expectedLookahead = [...appPaths, ...STATIC_ASSETS].join('|');
const expectedSource = `/((?!${expectedLookahead}).*)`;

const redirects = config.redirects || [];
const catchAllRedirect = redirects.find(r => r.destination === "/");

if (!catchAllRedirect) {
    console.error('Error: Catch-all redirect to "/" missing in vercel.json.');
    hasError = true;
} else if (catchAllRedirect.source !== expectedSource) {
    console.error(`Error: Catch-all redirect source mismatch.\nExpected: ${expectedSource}\nFound:    ${catchAllRedirect.source}`);
    hasError = true;
}

// 3. Ensure no manual redirects for app routes (they should be handled by SPA + catch-all)
if (redirects.length > 1) {
    console.error('Error: vercel.json contains extra redirects. Use the catch-all instead of explicit redirects.');
    hasError = true;
}

if (hasError) {
    console.error('Vercel validation failed. Please update vercel.json to match routes.ts.');
    process.exit(1);
}

console.log('Vercel configuration is synchronized with routes.ts');
process.exit(0);
