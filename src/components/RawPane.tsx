export function RawPane({ content }: { content: string }) {
  return (
    <div className="overflow-auto overscroll-none bg-gray-50 p-4 shadow-[inset_-8px_0_12px_-8px_rgba(0,0,0,0.08)] dark:bg-gray-900 dark:shadow-[inset_-8px_0_12px_-8px_rgba(0,0,0,0.3)]">
      <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-800 dark:text-gray-200">
        {content}
      </pre>
    </div>
  );
}
