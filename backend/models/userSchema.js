import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: {
        type:String,
        require:[true, 'role is require'],
        enum:['admin', 'organisation', 'donar', 'hospital']
    },
    fullName:{
        type :String,
        require: function() {
            if(this.role === 'user' || this.role === 'admin'){
                return true
            }
            return false
        }
    },
    organisationName: {
        type: String,
        require:function(){
           if(this.role === 'organisation') {
            return true
           }
           return false
        }
    },
    hospitalName: {
        type: String,
        require: function() {
            if(this.role === 'hospital') {
                return true
            }
            return false
        }
    },
    email: {
        type: String,
        require:[true, 'email is require'],
        unique: true
    },
    password:{
        type: String,
        require:[true, 'password is require']
    },
    website:{
        type: String
    },
    address: {
        type: String,
        required: [true, "Address is Required"],
    },
    phone:{
        type:String,
        required: [true, 'Phone No is required'],
        unique:true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationOTP: String,
    emailVerificationOTPExpires: Date
}, {timestamps:true})

const UserModel = mongoose.model("users", userSchema);

export default UserModel;