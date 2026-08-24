import { useState, useEffect, useCallback } from "react";

export function useNavigation() {
  const [url, setUrl] = useState(() => new URL(window.location.href));

  useEffect(() => {
    const handler = () => setUrl(new URL(window.location.href));
    window.navigation.addEventListener("navigatesuccess", handler);
    return () => window.navigation.removeEventListener("navigatesuccess", handler);
  }, []);

  const navigate = useCallback((to: string) => {
    window.navigation.navigate(to);
  }, []);

  return { url, navigate };
}
