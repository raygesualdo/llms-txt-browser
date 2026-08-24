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
        ) : (
          <>
            <div className="overflow-auto overscroll-none bg-gray-50 shadow-[inset_-8px_0_12px_-8px_rgba(0,0,0,0.08)] dark:bg-gray-900 dark:shadow-[inset_-8px_0_12px_-8px_rgba(0,0,0,0.3)]">
              {content ? (
                <RawPane content={content} />
              ) : (
                <div className="flex h-full items-center justify-center p-4">
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Fetching document...
                  </p>
                </div>
              )}
            </div>
            <div
              inert={loading ? true : undefined}
              className={`overflow-auto overscroll-none bg-white dark:bg-gray-800 transition-opacity ${loading ? "opacity-50" : ""}`}
            >
              {content ? (
                <RenderedPane
                  content={content}
                  baseUrl={docUrl}
                  onNavigate={onNavigate}
                />
              ) : (
                <div className="flex h-full items-center justify-center p-4">
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Rendered preview will appear here
                  </p>
                </div>
              )}
            </div>
          </>
        )}
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
