import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { processSteps, services } from '../data/content'

export function ServicesPage() {
  return (
    <>
      <Meta
        title="Services | Clipgenix Production"
        description="Explore Clipgenix services for growing brands: product photography, AI video production, ad creatives, and brand content."
      />
      <section className="page-hero page-hero--services">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h1>Creative that brings your <span>brand into focus.</span></h1>
            <p className="page-hero__lede">Focused visual production for product-based businesses and emerging brands.</p>
          </Reveal>
          <div className="page-hero__aside">
            <span className="page-hero__index">What we make</span>
            <p>Every engagement is scoped around your brief, deliverables, and intended use.</p>
            <Link className="text-link" to="/contact">Tell us what you need <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
      <section className="section services-page">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Ways to work together" title="Four creative starting points.">
              Tell us about your product and the outcome you need; we can shape the right scope together.
            </SectionHeading>
          </Reveal>
          <div className="services-list">
            {services.map((service) => (
              <Reveal key={service.number}>
                <article className="service-detail">
                  <span className="service-detail__number">{service.number}</span>
                  <div className="service-detail__main">
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <ul>
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable}><Check size={15} aria-hidden="true" />{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                  <Link className="button button--outline-dark" to={`/contact?service=${encodeURIComponent(service.title)}`}>
                    Enquire <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--process services-process">
        <div className="container process-layout">
          <Reveal><SectionHeading eyebrow="How it works" title="A clear path from brief to delivery." /></Reveal>
          <div className="process-list">
            {processSteps.map((step) => (
              <article className="process-step" key={step.number}>
                <span className="process-step__number">{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
                <Check size={17} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="closing-cta">
        <div className="container closing-cta__inner">
          <div><p className="eyebrow eyebrow--light">Have a project in mind?</p><h2>Let’s shape the <span>right brief.</span></h2><p>Start with a conversation. We’ll take it from there.</p></div>
          <Link className="button button--ice" to="/contact">Start an enquiry <ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </>
  )
}
