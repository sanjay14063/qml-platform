import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPostSlugs, mdxOptions } from '@/lib/mdx'
import { ButtonGhost, Card, Container, Section } from '@/components/ui'
import { MotionBlock } from '@/components/motion'
import { useMDXComponents } from '@/mdx-components'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs('insights')
  return slugs.map((slug) => ({ slug }))
}

function formatTitle(slug: string, title?: string) {
  return title ?? slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const postData = await getPostBySlug(slug, 'insights')
  if (!postData) notFound()

  const { frontmatter, content } = postData
  const meta = frontmatter as {
    title?: string
    description?: string
  }
  const title = formatTitle(slug, meta.title)
  const components = useMDXComponents({})

  return (
    <>
      <div className="sticky top-16 z-40 border-b border-line bg-cream/82 backdrop-blur-md">
        <Container className="flex items-center justify-between gap-4 py-3">
          <Link href="/insights" className="text-sm font-semibold text-muted transition-colors hover:text-ink">
            Back to Insights
          </Link>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-muted md:inline">
            Insight
          </span>
        </Container>
      </div>

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(47,111,104,0.12),transparent_28%),linear-gradient(rgba(47,111,104,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(47,111,104,0.06)_1px,transparent_1px)] bg-[size:auto,42px_42px,42px_42px]" />
        <Container className="relative py-16 md:py-20">
          <MotionBlock>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Insights</p>
            <div className="mt-6 max-w-4xl">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">
                {title}
              </h1>
              {meta.description && (
                <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
                  {meta.description}
                </p>
              )}
            </div>
          </MotionBlock>
        </Container>
      </section>

      <Section>
        <Container>
          <MotionBlock className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <aside className="lg:sticky lg:top-36 lg:self-start">
              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Insight Snapshot</p>
                <p className="mt-4 text-sm leading-6 text-muted">
                  This page is driven by MDX so you can update insight content directly in the repository.
                </p>
                <div className="mt-5">
                  <ButtonGhost href="/insights" className="px-4 py-2">
                    All Insights
                  </ButtonGhost>
                </div>
              </Card>
            </aside>
            <article className="rounded-xl border border-line bg-card p-6 shadow-soft md:p-8">
              <div className="mdx-content max-w-none">
                <MDXRemote
                  source={content}
                  options={{
                    mdxOptions: mdxOptions as object,
                  }}
                  components={components}
                />
              </div>
            </article>
          </MotionBlock>
        </Container>
      </Section>
    </>
  )
}
