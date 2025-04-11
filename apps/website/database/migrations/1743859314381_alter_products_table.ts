import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "products";

  async up() {
    this.defer(async () => {
      const products = await this.db.query().from(this.tableName).select("*");

      for (const product of products) {
        if (product.currency === "points") {
          await this.db.query()
            .from(this.tableName)
            .update({ points: product.price })
            .where("id", product.id);
        }
      }
    });
  }

  async down() {
    throw new Error("Consider using a database backup");
  }
}
