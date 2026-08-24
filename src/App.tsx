import { useCallback } from "react";
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

  const handleNavigate = useCallback(
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
        onNavigate={handleNavigate}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  return (
    <Viewer
      content={content}
      loading={loading}
      error={error}
      docUrl={docUrl}
      onNavigate={handleNavigate}
      onHome={handleHome}
      theme={theme}
      setTheme={setTheme}
    />
  );
}
