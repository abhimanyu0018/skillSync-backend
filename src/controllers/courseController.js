import asyncHandler from "../utils/asyncHandler.js"
import {Course} from "../models/course.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";





//course Controller 

export const createCourse = async (req, res) => {
    try {
        const { name, desc, price, category } = req.body;
        const instructor = req.user; // Assuming the authenticated user is the instructor
            // console.log(req.body)
        // Check if a course with the same name exists for the instructor
        const existingCourse = await Course.findOne({ name, instructor });

        if (existingCourse) {
            return res.status(400).json({ error: 'Course with the same name already exists for this instructor' });
        }

        // Upload thumbnail to Cloudinary
        const thumbnailUrl = await uploadThumbnail(req.file);

        // Create the course
        const course = new Course({
            name,
            desc,
            thumbnail: thumbnailUrl,
            price,
            category,
            instructor: instructor._id,
        });

        await course.save();

        return res.status(201).json(course);
    } catch (error) {
        // Handle errors
        console.log(error)
        return res.status(500).json({ error: 'Server error' });
    }
};

// Function to upload thumbnail to Cloudinary
const uploadThumbnail = async (file) => {
    try {
        if (!file) {
            throw new Error('No thumbnail uploaded');
        }

        // Get local file path
        const localFilePath = file.path;

        // Upload the file on Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

        // Return the URL of the uploaded thumbnail
        return cloudinaryResponse.url;
    } catch (error) {
        throw error;
    }
};