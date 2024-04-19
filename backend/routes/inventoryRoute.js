import express from "express";
import authorize from "../middlewares/authMiddleware.js";
import { createInventory, getDonar, getHospital, getInventoryHospital, getOrg, getOrgForHospital, getRecords } from "../controllers/inventoryController.js";


const router = express.Router();


router.post("/create-inventory", authorize, createInventory);
router.post("/get-inventory-hospital",authorize,getInventoryHospital)
router.get("/get-inventory", authorize, getRecords);
router.get("/get-donar", authorize, getDonar);
router.get("/get-hospital", authorize, getHospital);
router.get("/organisation", authorize, getOrg);
router.get("/orgforhospital", authorize, getOrgForHospital);



export default router;