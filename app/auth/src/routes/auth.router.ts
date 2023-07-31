import express from "express";
import { createUserHandler, loginUserHandler } from "../controllers/auth.controller";
import validate from "../middlewares/validateResources";
import { createUserSchema, loginUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/api/user/register", validate(createUserSchema), createUserHandler);

router.post("/api/user/login", validate(loginUserSchema), loginUserHandler);

export default router;