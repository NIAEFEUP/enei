import { createComponentRegistry, type Component, type ComponentProps } from "@enei/utils/registry";
import { defer } from "@enei/utils/defer";

export const emails = createComponentRegistry({
    "auth/email-verification": defer(() => import("#emails/auth/email-verification.js")),
    "auth/forgot-password": defer(() => import("#emails/auth/forgot-password.js")),
    "payment/confirm-purchase-email": defer(() => import("#emails/payment/confirm-purchase-email.js")),
})

export type Email<K extends keyof typeof emails.components> = Component<typeof emails.components, K>;
export type EmailProps<K extends keyof typeof emails.components> = ComponentProps<typeof emails.components, K>;
