import type { HttpContext } from "@adonisjs/core/http";
import app from "@adonisjs/core/services/app";
import { stripe } from "../../inertia/lib/stripe.js";
import User from "#models/user";

export default class StripeWebhooksController {
  async handle({ request, response }: HttpContext) {
    let event;
    const isProd = app.inProduction;

    try {
      const sig = request.header("stripe-signature");
      event = stripe.webhooks.constructEvent(
        request.raw() || "",
        sig || "",
        process.env.STRIPE_WEBHOOK_SECRET || "",
      );
    } catch (error) {
      return response.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.livemode !== isProd) return;

    switch (event.type) {
      case "charge.succeeded":
        console.log("Charge succeeded");
        try {
          const stripeCustomerId = event.data.object.customer;
          const user = await User.findBy(
            "stripe_customer_id",
            stripeCustomerId,
          );
          if (user) {
            user.plan = "MASTER";
            await user.save();

            console.log(`User ${user.email} upgraded to MASTER`);
          } else {
            console.warn(`User with Stripe ID ${stripeCustomerId} not found`);
          }
        } catch (err) {
          console.error("Error updating user plan:", err.message);
        }
        break;
      case "checkout.session.completed":
        console.log("Checkout session completed");
        break;
      case "customer.subscription.updated":
        console.log("Customer subscription updated");
        break;
      case "customer.subscription.deleted":
        console.log("Customer subscription deleted");
        break;
      case "checkout.session.completed":
        console.log("Checkout session completed");
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }
}
