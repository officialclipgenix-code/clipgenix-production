import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { ProjectArtwork } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { useState } from 'react'

function ProjectVideo({ project, src }: { project: Project; src: string }) {
  const [unavailable, setUnavailable] = useState(false)

  if (unavailable) {
    return (
      <div className="video-fallback">
        <ProjectArtwork project={project} />
        <p role="status">Video preview unavailable. Check the configured media file path.</p>
      </div>
    )
  }

  return (
    <video
      controls
      preload="metadata"
      poster={project.coverImage}
      aria-label={`${project.title} project video`}
      onError={() => setUnavailable(true)}
    >
      <source src={src} />
      Your browser does not support the video element.
    </video>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <>
        <Meta title="Project not found | Clipgenix Production" description="This portfolio project could not be found." />
        <section className="not-found">
          <div className="container not-found__inner">
            <p className="eyebrow">Project unavailable</p>
            <h1>That project isn’t here.</h1>
            <Link className="button button--dark" to="/portfolio"><ArrowLeft size={17} /> Back to portfolio</Link>
          </div>
        </section>
      </>
    )
  }

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 2)

  return (
    <>
      <Meta title={`${project.title} | Clipgenix Production`} description={project.description} />
      <section className="project-detail">
        <div className="container">
          <Link className="back-link" to="/portfolio"><ArrowLeft size={16} /> All projects</Link>
          <div className="project-detail__intro">
            <Reveal>
              <p className="eyebrow">{project.category}{project.concept ? ' · Campaign concept' : ''}</p>
              <h1>{project.title}</h1>
              <p className="project-detail__lede">{project.description}</p>
            </Reveal>
          </div>
          <div className="project-detail__media">
            {project.mediaType === 'video' && project.videoSrc ? (
              <ProjectVideo project={project} src={project.videoSrc} />
            ) : (
              <ProjectArtwork
                project={project}
                loading="eager"
                sizes="(max-width: 760px) calc(100vw - 42px), 900px"
              />
            )}
            {project.concept && <span className="concept-badge">Campaign concept</span>}
          </div>
          {project.concept && (
            <p className="concept-disclaimer">
              This is concept work, not a confirmed commission. Brand names or marks visible in the supplied image do not imply affiliation or endorsement.
            </p>
          )}
          <div className="project-detail__body">
            <div className="project-detail__story">
              <div>
                <p className="eyebrow">Concept objective</p>
                <p>{project.objective}</p>
              </div>
              <div>
                <p className="eyebrow">Concept approach</p>
                <p>{project.approach}</p>
              </div>
            </div>
            <aside className="deliverables-card">
              <p className="eyebrow">Concept scope</p>
              <h2>Study elements</h2>
              <ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link className="text-link" to="/contact">Discuss a similar project <ArrowUpRight size={16} /></Link>
            </aside>
          </div>
        </div>
      </section>
      <section className="section related-projects">
        <div className="container">
          <div className="section-row">
            <div><p className="eyebrow">Keep exploring</p><h2>More creative directions.</h2></div>
            <Link className="text-link" to="/portfolio">All concepts <ArrowRight size={16} /></Link>
          </div>
          <div className="project-grid">
            {related.map((item) => (
              <article className="project-card" key={item.slug}>
                <Link className="project-card__link" to={`/portfolio/${item.slug}`}>
                  <div className="project-card__media"><ProjectArtwork project={item} /></div>
                  <div className="project-card__info"><div><h3>{item.title}</h3><p>{item.category}</p></div><ArrowUpRight size={18} /></div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
