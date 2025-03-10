import { createComponentRegistry } from "@enei/utils/registry";
import { defer } from "@enei/utils/defer";

const emails = createComponentRegistry({
    "auth/email-verification": defer(() => import("#emails/auth/email-verification.js")),
    "auth/forgot-password": defer(() => import("#emails/auth/forgot-password.js")),
    "payment/confirm-purchase-email": defer(() => import("#emails/payment/confirm-purchase-email.js")),
})

export default emails
