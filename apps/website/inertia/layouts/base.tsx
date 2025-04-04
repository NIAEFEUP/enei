import { Head } from "@inertiajs/react";
import DecorativeBars from "~/components/common/decorative_bars";
import { Navbar } from "~/components/common/navbar";
import { Toaster } from "@enei/shadcn/ui/sonner";
import { cn } from "@enei/shadcn/cn";

type Props = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  barColor?: string;
};

export default function BaseLayout({ title, children, className, barColor }: Props) {
  const shouldShowBars = className?.includes("with-decorative-bars");

  return (
    <div className="bg-enei-blue relative flex min-h-dvh w-full flex-col scroll-smooth">
      <Head title={title} />
      <Navbar className="sticky top-0 z-20" variant="beige" />
      {shouldShowBars && <DecorativeBars barColor={barColor} />}
      <div className={cn("flex-1", className)}>
        {children}
        <Toaster />
      </div>
    </div>
  );
}
