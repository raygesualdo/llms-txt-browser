import { useState, type FormEvent } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Header({
  currentUrl,
  onNavigate,
  onHome,
  theme,
  setTheme,
}: {
  currentUrl: string;
  onNavigate: (url: string) => void;
  onHome: () => void;
  theme: "light" | "dark" | "system";
  setTheme: (t: "light" | "dark" | "system") => void;
}) {
  const [input, setInput] = useState(currentUrl);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) onNavigate(trimmed);
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900">
      <button
        type="button"
        onClick={onHome}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        aria-label="Home"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </button>
      <form onSubmit={handleSubmit} className="flex flex-1 items-center gap-2">
        <label htmlFor="url-input" className="sr-only">
          Document URL
        </label>
        <input
          id="url-input"
          type="url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com/llms.txt"
          className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Load
        </button>
      </form>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </header>
  );
}
