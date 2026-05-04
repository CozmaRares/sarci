import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import solid from "vite-plugin-solid";
import { resolve } from "path";

export default defineConfig({
    plugins: [
        solid(),
        VitePWA({
            registerType: "prompt",
            manifest: {
                name: "Sărci",
                short_name: "Sărci",
                description: "Redirecting with dotts since 2025",
                theme_color: "#030712",
                icons: [
                    {
                        src: "icon.svg",
                        sizes: "any",
                        type: "image/svg+xml",
                    },
                ],
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
                navigateFallback: "index.html",
            },
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
