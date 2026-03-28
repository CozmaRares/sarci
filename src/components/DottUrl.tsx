type Props = {
    url: string;
};

export default function DottUrl({ url }: Props) {
    const parts = url.split("%s");

    if (parts.length === 1) return parts[0];

    const [url1, url2] = parts;

    return (
        <>
            {url1}
            <span class="text-accent font-bold">%s</span>
            {url2}
        </>
    );
}
