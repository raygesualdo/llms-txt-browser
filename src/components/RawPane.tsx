export function RawPane({ content }: { content: string }) {
  return (
    <pre className="whitespace-pre-wrap break-words p-4 font-mono text-sm text-gray-800 dark:text-gray-200">
      {content}
    </pre>
  );
}
