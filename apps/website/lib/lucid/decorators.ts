import { Money } from "#lib/money.js";
import env from "#start/env";
import { column } from "@adonisjs/lucid/orm";
import type { ColumnOptions } from "@adonisjs/lucid/types/model";

const isPostgres = env.get("DB_CONNECTION") === "postgres";

function typed<Target>(options?: Partial<ColumnOptions>) {
  return <K extends string>(target: Record<K, Target>, property: K) => {
    return column(options)(target, property);
  };
}

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

export function money(options?: Partial<ColumnOptions>) {
  return typed<Money>({
    ...options,
    serialize: (val: Money) => val.toCents(),
    consume: (cents: number) => Money.fromCents(cents),
  });
}
