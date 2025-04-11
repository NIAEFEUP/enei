/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from "@adonisjs/core/services/router";
import server from "@adonisjs/core/services/server";

/**
 * The error handler is used to convert an exception
 * to a HTTP response.
 */
server.errorHandler(() => import("#exceptions/handler"));

/**
 * The server middleware stack runs middleware on all the HTTP
 * requests, even if there is no route registered for
 * the request URL.
 */
server.use([
  () => import("#middleware/container_bindings_middleware"),
  () => import("@adonisjs/static/static_middleware"),
  () => import("@adonisjs/cors/cors_middleware"),
  () => import("@adonisjs/vite/vite_middleware"),
  () => import("@adonisjs/inertia/inertia_middleware"),
]);

/**
 * The router middleware stack runs middleware on all the HTTP
 * requests with a registered route.
 */
router.use([
  () => import("#middleware/update_logger_storage_middleware"),
  () => import("@adonisjs/core/bodyparser_middleware"),
  () => import("@adonisjs/session/session_middleware"),
  () => import("@adonisjs/shield/shield_middleware"),
  () => import("@adonisjs/auth/initialize_auth_middleware"),
  () => import("#middleware/auth/logout_if_authentication_disabled_middleware"),
  () => import("#middleware/log_user_middleware"),
  () => import("#middleware/update_logger_storage_middleware"),
  () => import("#middleware/link_to_user_middleware"),
  () => import("#middleware/initialize_bouncer_middleware"),
]);

/**
 * Named middleware collection must be explicitly assigned to
 * the routes or the routes group.
 */
export const middleware = router.named({
  staff: () => import("#middleware/staff_middleware"),
  hasPurchasedTicket: () => import("#middleware/has_purchased_ticket_middleware"),
  companyBearerAuth: () => import("#middleware/company_auth_middleware"),
  wip: () => import("#middleware/wip_middleware"),
  noVerifiedEmail: () => import("#middleware/auth/no_verified_email_middleware"),
  verifiedEmail: () => import("#middleware/auth/verified_email_middleware"),
  noProfile: () => import("#middleware/profile/no_profile_middleware"),
  participant: () => import("#middleware/profile/participant_middleware"),
  requireAuthenticationEnabled: () =>
    import("#middleware/auth/require_authentication_enabled_middleware"),
  verifyUrlSignature: () => import("#middleware/verify_url_signature_middleware"),
  automaticSubmit: () => import("#middleware/automatic_submit_middleware"),
  verifySocialCallback: () => import("#middleware/auth/verify_social_callback_middleware"),
  guest: () => import("#middleware/auth/guest_middleware"),
  auth: () => import("#middleware/auth/auth_middleware"),
  silentAuth: () => import("#middleware/auth/silent_auth_middleware"),
  finishRedirect: () => import("#middleware/finish_redirect_middleware"),
});
