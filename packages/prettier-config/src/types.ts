import type { Config } from "prettier";

export type Override = NonNullable<Config["overrides"]>[number];
