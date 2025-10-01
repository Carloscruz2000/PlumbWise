// api/subscription-status.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { session_id, email } = req.body || {};
    let active = false, customerId = null, subStatus = null, outEmail = email || null;

    if (session_id) {
      // 1) Coming back from Checkout success
      const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["subscription", "customer"] });
      customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
      outEmail = outEmail || session.customer_details?.email || session.customer?.email || null;

      // Check subscription on the session
      const sub = session.subscription;
      if (sub && typeof sub === "object") {
        subStatus = sub.status;
        active = sub.status === "active" || sub.status === "trialing";
      } else if (customerId) {
        // Fallback: look up active subs for the customer
        const subs = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 10 });
        const live = subs.data.find(s => s.status === "active" || s.status === "trialing");
        active = !!live;
        subStatus = live?.status || null;
      }
    } else if (email) {
      // 2) Later page loads: look up by email
      // Search for customer by email (needs Search enabled on your account; if not, fallback to list)
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
        active = !!live;
        subStatus = live?.status || null;
      }
    } else {
      return res.status(400).json({ error: "Provide session_id or email" });
    }

    return res.status(200).json({ active, customerId, subStatus, email: outEmail });
  } catch (e) {
    console.error("sub-status error", e);
    return res.status(500).json({ error: "Subscription status check failed" });
  }
}
