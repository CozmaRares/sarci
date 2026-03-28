import { lazy } from "solid-js";
import { redirect } from "./lib/redirect";
import { QUERY_PARAM } from "./lib/constants";

const Router = lazy(() => import("./routes/Router"));

export default function App() {
    const currentLocation = new URL(window.location.href);

    let query = currentLocation.searchParams.get(QUERY_PARAM)?.trim();
    if (query) {
        redirect(query);
        return null;
    }

    return <Router />;
}
