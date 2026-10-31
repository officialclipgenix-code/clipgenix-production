import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { ProjectGrid } from '../components/ProjectGrid'
import { Reveal } from '../components/Reveal'

export function PortfolioPage() {
  return (
    <>
      <Meta
        title="Portfolio | Clipgenix Production"
        description="Explore Clipgenix campaign concepts for fragrance, beauty, fashion, and haircare products."
      />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="eyebrow">The portfolio</p>
            <h1>Visual ideas, made <span>with intention.</span></h1>
            <p className="page-hero__lede">
              Explore the creative directions Clipgenix can bring to product stories and growing brands.
            </p>
          </Reveal>
          <div className="page-hero__aside">
            <span className="page-hero__index">01 / 04</span>
            <p>Creative concepts across imagery, motion, and brand content.</p>
            <Link className="text-link" to="/contact">Start a conversation <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
      <section className="section portfolio-page">
        <div className="container">
          <Reveal>
            <div className="portfolio-notice">
              <span className="portfolio-notice__dot" aria-hidden="true" />
              <p>
                <strong>Campaign concepts, clearly labeled.</strong> These studies use the supplied artwork and are not confirmed client commissions. Brand names or marks visible in an image do not indicate affiliation or endorsement.
              </p>
            </div>
          </Reveal>
          <ProjectGrid filtered />
        </div>
      </section>
    </>
  )
}
