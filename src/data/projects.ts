export type ProjectCategory =
  | 'Product Photography'
  | 'AI Video Production'
  | 'Ad Creatives'
  | 'Brand Content'

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  coverImage: string
  mediaType: 'image' | 'video'
  videoSrc?: string
  alt: string
  description: string
  objective: string
  approach: string
  deliverables: string[]
  featured: boolean
  concept: boolean
}

export const projects: Project[] = [
  {
    slug: 'jenny-rose-rose-is-gold',
    title: 'Jenny Rose — Rose Is Gold',
    category: 'Product Photography',
    coverImage: '/images/portfolio/watermark-removed-1000027519.png',
    mediaType: 'image',
    alt: 'Rose Is Gold perfume bottle set against oversized white lettering and blue script in a vertical campaign concept',
    description:
      'A fragrance campaign concept pairing a warm gold-toned bottle with bold typography and a high-contrast black backdrop.',
    objective:
      'Explore a premium fragrance visual that gives the bottle a clear focal point and a memorable campaign treatment.',
    approach:
      'The supplied artwork layers oversized white lettering, a centered perfume bottle, and a blue script accent to create a dramatic vertical composition.',
    deliverables: ['Fragrance art direction study', 'Vertical campaign composition', 'Typography and color study'],
    featured: true,
    concept: true,
  },
  {
    slug: 'luvu-lip-gloss-berry-kiss',
    title: 'LUVU — Lip Gloss Berry Kiss',
    category: 'Product Photography',
    coverImage: '/images/portfolio/Luvu.png',
    mediaType: 'image',
    alt: 'LUVU Lip Gloss Berry Kiss tube in the foreground with a model and playing-card details behind it',
    description:
      'A beauty campaign concept built around a reflective lip-gloss tube, berry-toned accents, and a playful card-inspired setting.',
    objective:
      'Explore a product-first beauty composition with enough contrast and character to stand out in a social feed.',
    approach:
      'The supplied image places the gloss prominently in the foreground and uses a softly focused model and playing cards as supporting visual details.',
    deliverables: ['Beauty campaign concept', 'Product-led composition study', 'Social creative direction'],
    featured: true,
    concept: true,
  },
  {
    slug: 'denim-icons-fashion-campaign',
    title: 'Denim Icons — Fashion Campaign',
    category: 'Ad Creatives',
    coverImage: '/images/portfolio/Woman_striding_past_denim_bag_2K_202609052231.jpeg',
    mediaType: 'image',
    alt: 'Model carrying a denim handbag in a modern glass atrium with Denim Icons campaign typography',
    description:
      'A fashion campaign concept using a denim handbag, architectural lines, and a cool blue palette for a bold editorial frame.',
    objective:
      'Explore a fashion-led composition that makes the bag the visual anchor while keeping the campaign setting aspirational.',
    approach:
      'The supplied artwork frames the model and bag against a modern atrium, with large campaign typography and supporting product copy.',
    deliverables: ['Fashion campaign concept', 'Editorial composition study', 'Digital ad direction'],
    featured: true,
    concept: true,
  },
  {
    slug: 'natural-haircare-shampoo-balm',
    title: 'Natural Haircare — Shampoo & Balm',
    category: 'Product Photography',
    coverImage: '/images/portfolio/Woman_holding_hair_care_bottles_2K_20261009225643.jpg.jpeg',
    mediaType: 'image',
    alt: 'Model holding pale green shampoo and natural hair balm bottles in a close-up haircare concept image',
    description:
      'A natural haircare campaign concept presenting shampoo and balm together in a bright, close-up beauty composition.',
    objective:
      'Explore a product pairing that communicates a simple haircare routine through clear, human-centered imagery.',
    approach:
      'The supplied artwork brings both bottles into the foreground and uses a close crop, clean background, and soft green packaging to keep attention on the product pair.',
    deliverables: ['Haircare campaign concept', 'Product pairing composition', 'Beauty content direction'],
    featured: true,
    concept: true,
  },
]

export const projectCategories: Array<'All' | ProjectCategory> = [
  'All',
  'Product Photography',
  'AI Video Production',
  'Ad Creatives',
  'Brand Content',
]
