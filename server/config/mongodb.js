import mongoose from "mongoose";
//Mongoose is the main tool that talks to MongoDB

//Now create a function that will connect your backend(server) to the mongoDB database.
//You write it once then call it from the server.js

const connectDB = async () => {
    try {
        //1.Set up the listener
        mongoose.connection.on('connected', () =>    //When the connection becomes connected then
        console.log("Database connected"));          // Print a message - This line only sets up the listener but it doesn't connect anything yet
        
        //2. Connect
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "ngsaut"});   //The actual connection takes place        
    } catch (error) {
        console.log("Database connection failed", error.message);
    }
};

export default connectDB;