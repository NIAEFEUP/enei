import { Head } from "@inertiajs/react";
import React from "react";
import { cn } from "@enei/shadcn/cn";
import { Navbar } from "./navbar";
import { Toaster } from "@enei/shadcn/ui/sonner";
import { useAuth } from "~/hooks/use_auth";
import { Notification } from "../notifications";
import Footer from "./footer";

function PromoterNotification() {
  const auth = useAuth();

  if (auth.state !== "authenticated" || auth.user.role !== "promoter") return null;

  return (
    <Notification>
      <div className="bg-red-500 px-4 shadow-[0_4px_4px_rgba(0_0_0_/_25%)]">
        <p className="text-center font-bold">Conta de Promotor</p>
      </div>
    </Notification>
  );
}

export default function Page({
  title,
  className,
  variant = "blue",
  background,
  children,
}: {
  title: string;
  className?: string;
  variant?: "blue" | "beige";
  background?: "blue" | "beige";
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-background text-foreground flex min-h-dvh w-full flex-col scroll-smooth",
        variant === "blue" ? "attention" : [],
      )}
    >
      <Head title={title} />
      <div className="relative grow pb-32">
        <Navbar className="sticky top-0 z-20 grow-0" />
        <PromoterNotification />
        <div className={className}>{children}</div>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}
