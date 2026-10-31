const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '')
const defaultContactEmail = 'officialclipgenix@gmail.com'

export const siteConfig = {
  name: 'Clipgenix Production',
  tagline: 'Helping Brands Become Brands.',
  description:
    'Creative visuals, engaging videos and content for growing brands.',
  siteUrl,
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || defaultContactEmail,
  budgetCurrency: import.meta.env.VITE_BUDGET_CURRENCY || 'INR',
  emailJs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
}

export const hasEmailJsConfig = Object.values(siteConfig.emailJs).every(Boolean)

export const getMailtoUrl = (subject: string, body: string) => {
  if (!siteConfig.contactEmail) return ''
  const query = new URLSearchParams({ subject, body })
  return `mailto:${siteConfig.contactEmail}?${query.toString()}`
}
