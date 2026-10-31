import type { ProjectCategory } from './projects'

export const services: Array<{
  title: ProjectCategory
  number: string
  description: string
  deliverables: string[]
}> = [
  {
    title: 'Product Photography',
    number: '01',
    description:
      'Product-focused visuals with a considered direction for online shops, launches, and social channels.',
    deliverables: ['Product image direction', 'Styled compositions', 'Web and social crops'],
  },
  {
    title: 'AI Video Production',
    number: '02',
    description:
      'Short-form video concepts and production shaped around your product, audience, and approved creative brief.',
    deliverables: ['Creative treatment', 'Short-form video', 'Platform-ready versions'],
  },
  {
    title: 'Ad Creatives',
    number: '03',
    description:
      'Clear, on-brand campaign visuals designed to communicate one idea at a time across digital placements.',
    deliverables: ['Creative concepts', 'Static ad formats', 'Campaign-ready exports'],
  },
  {
    title: 'Brand Content',
    number: '04',
    description:
      'A consistent visual direction for the stories and everyday moments that help people understand your brand.',
    deliverables: ['Content direction', 'Social-first visuals', 'Reusable content themes'],
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We learn about your product, audience, goals, and the practical details of the brief.',
  },
  {
    number: '02',
    title: 'Shape the idea',
    description:
      'We agree on a creative direction, scope, deliverables, and timing before production begins.',
  },
  {
    number: '03',
    title: 'Create',
    description:
      'The approved direction becomes a focused production process with clear communication along the way.',
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'Final files are supplied in the agreed formats, with any handoff details confirmed for your project.',
  },
]

export const faqs = [
  {
    question: 'How do project prices work?',
    answer:
      'Pricing depends on the brief, production scope, deliverables, and usage needs. Share a little about your project and we can discuss a tailored estimate before work begins.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'Timing varies with the type and scope of the work. We will confirm an estimated schedule and any review milestones as part of the project proposal.',
  },
  {
    question: 'What should I include in an enquiry?',
    answer:
      'A short description of your product, what you want to create, where the content will be used, and any important dates is a helpful starting point. You do not need a finished brief.',
  },
  {
    question: 'Are revisions included?',
    answer:
      'The number and type of review rounds will be agreed in writing for each project, so expectations are clear before production starts.',
  },
  {
    question: 'Can I request a service that is not listed?',
    answer:
      'Yes. Tell us what you are trying to make and we can let you know whether it fits the studio’s current scope or suggest a suitable next step.',
  },
]
