import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

describe("Testing Funcional", function () {
  this.timeout(5000);
  let idAdoption, mockUserId, mockPetId;

  before(async () => {
    const userResponse = await request.post("/api/users").send({
      first_name: "Test",
      last_name: "User",
      email: "test.user@mail.com",
      password: "1234",
    });
    mockUserId = userResponse.body.payload._id;

    const petResponse = await request.post("/api/pets").send({
      name: "Test Pet",
      specie: "Car",
      birthDate: "2024-01-01",
    });
    mockPetId = petResponse.body.payload._id;
  });

  after(async () => {
    await request.delete(`/api/users/${mockUserId}`);
    await request.delete(`/api/pets/${mockPetId}`);
  });

  describe("Testing Adoptions", () => {
    it("El endpoint POST /api/adoptions/:uid/:pid genera un Registro de Adopcion y lo retorna la información en un objeto", async () => {
      const { statusCode, ok, _body } = await request.post(`/api/adoptions/${mockUserId}/${mockPetId}`);
      idAdoption = _body.payload._id;
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body.payload).to.be.an("object");
    });

    it("El endpoint POST /api/adoptions/:uid/:pid debe retornar un Error 400 si la mascota ya fue adoptada", async () => {
      const { statusCode, ok, _body } = await request.post(`/api/adoptions/${mockUserId}/${mockPetId}`);
      expect(statusCode).to.equal(400);
      expect(ok).to.equal(false);
      expect(_body.error).to.equal("Pet is already adopted");
    });

    it("El endpoint POST /api/adoptions/:uid/:pid debe retornar un Error 404 si el ID de la mascota no existe", async () => {
      const { statusCode, ok, _body } = await request.post(`/api/adoptions/${mockUserId}/673d7310433b4c5232fd0e49`);
      expect(statusCode).to.equal(404);
      expect(ok).to.equal(false);
      expect(_body.error).to.equal("Pet not found");
    });

    it("El endpoint POST /api/adoptions/:uid/:pid debe retornar un Error 404 si el ID del usuario no existe", async () => {
      const { statusCode, ok, _body } = await request.post(`/api/adoptions/673d7310433b4c5232fd0e51/${mockPetId}`);
      expect(statusCode).to.equal(404);
      expect(ok).to.equal(false);
      expect(_body.error).to.equal("User Not found");
    });

    it("El endpoint GET /api/adoptions/:aid debe retornar el registro de Adopcion ingresad en un objeto", async () => {
      const { statusCode, ok, _body } = await request.get(`/api/adoptions/${idAdoption}`);
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body.payload).to.be.an("object");
    });

    it("El endpoint GET /api/adoptions/:aid debe retornar un Error 404 si el ID de la Adopcion no existe", async () => {
      const { statusCode, ok, _body } = await request.get(`/api/adoptions/673d7310433b4c5232fd0e51`);
      expect(statusCode).to.equal(404);
      expect(ok).to.equal(false);
      expect(_body.error).to.equal("Adoption not found");
    });

    it("El endpoint GET /api/adoptions debe retornar un array con todos los registros de Adopciones", async () => {
      const { statusCode, ok, _body } = await request.get("/api/adoptions");
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body.payload).to.be.an("array");
    });

    it("El endpoint DELETE /api/adoptions/:aid debe borrar el registro de Adopcion ingresado", async () => {
      const { statusCode, ok, _body } = await request.delete(`/api/adoptions/${idAdoption}`);
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body.message).to.equal("Adoption deleted");
    });

    it("El endpoint DELETE /api/adoptions/:aid debe retornar un Error 404 si el ID de la Adopcion no existe", async () => {
      const { statusCode, ok, _body } = await request.delete(`/api/adoptions/673d7310433b4c5232fd0e51`);
      expect(statusCode).to.equal(404);
      expect(ok).to.equal(false);
      expect(_body.error).to.equal("Adoption not found");
    })
  });
});
