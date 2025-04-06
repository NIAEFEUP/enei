import React from "react";
import { cn } from "~/lib/utils";

type CustomTabsListProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
};

const CustomTabsList = ({
  className,
  children,
  orientation = "horizontal",
}: CustomTabsListProps) => (
  <ul
    className={cn(
      "bg-muted text-muted-foreground inline-flex h-fit items-center justify-center rounded-lg p-2",
      orientation === "vertical" && "flex-col", // If you want to dynamically change orientation, use className. e.g. "lg:flex-col"
      className,
    )}
  >
    {children}
  </ul>
);

type CustomTabTriggerProps = {
  className?: string;
  active: boolean;
  children: React.ReactNode;
};

const CustomTabTrigger = ({ className, active = false, children }: CustomTabTriggerProps) => (
  <li
    data-state={active ? "active" : "inactive"}
    aria-selected={active}
    className={cn(
      "ring-offset-background data-[state=active]:bg-enei-blue flex h-[60px] w-full cursor-pointer items-center whitespace-nowrap rounded-md px-3 py-1 text-3xl transition-all data-[state=active]:text-white",
      className,
    )}
  >
    {children}
  </li>
);

export { CustomTabsList, CustomTabTrigger };
