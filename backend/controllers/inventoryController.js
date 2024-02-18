import UserModel from "../models/userSchema.js";
import InventoryModel from "../models/inventorySchema.js";
export const createInventory = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("not at all");
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not Found");
    }

    if (req.body.inventoryType === "in" && user.role !== "donar") {
      throw new Error("not a donar account");
    }
    if (req.body.inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not A hospital");
    }

    console.log("hello");

    //save records
    const inventory = new InventoryModel(req.body);
    await inventory.save();

    return res.status(201).json({
      success: true,
      message: "Inventory Created",
      inventory: inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In creating inventory",
      error,
    });
  }
};

export const getRecords = async (req, res) => {
  try {
    const inventories = await InventoryModel.find({
      organisation: req.user,
    })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "get all records ",
      inventories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getting Inventory",
      error,
    });
  }
};
