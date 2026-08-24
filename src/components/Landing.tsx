import { useState, type SubmitEvent } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { ErrorDisplay } from './ErrorDisplay'
import { fetchDocument } from '../hooks/useDocument'

const EXAMPLE_URL = 'https://docs.stripe.com/llms.txt'

export function Landing({
  onNavigate,
  theme,
  setTheme,
}: {
  onNavigate: (url: string, content: string) => void
  theme: 'light' | 'dark' | 'system'
  setTheme: (t: 'light' | 'dark' | 'system') => void
}) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const url = input.trim()
    if (!url) return
    await load(url)
  }

  async function load(url: string) {
    setLoading(true)
    setError(null)
    try {
      const content = await fetchDocument(url)
      onNavigate(url, content)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900">
      <div className="flex justify-end p-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-lg text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            llms.txt Browser
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Preview any{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800">
              llms.txt
            </code>{' '}
            file. Paste a URL to view the raw content alongside its rendered
            Markdown.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <label htmlFor="landing-url" className="sr-only">
              URL to an llms.txt file
            </label>
            <input
              id="landing-url"
              type="url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com/llms.txt"
              disabled={loading}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-indigo-500 px-5 py-3 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 dark:focus:ring-offset-gray-900"
            >
              {loading ? 'Loading...' : 'View'}
            </button>
          </form>
          {error && (
            <div className="mt-6">
              <ErrorDisplay error={error} url={input.trim()} />
            </div>
          )}
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Try an example:{' '}
            <button
              type="button"
              onClick={() => {
                setInput(EXAMPLE_URL)
                load(EXAMPLE_URL)
              }}
              className="text-indigo-500 underline hover:text-indigo-600 dark:text-indigo-400"
            >
              {EXAMPLE_URL}
            </button>
          </p>
        </div>
      </div>
      <footer className="shrink-0 border-t border-gray-200 px-4 py-3 text-center text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
        Built with Claude &middot;{' '}
        <a
          href="#"
          className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
      </footer>
    </div>
  )
}
