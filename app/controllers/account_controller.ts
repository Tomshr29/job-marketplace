import Property from "#models/property";
import type { HttpContext } from "@adonisjs/core/http";

export default class AccountController {
  render({ inertia }: HttpContext) {
    return inertia.render("account/settings");
  }

  async renderTools({ auth, inertia }: HttpContext) {
    const userId = auth.user?.id;
    const myProperty = await Property.query()
      .where("owner_id", userId!)
      .preload("owner");
    return inertia.render("account/tools", { myProperty });
  }
}
