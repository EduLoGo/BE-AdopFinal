import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js";
import { expect } from "chai";

mongoose.connect(`mongodb+srv://edulogo:CoderCoder@coderproject.wuypshy.mongodb.net/adop_test?retryWrites=true&w=majority&appName=CoderProject`);

describe("Testeamos el DAO de Usuarios ahora con CHAI", function () {
  before(function () {
    this.usersDao = new User();
  });

  // limpia la base de datos antes de cada test
  beforeEach(async function () {
    await mongoose.connection.collections.users.drop();
  });

  //que retorne todos los usuarios
  it("El get de usuario me debe retornar un array", async function () {
    const result = await this.usersDao.get();
    expect(Array.isArray(result)).to.be.true;
  });

  it("El Dao debe poder agregar un usuario nuevo a la BD", async function () {
    let testUser = {
      first_name: "Miguel",
      last_name: "Lopez",
      email: "miguel.lopez@mail.com",
      password: "1234",
    }
    const result = await this.usersDao.save(testUser);
    expect(result).to.have.property("_id");
  });

  it("Validamos que el usuario tenga un array de mascotas vaciao", async function () {
    let testUser = {
      first_name: "Yayi",
      last_name: "Lopez",
      email: "yayi.lopez@mail.com",
      password: "1234",
    };
    await this.usersDao.save(testUser);
    const user = await this.usersDao.getBy({email: "yayi.lopez@mail.com"});
    expect(user.pets).to.deep.equal([]);
  })
  
  it("El Dao debe poder obtener un usuario por Email", async function () {
    let testUser = {
      first_name: "Yayi",
      last_name: "Lopez",
      email: "yayi.lopez@mail.com",
      password: "1234",
    };
    const result = await this.usersDao.save(testUser);
    const user = await this.usersDao.getBy({email: result.email});
    expect(user).to.be.an("object");
  })

  after(async function () {
    await mongoose.connection.close();  
  })
});
