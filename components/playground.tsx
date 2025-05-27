import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
// import { read } from "fs";

export default function PlaygroundRunner() {
  const { query, isReady } = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const service = query.service as string | undefined;
  const method = query.method as string | undefined;

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (
        e.origin === window.location.origin &&
        e.data?.type === "grpcui-ready"
      ) {
        console.log("[host] iframe says READY");
        setReady(true);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!isReady || !ready || !service || !method) return;
    const win = iframeRef.current?.contentWindow;
    if (!win) return;

    console.log("[host] sending grpc-select", service, method);
    win.postMessage(
      { type: "grpc-select", service, method },
      window.location.origin
    );
  }, [isReady, ready, service, method]);

  useEffect(() => {
    if (!isReady || !ready) {
      setLoaded(false);
    }
  }, [isReady, ready]);

  if (!isReady) return null;

  return (
    <div className="relative h-[160vh] rounded-lg overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-white dark:bg-[#111111] pt-6">
          <div className="flex flex-col gap-4">
            <div className="w-[400px] h-10 animate-pulse rounded-full bg-[#1F2929]"/>
            <div className="w-[400px] h-10 animate-pulse rounded-full bg-[#1F2929]"/>
            <div className="w-full h-56 rounded-xl animate-pulse rounded-2xl bg-[#1F2929]"/>
          </div>
          <div className="mt-4">
            <div className="flex gap-2">
              <div className="bg-[#1F2929] w-20 h-7 rounded-full animate-pulse"/>
              <div className="bg-[#1F2929] w-20 h-7 rounded-full animate-pulse"/>
              <div className="bg-[#1F2929] w-20 h-7 rounded-full animate-pulse"/>
              <div className="bg-[#1F2929] w-20 h-7 rounded-full animate-pulse"/>
            </div>
            <div className="bg-[#1F2929] w-full h-[147px] rounded-2xl animate-pulse mt-2"/>
            <div className="bg-[#1F2929] w-full h-[200px] rounded-2xl animate-pulse mt-10"/>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src="/grpcui/"
        title={`gRPC Playground — ${service}.${method}`}
        className="w-full h-full border-0"
        onLoad={() => {
          console.log("[host] iframe loaded");
          if (ready) {
            setLoaded(true);
          }
        }}
      />
    </div>
  );
}
