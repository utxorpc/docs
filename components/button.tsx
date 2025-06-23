import Link from "next/link";
import React from "react";

export function Button(props: { service: string; method: string }) {
    return (
        <div className="inline-flex ml-4 self-end">
            <Link
                href={{
                    pathname: "/playground",
                    query: { service: props.service, method: props.method },
                }}
                className="inline-flex items-center text-center gap-2 bg-[#00696D] hover:bg-[#27A0A1] active:bg-[#004C4E] transition-bg duration-150 text-white text-sm font-medium rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 py-1.5 px-2"
            >

                Try it out
                <svg
                    className="w-3 h-3"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 
               10.9257 8.35355L5.27921 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </Link>
        </div>
    );
}
