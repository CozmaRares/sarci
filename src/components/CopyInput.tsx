import { createSignal, Show } from "solid-js";
import Clipboard from "lucide-solid/icons/clipboard";
import ClipboardCheck from "lucide-solid/icons/clipboard-check";

type Props = {
    value: string;
};

export default function CopyInput({ value }: Props) {
    const [isCopied, setIsCopied] = createSignal(false);

    const copy = async () => {
        await navigator.clipboard.writeText(value);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div class="border-secondary-contrast color-tertiary isolate flex h-10 flex-row items-center rounded-md border">
            <input
                type="text"
                value={value}
                readOnly
                class="h-full flex-grow rounded-l-md bg-transparent px-3 py-2 font-mono"
            />
            <div class="bg-secondary-contrast -z-10 h-full w-[1px]" />
            <button
                class="flex aspect-square h-full items-center justify-center rounded-r-md hover:cursor-pointer"
                onclick={copy}
            >
                <Show
                    when={isCopied()}
                    fallback={<Clipboard class="size-6" />}
                >
                    <ClipboardCheck class="size-6" />
                </Show>
            </button>
        </div>
    );
}
