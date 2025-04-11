import type { EqualsOrNever, FlattenUnion } from "#lib/types.js";
import type { LucidRow, ModelAttributes } from "@adonisjs/lucid/types/model";

export type CreateReadonlyModel<
  T extends LucidRow,
  Overrides extends Partial<ModelAttributes<T>> = {},
> = Readonly<
  EqualsOrNever<ModelAttributes<T>, FlattenUnion<ModelAttributes<T> & Overrides>> extends never
    ? never
    : ModelAttributes<T> & Overrides & (
      T extends { readonly $relations: infer Relations }
        ? { readonly $relations: Relations }
        : never
    )
>;
