import express from "express";
import Stripe from "stripe";
import  requireAuth  from "../middlewares/requireAuth.js"


const stripe = Stripe(process.env.STRIPE_KEY)

const paymentRouter = express.Router()

paymentRouter.use(requireAuth)


paymentRouter.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/course`,
    });
  
    res.send({ url: session.url});
  });
  






export default paymentRouter