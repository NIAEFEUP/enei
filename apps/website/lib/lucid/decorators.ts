import env from "#start/env";
import { column } from "@adonisjs/lucid/orm";
import type { ColumnOptions } from "@adonisjs/lucid/types/model";

const isPostgres = env.get("DB_CONNECTION") === "postgres";

export function json(options?: Partial<ColumnOptions>) {
  return column({
    ...options,
    prepare: (value) => JSON.stringify(value),
    consume: (value) => {
      if (isPostgres) return value;
      return JSON.parse(value);
    },
  });
}
