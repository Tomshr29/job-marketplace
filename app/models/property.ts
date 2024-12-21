import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
} from "@adonisjs/lucid/orm";
import User from "#models/user";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import type { UUID } from "#types/common";
import { randomUUID } from "node:crypto";

export default class Property extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID;

  @column()
  declare street: string;

  @column()
  declare postalCode: string;

  @column()
  declare city: string;

  @column()
  declare price: number;

  @column()
  declare ownerId: UUID;

  @column()
  declare avatarProperty: string;

  @column()
  declare type: "house" | "apartment" | "condo";

  @belongsTo(() => User, {
    foreignKey: "ownerId",
  })
  declare owner: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @beforeCreate()
  static async createUUID(property: Property) {
    property.id = randomUUID() as UUID;
  }
}
