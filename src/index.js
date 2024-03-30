// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";
import router from "./routes/user.js";
dotenv.config(
    {
        path: "./env"
    }
)



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 ,() => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Database connection failed !!!", error);
})

//routes
app.use('/api/user',router)