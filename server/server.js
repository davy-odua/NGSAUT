import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Lets create a basic express app
import express from "express";
import cors from "cors";
import "dotenv/config";   //1. Loads the .env into process.env
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import router from "./routes/authRoutes.js";

const app = express();  //2. Create the app

const port = process.env.PORT || 4000

//Call the connection to database function
await connectDB();  //3. Connect to database here

app.use(cors({credentials: true}));  //Gives the browser permission to let the frontend talk to your backend and to send cookies with the request
//The browser normally blocks the frontend of one address from calling the backend of another address. Cors tells the browser "This is allowed"
//credentials: true - Allows cookies to travel between your frontend and backend. Without it the browser won't send or save your login cookie

app.use(express.json());   // This lets your server read json requests sent from the frontend and express.json() turns it into real javascript object and puts them in the req.body
app.use(cookieParser());   //Lets your server read cookies sent by the browser and cookieParser puts them in req.cookies

//All the above app.use should be put before the the routes since anything put after the code that runs the routes never gets the chance to run for it.

//Below is the order of what happens
// Request → cors → express.json() → cookieParser() → router → controller → response

//API Endpoints
app.get('/', (req, res) => {
    res.send("API Working")
});
app.use('/api/auth', router);

app.listen(port, () => console.log(`Server started on port: ${port}`));
//app.listen() - Turns on your server. Until you call it, your app is just a set of instructions. When you use it, it starts your server and makes it wait for requests.


//This is the model to use 
// 1. create the app
// 2. configure it   (middleware, routes)
// 3. open it up     (listen)

export default app;