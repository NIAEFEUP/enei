import type { SharedProps } from "@adonisjs/inertia/types";
import { usePage } from "@inertiajs/react";
import { useMemo } from "react";

export function useBaseUrl<T>(mapper: (baseUrl: SharedProps["baseUrl"]) => T) {
  const { baseUrl } = usePage<SharedProps>().props;
  return useMemo(() => mapper(baseUrl), [baseUrl]);
}
