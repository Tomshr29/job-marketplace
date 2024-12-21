import { updateAvatarValidator } from "#validators/user_validator";
import type { HttpContext } from "@adonisjs/core/http";
import { cuid } from "@adonisjs/core/helpers";
import app from "@adonisjs/core/services/app";

export default class UserAvatarsController {
  async update({ auth, request, response }: HttpContext) {
    const { avatar } = await request.validateUsing(updateAvatarValidator);

    if (!avatar?.isValid) {
      return response.badRequest({
        errors: avatar?.errors,
      });
    }

    await avatar.move(app.makePath("storage/uploads"), {
      name: `${cuid()}.${avatar.extname}`,
    });

    auth.user!.avatar = avatar.fileName ?? null;
    await auth.user!.save();

    return response.redirect().back();
  }
}
