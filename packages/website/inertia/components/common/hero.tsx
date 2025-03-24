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
    <div className={cn("relative h-screen flex-none overflow-y-clip", className)}>{children}</div>
  );
}
