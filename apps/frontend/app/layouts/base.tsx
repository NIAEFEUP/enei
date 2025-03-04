import { Head } from "@inertiajs/react";
import { Navbar } from "#components/common/navbar";
import { Toaster } from "@enei/shadcn/ui/toaster";
import { cn } from "@enei/react-utils/cn";

type Props = { title: string; children?: React.ReactNode; className?: string };

export default function BaseLayout({ title, children, className }: Props) {
  return (
    <div className="bg-enei-blue relative flex min-h-dvh w-full flex-col scroll-smooth">
      <Head title={title} />
      <Navbar className="sticky top-0 z-20" />
      <div className={cn("flex-1", className)}>
        {children}
        <Toaster />
      </div>
    </div>
  );
}
