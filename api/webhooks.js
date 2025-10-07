// api/webhooks.js
import Stripe from "stripe";
import { buffer } from "micro";
import { createClient } from "@supabase/supabase-js";

// Needed for raw body (Stripe signature verify)
// Works on Vercel Serverless & Next.js API routes
export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

const normEmail = (e) => (e || "").trim().toLowerCase();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];
  let event;

  // 1) Verify webhook signature with RAW body
  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2) Handle the events we care about
  try {
    switch (event.type) {
      // After Checkout completes successfully
      case "checkout.session.completed": {
        const s = event.data.object;
        const email = normEmail(s.customer_details?.email);
        const customerId = typeof s.customer === "string" ? s.customer : s.customer?.id || null;

        if (email) {
          await supabase.from("plumbwise_trials").upsert(
            {
              email,
              first_checkout_session: s.id,
              stripe_customer_id: customerId
            },
            { onConflict: "email" }
          );
        }
        break;
      }

      // Subscription lifecycle updates (created/updated)
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object;
        const customerId = sub.customer;

        try {
          const customer = await stripe.customers.retrieve(customerId);
          const email = normEmail(customer?.email);
          if (email) {
            await supabase.from("plumbwise_trials").upsert(
              {
                email,
                stripe_customer_id: customerId
              },
              { onConflict: "email" }
            );
          }
        } catch (e) {
          console.error("Retrieve customer error:", e);
        }
        break;
      }

      // Subscription cancelled
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        try {
          const customer = await stripe.customers.retrieve(sub.customer);
          const email = normEmail(customer?.email);
          if (email) {
            // Keep the row so the email can't get another trial in future.
            await supabase.from("plumbwise_trials").upsert(
              {
                email,
                stripe_customer_id: sub.customer
              },
              { onConflict: "email" }
            );
          }
        } catch (e) {
          console.error("Retrieve customer error:", e);
        }
        break;
      }

      default:
        // Ignore other events
        break;
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return res.status(500).send("Webhook handler error");
  }
}
