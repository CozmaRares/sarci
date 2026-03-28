import { For, Show, type JSX } from "solid-js";
import type { Dott, DottValue } from "../logic/dotts";
import { customDotts, hasCustomDotts } from "../logic/localStorage";
import Card from "./Card";
import DottUrl from "./DottUrl";

type Props = {
    endAdornment?: (dott: Dott, value: DottValue) => JSX.Element;
};

export default function CustomDottList({ endAdornment }: Props) {
    return (
        <Card class="space-y-4">
            <h2 class="text-2xl font-semibold">Your Custom Dotts</h2>
            <Show
                when={hasCustomDotts()}
                fallback={<p>You don't have any custom dotts.</p>}
            >
                <ul class="space-y-4">
                    <For each={Object.entries(customDotts)}>
                        {([key, value]) => (
                            <li class="color-tertiary flex flex-row items-center justify-between rounded-lg p-2 shadow-sm">
                                <div>
                                    <span class="bg-secondary w-fit rounded-md px-2 py-0.5 whitespace-nowrap">
                                        .{key}
                                    </span>{" "}
                                    {value.name}
                                    <div>
                                        <DottUrl url={value.url} />
                                    </div>
                                    <div>
                                        {value.keepSlashes &&
                                            "Keeps slashes in path"}{" "}
                                    </div>
                                </div>
                                {endAdornment?.(key as Dott, value)}
                            </li>
                        )}
                    </For>
                </ul>
            </Show>
        </Card>
    );
}
