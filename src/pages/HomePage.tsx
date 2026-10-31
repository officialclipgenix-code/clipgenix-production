import { ArrowDown, ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { ProjectGrid } from '../components/ProjectGrid'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { siteConfig } from '../config/site'
import { faqs, processSteps, services } from '../data/content'

export function HomePage() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <Meta title="Clipgenix Production | Helping Brands Become Brands" description={siteConfig.description} />
      <section className="hero">
        <div className="hero__glow hero__glow--one" aria-hidden="true" />
        <div className="hero__glow hero__glow--two" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <motion.p
              className="eyebrow eyebrow--light"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45 }}
            >
              Independent creative production studio
            </motion.p>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.08 }}
            >
              Helping Brands <span>Become Brands.</span>
            </motion.h1>
            <motion.p
              className="hero__lede"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.16 }}
            >
              Creative visuals, engaging videos and content for growing brands.
            </motion.p>
            <motion.div
              className="hero__actions"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.23 }}
            >
              <Link className="button button--ice" to="/portfolio">
                Explore our work <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="button button--outline-light" to="/contact">
                Start a project <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </motion.div>
            <p className="hero__note"><span aria-hidden="true" /> Thoughtful creative for the next stage of your brand</p>
          </div>

          <motion.div
            className="hero-art"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.18 }}
            aria-label="Abstract composition representing a creative product studio"
            role="img"
          >
            <div className="hero-art__orbit hero-art__orbit--outer" />
            <div className="hero-art__orbit hero-art__orbit--inner" />
            <div className="hero-art__glass">
              <div className="hero-art__shine" />
              <div className="hero-art__label">CG<br /><small>STUDIO</small></div>
            </div>
            <div className="hero-art__disc hero-art__disc--one" />
            <div className="hero-art__disc hero-art__disc--two" />
            <span className="hero-art__caption">A clearer point of view.</span>
            <span className="hero-art__index">01 — CREATIVE DIRECTION</span>
          </motion.div>
        </div>
        <a className="hero-scroll" href="#selected-work">
          <span>Scroll to explore</span><ArrowDown size={15} aria-hidden="true" />
        </a>
      </section>

      <section className="section section--intro">
        <div className="container intro-layout">
          <Reveal>
            <SectionHeading eyebrow="Clipgenix Production" title="Creative support for brands that want to feel clear, premium and memorable.">
              We build the visual language, product storytelling and campaign content that help small businesses and growing brands stand out with confidence.
            </SectionHeading>
          </Reveal>
          <div className="intro-grid">
            <article className="intro-card">
              <span className="intro-card__tag">For brands</span>
              <h3>Product-led businesses</h3>
              <p>From handmade products to online storefronts, we create visuals that make your offer easier to trust and easier to buy.</p>
            </article>
            <article className="intro-card">
              <span className="intro-card__tag">For growth</span>
              <h3>Creative content systems</h3>
              <p>We shape photography, motion and digital creatives around the way your audience actually discovers and engages with you.</p>
            </article>
            <article className="intro-card">
              <span className="intro-card__tag">For clarity</span>
              <h3>Better presentation</h3>
              <p>Every asset is designed to feel consistent, premium and aligned with your goals rather than built as a generic template.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--work" id="selected-work">
        <div className="container">
          <Reveal>
            <div className="section-row">
              <SectionHeading
                eyebrow="Selected direction"
                title="Ideas with a point of view."
                align="left"
              >
                A glimpse at the visual worlds Clipgenix can help shape. These are campaign concepts, not confirmed client commissions; visible brand marks do not imply affiliation or endorsement.
              </SectionHeading>
              <Link className="text-link section-row__link" to="/portfolio">
                View all concepts <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <ProjectGrid featuredOnly />
        </div>
      </section>

      <section className="section section--services">
        <div className="container">
          <Reveal>
            <div className="section-row">
              <SectionHeading eyebrow="What we create" title="Creative made for growing brands.">
                From a first product visual to a complete content direction, each project starts with your brief.
              </SectionHeading>
              <Link className="text-link section-row__link" to="/services">
                Explore services <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal key={service.number} delay={index * 0.06}>
                <article className="service-card">
                  <span className="service-card__number">{service.number}</span>
                  <div className="service-card__icon" aria-hidden="true"><Sparkles size={18} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to="/services" className="service-card__link">
                    View service <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--process">
        <div className="container process-layout">
          <Reveal>
            <SectionHeading eyebrow="A considered process" title="Good work starts with a good conversation.">
              Clear steps keep the creative moving and the expectations aligned.
            </SectionHeading>
            <Link className="button button--dark process-cta" to="/contact">
              Tell us about your project <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="process-list">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.07}>
                <article className="process-step">
                  <span className="process-step__number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <Check size={17} aria-hidden="true" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--why">
        <div className="container why-layout">
          <Reveal>
            <SectionHeading eyebrow="The Clipgenix approach" title="Creative work, without the guesswork.">
              The details are agreed up front, so you know what is being made and what happens next.
            </SectionHeading>
          </Reveal>
          <div className="why-points">
            {[
              ['Purposeful direction', 'Ideas start from your product, audience, and goals—not a one-size-fits-all template.'],
              ['Consistent visuals', 'A considered look helps your product and brand feel connected across each deliverable.'],
              ['Clear collaboration', 'Scope, timing, and review points are discussed before production moves forward.'],
            ].map(([title, description], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className="why-point">
                  <span className="why-point__mark" aria-hidden="true"><Check size={15} /></span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--faq">
        <div className="container faq-layout">
          <Reveal>
            <SectionHeading eyebrow="A few useful answers" title="Good to know." />
            <p className="faq-intro">Have a question that is not covered here? <Link to="/contact">Send us a note.</Link></p>
          </Reveal>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="container closing-cta__inner">
          <div>
            <p className="eyebrow eyebrow--light">Have something in mind?</p>
            <h2>Let’s make something<br /><span>worth remembering.</span></h2>
            <p>Bring the idea. We’ll help shape the visual direction.</p>
          </div>
          <div className="closing-cta__actions">
            <Link className="button button--ice" to="/contact">
              Discuss your project <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
