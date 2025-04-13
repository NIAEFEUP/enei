import Event from "#models/event";
import UserActivity from "#models/user_activity";
import db from "@adonisjs/lucid/services/db";
import { UserActivityType, type AttendEventDescription } from "../../../types/user_activity.js";
import { owningRelationFeature, targetRelationFeature } from "../relations.js";
import { createResource } from "../resource.js";
import { DateTime } from "luxon";

const EventResource = createResource({
  model: Event,
  options: {
    properties: {
      description: {
        type: "richtext",
      },
      extraInfo: {
        type: "richtext",
      },
      productGroupId: {
        reference: "product_groups",
      },
      participationProductId: {
        reference: "products",
      },
      companyId: {
        reference: "companies",
      },
    },
    actions: {
      checkOut: {
        actionType: "resource",
        component: false,
        variant: "danger",
        guard:
          "Isto vai dar check out a todos os utilizadores que deram check in a quaisquer palestras, cuidado!",
        handler: async (_) => {
          const users = await UserActivity.query()
            .select("user_id")
            .where(db.raw("description->>'exit'"), "false")
            .andWhereIn(
              db.raw("user_id, description->>'timestamp'").wrap("(", ")"),
              UserActivity.query()
                .select("user_id", db.raw("max(description->>'timestamp')"))
                .where("type", UserActivityType.AttendEvent)
                .groupBy("user_id"),
            );

          const timestamp = DateTime.now().toISO();

          const activities = await UserActivity.createMany(
            users.map((user) => ({
              userId: user.userId,
              type: UserActivityType.AttendEvent,
              description: {
                type: UserActivityType.AttendEvent,
                timestamp,
                exit: true,
              } satisfies AttendEventDescription,
            })),
          );

          return {
            notice: { message: `Deste checkout a ${activities.length} utilizadores!` },
          };
        },
      },
    },
  },
  features: [
    targetRelationFeature(),
    owningRelationFeature({
      speakers: {
        type: "many-to-many",
        target: {
          resourceId: "speaker_profiles",
        },
        junction: {
          joinKey: "eventId",
          inverseJoinKey: "speakerProfileId",
          throughResourceId: "event_speakers",
        },
      },
      registeredUsers: {
        type: "many-to-many",
        target: {
          resourceId: "users",
        },
        junction: {
          joinKey: "eventId",
          inverseJoinKey: "userId",
          throughResourceId: "event_users",
        },
      },
      checkedInUsers: {
        type: "many-to-many",
        target: {
          resourceId: "users",
        },
        junction: {
          joinKey: "eventId",
          inverseJoinKey: "userId",
          throughResourceId: "event_checkins",
        },
      },
    }),
  ],
});

export default EventResource;
