import { buildFeature } from "adminjs";
import { Components } from "./component_loader.js";
import { MultipartFile } from "@adonisjs/core/bodyparser";

export const attachmentsFeature = (...attachments: string[]) =>
  buildFeature({
    properties: Object.fromEntries(
      attachments.map((attachment) => [
        attachment,
        {
          components: {
            edit: Components.Attachments,
            show: Components.Attachments,
            list: Components.Attachments,
            filter: Components.Attachments,
          },
        },
      ]),
    ),
    actions: {
      edit: {
        before: async (request, _) => {
          if (request.payload === undefined) return request;

          for (const attachment of attachments) {
            if (request.payload[attachment] instanceof MultipartFile) {
              // TODO
            } else if (request.payload[attachment] !== null) {
              delete request.payload[attachment];
            }
          }

          return request;
        },
      },
    },
  });
