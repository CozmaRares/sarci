import {
    createMemo,
    createSignal,
    Show,
    type Accessor,
    type Setter,
} from "solid-js";
import Trash2 from "lucide-solid/icons/trash-2";
import Pencil from "lucide-solid/icons/pencil";
import Card from "../components/Card";
import {
    addCustomDott,
    deleteCustomDott,
    getCustomDott,
} from "../logic/localStorage";
import DottUrl from "../components/DottUrl";
import CustomDottList from "../components/CustomDottList";
import type { Dott, DottValue } from "../logic/dotts";

const defaultFormData = {
    key: "",
    name: "",
    url: "",
    keepSlashes: false,
};

const defaultFormError = {
    key: null,
    name: null,
    url: null,
};

type FormData = typeof defaultFormData;
type FormError = Record<keyof typeof defaultFormError, string | null>;

export default function Custom() {
    const [formData, setFormData] = createSignal<FormData>(defaultFormData);
    const [formError, setFormError] = createSignal<FormError>(defaultFormError);

    const editDott = (key: Dott, value: DottValue) => {
        const { name, url, keepSlashes = false } = value;
        setFormData({ key, name, url, keepSlashes });
    };

    return (
        <div class="w-full max-w-4xl space-y-8">
            <div>
                <h1 class="text-center text-4xl font-bold">Custom Dotts</h1>
                <p class="text-text-accent mx-auto max-w-2/3 text-center text-lg text-balance">
                    Very useful if you want to keep some URLs private
                </p>
            </div>
            <DottForm
                formData={formData}
                setFormData={setFormData}
                formError={formError}
                setFormError={setFormError}
            />
            <CustomDottList
                endAdornment={(key, value) => (
                    <div class="flex gap-2">
                        <button
                            class="border-text-text hover:bg-text hover:text-background cursor-pointer rounded-md border p-2"
                            onclick={() => editDott(key, value)}
                        >
                            <Pencil class="size-4" />
                        </button>
                        <button
                            class="border-danger-bg text-danger-bg accent-danger-bg hover:bg-danger-bg hover:text-text cursor-pointer rounded-md border p-2"
                            onclick={() => deleteCustomDott(key)}
                        >
                            <Trash2 class="size-4" />
                        </button>
                    </div>
                )}
            />
        </div>
    );
}

type FormProps = {
    formData: Accessor<FormData>;
    setFormData: Setter<FormData>;
    formError: Accessor<FormError>;
    setFormError: Setter<FormError>;
};

function isUrlValid(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function DottForm({
    formData,
    setFormData,
    formError,
    setFormError,
}: FormProps) {
    const resetForm = () => setFormData(defaultFormData);
    const submitForm = (e: Event) => {
        e.preventDefault();

        const { key, name, url, keepSlashes } = formData();

        let keyError: string | null = null;
        let nameError: string | null = null;
        let urlError: string | null = null;

        if (key.length === 0) keyError = "Required";
        if (name.length === 0) nameError = "Required";
        if (url.length === 0) urlError = "Required";
        else if (!isUrlValid(url)) urlError = "Invalid URL";

        setFormError({ key: keyError, name: nameError, url: urlError });

        if (Object.values(formError()).some(Boolean)) return;

        addCustomDott(key, { name, url, keepSlashes });
        resetForm();
    };

    const isAlreadyDefined = createMemo(
        () => getCustomDott(formData().key) !== undefined,
    );

    return (
        <Card class="space-y-4">
            <h2 class="text-2xl font-semibold">Add Custom Dott</h2>
            <form
                class="space-y-4"
                onsubmit={submitForm}
            >
                <div class="space-y-2">
                    <div class="flex flex-row items-center gap-2">
                        <label
                            for="key"
                            class="text-text-accent block"
                        >
                            Key
                        </label>
                        <Show when={formError().key}>
                            <div class="text-danger-bg">
                                ({formError().key})
                            </div>
                        </Show>
                    </div>
                    <input
                        type="text"
                        name="key"
                        id="key"
                        class={`card-secondary w-full rounded-md border p-2 ${
                            formError().key === null
                                ? "border-card-primary-text"
                                : "border-danger-bg"
                        }`}
                        placeholder="e.g., g, yt, gh"
                        value={formData().key}
                        onChange={e =>
                            setFormData(prev => ({
                                ...prev,
                                key: e.target.value,
                            }))
                        }
                    />
                </div>
                <div class="space-y-2">
                    <div class="flex flex-row items-center gap-2">
                        <label
                            for="name"
                            class="text-text-accent block"
                        >
                            Name
                        </label>
                        <Show when={formError().name}>
                            <div class="text-danger-bg">
                                ({formError().name})
                            </div>
                        </Show>
                    </div>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        class={`card-secondary w-full rounded-md border p-2 ${
                            formError().name === null
                                ? "border-card-primary-text"
                                : "border-danger-bg"
                        }`}
                        placeholder="e.g., Google, YouTube, GitHub"
                        value={formData().name}
                        onChange={e =>
                            setFormData(prev => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                </div>
                <div class="space-y-2">
                    <div class="flex flex-row items-center gap-2">
                        <label
                            for="url"
                            class="text-text-accent block"
                        >
                            URL
                        </label>

                        <Show when={formError().url}>
                            <div class="text-danger-bg">
                                ({formError().url})
                            </div>
                        </Show>
                    </div>
                    <input
                        type="text"
                        name="url"
                        id="url"
                        class={`card-secondary w-full rounded-md border p-2 ${
                            formError().url === null
                                ? "border-card-primary-text"
                                : "border-danger-bg"
                        }`}
                        placeholder="e.g., https://google.com/search?q=%s"
                        value={formData().url}
                        onChange={e =>
                            setFormData(prev => ({
                                ...prev,
                                url: e.target.value,
                            }))
                        }
                    />
                    <div class="">
                        <p>
                            Include{" "}
                            <span class="text-text-accent font-bold">%s</span>{" "}
                            in the URL where the search term should be placed.
                            It can be omitted if you don't want the dott to be
                            dynamic.
                        </p>
                        <p>
                            For example:{" "}
                            <DottUrl url="https://google.com/search?q=%s" />
                        </p>
                    </div>
                </div>
                <div class="flex flex-row items-center gap-2">
                    <input
                        type="checkbox"
                        name="keepSlashes"
                        id="keepSlashes"
                        class="border-card-primary-text bg-card-secondary-bg size-4 rounded-sm border"
                        checked={formData().keepSlashes}
                        onChange={e =>
                            setFormData(prev => ({
                                ...prev,
                                keepSlashes: e.target.checked,
                            }))
                        }
                    />
                    <label
                        for="keepSlashes"
                        class="block text-sm"
                    >
                        Keep slashes in path (don't encode in URI)
                    </label>
                </div>
                <button
                    type="submit"
                    class="hover:bg-card-secondary-bg text-card-secondary-text bg-background/80 w-full cursor-pointer rounded-md p-2 transition-colors"
                >
                    {isAlreadyDefined() ? "Update" : "Add"} Dott
                </button>
                <button
                    type="button"
                    class="hover:text-danger-text hover:bg-danger-bg bg-danger-bg/80 w-full cursor-pointer rounded-md p-2 transition-colors"
                    onclick={resetForm}
                >
                    Reset Form
                </button>
            </form>
        </Card>
    );
}
