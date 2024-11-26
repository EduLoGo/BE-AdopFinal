import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import configObject from "./config/config.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mockRouter from "./routes/mocks.router.js";

const app = express();
const PORT = process.env.PORT;
const connection = mongoose.connect(configObject.mongoURL);
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de la App Adoptme",
      description: "App dedicada para encontrar familias a Perros y Gatos",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mockRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
