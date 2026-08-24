import { useCallback, useRef } from "react";
import { Landing } from "./components/Landing";
import { Viewer } from "./components/Viewer";
import { useTheme } from "./hooks/useTheme";
import { useNavigation } from "./hooks/useNavigation";
import { useDocument } from "./hooks/useDocument";
import { buildAppUrl } from "./lib/url";

export default function App() {
  const { theme, setTheme } = useTheme();
  const { url, navigate } = useNavigation();
  const docUrl = url.searchParams.get("url");
  const { content, loading, error } = useDocument(docUrl);
  const prefetchedRef = useRef<string | null>(null);

  const handleLandingNavigate = useCallback(
    (targetUrl: string, fetchedContent: string) => {
      prefetchedRef.current = fetchedContent;
      navigate(buildAppUrl(targetUrl));
    },
    [navigate]
  );

  const handleViewerNavigate = useCallback(
    (targetUrl: string) => {
      navigate(buildAppUrl(targetUrl));
    },
    [navigate]
  );

  const handleHome = useCallback(() => {
    navigate(window.location.pathname);
  }, [navigate]);

  if (!docUrl) {
    return (
      <Landing
        onNavigate={handleLandingNavigate}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  const displayContent = prefetchedRef.current ?? content;
  if (content && prefetchedRef.current) {
    prefetchedRef.current = null;
  }

  return (
    <Viewer
      content={displayContent}
      loading={loading && !displayContent}
      error={error}
      docUrl={docUrl}
      onNavigate={handleViewerNavigate}
      onHome={handleHome}
      theme={theme}
      setTheme={setTheme}
    />
  );
}
