import "@/index.css";
import Nav from "@/components/Nav";
import TailwindIndicator from "@/components/TailwindIndicator";
import { routes } from "@/lib/routes";
import { Router as SolidRouter } from "@solidjs/router";
import type { JSX } from "solid-js";

export default function Router() {
    /* @ts-expect-error types don't accept readonly */
    return <SolidRouter root={Layout}>{routes}</SolidRouter>;
}

function Layout({ children }: { children: JSX.Element }) {
    return (
        <div class="color-primary relative flex min-h-screen w-full max-w-full items-center justify-center p-12 pb-32">
            {children}
            <Nav />
            <TailwindIndicator />
        </div>
    );
}
