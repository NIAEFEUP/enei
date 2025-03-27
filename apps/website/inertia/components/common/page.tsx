import { Head } from "@inertiajs/react";
import React from "react";
import { cn } from "~/lib/utils";
import { Navbar } from "./navbar";
import { Toaster } from "~/components/ui/toaster";
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
  children,
  variant = "blue",
}: {
  title: string;
  className?: string;
  variant?: "blue" | "beige";
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-h-dvh w-full flex-col scroll-smooth",
        variant === "blue" ? "bg-enei-blue" : "bg-enei-beige",
      )}
    >
      <Head title={title} />
      <div className="relative flex-grow pb-48 bg-enei-beige">
        <Navbar className="sticky top-0 z-20 grow-0" variant={variant} />
        <PromoterNotification />
        <div className={className}>{children}</div>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}
