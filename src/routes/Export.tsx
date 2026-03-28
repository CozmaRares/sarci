import { createMemo } from "solid-js";
import Card from "@/components/Card";
import { exportDotts } from "@/lib/localStorage";
import CopyInput from "@/components/CopyInput";
import CustomDottList from "@/components/CustomDottList";
import { IMPORT_PARAM } from "@/lib/constants";
import { useFullUrl } from "@/hooks/useFullUrl";

export default function Export() {
    const url = createMemo(() => {
        const base64 = exportDotts();

        const fullUrl = useFullUrl();
        const importUrl = new URL(fullUrl());

        importUrl.pathname = "/import";
        importUrl.searchParams.set(IMPORT_PARAM, base64);

        return importUrl.toString();
    });

    return (
        <div class="w-full max-w-2xl space-y-8">
            <h1 class="text-center text-4xl font-bold">
                Export Your Custom Dotts
            </h1>
            <Card>
                <div class="space-y-3">
                    <p>
                        Copy this url and paste it in the browser's address bar
                        to import your custom dotts.
                    </p>
                    <CopyInput value={url()} />
                </div>
            </Card>
            <CustomDottList />
        </div>
    );
}
