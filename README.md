# Milena Weiner — portfolio

Static portfolio site. No build step: plain HTML, one stylesheet, one script.

```
index.html      home — projects, services, bio, rates, contact
risky.html      RISKY — AI Beauty Campaign
slurp.html      Slurp Laboratories — brand world & NYC event
hydromer.html   Hydromer — Luminous Treatment Mist
styles.css      all styles
script.js       scroll reveals, mobile menu, video pausing
images/         13 WebP photographs
media/          2 loops (MP4 + WebM) with poster frames
og-image.jpg    social preview, 1200×630
sitemap.xml     robots.txt     favicon.svg
```

Served by GitHub Pages from the `main` branch, root folder.

## Editing

Open the files and edit. Nothing to compile, nothing to install.
Push to `main` and the live site updates within a minute.

## Moving to a custom domain

Replace the site URL everywhere it appears — `canonical`, `og:url`,
`og:image`, `twitter:image`, the JSON-LD blocks, `sitemap.xml`
and `robots.txt`:

```sh
grep -rl 'OLD-URL' . | xargs sed -i '' 's|OLD-URL|https://your-domain.com|g'
```

Then add a `CNAME` file containing the bare domain, and point the
registrar's DNS at GitHub Pages.
