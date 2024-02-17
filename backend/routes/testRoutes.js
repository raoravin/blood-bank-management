import express from "express";
import { testController } from "../controllers/testController.js";


//router object
const router = express.Router();

// routers
router.get("/test", testController);

export default router