import User from "#models/user";
import { registerValidator } from "#validators/user";
import type { HttpContext } from "@adonisjs/core/http";
import { stripe } from "../../../inertia/lib/stripe.js";

export default class RegisterController {
  render({ inertia }: HttpContext) {
    return inertia.render("auth/register");
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator);

    const user = await User.create(payload);

    /* {* const stripeCustomer = await stripe.customers.create({
      name: user.fullName ?? undefined,
      email: user.email,
    });}  */

    // user.stripeCustomerId = stripeCustomer.id;
    await user.save();

    await auth.use("web").login(user);

    return response.redirect().back();
  }
}
