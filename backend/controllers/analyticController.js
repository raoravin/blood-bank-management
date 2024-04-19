// get blood data

import InventoryModel from "../models/inventorySchema.js";


export const bloodGroupDetails = async (req,res) =>{
    try {
        const bloodGroup = ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'];
        const bloodGroupData = [];
        const organisation = req.body.userId;

        //get single blood group

        await Promise.all(async (bloodGroup) => {
            // Count total in for each blood group
        const totalIn = await InventoryModel.aggregate([
            {
                $match: {
                    bloodGroup: bloodGroup,
                    inventoryType: "in",
                    organisation: organisation // Assuming `organisation` is defined elsewhere
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$quantity" } // Corrected syntax for sum aggregation
                }
            }
        ]);
        // Count total in for each blood group
        const totalOut = await InventoryModel.aggregate([
            {
                $match: {
                    bloodGroup: bloodGroup,
                    inventoryType: "out",
                    organisation: organisation // Assuming `organisation` is defined elsewhere
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$quantity" } // Corrected syntax for sum aggregation
                }
            }
        ]);


        //calculate total
        const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.toal || 0)

        //Push Data

        bloodGroupData.push({
            bloodGroup,
            totalIn: totalIn[0]?.total || 0,
            totalOut: totalOut[0]?.total || 0,
            availableBlood
        })
        })

        return res.status(200).json({
            success: true,
            message: "Blood GroupData Fetch Successfully",
            bloodGroupData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: true,
            message : "Error In blood data Analytics",
            error
        })
    }
}