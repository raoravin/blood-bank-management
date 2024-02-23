import express from "express";
import authorize from "../middlewares/authMiddleware.js";
import { createInventory, getDonar, getHospital, getRecords } from "../controllers/inventoryController.js";


const router = express.Router();


router.post("/create-inventory", authorize, createInventory);
router.get("/get-inventory", authorize, getRecords);
router.get("/get-donar", authorize, getDonar);
router.get("/get-hospital", authorize, getHospital);


export default router;