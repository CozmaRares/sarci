// @ts-ignore virtual:pwa-register is generated at build time
import { registerSW } from "virtual:pwa-register";
import { VERSION_KEY } from "./lib/constants";

let registration: ServiceWorkerRegistration | undefined;

const updateSW = registerSW({
    immediate: true,
    onRegisteredSW(_swUrl: string, r: ServiceWorkerRegistration) {
        registration = r;
    },
    onNeedRefresh() {
        document.dispatchEvent(new CustomEvent("pwa-update-available"));
    },
});

export async function updateServiceWorker(remoteVersion: string) {
    localStorage.setItem(VERSION_KEY, remoteVersion);
    await updateSW(true);
    window.location.reload();
}

export async function checkVersion(
    showUpdateCB: (remoteVersion: string) => void,
) {
    const currentVersion = localStorage.getItem(VERSION_KEY);

    document.addEventListener("pwa-update-available", () => {
        showUpdateCB(currentVersion || "unknown");
    });

    try {
        const response = await fetch("/last-updated.txt", {
            cache: "no-store",
        });
        if (response.ok) {
            const remoteVersion = (await response.text()).trim();
            if (remoteVersion !== currentVersion) {
                if (registration) {
                    await registration.update();
                }
                showUpdateCB(remoteVersion);
            }
        }
    } catch (e) {
        console.error("Failed to check for updates", e);
    }
}
