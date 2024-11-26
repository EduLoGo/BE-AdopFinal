import mockService from "../services/mock.js";
import { petsService, usersService } from "../services/index.js";

const getMockPets = async (req, res) => {
  const pets = await mockService.generateMockPets(10);
  res.send({ status: "Success", payload: pets });
};
const getMockUser = async (req, res) => {
  const users = await mockService.generateMockUsers(10);
  res.send({ status: "Success", payload: users });
};

const generateData = async (req, res) => {
  const { users, pets } = req.body;
  if (typeof users !== "number" || typeof pets !== "number") {
    return res.status(400).send({
      status: "Error",
      message: "users and pets must be numbers",
    });
  }
  try {
    const mockingusers = await mockService.generateMockUsers(users);
    const mockingpets = await mockService.generateMockPets(pets);

    await Promise.all(
      mockingusers.map((user) => {usersService.create(user)}),
      mockingpets.map((pet) => {petsService.create(pet)})
    );

    res.send({
      status: "Success",
      message: "Data generated successfully"
    });
  } catch (error) {
    res.send({ status: "Error", message: error.message });
  }
};

export default {
  getMockUser,
  getMockPets,
  generateData,
};
