import { lazy } from "#lib/lazy.js";
import type { LucidModel, LucidRow } from "@adonisjs/lucid/types/model";
import type {
  ExtractModelRelations,
  HasMany,
  HasManyThrough,
  HasOne,
  ManyToMany,
  ModelRelationTypes,
} from "@adonisjs/lucid/types/relations";
import type { ErrorMessage, FromEntries, PickByType, Simplify } from "../../types/utils.js";
import type { OptionalBelongsTo, RequiredBelongsTo } from "./decorators.js";
import * as is from "@sindresorhus/is";

type RelationLoaderThisType<ParentModel extends LucidModel> = {
  readonly "~row": InstanceType<ParentModel>;
};

type RelationLoader<ParentModel extends LucidModel, Return> = (
  this: RelationLoaderThisType<ParentModel>,
) => Promise<Return>;

type DefineRelationships<ParentModel extends LucidModel> = {
  belongsTo: <Name extends ExtractRelations<ParentModel, OptionalBelongsTo<LucidModel>>>(
    relationName: Name,
  ) => [Name, RelationLoader<ParentModel, InstanceType<ParentModel>[Name] | null>];

  requiredBelongsTo: <Name extends ExtractRelations<ParentModel, RequiredBelongsTo<LucidModel>>>(
    relationName: Name,
  ) => [Name, RelationLoader<ParentModel, InstanceType<ParentModel>[Name]>];

  hasOne: <Name extends ExtractRelations<ParentModel, HasOne<LucidModel>>>(
    relationName: Name,
  ) => [Name, RelationLoader<ParentModel, InstanceType<ParentModel>[Name] | null>];

  many: <
    Name extends ExtractRelations<
      ParentModel,
      HasMany<LucidModel> | HasManyThrough<LucidModel> | ManyToMany<LucidModel>
    >,
  >(
    relationName: Name,
  ) => [Name, RelationLoader<ParentModel, InstanceType<ParentModel>[Name]>];
};

type InstanceOf<ParentModel extends LucidModel> = Pick<
  InstanceType<ParentModel>,
  keyof LucidRow | Exclude<keyof InstanceType<ParentModel>, `$${string}`>
>;

type ExtractRelations<
  ParentModel extends LucidModel,
  RelationType extends ModelRelationTypes = ModelRelationTypes,
> = string
  & ExtractModelRelations<InstanceOf<ParentModel>>
  & keyof PickByType<InstanceOf<ParentModel>, RelationType>;

type ExtractMissingRelations<
  ParentModel extends LucidModel,
  Definitions extends [ExtractRelations<ParentModel>, RelationLoader<ParentModel, unknown>][],
> = Exclude<
  ExtractRelations<ParentModel>,
  Definitions extends never[] ? never : Definitions extends [infer Keys, unknown][] ? Keys : never
>;

export function relations<
  ParentModel extends LucidModel,
  const Definitions extends [
    ExtractRelations<ParentModel>,
    RelationLoader<ParentModel, unknown>,
  ][] = never,
>(
  model: ParentModel,
  callback: (
    factories: DefineRelationships<ParentModel>,
  ) => ExtractMissingRelations<ParentModel, Definitions> extends never
    ? Definitions
    : ErrorMessage<`Relation for '${ExtractMissingRelations<ParentModel, Definitions>}' is missing`>,
) {
  const define: DefineRelationships<ParentModel> = {
    belongsTo(relationName) {
      const contract = model.$relationsDefinitions.get(relationName);

      if (contract?.type !== "belongsTo") {
        throw new Error(`Relation '${relationName}' is not a belongsTo`);
      }

      const foreignKey = lazy(() => {
        const namingStrategy = contract.model.namingStrategy;
        return namingStrategy.relationForeignKey(
          "belongsTo",
          contract.model,
          contract.relatedModel(),
          relationName,
        ) as keyof InstanceOf<ParentModel>;
      });

      return [
        relationName,
        async function belongsToLoader(this: RelationLoaderThisType<ParentModel>) {
          if (is.isNullOrUndefined(this["~row"][relationName])) {
            const fk = foreignKey.get();

            if (is.isNullOrUndefined(fk)) {
              return null;
            }

            await this["~row"].loadOnce(relationName);
          }

          return this["~row"][relationName];
        },
      ] as const;
    },

    requiredBelongsTo(relationName) {
      const contract = model.$relationsDefinitions.get(relationName);

      if (contract?.type !== "belongsTo") {
        throw new Error(`Relation '${relationName}' is not a belongsTo`);
      }

      return [
        relationName,
        async function requiredBelongsToLoader(this: RelationLoaderThisType<ParentModel>) {
          if (is.isNullOrUndefined(this["~row"][relationName])) {
            await this["~row"].loadOnce(relationName);
          }

          return this["~row"][relationName];
        },
      ] as const;
    },

    hasOne(relationName) {
      const contract = model.$relationsDefinitions.get(relationName);

      if (contract?.type !== "belongsTo") {
        throw new Error(`Relation '${relationName}' is not a hasOne`);
      }

      return [
        relationName,
        async function hasOneLoader(this: RelationLoaderThisType<ParentModel>) {
          if (is.isNullOrUndefined(this["~row"][relationName])) {
            await this["~row"].loadOnce(relationName);

            if (is.isNullOrUndefined(this["~row"][relationName])) {
              return null;
            }
          }

          return this["~row"][relationName];
        },
      ] as const;
    },

    many(relationName) {
      const contract = model.$relationsDefinitions.get(relationName);

      switch (contract?.type) {
        case "hasMany":
        case "manyToMany":
        case "hasManyThrough":
          break;

        default:
          throw new Error(`Relation '${relationName}' is not a many-type relation`);
      }

      return [
        relationName,
        async function manyLoader(this: RelationLoaderThisType<ParentModel>) {
          if (is.isNullOrUndefined(this["~row"][relationName])) {
            await this["~row"].loadOnce(relationName);
          }

          return this["~row"][relationName];
        },
      ] as const;
    },
  };

  type NormalizeRelations<T extends ReturnType<typeof callback>> = Exclude<T, ErrorMessage<string>>;
  function normalizeRelations<T extends ReturnType<typeof callback>>(
    definitions: T,
  ): NormalizeRelations<T> {
    return definitions as NormalizeRelations<T>;
  }

  function createPrototype<T extends NormalizeRelations<ReturnType<typeof callback>>>(entries: T) {
    const prototype = Object.create(null);

    for (const [key, value] of entries) {
      Object.defineProperty(prototype, key, {
        value,
        writable: true,
      });
    }

    return prototype as Simplify<FromEntries<T>>;
  }

  model.boot();

  const entries = normalizeRelations(callback(define));
  const prototype = createPrototype(entries);

  return {
    for(row: InstanceType<ParentModel>) {
      return Object.create(prototype, {
        "~row": {
          value: row,
          writable: true,
        },
      }) as typeof prototype & RelationLoaderThisType<ParentModel>;
    },
  };
}
