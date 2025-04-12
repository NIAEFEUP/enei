/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from "@adonisjs/core/services/router";
import { middleware } from "#start/kernel";
import {
  emailVerificationThrottle,
  sendChangeEmailThrottle,
  sendChangePasswordThrottle,
  sendForgotPasswordThrottle,
} from "#start/limiter";
const CompanyController = () => import("#controllers/companies_controller");


const EventsController = () => import("#controllers/events_controller");
const AuthenticationController = () => import("#controllers/authentication_controller");
const OrdersController = () => import("#controllers/orders_controller");
const TicketsController = () => import("#controllers/tickets_controller");
const ProfilesController = () => import("#controllers/profiles_controller");
const UsersController = () => import("#controllers/users_controller");
const StoreController = () => import("#controllers/store_controller");
const ReferralsController = () => import("#controllers/referrals_controller");
const LeaderboardController = () => import("#controllers/leaderboard_controller");
const ProductReservationController = () => import("#controllers/product_reservation_controller");
const CompaniesController = () => import("#controllers/companies_controller");
const PaymentsController = () => import("#controllers/payments_controller");

router.on("/").renderInertia("home").as("pages:home");

router
  .group(() => {
    router
      .group(() => {
        router.on("/login").renderInertia("auth/login").as("pages:auth.login");
        router.post("/login", [AuthenticationController, "login"]).as("actions:auth.login");

        router.on("/register").renderInertia("auth/register").as("pages:auth.register");
        router
          .post("/register", [AuthenticationController, "register"])
          .as("actions:auth.register");
      })
      .use(middleware.guest());

    router
      .group(() => {
        router.post("/logout", [AuthenticationController, "logout"]).as("actions:auth.logout");

        router
          .group(() => {
            router.on("/verify").renderInertia("auth/verify").as("pages:auth.verify");
            router
              .post("/verify/new", [AuthenticationController, "retryEmailVerification"])
              .as("actions:auth.verify.send")
              .use(emailVerificationThrottle);
          })
          .use(middleware.noVerifiedEmail());
      })
      .use(middleware.auth());

    router
      .on("/password/forgot")
      .renderInertia("auth/forgot-password")
      .as("pages:auth.forgot-password")
      .use(middleware.guest());

    router
      .on("/password/forgot/sent")
      .renderInertia("auth/forgot-password/sent")
      .as("page:auth.forgot-password.sent")
      .use(middleware.guest());

    router
      .post("/password/forgot/new", [AuthenticationController, "sendForgotPassword"])
      .as("actions:auth.forgot-password.send")
      .use([middleware.guest(), sendForgotPasswordThrottle]);

    router
      .get("/password/forgot/callback", [AuthenticationController, "showForgotPasswordPage"])
      .as("pages:auth.forgot-password.callback")
      .middleware(middleware.verifyUrlSignature());

    router
      .post("/password/forgot/callback", [AuthenticationController, "callbackForForgotPassword"])
      .as("actions:auth.forgot-password.callback")
      .middleware(middleware.verifyUrlSignature());

    router
      .on("/password/forgot/success")
      .renderInertia("auth/forgot-password/success")
      .as("actions:auth.forgot-password.success");
    router
      .on("/verify/success")
      .renderInertia("auth/verify/success")
      .as("pages:auth.verify.success");

    router
      .route(
        "/verify/callback",
        ["GET", "POST"],
        [AuthenticationController, "callbackForEmailVerification"],
      )
      .as("actions:auth.verify.callback")
      .middleware([middleware.verifyUrlSignature(), middleware.automaticSubmit()]);

    // SOCIAL AUTHENTICATION

    // router
    //   .get('/github/initiate', [AuthenticationController, 'initiateGithubLogin'])
    //   .as('actions:auth.github.initiate')

    // router
    //   .get('/github/callback', [AuthenticationController, 'callbackForGithubLogin'])
    //   .middleware(middleware.verifySocialCallback({ provider: 'github' }))
    //   .as('actions:auth.github.callback')

    // // Google
    // router
    //   .get('/google/initiate', [AuthenticationController, 'initiateGoogleLogin'])
    //   .as('actions:auth.google.initiate')

    // router
    //   .get('/google/callback', [AuthenticationController, 'callbackForGoogleLogin'])
    //   .middleware(middleware.verifySocialCallback({ provider: 'google' }))
    //   .as('actions:auth.google.callback')

    // // LinkedIn
    // router
    //   .get('/linkedin/initiate', [AuthenticationController, 'initiateLinkedinLogin'])
    //   .as('actions:auth.linkedin.initiate')

    // router
    //   .get('/linkedin/callback', [AuthenticationController, 'callbackForLinkedinLogin'])
    //   .middleware(middleware.verifySocialCallback({ provider: 'linkedin' }))
    //   .as('actions:auth.linkedin.callback')
  })
  .middleware(middleware.requireAuthenticationEnabled())
  .prefix("/auth");

router
  .group(() => {
    router.get("/", [ProfilesController, "show"]).as("pages:signup");
    router.post("/", [ProfilesController, "create"]).as("actions:signup");
  })
  .prefix("/signup")
  .use([middleware.auth(), middleware.noProfile()]);

router
  .group(() => {
    router.get("/", [TicketsController, "index"]).as("pages:tickets");
    router
      .get("/:id/checkout", [TicketsController, "showPayment"])
      .as("checkout")
      .use([middleware.auth(), middleware.verifiedEmail(), middleware.participant()]);
  })
  .prefix("/tickets");

router
  .group(() => {
    //router.get('/', [OrdersController, 'index']) acho que isto já nao e usado
    router.post("/mbway", [OrdersController, "createMBWay"]);
    router.get("/:paymentId", [OrdersController, "show"]).as("payment.show");
    router.post("/callback", [PaymentsController, "callback"]).as("actions:payment.callback");
  })
  .use([middleware.auth(), middleware.verifiedEmail(), middleware.participant()])
  .prefix("payment");

router.group(() => {
  router.get("/u/:slug", [ProfilesController, "index"]).as("pages:profile.show");
  router
    .post("/u/:slug/product/collect", [ProductReservationController, "collect"])
    .as("actions:profile.product.collect")
    .use(middleware.staff());
  router
    .get("/profile", [ProfilesController, "default"])
    .as("pages:profile.default")
    .use([middleware.auth(), middleware.verifiedEmail()]);
  router
    .get("/profile/edit/:section", [ProfilesController, "edit"])
    .as("pages:profile.edit")
    .use([middleware.auth(), middleware.verifiedEmail(), middleware.wip()]);
  router
    .patch("/profile/edit", [ProfilesController, "update"])
    .as("actions:profile.update")
    .use([middleware.auth(), middleware.verifiedEmail(), middleware.wip()]);

  router
    .post("/profile/edit/password", [ProfilesController, "sendEditPassword"])
    .as("actions:profile.change-password.send")
    .use([middleware.requireAuthenticationEnabled(), middleware.auth(), sendChangePasswordThrottle])
    .use(middleware.wip());
  router
    .post("/profile/edit/email", [ProfilesController, "sendEditEmail"])
    .as("actions:profile.edit-email.send")
    .use([middleware.requireAuthenticationEnabled(), middleware.auth(), sendChangeEmailThrottle])
    .use(middleware.wip());
  router
    .route(
      "profile/edit/email/callback/confirm",
      ["GET", "POST"],
      [ProfilesController, "callbackForEmailChangeConfirmation"],
    )
    .as("actions:profile.edit-email.confirm.callback")
    .middleware([
      middleware.requireAuthenticationEnabled(),
      middleware.verifyUrlSignature(),
      middleware.automaticSubmit(),
    ])
    .use(middleware.wip());
  router
    .route(
      "profile/edit/email/callback/cancel",
      ["GET", "POST"],
      [ProfilesController, "callbackForEmailChangeCancelation"],
    )
    .as("actions:profile.edit-email.cancel.callback")
    .middleware([
      middleware.requireAuthenticationEnabled(),
      middleware.verifyUrlSignature(),
      middleware.automaticSubmit(),
    ])
    .use(middleware.wip());

  router
    .get("/u/:slug/cv", [ProfilesController, "showCV"])
    .as("pages:profile.cv.show")
    .use(middleware.wip());
  router
    .get("/u/:slug/avatar", [ProfilesController, "showAvatar"])
    .as("pages:profile.avatar.show")
    .use(middleware.wip());
  router.get("/u/:slug/info", [ProfilesController, "getInfo"]).as("actions:profile.info");
});

router
  .group(() => {
    router.get("/u/:slug", [ProfilesController, "index"]).as("pages:profile.show");
    router
      .post("/u/:slug/product/collect", [ProductReservationController, "collect"])
      .as("actions:profile.product.collect")
      .use(middleware.staff());
    router
      .get("/profile", [ProfilesController, "default"])
      .as("pages:profile.default")
      .use([middleware.auth(), middleware.verifiedEmail()]);
    router
      .get("/profile/edit/:section", [ProfilesController, "edit"])
      .as("pages:profile.edit")
      .use([middleware.auth(), middleware.verifiedEmail()]);
    router
      .patch("/profile/edit", [ProfilesController, "update"])
      .as("actions:profile.update")
      .use([middleware.auth(), middleware.verifiedEmail()]);
    
    router.get("/representative/profile", [ProfilesController, "getRepresentativeProfile"]).as("actions:representative.info")

    router
      .post("/profile/edit/password", [ProfilesController, "sendEditPassword"])
      .as("actions:profile.change-password.send")
      .use([
        middleware.requireAuthenticationEnabled(),
        middleware.auth(),
        sendChangePasswordThrottle,
      ]);
    router
      .post("/profile/edit/email", [ProfilesController, "sendEditEmail"])
      .as("actions:profile.edit-email.send")
      .use([middleware.requireAuthenticationEnabled(), middleware.auth(), sendChangeEmailThrottle]);
    router
      .route(
        "profile/edit/email/callback/confirm",
        ["GET", "POST"],
        [ProfilesController, "callbackForEmailChangeConfirmation"],
      )
      .as("actions:profile.edit-email.confirm.callback")
      .middleware([
        middleware.requireAuthenticationEnabled(),
        middleware.verifyUrlSignature(),
        middleware.automaticSubmit(),
      ]);
    router
      .route(
        "profile/edit/email/callback/cancel",
        ["GET", "POST"],
        [ProfilesController, "callbackForEmailChangeCancelation"],
      )
      .as("actions:profile.edit-email.cancel.callback")
      .middleware([
        middleware.requireAuthenticationEnabled(),
        middleware.verifyUrlSignature(),
        middleware.automaticSubmit(),
      ]);

    router.get("/u/:slug/cv", [ProfilesController, "showCV"]).as("pages:profile.cv.show");
    router
      .get("/u/:slug/avatar", [ProfilesController, "showAvatar"])
      .as("pages:profile.avatar.show");
    router.get("/u/:slug/info", [ProfilesController, "getInfo"]).as("actions:profile.info");
  });
 
  router
  .group(() => {
    router.get("/:name", [CompanyController, "profile"]).as("pages:company-profile");
  })
  .prefix("/company");

router
  .group(() => {
    router.get("/", [EventsController, "index"]).as("pages:events");

    router.get("/:id", [EventsController, "show"]).as("pages:events.show");
    router.post("/:id/register", [EventsController, "register"]).as("actions:events.register").use([
      middleware.auth(),
      middleware.verifiedEmail(),
      middleware.participant(),
      //middleware.hasPurchasedTicket(),
    ]);
    router.get("/:id/tickets", [EventsController, "ticketsRemaining"]).as("actions:events.tickets");

    router
      .post("/:slug/check-in", [EventsController, "checkin"])
      .as("actions:events.checkin")
      .use(middleware.staffOrRepresentative());

    router
      .get("/:id/is-registered", [EventsController, "isRegistered"])
      .as("actions:events.isRegistered");

    router
      .get("/:id/is-registered-by-email", [EventsController, "isRegisteredByEmail"])
      .as("actions:events.isRegisteredByEmail")
      .use([middleware.companyBearerAuth(), middleware.wip()]);
  })
  .prefix("events");

router.on("/faq").renderInertia("faq").as("pages:faq").use(middleware.wip());

router
  .group(() => {
    router.post("/cv/upload", [UsersController, "storeCV"]).as("actions:cv.upload");
    router.delete("cv/delete", [UsersController, "deleteCV"]).as("actions:cv.delete");
    router.get("/cv/name", [UsersController, "showCVName"]).as("actions:cv.name");

    // Avatar endpoints
    router.get("/avatar/name", [UsersController, "showAvatarName"]).as("actions:avatar.name");
    router.get("/avatar", [UsersController, "showAvatar"]).as("actions:avatar.show");
    router.post("/avatar/upload", [UsersController, "storeAvatar"]).as("actions:avatar.upload");
    router.delete("/avatar/delete", [UsersController, "deleteAvatar"]).as("actions:avatar.delete");
  })
  .use(middleware.auth())
  .prefix("user");

router
  .group(() => {
    router.get("/", [StoreController, "index"]).as("pages:store");
    router
      .post("/products/:id/buy/", [StoreController, "buy"])
      .as("actions:store.buy")
      .use(middleware.wip());
  })
  .prefix("/store");

// Referrals
router
  .group(() => {
    router.get("/", [ReferralsController, "showReferralLink"]).as("pages:referrals");
    router
      .post("/event/points/trigger/:id", [ReferralsController, "referralPointsAttribution"])
      .as("actions:referrals.event.pointattribution.trigger")
      .use(middleware.apiKeyProtected());
  })
  .prefix("/referrals")
  .middleware(middleware.auth());
1
router
  .route(`/r/:referralCode`, ["GET", "POST"], [ReferralsController, "link"])
  .middleware([middleware.automaticSubmit(), middleware.silentAuth()])
  .as("actions:referrals.link");

router
  .group(() => {
    router.get("/", [LeaderboardController, "index"]).as("pages:leaderboard");
  })
  .prefix("/leaderboard");

router
  .group(() => {
    router
      .get("/has-ticket/", [ProfilesController, "hasTicket"])
      .as("actions:has-ticket")
      .middleware(middleware.companyBearerAuth());
  })
  .prefix("api");

router
  .group(() => {
    router.on("/scan").renderInertia("company/qrscanner").as("pages:representative.qrcode.scan");
  })
  .use([middleware.auth(), middleware.representative()])
  .prefix("/representative");

router
  .group(() => {
    router.on("/scan").renderInertia("credentials").as("pages:staff.credentials.scan");
  })
  .use([middleware.auth(), middleware.staff()])
  .prefix("/credentials");

router.on("/nfc").renderInertia("nfc").as("pages:nfc");

router
  .group(() => {
    router
      .get("/participants", [CompaniesController, "showParticipants"])
      .as("pages:company.participants");
    router
      .post("/participants/like", [CompaniesController, "toggleParticipantLike"])
      .as("actions:company.like.participant");
  })
  .prefix("/company");
