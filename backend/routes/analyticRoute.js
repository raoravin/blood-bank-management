import express from "express";
import authorize from "../middlewares/authMiddleware.js";
import { bloodGroupDetails } from "../controllers/analyticController.js";


const router = express.Router();


router.get("/blood-group-data", authorize, bloodGroupDetails);




export default router;