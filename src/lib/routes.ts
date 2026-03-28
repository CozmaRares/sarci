import { lazy } from "solid-js";

export const routes = [
    {
        path: "/",
        component: lazy(() => import("@/routes/Home")),
    },
    {
        path: "/dotts",
        component: lazy(() => import("@/routes/Dotts")),
    },
    {
        path: "/custom",
        component: lazy(() => import("@/routes/Custom")),
    },
    {
        path: "/export",
        component: lazy(() => import("@/routes/Export")),
    },
    {
        path: "/import",
        component: lazy(() => import("@/routes/Import")),
    },
] as const;
