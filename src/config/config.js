import dotenv from "dotenv";

dotenv.config();

const configObject = {
  port: process.env.PORT,
  mongoURL: process.env.MONGO_URI,
};

export default configObject;
