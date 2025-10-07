// api/checkout.js — 1-day free trial (once per email)
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

const normEmail = (e) => (e || "").trim().toLowerCase();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email } = req.body || {};
    const nEmail = normEmail(email);
    if (!nEmail) return res.status(400).json({ error: "Missing email" });

    // Has this email been seen before? (strict: any row means no trial)
    const { data: trialRow } = await supabase
      .from("plumbwise_trials")
      .select("*")
      .eq("email", nEmail)
      .maybeSingle();

    // Reuse or create a Stripe customer (prevents “new customer = new trial”)
    const customers = await stripe.customers.list({ email: nEmail, limit: 1 });
    const existingCustomer = customers.data[0];
    const customer = existingCustomer || await stripe.customers.create({ email: nEmail });

    const trialUsed = !!trialRow; // change to !!trialRow?.trial_started_at if you only count after webhook

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      payment_method_collection: "always", // collect card up-front
      subscription_data: trialUsed ? {} : {
        trial_period_days: 1,
        trial_settings: { end_behavior: { missing_payment_method: "cancel" } }
      },
      success_url: "https://plumbwise.vercel.app/app.html?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://plumbwise.vercel.app/app.html?checkout=cancel"
    });

    // Reserve the email so next attempts won’t get a trial
    if (!trialRow) {
      await supabase.from("plumbwise_trials").insert({
        email: nEmail,
        first_checkout_session: session.id,
        stripe_customer_id: customer.id
      });
    }

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error("Checkout error:", e);
    return res.status(500).json({ error: "Checkout creation failed" });
  }
}
