import express from "express";
import  requireAuth  from "../middlewares/requireAuth.js"
import checkEnrollment  from "../middlewares/checkEnrolled.js";

import { checkout, paymentVerification, getKey} from "../controllers/paymentController.js";

const paymentRouter = express.Router();
paymentRouter.use(requireAuth)



paymentRouter.post("/checkout", checkEnrollment, checkout);
paymentRouter.post("/paymentverification", paymentVerification);
paymentRouter.get("/getkey", getKey);

export default paymentRouter;