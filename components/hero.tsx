import React from "react";

export function Hero(props: {}) {
  return (
    <div className="p-20">
      <div className="mt-5 max-w-3xl text-center mx-auto">
        <h1 className="block font-bold text-gray-800 text-5xl md:text-6xl lg:text-7xl dark:text-gray-200">
          A gRPC interface for{" "}
          <span className="bg-clip-text bg-gradient-to-tl from-emerald-300 to-cyan-300 text-transparent">
            UTxO
          </span>{" "}
          Blockchains
        </h1>
      </div>

      <div className="mt-5 max-w-3xl text-center mx-auto">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Interact with UTxO-based blockchains using a shared specification with
          focus on developer experience and performance.
        </p>
      </div>

      <div className="mt-8 grid gap-3 w-full sm:inline-flex sm:justify-center">
        <a
          className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl hover:from-emerald-300 hover:to-cyan-500 from-emerald-600 to-cyan-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800"
          href="/introduction"
        >
          Documentation
          <svg
            className="w-3 h-3"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
