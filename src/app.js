import express from "express";
import  cors  from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.js";
import categoryRouter from "./routes/category.js";

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

//categoryRoutes
app.use('/api/category',categoryRouter)
app.use('/api/',categoryRouter)

//course routes 
import courseRouter from "./routes/course.js";
app.use('/api/user/dashboard',courseRouter)

export default app;