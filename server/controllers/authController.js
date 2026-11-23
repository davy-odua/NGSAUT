import userModel from "../models/userModel.js";

//We first need to register our user in the database
export const register = async (req, res) => {
    const {name, email, password} = req.body;

    //check if all fields are filled
    if(!name || !email || !password){
        return res.json({
            success:false,
            message: "Missing Details"
        });
    }
    //Try to do something if an error occurs, then print an error message instead of crushing
    try {
        //Now create the user's account and store that message in the database
        const existingUser = await userModel.findOne({email});

        if (existingUser){
            return res.json({
                success:false,
                message: "User already exists"
            });
        }
        //If the user with that email does not exist, now save the user email and hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);  //This hashed password is what we will save in the database

        //Now create the user for the database
        const user = new userModel({name, email, password: hashedPassword});
        await user.save();  //This will save the user in the database.

        //Now we have to send 1 token for authentication and we will send this token using cookies
        //HTTP is stateless. The token is how the server recognizes a logged-in user without asking for the password each time.
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

    } catch (error) {
        return res.json({
            success: false, 
            message: error.message
        });
    }
}