import { api } from "#.adonisjs/api";
import { createTuyau } from "@tuyau/client";
import { TuyauProvider as $TuyauProvider } from "@tuyau/inertia/react";
import { useBaseUrl } from "~/hooks/use_base_url";

export type TuyauClient = ReturnType<typeof useTuyau>;

function useTuyau() {
  const tuyau = useBaseUrl((baseUrl) =>
    createTuyau({
      api,
      baseUrl,
    }),
  );

  return tuyau;
}

export function TuyauProvider({ children }: { children?: React.ReactNode }) {
  const tuyau = useTuyau();
  return <$TuyauProvider client={tuyau}>{children}</$TuyauProvider>;
}
