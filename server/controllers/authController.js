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
    //Try to do something if an error occurs, then print an error message instead of crashing the server
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
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});    //create the token and store it in a variable called token
        // jwt.sign is what combines all properties required for creating the token
        //{id:user._id} - we store the user's MONGODB_id, so that later we can know who is making a request.
        //process.env.JWT_SECRET  - a secret key from your .env file. It signs the token so nobody can fake one
        //expiresIn: '7d'  - the token stops working after 7 days.

        //Now that we have created the toke, lets send the token inside a cookie
        res.cookie('token', token, {
            httpOnly: true,  //JavaScript in the browser cannot read this cookie. This protects it from being stolen by malicious scripts
            secure: process.env.NODE_ENV === 'production',
            samesite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true});

    } catch (error) {
        return res.json({
            success: false, 
            message: error.message
        });
    }
}

//This is the whole flow.
//1. React sends the name, email and password
//2. The function check nothing is missing
//3. It checks the email is not registered. (The user does not exist)
//4. It hashes the password
//5. It saves the new user with the hashed password in MongoDB
//6. It creates a JWT containing the user's _id
//7. It sends a JWT back inside a cookie
//8. It replies success

