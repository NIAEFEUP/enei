import React, { ReactElement } from "react";
import { Head } from "@inertiajs/react";

type Props = {
  title: string;
  children: ReactElement[];
  className: string;
};

export default function AppLayout(
  { title, children, className }: Props,
) {
  return (
    <>
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }`}
      </style>
      <div className="min-h-screen flex flex-col">
        <Head title={title} />
        <div className="sticky left-0 right-0 top-0 z-30">
          // Navbar
        </div>
        <div className={"flex-1" + " " + className}>
          {children}
          <slot />
        </div>
      </div>
    </>
  );
}
