import { Money } from "#lib/payments/money.js";
import env from "#start/env";
import { column, belongsTo as $belongsTo } from "@adonisjs/lucid/orm";
import type { ColumnOptions, LucidModel, TypedDecorator } from "@adonisjs/lucid/types/model";
import type { BelongsTo, HasOne, RelationOptions } from "@adonisjs/lucid/types/relations";

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
    serialize: (val: Money) => val.toEuros(),
    prepare: (val: Money) => val.toCents(),
    consume: (cents: number) => Money.fromCents(cents),
  });
}

type WithMeta<Obj, Meta> = Omit<Obj, "meta">
  & (undefined extends Meta ? { meta?: undefined } : { meta: Meta });

type BelongsToOptionsWithMeta<
  RelatedModel extends LucidModel,
  Meta extends BelongsToMeta | undefined,
> = WithMeta<RelationOptions<RelatedModel, LucidModel, HasOne<RelatedModel, LucidModel>>, Meta>;

type BelongsToWithMeta<
  RelatedModel extends LucidModel,
  Meta extends BelongsToMeta | undefined,
> = WithMeta<BelongsTo<RelatedModel>, Meta>;

type BelongsToMeta = { required?: true };

export type OptionalBelongsTo<RelatedModel extends LucidModel> = BelongsToWithMeta<
  RelatedModel,
  undefined
>;
export type RequiredBelongsTo<RelatedModel extends LucidModel> = BelongsToWithMeta<
  RelatedModel,
  { required: true }
>;

export function belongsTo<
  RelatedModel extends LucidModel,
  Meta extends BelongsToMeta | undefined = undefined,
>(model: () => RelatedModel, options?: BelongsToOptionsWithMeta<RelatedModel, Meta>) {
  return $belongsTo(model, options) as TypedDecorator<BelongsToWithMeta<RelatedModel, Meta>>;
}
