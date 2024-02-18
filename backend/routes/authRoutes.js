import express from "express";
import { getUser, login, logout, register } from "../controllers/authController.js";
import authorize from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user",authorize, getUser);
router.get("/logout", authorize, logout)





export default router;