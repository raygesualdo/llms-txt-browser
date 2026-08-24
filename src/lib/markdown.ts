import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({
  gfm: true,
  breaks: false,
});

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

export interface ParsedDocument {
  frontmatter: Record<string, string> | null;
  html: string;
}

function parseFrontmatter(source: string): { meta: Record<string, string> | null; body: string } {
  const match = source.match(FRONTMATTER_RE);
  if (!match) return { meta: null, body: source };

  const raw = match[1];
  const meta: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) meta[key] = value;
  }

  const body = source.slice(match[0].length).replace(/^\r?\n/, "");
  return { meta: Object.keys(meta).length > 0 ? meta : null, body };
}

export function parseDocument(source: string): ParsedDocument {
  const { meta, body } = parseFrontmatter(source);
  const raw = marked.parse(body) as string;
  return {
    frontmatter: meta,
    html: DOMPurify.sanitize(raw),
  };
}
