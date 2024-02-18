import express from "express";
import authorize from "../middlewares/authMiddleware.js";
import { createInventory, getRecords } from "../controllers/inventoryController.js";


const router = express.Router();


router.post("/create-inventory", authorize, createInventory);
router.get("/get-inventory", authorize, getRecords);


export default router;