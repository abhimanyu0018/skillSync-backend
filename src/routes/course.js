import express from "express";
import { createCourse } from "../controllers/courseController.js";
import { upload } from "../middlewares/multer.js"
import  requireAuth  from "../middlewares/requireAuth.js"

const courseRouter = express.Router()

courseRouter.use(requireAuth)
// router for - create course
courseRouter.post('/createCourse', 
upload.single('thumbnail'),
createCourse )




export default courseRouter