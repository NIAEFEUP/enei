import React from "react";
import { cn } from "~/lib/utils";

export default function Hero({ className, children }: { className?: string, children?: React.ReactNode }) {
    return (
        <div className={cn("h-screen overflow-y-clip relative flex-non", className)}>
            {children}
        </div>
    )
}