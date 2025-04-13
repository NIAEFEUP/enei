import User from "#models/user";
import { createResource } from "../resource.js";
import { owningRelationFeature, targetRelationFeature } from "../relations.js";
import db from "@adonisjs/lucid/services/db";

const UserResource = createResource({
  model: User,
  options: {
    properties: {
      participantProfileId: {
        reference: "participant_profiles",
      },
      promoterProfileId: {
        reference: "promoter_profiles",
      },
      speakerProfileId: {
        reference: "speaker_profiles",
      },
      staffProfileId: {
        reference: "staff_profiles",
      },
      referringPromoterId: {
        reference: "users",
      },
      referrerId: {
        reference: "users",
      },
    },
    actions: {
      recalculatePoints: {
        actionType: "record",
        component: false,
        variant: "danger",
        handler: async (request, _, context) => {
          const trx = await db.transaction({ isolationLevel: "serializable" });

          const userId = request.params.recordId;

          if (!userId) {
            return;
          }

          await trx.rawQuery(
            `
            delete from order_products
            where order_products.order_id in (
              select orders.id
              from orders
              where orders.user_id = ?
            )
            and order_products.product_id in (
              select distinct events.product_id
              from events
              where events.product_id is not null
            )
            `,
            [userId],
          );

          await trx.rawQuery(
            `
            with product_requirements as (
              select
                events.product_id as product_id,
                count(*) as quantity,
                ROW_NUMBER() over (order by events.product_id) as rn
              from events join event_users on event_users.event_id = events.id
              where event_users.user_id = ? and events.product_id is not null
              group by events.product_id
            ),
            new_orders_without_rn as (
              insert into orders (status, user_id, created_at, updated_at, points_used)
              select 'delivered', ?, NOW(), NOW(), 0
              from product_requirements
              returning id
            ),
            new_orders as (
              select
                new_orders_without_rn.*,
                ROW_NUMBER() over () as rn
              from new_orders_without_rn
            )
            insert into order_products (order_id, product_id, quantity, created_at, updated_at)
            select
              new_orders.id as order_id,
              product_requirements.product_id as product_id,
              product_requirements.quantity as quantity,
              NOW() as created_at,
              NOW() as updated_at
            from new_orders
            join product_requirements on product_requirements.rn = new_orders.rn;
          `,
            [userId, userId],
          );

          await trx.rawQuery(
            `
            delete from orders
            where orders.user_id = ?
            and id in (
              select orders.id
              except select order_id
              from order_products
              group by order_id
              having count(*) > 0
            )
            `,
            [userId],
          );

          await trx.rawQuery(
            `
              update orders
              set points_used = (
                select COALESCE(sum(products.points * order_products.quantity), 0) as total_points
                from order_products join products on products.id = order_products.product_id and order_products.order_id = orders.id
              )
              where orders.user_id = ?
            `,
            [userId],
          );

          const {
            rows: [{ points }],
          } = await trx.rawQuery(
            `
              update users
              set points = (
                select COALESCE(sum(orders.points_used), 0) as total_points
                from orders where orders.user_id = users.id
              )
              where id = ?
              returning points
            `,
            [userId],
          );

          await trx.commit();

          context.record?.set("points", points);

          return {
            record: context.record?.toJSON(context.currentAdmin),
          };
        },
      },
    },
  },
  features: [
    targetRelationFeature(),
    owningRelationFeature({
      accounts: {
        type: "one-to-many",
        target: {
          joinKey: "userId",
          resourceId: "accounts",
        },
      },
      orders: {
        type: "one-to-many",
        target: {
          joinKey: "userId",
          resourceId: "orders",
        },
      },
      indirectReferrals: {
        type: "one-to-many",
        target: {
          joinKey: "referringPromoterId",
          resourceId: "users",
        },
      },
      referrals: {
        type: "one-to-many",
        target: {
          joinKey: "referrerId",
          resourceId: "users",
        },
      },
      registeredInEvents: {
        type: "many-to-many",
        target: {
          resourceId: "events",
        },
        junction: {
          joinKey: "userId",
          inverseJoinKey: "eventId",
          throughResourceId: "event_users",
        },
      },
      checkedInEvents: {
        type: "many-to-many",
        target: {
          resourceId: "events",
        },
        junction: {
          joinKey: "userId",
          inverseJoinKey: "eventId",
          throughResourceId: "event_checkins",
        },
      },
    }),
  ],
});

export default UserResource;
