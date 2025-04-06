import type { AuthenticationData } from "#config/inertia";
import type { SharedProps } from "@adonisjs/inertia/types";
import { usePage } from "@inertiajs/react";
import { useMemo } from "react";

type UseAuthProps = {
  only?: AuthenticationData["state"][];
};

type UseAuthResult<Props extends UseAuthProps> = Props["only"] extends (infer Only extends
  AuthenticationData["state"])[]
  ? AuthenticationData & { state: Only }
  : AuthenticationData;

export function useAuth<Props extends UseAuthProps>(props?: Props) {
  const only = props?.only;

  const auth = usePage<SharedProps>().props.auth;
  const valid = useMemo(() => only?.includes(auth.state) ?? true, [auth, only]);

  if (!valid) throw new Error("Assertion failed: authentication state is not permitted");

  return auth as UseAuthResult<Props>;
}
