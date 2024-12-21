import type { HttpContext } from "@adonisjs/core/http";
import { stripe } from "./../../inertia/lib/stripe.js";

export default class StripeSubscriptionsController {
  async checkout({ auth, response }: HttpContext) {
    const user = auth.user!;
    const stripeCustomerId = user.stripeCustomerId ?? undefined;
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card", "link"],
      line_items: [
        {
          price:
            process.env.NODE_ENV === "development"
              ? "price_1QPraLKeFoLcM5s2KVgSJusr"
              : "",
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3333/success`,
      cancel_url: `http://localhost:3333/cancel`,
    });

    if (!session.url) {
      throw new Error("Session URL is missing");
    }
    return response.status(409).header("X-Inertia-Location", session.url!);
  }

  async portal({ auth, response }: HttpContext) {
    const user = auth.user!;

    const stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      console.error("Aucun Stripe customer ID trouvé");
      return response
        .status(400)
        .json({ error: "Stripe customer ID is missing" });
    }

    try {
      console.log("Création de la session Stripe...");

      const portal = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: `http://localhost:3333/`,
      });

      console.log("URL du portail : ", portal.url);

      return response.status(409).header("X-Inertia-Location", portal.url!);
    } catch (error) {
      console.error("Erreur Stripe :", error.message);
      return response.status(500).json({
        error: "Une erreur est survenue, veuillez réessayer plus tard.",
      });
    }
  }
}
