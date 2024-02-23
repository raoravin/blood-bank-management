import mongoose from "mongoose";


const inventorySchema = new mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true, 'InventoryType require'],
        enum: ['in', 'out']
    },
    bloodGroup: {
        type: String,
        required: [true, 'blood group required'],
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
    },
    quantity: {
        type:Number,
        required: [true, 'blood quantity is required']
    },
    email: {
        type:String,
        required:true
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, 'organisation is required']
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: function() {
            return this.inventoryType === "out";
        }

    },
    donar : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
            return this.inventoryType === 'in';
        }
    }

},{timestamps: true});


const InventoryModel = mongoose.model("inventory", inventorySchema);

export default InventoryModel;