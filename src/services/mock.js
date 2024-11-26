import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";

class mockService {
  static async generateMockUsers(num) {
    const users = [];
    for (let i = 0; i < num; i++) {
      users.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: await createHash("coder123"),
        role: faker.helpers.arrayElement(["user", "admin"]),
        pets: [],
      });
    }
    return users;
  }
  static async generateMockPets(num) {
    const pets = [];
    for (let i = 0; i < num; i++) {
      pets.push({
        name: faker.animal.dog(),
        specie: faker.animal.type(),
        birthDate: faker.date.birthdate(),
        adopted: false,
        image: "https://placehold.co/600x400/png",
      });
    }
    return pets;
  }
}

export default mockService;