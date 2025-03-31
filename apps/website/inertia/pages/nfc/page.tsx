import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

type NfcSupport =
  | {
      status: "loading" | "success";
    }
  | {
      status: "error";
      error: string;
    };

export default function NfcSupportPage() {
  const [support, setSupport] = useState<NfcSupport>({ status: "loading" });
  const mounted = useRef(true);

  useEffect(() => {
    if ("NDEFReader" in window) {
      const NDEFReader = window.NDEFReader as any;

      const reader = new NDEFReader();
      reader
        .scan()
        .then(() => ({ status: "success" }) satisfies NfcSupport)
        .catch((error: unknown) => ({ status: "error", error: `${error}` }) satisfies NfcSupport)
        .then((detectedSupport: NfcSupport) => {
          if (mounted.current) {
            setSupport(detectedSupport);
          }
        });
    } else {
      setSupport({ status: "error", error: "NDEFReader not supported" });
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <div
      className={cn("flex h-screen items-center justify-center", {
        "bg-yellow-400": support.status === "loading",
        "bg-red-400": support.status === "error",
        "bg-green-400": support.status === "success",
      })}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold">NFC</h1>
        <p className="text-xl">
          {support.status === "loading" && "Checking..."}
          {support.status === "success" && "NFC is supported on this device"}
          {support.status === "error" && "NFC is not supported on this device"}
        </p>
        {support.status === "error" && <p className="mt-10 font-light">Reason: {support.error}</p>}
      </div>
    </div>
  );
}
