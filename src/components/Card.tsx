import type { JSX } from "solid-js";

type Props = {
    children: JSX.Element;
    padding?: `p-${number}`;
    class?: string;
};

export default function Card(props: Props) {
    const padding = props.padding ?? "p-4";

    return (
        <div class={`card rounded-lg shadow-sm ${padding} ${props.class}`}>
            {props.children}
        </div>
    );
}
