import emailjs from '@emailjs/browser'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { Reveal } from '../components/Reveal'
import { getMailtoUrl, hasEmailJsConfig, siteConfig } from '../config/site'
import { services } from '../data/content'

type FormFields = {
  name: string
  email: string
  business: string
  service: string
  budget: string
  deadline: string
  brief: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

const emptyForm: FormFields = {
  name: '',
  email: '',
  business: '',
  service: '',
  budget: '',
  deadline: '',
  brief: '',
}

function validate(values: FormFields): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter an email address in a valid format.'
  }
  if (!values.brief.trim()) errors.brief = 'A short project brief helps us get started.'
  return errors
}

function enquiryMessage(values: FormFields) {
  return [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.business && `Brand: ${values.business}`,
    values.service && `Service: ${values.service}`,
    values.budget && `Budget: ${values.budget}`,
    values.deadline && `Preferred deadline: ${values.deadline}`,
    '',
    values.brief,
  ].filter(Boolean).join('\n')
}

export function ContactPage() {
  const [searchParams] = useSearchParams()
  const [values, setValues] = useState<FormFields>(() => ({
    ...emptyForm,
    service: searchParams.get('service') || '',
  }))
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)
  const [sending, setSending] = useState(false)
  const sendingRef = useRef(false)
  const mailtoFallback = getMailtoUrl(
    'Project enquiry for Clipgenix Production',
    enquiryMessage(values),
  )

  const updateField = (field: keyof FormFields, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatus(null)
  }

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sendingRef.current) return

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = (['name', 'email', 'brief'] as const).find((field) => nextErrors[field])
      if (firstInvalidField) document.getElementById(firstInvalidField)?.focus()
      setStatus({ type: 'error', message: 'Please review the highlighted fields.' })
      return
    }

    if (hasEmailJsConfig) {
      sendingRef.current = true
      setSending(true)
      try {
        await emailjs.send(
          siteConfig.emailJs.serviceId,
          siteConfig.emailJs.templateId,
          {
            from_name: values.name,
            reply_to: values.email,
            business_name: values.business,
            service: values.service,
            budget: values.budget,
            deadline: values.deadline,
            message: values.brief,
          },
          { publicKey: siteConfig.emailJs.publicKey },
        )
        setStatus({ type: 'success', message: 'Your enquiry was sent. Thank you — we’ll be in touch.' })
        setValues(emptyForm)
      } catch (error) {
        console.error('EmailJS enquiry delivery failed.', error)
        setStatus({
          type: 'error',
          message: 'Your enquiry was not sent. Please retry or open an email draft instead.',
        })
      } finally {
        sendingRef.current = false
        setSending(false)
      }
      return
    }

    if (mailtoFallback) {
      setStatus({ type: 'info', message: 'An email draft is opening. Send it from your mail app to complete the enquiry.' })
      window.location.href = mailtoFallback
      return
    }

    setStatus({
      type: 'error',
      message: 'Enquiry delivery is not configured yet. Set an email address or EmailJS details in the environment variables before accepting enquiries.',
    })
  }

  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(enquiryMessage(values))
      setStatus({ type: 'info', message: 'Your enquiry details were copied. This does not send the message.' })
    } catch {
      setStatus({ type: 'error', message: 'Clipboard access is unavailable in this browser. Please select and copy your enquiry manually.' })
    }
  }

  const fieldClass = (field: keyof FormFields) => errors[field] ? 'form-field has-error' : 'form-field'

  return (
    <>
      <Meta
        title="Contact | Start a project with Clipgenix Production"
        description="Tell Clipgenix about your product, creative needs, and project brief."
      />
      <section className="page-hero page-hero--contact">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="eyebrow">Start a project</p>
            <h1>Let’s talk about <span>what you’re building.</span></h1>
            <p className="page-hero__lede">Tell us where you are and what you need. A rough idea is a perfectly good place to start.</p>
          </Reveal>
          <div className="page-hero__aside">
            <span className="page-hero__index">Your next step</span>
            <p>Share the basics. We’ll use your note to understand the brief and discuss a suitable scope.</p>
            {siteConfig.contactEmail && (
              <a className="text-link" href={`mailto:${siteConfig.contactEmail}`}>
                <Mail size={16} /> Email us directly
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-layout">
          <Reveal>
            <div className="contact-copy">
              <p className="eyebrow">Project enquiry</p>
              <h2>A little context goes a long way.</h2>
              <p>Tell us what you are making, what you want the creative to do, and any dates you are working toward. We’ll take it from there.</p>
              <div className="contact-promise">
                <span><Check size={16} aria-hidden="true" /></span>
                <p>No pressure to have a perfect brief. We can shape the details together.</p>
              </div>
              <div className="contact-direct">
                <p className="footer-label">Prefer to reach out directly?</p>
                {siteConfig.contactEmail ? (
                  <a href={`mailto:${siteConfig.contactEmail}`}><Mail size={16} /> {siteConfig.contactEmail}</a>
                ) : (
                  <p className="contact-unconfigured">Business email is not configured yet.</p>
                )}
              </div>
            </div>
          </Reveal>

          <div className="contact-form-card">
            <form className="contact-form" onSubmit={submitEnquiry} noValidate aria-busy={sending}>
              <div className="form-row">
                <div className={fieldClass('name')}>
                  <label htmlFor="name">Full name <span aria-hidden="true">*</span></label>
                  <input
                    id="name" name="name" autoComplete="name" required
                    value={values.name} onChange={(event) => updateField('name', event.target.value)}
                    aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
                </div>
                <div className={fieldClass('email')}>
                  <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
                  <input
                    id="email" name="email" type="email" autoComplete="email" required
                    value={values.email} onChange={(event) => updateField('email', event.target.value)}
                    aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className={fieldClass('business')}>
                  <label htmlFor="business">Business or brand name <span className="optional-label">Optional</span></label>
                  <input
                    id="business" name="business" autoComplete="organization"
                    value={values.business} onChange={(event) => updateField('business', event.target.value)}
                  />
                </div>
                <div className={fieldClass('service')}>
                  <label htmlFor="service">Service you’re interested in <span className="optional-label">Optional</span></label>
                  <select id="service" name="service" value={values.service} onChange={(event) => updateField('service', event.target.value)}>
                    <option value="">Choose a service</option>
                    {services.map((service) => <option value={service.title} key={service.number}>{service.title}</option>)}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className={fieldClass('budget')}>
                  <label htmlFor="budget">
                    Budget range
                    {siteConfig.budgetCurrency && <span className="optional-label">({siteConfig.budgetCurrency})</span>}
                    <span className="optional-label">Optional</span>
                  </label>
                  <input
                    id="budget" name="budget" type="text"
                    placeholder="Your preferred range and currency"
                    value={values.budget} onChange={(event) => updateField('budget', event.target.value)}
                  />
                  <span className="field-hint">
                    Optional guide only; final pricing depends on the agreed scope.
                    {!siteConfig.budgetCurrency && ' Please specify currency in your brief.'}
                  </span>
                </div>
                <div className={fieldClass('deadline')}>
                  <label htmlFor="deadline">Preferred deadline <span className="optional-label">Optional</span></label>
                  <input
                    id="deadline" name="deadline" type="date"
                    value={values.deadline} onChange={(event) => updateField('deadline', event.target.value)}
                  />
                </div>
              </div>
              <div className={fieldClass('brief')}>
                <label htmlFor="brief">Project brief <span aria-hidden="true">*</span></label>
                <textarea
                  id="brief" name="brief" rows={5} required
                  placeholder="What are you making, and what would you like help creating?"
                  value={values.brief} onChange={(event) => updateField('brief', event.target.value)}
                  aria-invalid={Boolean(errors.brief)} aria-describedby={errors.brief ? 'brief-error' : undefined}
                />
                {errors.brief && <span className="field-error" id="brief-error">{errors.brief}</span>}
              </div>
              <p className="required-note"><span aria-hidden="true">*</span> Required fields</p>
              {status && (
                <p className={`form-status form-status--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
                  {status.message}
                </p>
              )}
              <div className="form-actions">
                <button
                  className="button button--dark"
                  type="submit"
                  disabled={sending}
                >
                  {sending
                    ? 'Sending enquiry…'
                    : hasEmailJsConfig
                      ? 'Send enquiry'
                      : siteConfig.contactEmail
                        ? 'Continue with email'
                        : 'Check & prepare enquiry'}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </button>
                {status?.type === 'error' && hasEmailJsConfig && mailtoFallback && (
                  <a className="button button--form-secondary" href={mailtoFallback}>
                    <Mail size={16} aria-hidden="true" /> Email draft
                  </a>
                )}
                <button className="copy-button" type="button" onClick={copyEnquiry} aria-label="Copy enquiry details">
                  <Copy size={16} aria-hidden="true" /><span>Copy</span>
                </button>
              </div>
              {!hasEmailJsConfig && (
                <p className="form-setup-note">
                  Automatic email is not configured. Submitting opens a prefilled draft to {siteConfig.contactEmail}; send it from your mail app to complete the enquiry.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
