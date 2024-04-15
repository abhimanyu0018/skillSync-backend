import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_KEY);

// Function to create a checkout session
export const createCheckoutSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'Course-Name', // we  can customize this based on course
                        },
                        unit_amount: 500, //  customize the amount based on course price
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/course`,
        });

        res.send({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Server error" });
    }
};
