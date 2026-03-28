import Search from "lucide-solid/icons/search";
import Card from "@/components/Card";
import CopyInput from "@/components/CopyInput";
import OutgoingLink from "@/components/OutgoingLink";
import { QUERY_PARAM } from "@/lib/constants";
import { redirect } from "@/lib/redirect";
import { useFullUrl } from "@/hooks/useFullUrl";

export default function Home() {
    const fullUrl = useFullUrl();

    let searchInputRef!: HTMLInputElement;
    let searchFormRef!: HTMLFormElement;

    const search = async (e: Event) => {
        e.preventDefault();
        redirect(searchInputRef.value, false);
    };

    return (
        <div class="flex flex-1 flex-col items-center justify-center">
            <main class="max-w-xl lg:max-w-screen-xl">
                <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-4">
                    <div class="flex flex-col justify-center gap-4 text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Sărci</h1>
                        <p class="max-w-xl text-lg text-balance">
                            <OutgoingLink href="https://duckduckgo.com/">
                                DuckDuckGo's
                            </OutgoingLink>{" "}
                            bang redirects are cool. I took{" "}
                            <OutgoingLink href="https://x.com/theo">
                                Theo's
                            </OutgoingLink>{" "}
                            client side remake (
                            <OutgoingLink href="https://unduck.link/">
                                und*ck
                            </OutgoingLink>
                            ) and made it work with my own{" "}
                            <span class="line-through">bangs</span> dotts.
                        </p>
                        <p class="max-w-xl text-lg text-balance">
                            If you want to have your own version of this, I
                            encourage you to fork{" "}
                            <OutgoingLink href="https://github.com/CozmaRares/sarci">
                                my repo
                            </OutgoingLink>{" "}
                            and deploy it however you like.
                        </p>
                    </div>

                    <Card
                        padding="p-6"
                        class="flex flex-col justify-center space-y-4"
                    >
                        <div class="space-y-3">
                            <p>
                                Add this url as a custom search engine in your
                                browser
                            </p>
                            <CopyInput
                                value={`${fullUrl()}?${QUERY_PARAM}=%s`}
                            />
                        </div>

                        <div class="flex flex-row items-center gap-2">
                            <span class="bg-secondary-contrast h-[2px] flex-grow"></span>
                            OR
                            <span class="bg-secondary-contrast h-[2px] flex-grow"></span>
                        </div>

                        <div class="space-y-3">
                            <p>
                                Do a search to have the url be automatically
                                picked up by your browser as a recently used
                                search engine
                                <span class="text-accent block font-bold italic">
                                    &gt; for when you can't add Sărci as a
                                    custom search engine
                                </span>
                            </p>
                            <form
                                ref={searchFormRef}
                                onsubmit={search}
                            >
                                <div class="border-secondary-contrast color-tertiary isolate flex h-10 flex-row items-center rounded-md border">
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="cat videos .y"
                                        class="placeholder:text-tertiary-contrast/80 h-full flex-grow rounded-l-md bg-transparent px-3 py-2 font-mono"
                                    />
                                    <div class="bg-secondary-contrast -z-10 h-full w-[1px]" />
                                    <button class="flex aspect-square h-full items-center justify-center rounded-r-md hover:cursor-pointer">
                                        <Search class="size-6" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
