# Contact inquiry notifications

The Contact form uses Resend as its primary delivery channel. A submission is accepted only when Resend accepts the email request. Optional Meta WhatsApp notifications never change a successful email response.

## Resend

1. Create a Resend account and verify the sender domain.
2. Create an API key with email-send permission.
3. Set `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, and `INQUIRY_NOTIFICATION_EMAIL` in the deployment environment.
4. Confirm the recipient address is active before using it. Do not assume `projects@bsjbuilders.in` is active without business confirmation.

`INQUIRY_FROM_EMAIL` must use a domain verified in Resend, for example `BSJ Builders <inquiries@your-verified-domain.com>`.

## Meta WhatsApp Cloud API

WhatsApp is optional. It requires a Meta Business account, a Cloud API phone number, a recipient business number, an access token, and an approved business-initiated template.

Set `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_RECIPIENT_NUMBER`, `WHATSAPP_TEMPLATE_NAME`, `WHATSAPP_TEMPLATE_LANGUAGE`, and `WHATSAPP_GRAPH_API_VERSION`.

Set `WHATSAPP_TEMPLATE_COMPONENTS_JSON` to the exact JSON component structure approved for the selected template. It may include `{{reference}}`, `{{projectType}}`, and `{{location}}`, which are safely substituted by the server. The integration intentionally does not send when this value is absent or invalid, preventing assumptions about the approved template parameter structure.

## Legacy webhook

`INQUIRY_WEBHOOK_URL` remains documented for compatibility but is not called by the Resend-first route. Leave it blank unless a future intentional integration is added; this avoids duplicate notifications.

## Safe testing and troubleshooting

Use a verified test recipient and verified Resend sender domain. Confirm the delivered email reference ID, then test the approved WhatsApp template separately in Meta. Provider acceptance is not proof that a human recipient has read a notification.

The route has server-side validation, a honeypot, a 30-second in-memory IP throttle, input limits and a Resend request timeout. These in-memory controls are not durable retry or idempotency guarantees. A production retry queue or database-backed idempotency store is required for that level of reliability.

Never place secrets in `NEXT_PUBLIC_*` variables or client-side code. Configure all values in the deployment environment rather than committing them.
