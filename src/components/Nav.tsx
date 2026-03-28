import currentHash from "../logic/currentHash";
import Home from "lucide-solid/icons/home";
import Layers from "lucide-solid/icons/layers";
import MoveUpRight from "lucide-solid/icons/move-up-right";
import Plus from "lucide-solid/icons/plus";

const NAV_ITEMS = [
    { hash: "", name: "Home", icon: Home },
    { hash: "#dotts", name: "Available Dotts", icon: Layers },
    { hash: "#custom", name: "Add Your Own", icon: Plus },
    { hash: "#export", name: "Export Your Dotts", icon: MoveUpRight },
];

export default function Nav() {
    return (
        <div class="border-accent color-secondary fixed right-0 bottom-0 left-0 z-50 border-t px-2 py-2 shadow-lg backdrop-blur-md md:right-auto md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:rounded-full md:border">
            <nav>
                <div class="flex flex-wrap items-center justify-center gap-2 md:flex-nowrap">
                    {NAV_ITEMS.map(item => {
                        const Icon = item.icon;
                        const isActive = currentHash() === item.hash;

                        return (
                            <a
                                href={item.hash.length == 0 ? "#" : item.hash}
                                class={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? "color-accent"
                                        : "hover:bg-accent/20"
                                }`}
                            >
                                <Icon class="size-4" />
                                <span class="whitespace-nowrap">
                                    {item.name}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
