// api/checkout.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

/**
 * Creates a Stripe Checkout Session for a monthly subscription.
 * Expects: POST JSON { email: "user@example.com" }
 * Env vars needed in Vercel:
 *   - STRIPE_SECRET_KEY = sk_test_... (or sk_live_...)
 *   - STRIPE_PRICE_ID   = price_...
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],

      // Show the email on Checkout and send receipts
      customer_email: email,

      // Your monthly price
      line_items: [
        { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
      ],

      // ⬇️ Important: include session_id in the success URL
      success_url: "https://plumbwise.vercel.app/app.html?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://plumbwise.vercel.app/app.html?checkout=cancel"
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error("Checkout error:", e);
    return res.status(500).json({ error: "Checkout creation failed" });
  }
}
