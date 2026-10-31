import { useState } from 'react'
import { projects, projectCategories } from '../data/projects'
import type { ProjectCategory } from '../data/projects'
import { ProjectCard } from './ProjectCard'

type ProjectGridProps = {
  filtered?: boolean
  featuredOnly?: boolean
}

export function ProjectGrid({ filtered = false, featuredOnly = false }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All')
  const items = projects.filter((project) => {
    if (featuredOnly && !project.featured) return false
    return activeCategory === 'All' || project.category === activeCategory
  })

  return (
    <>
      {filtered && (
        <div className="filter-list" role="group" aria-label="Filter projects by service">
          {projectCategories.map((category) => (
            <button
              className={`filter-chip${activeCategory === category ? ' is-active' : ''}`}
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      <div className="project-grid" aria-live="polite">
        {items.map((project, index) => (
          <ProjectCard key={project.slug} project={project} delay={index * 0.06} />
        ))}
        {items.length === 0 && (
          <p className="empty-state">No projects match this category yet.</p>
        )}
      </div>
    </>
  )
}
