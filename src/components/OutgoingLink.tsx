import ExternalLink from "lucide-solid/icons/external-link";

type Props = {
    href: string;
    children: string;
};

export default function OutgoingLink({ href, children }: Props) {
    return (
        <a
            href={href}
            class="text-accent inline-flex flex-row items-center underline"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
            <ExternalLink class="ml-1 size-4" />
        </a>
    );
}
