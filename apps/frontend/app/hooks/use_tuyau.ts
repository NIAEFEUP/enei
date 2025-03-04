import { useTuyau as $useTuyau } from "@tuyau/inertia/react";
import type { TuyauClient } from "#providers/tuyau";

export function useTuyau() {
  return $useTuyau() as TuyauClient;
}
