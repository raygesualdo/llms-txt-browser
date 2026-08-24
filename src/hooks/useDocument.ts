import { useState, useEffect, useRef } from 'react'
import { proxyUrl } from '../lib/url'

interface DocumentState {
  content: string | null
  loading: boolean
  error: string | null
}

export function useDocument(docUrl: string | null) {
  const [state, setState] = useState<DocumentState>({
    content: null,
    loading: !!docUrl,
    error: null,
  })
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!docUrl) {
      setState({ content: null, loading: false, error: null })
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setState((prev) => ({ ...prev, loading: true, error: null }))

    fetch(proxyUrl(docUrl), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((content) => {
        if (!controller.signal.aborted) {
          setState({ content, loading: false, error: null })
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setState({ content: null, loading: false, error: err.message })
        }
      })

    return () => controller.abort()
  }, [docUrl])

  return state
}

export function fetchDocument(docUrl: string): Promise<string> {
  return fetch(proxyUrl(docUrl)).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.text()
  })
}
