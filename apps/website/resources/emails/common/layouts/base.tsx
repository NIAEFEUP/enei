import { Html } from "@react-email/components";
import { Tailwind } from "../tailwind.js";
import { cn } from "@enei/shadcn/cn";

export const BaseLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Tailwind>
      <Html className={cn("mt-[16px] font-sans", className)}>{children}</Html>
    </Tailwind>
  );
};
