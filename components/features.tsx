import React from "react";

function Card(props: { title: string; description: string }) {
  return (
    <div className="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-gray-800">
      <div className="flex items-center gap-x-4 mb-3">
        <div className="flex-shrink-0">
          <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
            {props.title}
          </h3>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{props.description}</p>
    </div>
  );
}

export function Features(props: {}) {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10">
        <Card
          title="Specification"
          description="A comment set of contracts, agnostic of any particular API provider or client tooling. A strict versioning system to deal with breaking changes."
        />
        <Card
          title="SDKs"
          description="A rich set SDKs for many mainstream languages such as Go, Rust, Python, JS, C++ and more, lowering the entry barrier for devs of any ecosystem."
        />
        <Card
          title="Documentation"
          description="Extensive documentation of all interfaces and structures to streamline the integration process."
        />
        <Card
          title="Performance"
          description="A serialized binary format which is compact and efficient, resulting in smaller message sizes and reduced network overhead compared to its JSON counterpart"
        />
        <Card
          title="Event-Driven"
          description="An interface that embraces the asynchronous nature of blockchains by leveraging event-driven integration patterns."
        />
        <Card
          title="Proto3"
          description="A versatile IDL that facilitates reliable communication between systems while promoting cross-language compatibility and ease of use."
        />
        <Card
          title="Interoperability"
          description="A common interface simplifies integrations between parties and avoids the common pitfall of vendor lock-in."
        />
        <Card
          title="Open Governance"
          description="A Technical Steering Committee (TSC) defined by the level of involvement in the source-code. Maintainers of the code decide how to evolve the protocol."
        />
      </div>
    </div>
  );
}
