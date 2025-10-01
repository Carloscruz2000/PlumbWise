// api/subscription-status.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { session_id, email } = req.body || {};
    let active = false;
    let subStatus = null;
    let customerId = null;
    let outEmail = email || null;

    // Path A: called right after checkout success with session_id
    if (session_id) {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["subscription", "customer"]
      });

      const sub = session.subscription;
      if (sub && typeof sub === "object") {
        subStatus = sub.status;
        active = sub.status === "active" || sub.status === "trialing";
      }
      const cust = session.customer;
      customerId = typeof cust === "string" ? cust : cust?.id || null;
      outEmail = outEmail || session.customer_details?.email || (typeof cust === "object" ? cust?.email : null);
    }

    // Path B: later visits—look up by email if not active yet
    if (!active && email) {
      // Use search if available; else fall back to list
      let customer = null;
      try {
        const found = await stripe.customers.search({ query: `email:"${email}"`, limit: 1 });
        customer = found.data[0] || null;
      } catch {
        const listed = await stripe.customers.list({ email, limit: 1 });
        customer = listed.data[0] || null;
      }
      if (customer) {
        customerId = customer.id;
        const subs = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 10 });
        const live = subs.data.find(s => s.status === "active" || s.status === "trialing");
        if (live) {
          active = true;
          subStatus = live.status;
        }
      }
    }

    return res.status(200).json({ active, subStatus, customerId, email: outEmail || email || null });
  } catch (e) {
    console.error("sub-status error", e);
    return res.status(500).json({ error: "Subscription status check failed" });
  }
}
