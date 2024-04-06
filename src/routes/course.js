import express from "express";
import { createCourse } from "../controllers/courseController.js";


const courseRouter = express.Router()


// router for - create course
courseRouter.post('/createCourse', createCourse )




export default courseRouter