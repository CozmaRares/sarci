// @ts-ignore virtual:pwa-register is generated at build time
import { registerSW } from "virtual:pwa-register";
import { VERSION_KEY } from "./lib/constants";

let registration: ServiceWorkerRegistration | undefined;
let isUpdateNotified = false;

async function doCheck(onNewVersion?: (remoteVersion: string) => void) {
    const currentVersion = localStorage.getItem(VERSION_KEY);

    try {
        const response = await fetch("/version.txt", {
            cache: "no-store",
        });
        if (!response.ok) return;

        const remoteVersion = (await response.text()).trim();

        if (currentVersion === null) {
            // First install: silently seed version
            localStorage.setItem(VERSION_KEY, remoteVersion);
            return;
        }

        console.log("New version available", remoteVersion);
        console.log("Current version", currentVersion);

        if (remoteVersion !== currentVersion) {
            if (isUpdateNotified) return;

            // Force SW to check for update if it hasn't yet
            if (registration) {
                await registration.update();
            }
            isUpdateNotified = true;
            onNewVersion?.(remoteVersion);
        }
    } catch (e) {
        console.error("Failed to check for updates", e);
    }
}

const updateSW = registerSW({
    immediate: true,
    onRegisteredSW(_swUrl: string, r: ServiceWorkerRegistration) {
        registration = r;
    },
    async onNeedRefresh() {
        if (isUpdateNotified) return;
        doCheck();
    },
});

export async function updateServiceWorker(remoteVersion: string) {
    localStorage.setItem(VERSION_KEY, remoteVersion);
    await updateSW(true);
    window.location.reload();
}

export function checkVersion(showUpdateCB: (remoteVersion: string) => void) {
    return doCheck(showUpdateCB);
}
