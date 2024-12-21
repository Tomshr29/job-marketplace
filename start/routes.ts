/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router";
import { middleware } from "./kernel.js";

const RegisterController = () =>
  import("#controllers/auth/register_controller");
const LoginController = () => import("#controllers/auth/login_controller");
const AccountController = () => import("#controllers/account_controller");
const StripeWebhooksController = () =>
  import("#controllers/stripe_webhooks_controller");
const StripeSubscriptionsController = () =>
  import("#controllers/stripe_subscriptions_controller");
const UserAvatarsController = () =>
  import("#controllers/user_avatars_controller");
const PropertyController = () => import("#controllers/property_controller");
const UpdateUsersController = () =>
  import("#controllers/user_updates_controller");

router.on("/").renderInertia("home").use(middleware.silentAuth());

router.get("register", [RegisterController, "render"]).use(middleware.guest());
router.post("register", [RegisterController, "store"]);

router.get("login", [LoginController, "render"]).use(middleware.guest());
router.post("login", [LoginController, "store"]);

router
  .post("logout", async ({ auth, response }) => {
    await auth.use("web").logout();
    return response.redirect().back();
  })
  .use(middleware.auth());

router
  .group(() => {
    router.get("account/settings", [AccountController, "render"]);
    router.get("account/tools", [AccountController, "renderTools"]);
    router.get("/property", [PropertyController, "index"]);
    router.get("/property/create", [PropertyController, "create"]);
    router.post("/property", [PropertyController, "store"]);
    router.get("/property/:id", [PropertyController, "show"]);
  })
  .use(middleware.auth());

router.post("/stripe/webhook", [StripeWebhooksController, "handle"]);
router
  .post("/stripe/subscription", [StripeSubscriptionsController, "checkout"])
  .use(middleware.auth());
router
  .post("/stripe/portal", [StripeSubscriptionsController, "portal"])
  .use(middleware.auth());
router.get("/success", async ({ inertia }) => {
  return inertia.render("success");
});

router
  .post("/settings/avatar", [UserAvatarsController, "update"])
  .use(middleware.auth());

router
  .post("/settings/update", [UpdateUsersController, "update"])
  .use(middleware.auth());

router
  .delete("/property/:id/delete", [PropertyController, "destroy"])
  .use(middleware.auth());
