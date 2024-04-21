import {Course} from "../models/course.model.js"



export const startLiveSession = async (req, res) => {
    const { courseId, roomCode } = req.body;
    
    try {

        if (req.user.role !== 'instructor') {
            return res.status(403).json({ success: false, message: "You are not authorized to start the live session" });
        }

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        
        // Update the live code if the course exists
        course.liveCode = roomCode;
        await course.save();

        return res.status(200).json({ success: true, course });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


// Controller  to reset live code when teacher ends live session
export const endLiveSession = async (req, res) => {
    const { courseId } = req.body;
    
    try {

        if (req.user.role !== 'instructor') {
            return res.status(403).json({ success: false, message: "You are not authorized to end the live session" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

         
         if (course.liveCode === "none") {
            return res.status(204).json({ success: true, message: "Live session ended" });
        }
        
        // End the live session by setting live code to "none"
        course.liveCode = "none";
        await course.save();

        return res.status(200).json({ success: true, course });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


// Controller function to get live code for a specific course
export const getLiveCode = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user._id; 
    
    try {
        // Check if the user is a student
        if (req.user.role !== 'student') {
            return res.status(403).json({ success: false, message: "You are not authorized to access live code" });
        }

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        
        // Check if the user is enrolled in the course
        const isEnrolled = course.enrolledStudents.includes(userId);
        if (!isEnrolled) {
            return res.status(403).json({ success: false, message: "You are not enrolled in this course" });
        }

        // Return the live code
        return res.status(200).json({ success: true, liveCode: course.liveCode });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
