// api/checkout.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: "Missing email" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: "https://plumbwise.vercel.app/app.html?checkout=success",
      cancel_url: "https://plumbwise.vercel.app/app.html?checkout=cancel"
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error("Checkout error", e);
    return res.status(500).json({ error: "Checkout creation failed" });
  }
}
