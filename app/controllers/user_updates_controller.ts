import type { HttpContext } from "@adonisjs/core/http";

export default class UserUpdatesController {
  async update({ auth, response, request }: HttpContext) {
    const payload = request.all();
    auth.user!.merge(payload);
    await auth.user!.save();

    return response.redirect().back();
  }
}
