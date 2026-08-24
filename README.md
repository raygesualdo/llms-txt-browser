# llms.txt Browser

A single-page app for previewing [llms.txt](https://llmstxt.org/) files. Paste a URL, and the app fetches the file and displays it in a split view: raw source on the left, rendered Markdown on the right.

## AI Disclosure

This project was planned by a human with Claude's help, written mostly by Claude, and edited and reviewed by a human.

## Features

- Side-by-side raw + rendered Markdown view
- Relative `.md` / `.txt` links navigate within the app
- External links open in a new tab
- Deep linking via `?url=` query parameter
- Dark mode (light / dark / system toggle)
- Frontmatter parsed and displayed as a key-value table
- Cross-origin fetching via [corsproxy.io](https://corsproxy.io)

## Development

### Prerequisites

- [asdf](https://asdf-vm.com/) for managing tool versions

### Setup

```sh
asdf install        # installs Node.js and pnpm from .tool-versions
pnpm install        # install dependencies
pnpm dev            # start dev server
```

### Tech Stack

- **React** + **TypeScript** (Vite)
- **Tailwind CSS v4** with `@tailwindcss/typography`
- **marked** for Markdown parsing
- **DOMPurify** for HTML sanitization
- Native **Navigation API** for client-side routing

### Scripts

| Command        | Description                      |
| -------------- | -------------------------------- |
| `pnpm dev`     | Start development server         |
| `pnpm build`   | Production build                 |
| `pnpm preview` | Preview production build locally |
