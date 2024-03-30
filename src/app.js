import express from "express";
import  cors  from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.js";

const app = express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        Credential: true
    }
))


app.use(express.json({limit: "16kb"}))
// app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//routes
app.use('/api/user',router)

export default app;