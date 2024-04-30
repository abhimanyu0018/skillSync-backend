import {Course} from "../models/course.model.js"
import nodemailer from "nodemailer"



export const startLiveSession = async (req, res) => {
    const { courseId, roomCode } = req.body;
    const notificationMessage = `live class started for ${courseId}`
    
    try {

        if (req.user.role !== 'instructor') {
            return res.status(403).json({ success: false, message: "You are not authorized to start the live session" });
        }
        //   console.log(courseId)
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        
        // Update the live code if the course exists
        course.liveCode = roomCode;
        await course.save();

        //  // Send notification email to enrolled students
        //  const enrolledStudentsEmails = await getEnrolledStudentsEmails(course);
        //  await sendNotificationEmail(enrolledStudentsEmails, notificationMessage);

        return res.status(200).json({ success: true, course });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


// Helper function to send notification email to enrolled students
const sendNotificationEmail = async (enrolledStudentsEmails, notificationMessage) => {
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user:process.env.MAIL_USER,
            pass: process.env.MAIL_PASS, 
        }
    });

    // Set up email options
    const mailOptions = {
        from: `SkillSync`, // Sender address
        to: 'asrijan889@gmail.com', // Receiver addresses (enrolled students)
        subject: 'Notification: Live Session Started', // Email subject
        text: notificationMessage, // Plain text body of the email
        html: `<h1>hii</h1>`
    };

    // Send email
    const info = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Notification email sent:', info.response);
        }
    });

    console.log(info);
};

// Helper function to get enrolled students' email addresses
const getEnrolledStudentsEmails = async (course) => {
    const enrolledStudents = await User.find({ _id: { $in: course.enrolledStudents } });
    return enrolledStudents.map(student => student.email);
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
