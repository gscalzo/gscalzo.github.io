# Shared site theme

All published pages use the shared theme foundation in `assets/theme-base.css`: colour tokens, fonts, persistent link underlines and keyboard focus. `assets/custom.css` contains the site layouts and components. `layouts/partials/styles.html` bundles these with the Paper base stylesheet and fingerprints the output, so CSS changes receive a new URL instead of relying on cached `/main.min.css`.

The home page, books, projects, speaking page, articles, archives and error page all use the same theme partial. Speaking is a regular Hugo Markdown page.

Antescher now renders through `layouts/antescher/single.html`, with the same head, header, footer and theme toggle. Its specialised visualisation styles are in `assets/antescher.css`. Public URLs remain `/antescher/` and `/antescher/embed/*.html`.

The 19 standalone figures are source HTML in `assets/antescher/figures/`. Their Hugo page entries in `content/antescher/` use `layouts/antescher/figure.html`, which combines the shared theme foundation with `assets/antescher-figures.css` and fingerprints that bundle too. Figures keep their dark diagram palette and are excluded from page listings. Supporting scripts remain in `static/antescher/embed/`.

For a custom page, use the shared head and theme partials rather than hardcoding a stylesheet URL or duplicating link rules.

Validation: build to a clean destination with `hugo --gc --minify --panicOnWarning --destination /tmp/giorocks-theme-audit`. The 6 September 2026 audit checked all 68 non-redirect HTML pages for fingerprinted stylesheets and all 16 article iframe references for existing output files. Browser spot checks covered home, books, projects, writing, speaking, an article, Antescher in light/dark mode, and an interactive figure.
