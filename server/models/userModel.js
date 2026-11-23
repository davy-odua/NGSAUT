import mongoose, { Schema } from "mongoose";   //Brings in the tool that lets you create the models, schema and talk to mongoDB
//To create the user model we first need to create the Schema-Structure used to define our data. Like how the user looks like.

const userSchema = new Schema({          //userSchema is a variable holding your blueprint.  new Schema - means create a new blueprint using fields in the curly braces
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true, lowercase:true, trim:true},
    password: {type:String, required:true},
    verifyOtp: {type:String, default:''}, //Whenever a new user is created, this verifyOtp will be created and the default value will be an empty string.
    verifyOtpExpireAt: {type:Number, default:0}, //This is the expiry time of the above verifyOtp.
    isAccountVerified: {type:Boolean, default:false},
    resetOtp: {type:String, default:''},   //Password reset Otp
    resetOtpExpireAt: {type:Number, default:0},
}, {timestamps: true});

//now use the above userSchema to create the user model

const userModel = mongoose.models.user || mongoose.model('user', userSchema);  
//userModel is a variable holding this model
//If a model called user exists, then use it otherwise, create it.
//mongoose.models.user - checks whether the model actually existsy.
//mongoose.model('user', userSchema); - Turns the schema into a model named user.

export default userModel;