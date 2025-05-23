import { useRouter } from "next/router"

export default function PlaygroundRunner(props: {}) {
    const { query, isReady } = useRouter();
    if (!isReady) return null;

    const service = query.service as string;
    const method = query.method as string;

    if (!service || !method) return null;

    const src = `/grpcui?service=${encodeURIComponent(service)}&method=${encodeURIComponent(method)}`;

    return (
        <iframe
            src={src}
            title={`gRPC Playground — ${service}.${method}`}
            className="w-full h-[80vh] border-0"
        />
    )
}