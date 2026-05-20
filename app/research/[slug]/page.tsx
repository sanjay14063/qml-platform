import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx'
import { ButtonGhost, Card, Container, Section } from '@/components/ui'
import { MotionBlock } from '@/components/motion'
import { useMDXComponents } from '@/mdx-components'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs('research')
  return slugs.map((slug) => ({ slug }))
}
export const dynamicParams = false

function formatTitle(slug: string, title?: string) {
  return title ?? slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
}

export default async function ResearchPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const postData = await getPostBySlug(slug, 'research')
  if (!postData) notFound()

  const { frontmatter, Content } = postData
  const meta = frontmatter as {
    title?: string
    paperTitle?: string
    authors?: string
    description?: string
    venue?: string
    year?: string
    status?: string
  }
  const title = meta.paperTitle ?? formatTitle(slug, meta.title)
  const components = useMDXComponents({})

  return (
    <>
      <div className="sticky top-16 z-40 border-b border-line bg-cream/82 backdrop-blur-md">
        <Container className="flex items-center justify-between gap-4 py-3">
          <Link href="/research" className="text-sm font-semibold text-muted transition-colors hover:text-ink">
            Back to Research Lab
          </Link>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-muted md:inline">
            Paper Walkthrough
          </span>
        </Container>
      </div>

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(47,111,104,0.12),transparent_28%),linear-gradient(rgba(47,111,104,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(47,111,104,0.06)_1px,transparent_1px)] bg-[size:auto,42px_42px,42px_42px]" />
        <Container className="relative py-16 md:py-20">
          <MotionBlock>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Paper Walkthrough
            </p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">
                  {title}
                </h1>
                {meta.authors && (
                  <p className="mt-5 text-base font-medium leading-7 text-muted md:text-lg">
                    {meta.authors}
                  </p>
                )}
                {meta.description && (
                  <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
                    {meta.description}
                  </p>
                )}
              </div>

              <Card className="bg-card/75 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Walkthrough State</p>
                <div className="mt-5 grid gap-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-line pb-3">
                    <span className="text-muted">Status</span>
                    <span className="font-semibold text-ink">{meta.status ?? 'Placeholder'}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-line pb-3">
                    <span className="text-muted">Venue</span>
                    <span className="font-semibold text-ink">{meta.venue ?? 'TBD'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted">Year</span>
                    <span className="font-semibold text-ink">{meta.year ?? 'TBD'}</span>
                  </div>
                </div>
              </Card>
            </div>
          </MotionBlock>
        </Container>
      </section>

      <Section>
        <Container>
          <MotionBlock className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <aside className="lg:sticky lg:top-36 lg:self-start">
              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Reading Frame</p>
                <p className="mt-4 text-sm leading-6 text-muted">
                  A compact scaffold for contribution, mechanism, reproduction notes, and limitations.
                </p>
                <div className="mt-5">
                  <ButtonGhost href="/research" className="px-4 py-2">
                    All Papers
                  </ButtonGhost>
                </div>
              </Card>
            </aside>
            <article className="rounded-xl border border-line bg-card p-6 shadow-soft md:p-8">
              <div className="mdx-content max-w-none">
                <Content components={components} />
              </div>
            </article>
          </MotionBlock>
        </Container>
      </Section>
    </>
  )
}
