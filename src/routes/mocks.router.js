import { Router } from "express";
import mockController from "../controllers/mock.controller.js";

const router = Router();

router.get("/mockingpets", mockController.getMockPets);
router.get("/mockingusers", mockController.getMockUser);
router.post("/generateData", mockController.generateData);

export default router;