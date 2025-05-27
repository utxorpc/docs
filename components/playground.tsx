import { useState, useRef, useEffect } from 'react'
import { useRouter }       from 'next/router'

export default function PlaygroundRunner() {
  const { query, isReady } = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [ready,  setReady]  = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const service = query.service as string | undefined
  const method  = query.method  as string | undefined

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (
        e.origin === window.location.origin &&
        e.data?.type === 'grpcui-ready'
      ) {
        console.log('[host] iframe says READY')
        setReady(true)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  useEffect(() => {
    if (!isReady || !ready || !service || !method) return
    const win = iframeRef.current?.contentWindow
    if (!win) return

    console.log('[host] sending grpc-select', service, method)
    win.postMessage(
      { type: 'grpc-select', service, method },
      window.location.origin
    )
  }, [isReady, ready, service, method])


  useEffect(() => {
    setLoaded(false)
  }, [service, method])

  if (!isReady) return null

  return (
    <div className="relative h-[80vh] rounded-lg overflow-hidden mt-16">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-200 dark:border-gray-700" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src="/grpcui/"
        title={`gRPC Playground — ${service}.${method}`}
        className="w-full h-full border-0"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}