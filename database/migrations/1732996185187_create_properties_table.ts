import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "properties";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.string("street").notNullable();
      table.string("postal_code").notNullable();
      table.string("city").notNullable();
      table.decimal("price", 10, 2).notNullable();
      table.string("avatar_property").nullable();
      table.enum("type", ["house", "apartment", "condo"]).notNullable();

      table.uuid("owner_id").unsigned().references("id").inTable("users");

      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
