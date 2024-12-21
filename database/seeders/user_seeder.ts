import User from "#models/user";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 5; i++) {
      await User.create({
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: "password",
        createdAt: DateTime.fromJSDate(faker.date.past()),
        updatedAt: DateTime.fromJSDate(faker.date.recent()),
      });
    }
  }
}
