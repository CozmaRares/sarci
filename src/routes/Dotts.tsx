import { createComputed, For } from "solid-js";
import { dotts, defaultDott } from "@/lib/dotts";
import { customDotts } from "@/lib/localStorage";
import Card from "@/components/Card";
import DottUrl from "@/components/DottUrl";

export default function Dotts() {
    let categories: ReturnType<typeof getCategories>;

    createComputed(() => {
        categories = getCategories();
    });

    return (
        <div class="max-w-2xl space-y-8">
            <h1 class="text-center text-4xl font-bold">Dott List</h1>
            <For each={Array.from(categories!.entries())}>
                {([category, dotts]) => (
                    <DottList
                        category={category}
                        dotts={dotts}
                    />
                )}
            </For>
        </div>
    );
}

type CategorizedDott = {
    dottKey: string;
    name: string;
    url: string;
    keepSlashes?: boolean;
};

function getCategories() {
    const categories = new Map<string, CategorizedDott[]>();

    const combinedDotts = { ...customDotts, ...dotts };

    for (const [key, value] of Object.entries(combinedDotts)) {
        if (!categories.has(value.category)) {
            categories.set(value.category, []);
        }

        categories.get(value.category)!.push({
            dottKey: key,
            name: value.name,
            url: value.url,
            keepSlashes: value.keepSlashes,
        });
    }

    return categories;
}

type DottListProps = {
    category: string;
    dotts: CategorizedDott[];
};

function DottList({ category, dotts }: DottListProps) {
    return (
        <>
            <div class="flex flex-row items-center gap-2">
                <span class="bg-primary-contrast h-[2px] flex-grow"></span>
                <h2 class="text-2xl font-semibold">{category}</h2>
                <span class="bg-primary-contrast h-[2px] flex-grow"></span>
            </div>
            <ul class="space-y-4">
                <For each={dotts}>{dott => <DottItem {...dott} />}</For>
            </ul>
        </>
    );
}

function DottItem({ dottKey, name, url, keepSlashes }: CategorizedDott) {
    return (
        <li>
            <Card>
                <div class="flex flex-row items-end gap-2">
                    <span class="font-mono text-lg font-bold">.{dottKey}</span>
                    {dottKey === defaultDott && (
                        <span class="text-accent text-sm">(default)</span>
                    )}
                </div>
                <div>
                    <div>Name: {name}</div>
                    <div style="word-break: break-all;">
                        URL:{" "}
                        <span class="font-mono">
                            <DottUrl url={url} />
                        </span>
                    </div>
                    {keepSlashes && <div>Keeps slashes in path</div>}
                </div>
            </Card>
        </li>
    );
}
