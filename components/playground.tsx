import { useState } from "react"
import { useRouter } from "next/router"

export default function PlaygroundRunner(props: {}) {
  const { query, isReady } = useRouter()
  const [loaded, setLoaded] = useState(false)

  if (!isReady) return null

  const service = query.service as string
  const method  = query.method  as string
  const src     = service && method
    ? `/grpcui?service=${encodeURIComponent(service)}&method=${encodeURIComponent(method)}`
    : "/grpcui"

  return (
    <div className="relative h-[80vh] rounded-lg overflow-hidden mt-16">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-200 dark:border-gray-700"></div>
        </div>
      )}
      <iframe
        src={src}
        title={`gRPC Playground — ${service}.${method}`}
        className="w-full h-full border-0"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
