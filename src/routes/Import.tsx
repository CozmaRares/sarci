import { IMPORT_PARAM } from "@/lib/constants";
import { importDotts } from "@/lib/localStorage";
import { useLocation, useNavigate } from "@solidjs/router";

export default function Import() {
    const location = useLocation();
    const navigate = useNavigate();

    const importData = location.query[IMPORT_PARAM] as string | undefined;

    if (importData) {
        importDotts(importData);
    }

    navigate("/");
    return null;
}
