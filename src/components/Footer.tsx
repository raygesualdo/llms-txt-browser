export function Footer({ className = '' }: { className?: string }) {
  return (
    <footer
      className={`shrink-0 border-t border-gray-200 px-4 py-3 text-center text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400 ${className}`}
    >
      Built with Claude &middot; Proxies through{' '}
      <a
        href="https://corsproxy.io"
        className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        corsproxy.io
      </a>{' '}
      &middot;{' '}
      <a
        href="https://github.com/raygesualdo/llms-txt-browser"
        className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source Code
      </a>
    </footer>
  )
}
