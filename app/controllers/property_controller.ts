import Property from "#models/property";
import { createPropertyValidator } from "#validators/property";
import type { HttpContext } from "@adonisjs/core/http";
import { cuid } from "@adonisjs/core/helpers";
import app from "@adonisjs/core/services/app";

export default class PropertyController {
  public async index({ inertia }: HttpContext) {
    const properties = await Property.query()
      .preload("owner")
      .orderBy("created_at", "desc");
    return inertia.render("property/index", { properties });
  }

  public async create({ inertia }: HttpContext) {
    return inertia.render("property/create");
  }

  public async store({ auth, request, response }: HttpContext) {
    if (!auth.user) {
      return response.redirect().toPath("/login");
    }
    const user = auth.user!;
    const payload = await request.validateUsing(createPropertyValidator);
    if (!payload.avatarProperty?.isValid) {
      return response.badRequest({
        errors: payload.avatarProperty?.errors,
      });
    }
    await payload.avatarProperty.move(app.makePath("storage/uploads"), {
      name: `${cuid()}.${payload.avatarProperty.extname}`,
    });
    await Property.create({
      ...payload,
      ownerId: user.id,
      avatarProperty: payload.avatarProperty.fileName,
    });
    return response.redirect().toPath("/property");
  }

  async show({ inertia, params }: HttpContext) {
    const property = await Property.query()
      .preload("owner")
      .where("id", params.id)
      .firstOrFail();
    return inertia.render("property/show", { property });
  }

  async destroy({ response, params }: HttpContext) {
    const property = await Property.findOrFail(params.id);
    await property.delete();
    return response.redirect().back();
  }
}
