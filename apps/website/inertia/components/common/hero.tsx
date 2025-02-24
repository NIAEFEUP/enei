import React from "react";
import { cn } from "~/lib/utils";

export default function Hero({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex-non relative h-screen overflow-y-clip", className)}>{children}</div>
  );
}
