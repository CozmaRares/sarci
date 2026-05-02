import "@/index.css";
import Nav from "@/components/Nav";
import TailwindIndicator from "@/components/TailwindIndicator";
import { routes } from "@/lib/routes";
import { Router as SolidRouter } from "@solidjs/router";
import type { JSX } from "solid-js";
import { onMount, createSignal, Show } from "solid-js";
import { checkVersion, updateServiceWorker } from "../pwa";

export default function Router() {
    /* @ts-expect-error types don't accept readonly */
    return <SolidRouter root={Layout}>{routes}</SolidRouter>;
}

function Layout({ children }: { children: JSX.Element }) {
    const [showUpdate, setShowUpdate] = createSignal(false);
    const [remoteVersion, setRemoteVersion] = createSignal("");

    onMount(() => {
        checkVersion((remoteVersion: string) => {
            setRemoteVersion(remoteVersion);
            setShowUpdate(true);
        });
    });

    return (
        <div class="color-primary relative flex min-h-screen w-full max-w-full items-center justify-center p-12 pb-32">
            {children}
            <Nav />
            <TailwindIndicator />
            <Show when={showUpdate()}>
                <div class="border-accent color-secondary fixed top-4 right-4 z-50 flex items-center gap-4 rounded-lg border p-4 shadow-lg">
                    <div class="flex flex-col">
                        <span class="text-sm font-medium">
                            Update available
                        </span>
                        <span class="text-xs text-neutral-400">
                            A new version of Sărci is ready.
                        </span>
                    </div>
                    <button
                        onClick={() => {
                            updateServiceWorker(remoteVersion());
                            setShowUpdate(false);
                        }}
                        class="rounded-lg bg-white px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-slate-300"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={() => setShowUpdate(false)}
                        class="color-tertiary rounded-lg px-4 py-2 text-xs font-bold transition-colors hover:bg-black"
                    >
                        Dismiss
                    </button>
                </div>
            </Show>
        </div>
    );
}
