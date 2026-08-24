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
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-indigo-100 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgb(99 102 241 / 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative flex justify-end p-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-lg text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-gray-100">
            llms.txt Browser
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            Preview any{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800">
              llms.txt
            </code>{' '}
            file. Paste a URL to view the raw content alongside its rendered
            Markdown.
          </p>
          <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 p-0.5 shadow-[0_0_40px_-12px_rgba(99,102,241,0.3)] dark:shadow-[0_0_40px_-12px_rgba(99,102,241,0.5)]">
            <form onSubmit={handleSubmit} className="flex">
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
                className="flex-1 rounded-l-md border-0 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-60 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-r-md bg-indigo-500 px-5 py-3 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none disabled:opacity-60"
              >
                {loading ? 'Loading...' : 'View'}
              </button>
            </form>
          </div>
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
