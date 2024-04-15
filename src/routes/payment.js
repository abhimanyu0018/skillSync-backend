import express from "express";
import  requireAuth  from "../middlewares/requireAuth.js"
import  createCheckoutSession from "../controllers/paymentController.js"

const paymentRouter = express.Router()

paymentRouter.use(requireAuth)


paymentRouter.post('/create-checkout-session', createCheckoutSession );
  






export default paymentRouter