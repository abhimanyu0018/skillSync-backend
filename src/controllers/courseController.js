import {Course} from "../models/course.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";





//course Controller 

// controller for creating course
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

        // Update the user's courses array
        await User.findByIdAndUpdate(instructor._id, { $push: { courses: course._id } });

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


// controller for fetch user courses 
export const getMyCourse = async (req,res) => {
    try {
        const user = req.user;
        // console.log(user)

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        let courses;

        if (user.role === 'student') {
            // If user is a student, fetch courses they are enrolled in
            courses = await User.findById(user._id).populate('courses');
        } else if (user.role === 'instructor') {
            // If user is an instructor, fetch courses they have created
            courses = await Course.find({ instructor: user._id });
        } else {
            // Invalid user role
            return res.status(400).json({ error: "Invalid user role" });
        }

        res.json({ courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Server error" });
    }
}

//controller for return user info for specific course 
export const getInstructerInfo = async (req,res) => {
    const { courseID } = req.body

    try {
        const course = await Course.findById(courseID).populate('instructor');

        // Extract the instructor details 
        let instructorDetails = course.instructor.toObject(); 
        
        delete instructorDetails.password; 
        

       
        res.status(200).json( instructorDetails );
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}