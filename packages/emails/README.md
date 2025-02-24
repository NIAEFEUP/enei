# `@enei/emails`

## Usage

```ts
import { render } from "@enei/emails";

const { html, plainText } = await render("auth/email-verification", {
  logoUrl: "https://eneiconf.pt/images/logo-white.png",
  email: "participante@eneiconf.pt",
  verificationLink: "https://eneiconf.pt/auth/verify?email=participante@eneiconf.pt",
});
```

## Adding a new e-mail

1. Create a new file in `src/emails` with the component code.
2. Under `src/registry.ts`, add a new entry for the e-mail.

```diff
const registry = {
    'auth/email-verification': lazy(() => import('#emails/auth/email-verification.js')),
    'auth/forgot-password': lazy(() => import('#emails/auth/forgot-password.js')),
    'payment/confirm-purchase-email': lazy(() => import('#emails/payment/confirm-purchase-email.js')),
+   'custom/email': lazy(() => import('#emails/custom/email.js')),
};
```

3. Render the new e-mail.

```ts
import { render } from "@enei/emails";

const { html, plainText } = await render("custom/email", {
  // ...
});
```
