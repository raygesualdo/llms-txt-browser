import { Header } from "./Header";
import { ErrorDisplay } from "./ErrorDisplay";
import { RawPane } from "./RawPane";
import { RenderedPane } from "./RenderedPane";

export function Viewer({
  content,
  loading,
  error,
  docUrl,
  onNavigate,
  onHome,
  theme,
  setTheme,
}: {
  content: string | null;
  loading: boolean;
  error: string | null;
  docUrl: string;
  onNavigate: (url: string) => void;
  onHome: () => void;
  theme: "light" | "dark" | "system";
  setTheme: (t: "light" | "dark" | "system") => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <Header
        currentUrl={docUrl}
        onNavigate={onNavigate}
        onHome={onHome}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        {error && !content ? (
          <div className="col-span-full flex items-center justify-center">
            <ErrorDisplay error={error} url={docUrl} />
          </div>
        ) : content ? (
          <>
            <RawPane content={content} />
            <RenderedPane
              content={content}
              baseUrl={docUrl}
              onNavigate={onNavigate}
              inert={loading}
            />
          </>
        ) : loading ? (
          <div className="col-span-full flex items-center justify-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          </div>
        ) : null}
      </div>
      <footer className="shrink-0 border-t border-gray-200 bg-white px-4 py-2 text-center text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
        Built with Claude &middot;{" "}
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
  );
}
