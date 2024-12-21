import Property from "#models/property";
import { DateTime } from "luxon";
import hash from "@adonisjs/core/services/hash";
import { compose } from "@adonisjs/core/helpers";
import { BaseModel, beforeCreate, column, hasMany } from "@adonisjs/lucid/orm";
import type { UUID } from "#types/common";
import { randomUUID } from "node:crypto";
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import type { HasMany } from "@adonisjs/lucid/types/relations";

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
  uids: ["email"],
  passwordColumnName: "password",
});

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: UUID;

  @column()
  declare firstName: string;

  @column()
  declare lastName: string;

  @column()
  declare email: string;

  @column({ serializeAs: null })
  declare password: string;

  // @column()
  // declare stripeCustomerId: string | null;

  // @column()
  // declare plan: "FREE" | "MASTER";

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  @hasMany(() => Property)
  declare properties: HasMany<typeof Property>;

  @column()
  declare avatar: string | null;

  @beforeCreate()
  static async createUUID(user: User) {
    user.id = randomUUID() as UUID;
  }
}
