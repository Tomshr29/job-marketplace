import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "users";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email", 254).notNullable().unique();
      table.string("password").notNullable();
      // table.string("stripe_customer_id").nullable();
      // table.enum("plan", ["FREE", "MASTER"]).defaultTo("FREE");
      table.string("avatar").nullable();

      table.timestamp("created_at").notNullable();
      table.timestamp("updated_at").nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
