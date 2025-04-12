import {
  mergeResourceOptions,
  type Before,
  type FeatureType,
  type ResourceOptions,
  type ResourceWithOptions,
} from "adminjs";
import type { LucidModel } from "@adonisjs/lucid/types/model";
import dbConfig from "#config/database";
import { LucidResource } from "@adminjs/adonis";
import { DateTime } from "luxon";

const beforeEdit: Before = async (request, context) => {
  if (request.payload === undefined) return request;

  for (const property of context.resource.properties()) {
    let type = property.type();

    if (type === "date" || type === "datetime") {
      // @ts-expect-error: This is cringe but it's the only way to use luxon's DateTime
      property.type = () => `_${type}`;
      type = property.type();
    }

    if (
      // @ts-expect-error: See above
      (type === "_date" || type === "_datetime")
      && request.payload[property.path()]
    ) {
        request.payload[property.path()] = DateTime.fromISO(request.payload[property.path()])

      delete request.payload[property.path()];
    }
  }

  return request;
};

export const createResource = ({
  model,
  options,
  features,
}: {
  model: LucidModel;
  options?: ResourceOptions;
  features?: FeatureType[];
}) =>
  ({
    resource: new LucidResource(model, dbConfig.connection),
    features,
    options: mergeResourceOptions(
      {
        actions: {
          edit: {
            before: beforeEdit,
          },
          new: {
            before: beforeEdit,
          },
        },
        properties: {
          createdAt: {
            isVisible: { list: true, filter: true, show: true, edit: false },
            position: 1000,
          },
          updatedAt: {
            isVisible: { list: true, filter: true, show: true, edit: false },
            position: 1001,
          },
        },
      },
      options,
    ),
  }) satisfies ResourceWithOptions;
