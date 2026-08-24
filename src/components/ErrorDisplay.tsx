export function ErrorDisplay({
  error,
  url,
}: {
  error: string;
  url: string;
}) {
  const isNetworkError =
    error === "Failed to fetch" || error.includes("NetworkError");
  const isHttpError = error.startsWith("HTTP ");
  const statusCode = isHttpError ? error.replace("HTTP ", "") : null;

  let title = "Unable to load document";
  let description =
    "Something went wrong while fetching the file. The server may be unavailable or the URL may be incorrect.";

  if (isNetworkError) {
    title = "Network error";
    description =
      "Could not reach the server. This often happens when the server doesn't allow cross-origin requests (CORS), or you may be offline.";
  } else if (statusCode === "404") {
    title = "Document not found";
    description =
      "The server responded with a 404. Double-check the URL — the file may have been moved or removed.";
  } else if (statusCode === "403") {
    title = "Access denied";
    description =
      "The server refused the request. The file may require authentication or may not be publicly accessible.";
  } else if (statusCode && Number(statusCode) >= 500) {
    title = "Server error";
    description = `The server returned an error (${statusCode}). This is likely a temporary issue on their end — try again in a moment.`;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <svg
          className="h-7 w-7 text-red-500 dark:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <p className="mb-4 max-w-sm text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
      <p className="mb-5 max-w-sm break-all rounded-md bg-gray-100 px-3 py-2 font-mono text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        {url}
      </p>
    </div>
  );
}
