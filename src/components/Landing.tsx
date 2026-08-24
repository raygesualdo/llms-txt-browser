import { useState, type MouseEvent, type SubmitEvent } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { buildAppUrl } from '../lib/url'

const EXAMPLE_URL = 'https://docs.stripe.com/llms.txt'

export function Landing({
  onNavigate,
  theme,
  setTheme,
}: {
  onNavigate: (url: string) => void
  theme: 'light' | 'dark' | 'system'
  setTheme: (t: 'light' | 'dark' | 'system') => void
}) {
  const [input, setInput] = useState('')

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const url = input.trim()
    if (!url) return
    onNavigate(url)
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
      <div className="relative flex justify-end px-4 h-14 shrink-0 items-center">
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
              className="flex-1 rounded-l-lg border border-r-0 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-indigo-500 px-5 py-3 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              View
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Try an example:{' '}
            <a
              href={buildAppUrl(EXAMPLE_URL)}
              onClick={(e: MouseEvent) => {
                e.preventDefault()
                onNavigate(EXAMPLE_URL)
              }}
              className="text-indigo-500 underline hover:text-indigo-600 dark:text-indigo-400"
            >
              {EXAMPLE_URL}
            </a>
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
