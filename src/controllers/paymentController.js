import razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../models/invoice.model.js";
import { User } from "../models/user.model.js"

// VERY VERY PRIVATE SECRET KEY FETCHING
const instance = new razorpay({
  key_id: process.env.KEY,
  key_secret: process.env.SECRET,
});

// HERE ORDER DETAIL AND AMOUNT LOGIC IMPLEMENTED
export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({ success: true, order });
  } catch (e) {
    console.log(e);
  }
};

export const paymentVerification = async (req, res) => {
  try {
    // WHOLE CODE TO VERIFY PAYMENT
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.SECRET)
      .update(body.toString())
      .digest("hex");
    const isAuth = expectedSignature === razorpay_signature;
    // IF VERIFIED
    if (isAuth) {
      // HERE PAYMENT WAS DONE , NEW PAYMENT INVOICE ENTRY WAS CREATED
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      // Get the course ID from the request body or parameters
      const { courseId } = req.body; // Assuming you send courseId in the request body

      // Update user's courses after successful transaction
      try {
        const userId = req.user._id;

        await User.findByIdAndUpdate(
          userId,
          { $push: { courses: courseId } }, 
          { new: true }
        );
      } catch (error) {
        console.error("Error updating user's courses:", error);
         res
          .status(500)
          .json({ error: "Failed to update user's courses" });
      }
    }

    // HERE AFTER PAYMENT , REDIRECT TO PAYMENT SUCCESS FULL PAGE

    res.redirect(
      `http://localhost:5173/paymentDone?reference=${razorpay_payment_id}`
    );
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getKey = (req, res) => {
  return res.status(200).json({ key: process.env.KEY });
};
