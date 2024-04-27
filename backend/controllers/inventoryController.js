import UserModel from "../models/userSchema.js";
import InventoryModel from "../models/inventorySchema.js";
import mongoose from "mongoose";






export const createInventory = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not Found");
    }

    // if (req.body.inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("not a donar account");
    // }
    // if (req.body.inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not A hospital");
    // }
    // const userId = req.body.organisation

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = mongoose.Types.ObjectId.isValid(
        req.body.organisation
      )
        ? new mongoose.Types.ObjectId(req.body.organisation)
        : null;

      const totalInOfRequestedBlood = await InventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await InventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    // save records
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




export const getDonar = async (req, res) => {
  try {
    const donarId = await InventoryModel.distinct("donar", {
      organisation: req.user,
    });
    const donar = await UserModel.find({ _id: { $in: donarId } });

    res.status(200).json({
      success: true,
      donar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getting Donar",
      error,
    });
  }
};



export const getHospital = async (req, res) => {
  try {
    const hospitalId = await InventoryModel.distinct("hospital", {
      organisation: req.user,
    });
    // console.log(hospitalId);
    const hospital = await UserModel.find({ _id: { $in: hospitalId } }).select(
      "-password"
    );


    res.status(200).json({
      success: true,
      hospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getting Donar",
      error,
    });
  }
};

export const getOrg = async (req, res) => {
  try {
    const orgId = await InventoryModel.distinct("organisation", {
      donar: req.user,
    });
    const organisation = await UserModel.find({ _id: { $in: orgId } }).select(
      "-password"
    );

    return res.status(200).json({
      success: true,
      organisation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getting Org..",
      error,
    });
  }
};




export const getOrgForHospital = async (req, res) => {
  try {
    const hospitalId = await InventoryModel.distinct("organisation", {
      hospital: req.user,
    });
    const organisation = await UserModel.find({
      _id: { $in: hospitalId },
    }).select("-password");

    return res.status(200).json({
      success: true,
      organisation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getting Org..",
      error,
    });
  }
};





export const getInventoryHospital = async (req, res) => {
  try {
    const inventories = await InventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("organisation")
      .populate("hospital")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "get hospital consumer records ",
      inventories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getting consumer Inventory",
      error,
    });
  }
};
