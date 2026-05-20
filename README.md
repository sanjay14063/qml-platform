# QML Learning Hub

A structured, code-backed learning reference for Quantum Machine Learning. This is a research-grade learning hub—not a commercial course platform—designed for advanced high school students, undergraduates, and early researchers.

## Features

- **Static site** — Next.js 14 with App Router, Tailwind CSS
- **Math rendering** — KaTeX via remark-math / rehype-katex
- **MDX content** — Modules and research commentary in Markdown + JSX
- **Code syntax highlighting** — Via MDX and Tailwind-styled code blocks

## Project Structure

```
├── app/
│   ├── page.tsx              # Home
│   ├── learning-path/        # Learning Path (staged roadmap)
│   ├── modules/              # Modules index + [slug] dynamic routes
│   ├── code-notebooks/       # Code & Notebooks
│   ├── research-commentary/  # Research blog + [slug] posts
│   └── about/                # About
├── content/
│   ├── modules/              # Module MDX files (strict template)
│   │   ├── module-template.mdx
│   │   ├── qubits-states-measurements.mdx
│   │   └── ...
│   └── research/             # Research commentary posts
├── lib/
│   └── mdx.ts                # MDX loading utilities
└── ...
```

## Module Template

Each module follows:

1. **Motivation** — Why this concept matters in QML
2. **Core Concepts** — Mathematical definitions, key equations, intuition
3. **Implementation** — PennyLane/Qiskit examples, circuit diagrams
4. **Experiments** — Noise-aware experiments, scaling behavior
5. **Failure Modes & Pitfalls**
6. **Further Reading** — Papers + docs
7. **Key Takeaways**

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static output is generated in `.next/`. Deploy to Vercel, Netlify, or any static host.

## Adding Content

- **New module**: Create `content/modules/your-module.mdx` following the template. It will appear on `/modules` and `/modules/your-module`.
- **New research post**: Create `content/research/your-post.mdx` with frontmatter `title` and optional `date`. It will appear on `/research-commentary` and `/research-commentary/your-post`.

## Math Rendering

KaTeX is used for math via `remark-math` and `rehype-katex`. Version 5.x/6.x are used for compatibility with `next-mdx-remote`. Use `$...$` for inline math and `$$...$$` for display math in MDX.

## TODO

- [ ] Replace GitHub placeholder with actual repository URL
- [ ] Add author background on About page
- [ ] Expand module content (replace TODO markers with full text and code)
- [ ] Create Jupyter notebooks for each module
- [ ] Add more research commentary posts

## License

MIT (or your preferred license)
