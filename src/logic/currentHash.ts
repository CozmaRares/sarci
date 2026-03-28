import { createSignal } from "solid-js";

const [currentHash, setCurrentHash] = createSignal(window.location.hash);

export default currentHash;

const handleHashChange = () => {
    setCurrentHash(window.location.hash);
};

window.addEventListener("hashchange", handleHashChange);
