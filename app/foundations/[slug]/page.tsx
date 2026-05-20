import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getModuleBySlug, getAllModuleSlugs } from '@/lib/mdx'
import { Container } from '@/components/ui'
import { MotionBlock } from '@/components/motion'
import { ParameterizedCircuitDemo } from '@/components/qml-demos'
import { useMDXComponents } from '@/mdx-components'

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function formatTitle(slug: string, title?: string) {
  return title ?? slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
}

function getHeadings(content: string) {
  return content
    .split('\n')
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line)
      if (!match) return null
      const text = match[2].replace(/[*`]/g, '').trim()
      return { depth: match[1].length, text, id: slugify(text) }
    })
    .filter((heading): heading is { depth: number; text: string; id: string } => Boolean(heading))
}

export async function generateStaticParams() {
  const slugs = await getAllModuleSlugs()
  return slugs.map((slug) => ({ slug }))
}
export const dynamicParams = false

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const moduleData = await getModuleBySlug(slug)
  if (!moduleData) notFound()

  const { frontmatter, content, Content } = moduleData
  const title = formatTitle(slug, (frontmatter as { title?: string }).title)
  const headings = getHeadings(content)
  const components = useMDXComponents({})

  return (
    <Container className="py-14 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,700px)_220px] lg:justify-center">
        <MotionBlock>
          <article>
            <Link href="/foundations" className="text-sm font-medium text-muted transition-colors hover:text-ink">
              Back to foundations
            </Link>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              {title}
            </h1>
            {slug === 'parameterized-quantum-circuits' && (
              <div className="mt-10">
                <ParameterizedCircuitDemo />
              </div>
            )}
            <div className="mdx-content mt-10">
              <Content components={components} />
            </div>
          </article>
        </MotionBlock>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 border-l border-line pl-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                On this page
              </p>
              <nav className="space-y-2 text-sm">
                {headings.map((heading, index) => (
                  <a
                    key={`${heading.id}-${heading.depth}-${index}`}
                    href={`#${heading.id}`}
                    className={`block leading-6 text-muted transition-colors hover:text-ink ${
                      heading.depth === 3 ? 'pl-3' : ''
                    }`}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </Container>
  )
}
