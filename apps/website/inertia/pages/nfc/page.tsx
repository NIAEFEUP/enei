import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

export default function NfcSupportPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const mounted = useRef(false);

  useEffect(() => {
    if ("NDEFReader" in window) {
      const NDEFReader = window.NDEFReader as any;

      const reader = new NDEFReader();
      reader
        .scan()
        .then(() => true)
        .catch(() => false)
        .then((supports: boolean) => {
          if (mounted.current) {
            setStatus(supports ? "success" : "error");
          }
        });
    } else {
      setStatus("error");
    }

    return () => {
      mounted.current = false;
    };
  });

  return (
    <div
      className={cn("flex h-screen items-center justify-center", {
        "bg-yellow-500": status === "loading",
        "bg-red-500": status === "error",
        "bg-green-500": status === "success",
      })}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold">NFC</h1>
        <p className="text-xl">NFC support</p>
      </div>
    </div>
  );
}
