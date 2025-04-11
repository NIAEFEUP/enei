import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "products";

  async up() {
    this.defer(async () => {
      const products = await this.db.query().from(this.tableName).select("*");

      for (const product of products) {
        if (product.currency === "points") {
          product.points = product.price;
          await product.save();
        }
      }
    });
  }

  async down() {
    throw new Error("Consider using a database backup");
  }
}
