# Contact, EmailJS, and Brand Settings

# Contact, EmailJS, and Brand Settings

## Confirmed public details

- Brand: Clipgenix Production
- Tagline: Helping Brands Become Brands.
- Business email: `officialclipgenix@gmail.com`
- Currency: INR

The site uses only the confirmed business email for direct contact. No phone number or social account is configured or displayed.

## Environment variables

`src/config/site.ts` reads the supported values below. Create `.env.local` for local values; keep it out of Git. `.gitignore` excludes `.env`, `.env.*`, and local variants while allowing `.env.example`.

```env
VITE_SITE_URL=
VITE_CONTACT_EMAIL=
VITE_BUDGET_CURRENCY=INR
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

`VITE_SITE_URL` is intentionally blank until the real site URL exists. Restart Vite after editing `.env.local`. Vite embeds every `VITE_*` value in browser code; never put passwords, private API keys, or other secrets there. The EmailJS public key is intended for browser use and must not be reported or copied into documentation.

## Contact form behavior

The form in `src/pages/ContactPage.tsx` requires a name, valid email address, and project brief. It prevents duplicate in-flight requests, shows loading and accessible success/error states, and preserves entered values when EmailJS rejects a request.

- With all EmailJS settings present, it submits the visitor's name, email, and brief plus optional business/service/budget/deadline values. The visitor email is sent as `reply_to`.
- Success is shown only when the EmailJS SDK request resolves. That confirms the provider accepted the request, not that the message reached the inbox.
- On failure, the visitor can retry or open a prefilled email draft to the confirmed mailbox.
- Without complete EmailJS configuration, submission opens a `mailto:` draft. The visitor must send it from their email application.
- The copy control only copies enquiry text; it does not send a message.

## EmailJS dashboard checks

The application sends these template parameters: `from_name`, `reply_to`, `business_name`, `service`, `budget`, `deadline`, and `message`. The `message` parameter contains the project brief. Ensure the EmailJS template uses those exact names.

Before accepting enquiries, manually verify in the EmailJS dashboard:

1. The template recipient is fixed to `officialclipgenix@gmail.com`, never supplied by the visitor.
2. The template's Reply-To field is set to `{{reply_to}}`.
3. The local development origin is allowed for local tests, and the actual production origin is added after deployment.
4. Provider-side abuse protections and usage limits are enabled as appropriate.
5. A real test enquiry arrives in the business mailbox, is not filtered to spam, and replies address the visitor. No real delivery test has been performed from this workspace.

Keep the configured service ID, template ID, and public key in `.env.local` and the deployment provider's environment settings, not in source files or documentation. Redeploy after changing hosted environment values.

## Before launch

- Confirm the EmailJS recipient, template parameters, Reply-To, allowed origins, and abuse controls in the dashboard.
- Send and verify a real test enquiry before claiming email delivery is working.
- Set `VITE_SITE_URL` only after the real public URL is assigned.
- Add only business details explicitly confirmed by the owner.
   - `message`
