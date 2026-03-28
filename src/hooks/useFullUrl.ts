import { useLocation } from "@solidjs/router";
import { createMemo } from "solid-js";

export function useFullUrl() {
    const location = useLocation();

    return createMemo(() => {
        return (
            window.location.origin +
            location.pathname +
            location.search +
            location.hash
        );
    });
}
