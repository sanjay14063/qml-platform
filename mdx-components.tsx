import type { MDXComponents } from 'mdx/types'

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function textFromChildren(children: unknown): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(textFromChildren).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    return textFromChildren((children as { props?: { children?: unknown } }).props?.children)
  }
  return ''
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 {...props} id={slugify(textFromChildren(children))} className="scroll-mt-24">
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 {...props} id={slugify(textFromChildren(children))} className="scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...props} id={slugify(textFromChildren(children))} className="scroll-mt-24">
        {children}
      </h3>
    ),
    pre: ({ children, ...props }) => (
      <pre className="overflow-x-auto rounded-xl border border-line bg-[#171716] p-5 text-sm text-cream" {...props}>
        {children}
      </pre>
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className
      return isInline ? (
        <code className="rounded-md bg-[#ebe5d8] px-1.5 py-0.5 font-mono text-[0.92em] text-ink" {...props}>
          {children}
        </code>
      ) : (
        <code className={className} {...props}>{children}</code>
      )
    },
    ...components,
  }
}
