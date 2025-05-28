import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import React from "react";

type GrpcUiMessageData = {
  type: "grpcui-ready" | "grpc-is-ready";
};

export default function PlaygroundRunner() {
  const { query } = useRouter();
  const [grpcUiIsReady, setGrpcUiIsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const service = query.service as string | undefined;
  const method = query.method as string | undefined;

  // On Component Initialize
  useEffect(() => {
    function onMessage(e: MessageEvent<GrpcUiMessageData>) {
      if (e.data.type === "grpcui-ready") {
        setGrpcUiIsReady(true);
        clearInterval(intervalId);
      }
    }
    window.addEventListener("message", onMessage);

    // Send a message to the iframe to check if it's ready
    const intervalId = setInterval(() => {
      if (grpcUiIsReady) return;
      iframeRef.current?.contentWindow?.postMessage(
        { type: "grpc-is-ready" } as GrpcUiMessageData,
        window.location.origin
      );
    }, 100);

    // Cleanup
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!grpcUiIsReady || service == undefined || method == undefined) return;

    const iframeContentWindow = iframeRef.current?.contentWindow;
    if (!iframeContentWindow) return;

    iframeContentWindow.postMessage(
      { type: "grpc-select", service, method },
      window.location.origin
    );
    // Remove the loading UI
  }, [grpcUiIsReady, service, method]);

  useEffect(() => {
    if (grpcUiIsReady) {
      setLoaded(true);
    }
  }, [grpcUiIsReady]);

  return (
    <div className="relative h-[160vh] rounded-lg overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-white dark:bg-[#111111] pt-6">
          <div className="flex flex-col gap-4">
            <div className="w-[400px] h-10 animate-pulse rounded-full bg-[#1F2929]" />
            <div className="w-[400px] h-10 animate-pulse rounded-full bg-[#1F2929]" />
            <div className="w-full h-56 rounded-xl animate-pulse rounded-2xl bg-[#1F2929]" />
          </div>
          <div className="mt-4">
            <div className="flex gap-2">
              <div className="bg-[#1F2929] w-20 h-7 rounded-full animate-pulse" />
              <div className="bg-[#1F2929] w-20 h-7 rounded-full animate-pulse" />
              <div className="bg-[#1F2929] w-20 h-7 rounded-full animate-pulse" />
              <div className="bg-[#1F2929] w-20 h-7 rounded-full animate-pulse" />
            </div>
            <div className="bg-[#1F2929] w-full h-[147px] rounded-2xl animate-pulse mt-2" />
            <div className="bg-[#1F2929] w-full h-[200px] rounded-2xl animate-pulse mt-10" />
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src="/grpcui/"
        title={`gRPC Playground — ${service ?? "-"}.${method ?? "-"}`}
        className="w-full h-full border-0"
      />
    </div>
  );
}
