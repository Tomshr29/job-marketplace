import Property from "#models/property";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { faker } from "@faker-js/faker";

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 10; i++) {
      await Property.create({
        title: faker.location.streetAddress(),
        description: faker.lorem.sentence(),
        address: faker.location.streetAddress(),
        price: faker.number.int({ min: 50000, max: 1000000 }),
        bedrooms: faker.number.int({ min: 1, max: 5 }),
        bathrooms: faker.number.int({ min: 1, max: 3 }),
        area: faker.number.int({ min: 50, max: 300 }),
        type: faker.helpers.arrayElement(["House", "Apartment", "Condo"]),
        status: faker.helpers.arrayElement(["AVAILABLE", "SOLD", "RENTED"]),
        ownerId: faker.number.int({ min: 1, max: 5 }),
      });
    }
  }
}
