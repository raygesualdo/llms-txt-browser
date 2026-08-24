import { useEffect, useRef } from "react";
import { parseDocument } from "../lib/markdown";
import { isInternalLink, resolveRelativeUrl } from "../lib/url";

export function RenderedPane({
  content,
  baseUrl,
  onNavigate,
  inert,
}: {
  content: string;
  baseUrl: string;
  onNavigate: (url: string) => void;
  inert: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { frontmatter, html } = parseDocument(content);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (isInternalLink(href)) {
        e.preventDefault();
        const resolved = resolveRelativeUrl(href, baseUrl);
        onNavigate(resolved);
      } else {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      }
    }

    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, [html, baseUrl, onNavigate]);

  return (
    <div
      ref={ref}
      inert={inert ? true : undefined}
      className={`overflow-auto overscroll-none bg-white p-6 dark:bg-gray-800 transition-opacity ${inert ? "opacity-50" : ""}`}
    >
      {frontmatter && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {Object.entries(frontmatter).map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="font-medium text-gray-500 dark:text-gray-400">
                  {key}
                </dt>
                <dd className="text-gray-900 dark:text-gray-100">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      <div
        className="prose prose-indigo max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
