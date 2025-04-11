import { owningRelationFeature } from "../relations.js";
import { createResource } from "../resource.js";
import RepresentativeProfile from "#models/representative_profile";
import CompanyRepresentativeSetPasswordEmail from "#listeners/company_representative_set_password_email";
import CompanyRepresentativeSetPassword from "#events/company_representative_set_password";
import User from "#models/user";
import db from "@adonisjs/lucid/services/db";
import crypto from "node:crypto";
import hash from "@adonisjs/core/services/hash";
import type { ActionContext, ActionRequest, ActionResponse } from "adminjs";
import { DateTime } from "luxon";

const RepresentativeProfileResource = createResource({
  model: RepresentativeProfile,
  options: {
    properties: {
      companyId: {
        reference: "companies",
      },
    },
    actions: {
      new: {
        after: async (response: ActionResponse, _request: ActionRequest, context: ActionContext) => {
          const newProfile = context.record?.params

          if(!newProfile) return

          await db.transaction(async (trx) => {
            const user = await User.create(
              {
                email: newProfile.email,
                emailVerifiedAt: DateTime.now(),
              },
              { client: trx },
            );

            const rawPassword = crypto.randomBytes(12).toString("hex"); // 24-character random password
            const password = await hash.make(rawPassword);

            await user
              .related("accounts")
              .create({ id: `credentials:${newProfile.email}`, password });

            user.useTransaction(trx).representativeProfileId = newProfile.id;
            await user.save();

            return user;
          });

          const listener = new CompanyRepresentativeSetPasswordEmail();
          await listener.handle(new CompanyRepresentativeSetPassword(newProfile.email));

          return response;
        },
      },
    },
  },
  features: [
    owningRelationFeature({
      users: {
        type: "one-to-many",
        target: {
          resourceId: "users",
          joinKey: "representativeProfileId",
        },
      },
    }),
  ],
});

export default RepresentativeProfileResource;
