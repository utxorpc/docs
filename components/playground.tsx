import { useRouter } from "next/router"

export default function PlaygroundRunner(props: {}) {
    const { query, isReady } = useRouter();

    if (!isReady) return null;

    const service = query.service as string;
    const method = query.method as string;

    const src = service && method ? `/grpcui?service=${encodeURIComponent(service)}&method=${encodeURIComponent(method)}` : '/grpcui';

    return (
        <div className="w-[45vw] lg:!w-[672px]" style={{ height: '120vh', borderRadius: '0.75rem', overflow: 'hidden', marginTop: '0px' }}>
            <iframe
                src={src}
                title={`gRPC Playground — ${service}.${method}`}
                className="w-full h-[80vh] border-0"
            />
        </div>
    );
}