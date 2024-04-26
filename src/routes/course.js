import express from "express";
import { createCourse, deleteCourse, getMyCourse } from "../controllers/courseController.js";
import { upload } from "../middlewares/multer.js"
import  requireAuth  from "../middlewares/requireAuth.js"

const courseRouter = express.Router()

courseRouter.use(requireAuth)
// router for - create course
courseRouter.post('/createCourse', 
upload.single('thumbnail'),
createCourse )

// router for - get user courses 
courseRouter.get('/', getMyCourse)


//router for - delete course
courseRouter.post('/deleteCourse', deleteCourse)


export default courseRouter