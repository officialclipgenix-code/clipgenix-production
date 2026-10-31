import { useEffect } from 'react'
import { siteConfig } from '../config/site'

type MetaProps = {
  title: string
  description: string
}

export function Meta({ title, description }: MetaProps) {
  useEffect(() => {
    document.title = title

    const setMeta = (selector: string, attribute: string, value: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector)
      element?.setAttribute(attribute, value)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    const pageUrl = siteConfig.siteUrl ? `${siteConfig.siteUrl}${window.location.pathname}` : ''
    const previewUrl = siteConfig.siteUrl ? `${siteConfig.siteUrl}/social-preview.png` : '/social-preview.png'
    setMeta('meta[property="og:image"]', 'content', previewUrl)
    setMeta('meta[name="twitter:image"]', 'content', previewUrl)
    if (pageUrl) setMeta('meta[property="og:url"]', 'content', pageUrl)

    if (siteConfig.siteUrl) {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }
      canonical.href = `${siteConfig.siteUrl}${window.location.pathname}`
    }
  }, [description, title])

  return null
}
