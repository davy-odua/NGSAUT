import mongoose, { Schema } from "mongoose";
//To create the user model we first need to create the Schema-Structure used to define our data. Like how the user looks like.

const userSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    verifyOtp: {type:String, default:''}, //Whenever a new user is created, this verifyOtp will be created and the default value will be an empty string.
    verifyOtpExpireAt: {type:Number, default:0}, //This is the expiry time of the above verifyOtp.
    isAccountVerified: {type:Boolean, default:false},
    resetOtp: {type:String, default:''},   //Password reset Otp
    resetOtpExpireAt: {type:Number, default:0},
});

//now use the above userSchema to create the user model

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;