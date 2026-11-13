import { createComputed, For } from "solid-js";
import { dotts, defaultDott, type DottValue } from "@/lib/dotts";
import { customDotts } from "@/lib/localStorage";
import Card from "@/components/Card";
import DottUrl from "@/components/DottUrl";

export default function Dotts() {
    let dottEntries: ReturnType<typeof getDottEntries>;

    createComputed(() => {
        dottEntries = getDottEntries();
    });

    return (
        <div class="max-w-2xl space-y-8">
            <h1 class="text-center text-4xl font-bold">Dott List</h1>
            <ul class="space-y-4">
                <For each={dottEntries!}>
                    {([dottKey, value]) => (
                        <DottItem
                            dottKey={dottKey}
                            {...value}
                        />
                    )}
                </For>
            </ul>
        </div>
    );
}

function getDottEntries(): [string, DottValue][] {
    const combinedDotts = { ...customDotts, ...dotts };
    return Object.entries(combinedDotts);
}

type DottItemProps = DottValue & {
    dottKey: string;
};

function DottItem({ dottKey, name, url, keepSlashes, empty }: DottItemProps) {
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
                    {empty && url.includes("%s") && (
                        <div style="word-break: break-all;">
                            Empty URL:{" "}
                            <span class="font-mono">
                                <DottUrl url={empty} />
                            </span>
                        </div>
                    )}
                    {keepSlashes && <div>Keeps slashes in path</div>}
                </div>
            </Card>
        </li>
    );
}
