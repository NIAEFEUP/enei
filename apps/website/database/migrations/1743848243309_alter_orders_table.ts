import type { ReadonlyPayment } from "#models/payment";
import { BaseSchema } from "@adonisjs/lucid/schema";

type OldOrder = {
  id: string;
  name?: string;
  nif?: string;
  address?: string;
  status:
    | "Success"
    | "Declined by user"
    | "Declined"
    | "Failed"
    | "Expired"
    | "Upgraded administratively";
  request_id: string;
  total: number;
  created_at: string;
  updated_at: string;
};

const statusMap: Record<OldOrder["status"], Pick<ReadonlyPayment, "status" | "reason">> = {
  "Success": { status: "successful", reason: null },
  "Declined": { status: "declined", reason: null },
  "Declined by user": { status: "declined", reason: "user" },
  "Failed": { status: "declined", reason: "user" },
  "Expired": { status: "expired", reason: null },
  "Upgraded administratively": { status: "successful", reason: null },
};

export default class extends BaseSchema {
  protected tableName = "orders";

  async up() {
    this.defer(async () => {
      const orders: Array<OldOrder> = await this.db.from("orders").select("*");

      for (const order of orders) {
        await this.db.transaction(async (trx) => {
          let invoiceId: number | null = null;

          if (order.nif) {
            const [id] = await trx
              .table("invoice_infos")
              .insert({
                name: order.name,
                nif: order.nif,
                address: order.address,
                frozen: false,
                created_at: order.created_at,
                updated_at: order.updated_at,
              })
              .returning("id");

            invoiceId = id;
          }

          await trx.table("payments").insert({
            status: statusMap[order.status].status,
            reason: statusMap[order.status].reason,
            request_id: order.request_id,
            amount: order.total,
            order_id: order.id,
            invoice_info_id: invoiceId,
            created_at: order.created_at,
            updated_at: order.updated_at,
          });
        });
      }
    });
  }

  async down() {
    this.defer(async () => {
      throw new Error("Consider using a database backup");
    });
  }
}
