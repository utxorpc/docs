import React, { PropsWithChildren } from "react";

export function Card(props: { title: string; description: string }) {
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

export function CardGrid(props: PropsWithChildren<{}>) {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10">
        {props.children}
      </div>
    </div>
  );
}

export function SectionHeader(props: { title: string; subtitle?: string }) {
  return (
    <div className="w-full text-center">
      <h4 className="text-3xl font-semibold dark:text-gray-300">
        {props.title}
      </h4>
      {!!props.subtitle && (
        <h4 className="text-xl dark:text-gray-500">{props.subtitle}</h4>
      )}
    </div>
  );
}

export function SDKCard(props: {
  title: string;
  iconSrc: string;
  href: string;
}) {
  return (
    <a href={props.href}>
      <div className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700">
        <div className="flex justify-center items-center w-24 h-24 mx-auto">
          <img src={props.iconSrc} className="max-h-20" />
        </div>

        <div className="mt-3">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            {props.title}
          </h3>
        </div>
      </div>
    </a>
  );
}
