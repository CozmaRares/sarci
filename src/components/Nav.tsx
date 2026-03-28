import { useLocation } from "@solidjs/router";
import Home from "lucide-solid/icons/home";
import Layers from "lucide-solid/icons/layers";
import MoveUpRight from "lucide-solid/icons/move-up-right";
import Plus from "lucide-solid/icons/plus";
import { createMemo, type JSX } from "solid-js";
import type { routes } from "@/lib/routes";

type LucideComponent = (props: { class?: string }) => JSX.Element;
type NavItem = {
    name: string;
    icon: LucideComponent;
};
type VisibleRoutes = Exclude<(typeof routes)[number]["path"], "/import">;

const NAV_ITEMS: Record<VisibleRoutes, NavItem> = {
    "/": { name: "Home", icon: Home },
    "/dotts": { name: "Available Dotts", icon: Layers },
    "/custom": { name: "Add Your Own", icon: Plus },
    "/export": { name: "Export Your Dotts", icon: MoveUpRight },
};

export default function Nav() {
    const location = useLocation();
    const navItems = createMemo(() => {
        const pathname = location.pathname;

        return Object.entries(NAV_ITEMS).map(([path, item]) => {
            const active = path === pathname;
            return { ...item, path, active };
        });
    });

    return (
        <div class="border-accent color-secondary fixed right-0 bottom-0 left-0 z-50 border-t px-2 py-2 shadow-lg backdrop-blur-md md:right-auto md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:rounded-full md:border">
            <nav>
                <div class="flex flex-wrap items-center justify-center gap-2 md:flex-nowrap">
                    {navItems().map(({ path, name, icon: Icon, active }) => {
                        return (
                            <a
                                href={path}
                                class="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
                                classList={{
                                    "color-accent": active,
                                    "hover:bg-accent/20": !active,
                                }}
                            >
                                <Icon class="size-4" />
                                <span class="whitespace-nowrap">{name}</span>
                            </a>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
