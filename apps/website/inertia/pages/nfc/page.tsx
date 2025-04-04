import { useEffect, useRef, useState } from "react";
import { cn } from "@enei/shadcn/cn";

type NfcSupport =
  | {
      status: "waiting" | "loading" | "success";
    }
  | {
      status: "error";
      error: string;
    };

async function determineNfcSupport(): Promise<NfcSupport> {
  if ("NDEFReader" in window) {
    const NDEFReader = window.NDEFReader as any;

    const reader = new NDEFReader();
    return reader
      .scan()
      .then(() => ({ status: "success" }) satisfies NfcSupport)
      .catch((error: unknown) => ({ status: "error", error: `${error}` }) satisfies NfcSupport);
  } else {
    return { status: "error", error: "NDEFReader not supported" };
  }
}

export default function NfcSupportPage() {
  const [support, setSupport] = useState<NfcSupport>({ status: "waiting" });
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  async function handleClick() {
    const nfcSupport = await determineNfcSupport();
    if (!mounted.current) {
      return;
    }

    setSupport(nfcSupport);
  }

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
          {support.status === "waiting"
            && "Click the button below and accept the permission request"}
          {support.status === "loading" && "Checking..."}
          {support.status === "success" && "NFC is supported on this device"}
          {support.status === "error" && "NFC is not supported on this device"}
        </p>
        {support.status === "waiting" && (
          <button
            className="mt-10 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
            onClick={handleClick}
          >
            Check NFC support
          </button>
        )}
        {support.status === "error" && <p className="mt-10 font-light">Reason: {support.error}</p>}
      </div>
    </div>
  );
}
