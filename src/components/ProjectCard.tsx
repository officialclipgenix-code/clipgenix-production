import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { useState } from 'react'

type ProjectArtworkProps = {
  project: Project
  loading?: 'eager' | 'lazy'
  sizes?: string
}

export function ProjectArtwork({
  project,
  loading = 'lazy',
  sizes = '(max-width: 760px) calc(100vw - 42px), (max-width: 1020px) calc((100vw - 65px) / 2), 580px',
}: ProjectArtworkProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="artwork-fallback" role="img" aria-label={project.alt}>
        <span className="artwork-fallback__mark">C.</span>
        <span>Artwork unavailable</span>
      </div>
    )
  }

  return (
    <img
      src={project.coverImage}
      alt={project.alt}
      loading={loading}
      fetchPriority={loading === 'eager' ? 'high' : undefined}
      sizes={sizes}
      width="1792"
      height="2400"
      onError={() => setFailed(true)}
    />
  )
}

export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="project-card"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.25 } }}
      transition={{ duration: 0.45, delay }}
    >
      <Link
        className="project-card__link"
        to={`/portfolio/${project.slug}`}
        aria-label={`View ${project.title}, ${project.category} campaign concept`}
      >
        <div className="project-card__media">
          <ProjectArtwork project={project} />
          {project.concept && <span className="concept-badge">Campaign concept</span>}
          <span className="project-card__arrow" aria-hidden="true">
            <ArrowUpRight size={19} />
          </span>
        </div>
        <div className="project-card__info">
          <div>
            <h3>{project.title}</h3>
            <p>{project.category}</p>
          </div>
          <span className="project-card__text">Explore</span>
        </div>
      </Link>
    </motion.article>
  )
}
