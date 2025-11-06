# Repository Guidelines

## Project Structure & Module Organization
The Hugo site lives under `content/`, with posts grouped in `content/blog/`, standalone pages at `content/*.md`, and archetype defaults in `archetypes/default.md`. Layout overrides go in `layouts/` (notably `layouts/partials/` for header/footer tweaks). Static assets belong in `static/` (images under `static/images/`). `public/` contains the generated site that GitHub Pages serves; regenerate it rather than editing by hand. Sitewide settings sit in `config.toml`, with `hugo.toml.bak` kept as a backup configuration.

## Build, Test, and Development Commands
- `hugo server -D` — launches the local preview at http://localhost:1313 with drafts and automatic reloads.
- `hugo --gc --minify` — produces a production build in `public/`, removing unused resources.
- `hugo new posts/my-new-post.md` — scaffolds a post using `archetypes/default.md`; adjust the slug and front matter right away.

## Coding Style & Naming Conventions
Markdown content uses TOML front matter delimited by `+++`. Keep fields ordered as `title`, `date`, `draft`, `tags`, `description` to mirror existing posts. Dates should be ISO 8601 with timezone offsets (for example, `2025-09-10T10:30:00+01:00`). Use lowercase, hyphenated filenames like `content/blog/ai-assistants.md`. In prose, prefer sentence case section headings. For shortcode or template edits, follow the Go template style already in `themes/paper/`, using two-space indentation for HTML and template blocks.

## Testing Guidelines
There is no automated test suite; treat the Hugo build as the safety net. Run `hugo --gc --minify` before every push and fix warnings (use `hugo --panicOnWarning` locally to fail fast). Spot-check key pages in the local preview, paying attention to drafts toggled to `draft = false`. Commit the updated `public/` only when the diff reflects intended content changes.

## Commit & Pull Request Guidelines
Follow the short, imperative style visible in recent commits (for example, `add RSS feed link to blog navigation`). Group related changes together and avoid mixing content and theme tweaks unless necessary. For pull requests, include a concise summary, reference any related issues, and add screenshots or GIFs when modifying styling or layouts. Note whether `public/` was rebuilt and mention the command used so reviewers can reproduce the output.

## Content Workflow Tips
Draft new pieces with `draft = true` until ready; publish by flipping to `false` and setting a future-friendly `date`. When adding media, place files in `static/images/` and reference them with absolute paths (`/images/...`). Use descriptive alt text to maintain accessibility. After publishing, verify the GitHub Pages deployment reflects the latest `public/` snapshot.
