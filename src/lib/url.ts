const INTERNAL_EXT = /\.(md|txt)$/i

export function isInternalLink(href: string): boolean {
  try {
    const url = new URL(href, 'http://base')
    return INTERNAL_EXT.test(url.pathname)
  } catch {
    return false
  }
}

export function resolveRelativeUrl(href: string, baseDocUrl: string): string {
  return new URL(href, baseDocUrl).href
}

export function proxyUrl(url: string): string {
  if (import.meta.env.DEV) {
    return `https://corsproxy.io/?url=${encodeURIComponent(url)}`
  }
  return `/.netlify/functions/cors-proxy?url=${encodeURIComponent(url)}`
}

export function getUrlParam(): string | null {
  return new URL(window.location.href).searchParams.get('url')
}

export function buildAppUrl(docUrl: string): string {
  const u = new URL(window.location.href)
  u.searchParams.set('url', docUrl)
  return u.toString()
}
