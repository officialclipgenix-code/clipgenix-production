import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'

export function NotFoundPage() {
  return (
    <>
      <Meta title="Page not found | Clipgenix Production" description="The page you’re looking for could not be found." />
      <section className="not-found">
        <div className="container not-found__inner">
          <p className="eyebrow">404 · Page not found</p>
          <h1>Looks like this page took a different direction.</h1>
          <p>The address may be incorrect or the page may have moved.</p>
          <div className="not-found__actions">
            <Link className="button button--dark" to="/"><ArrowLeft size={17} /> Back home</Link>
            <Link className="text-link" to="/contact">Get in touch <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
