import Link from 'next/link'
import { Card, Container, Section, SectionHeader } from '@/components/ui'
import { MotionBlock, MotionCard } from '@/components/motion'
import { getAllModuleSlugs, getModuleBySlug } from '@/lib/mdx'

function formatTitle(slug: string, title?: string) {
  return title ?? slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
}

export default async function FoundationsPage() {
  const slugs = await getAllModuleSlugs()
  const modules = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await getModuleBySlug(slug)
      return mod ? { slug, ...mod.frontmatter } : null
    })
  )

  const valid = modules.filter((m): m is NonNullable<typeof m> => m !== null)

  const byStage = valid.reduce<Record<number, typeof valid>>((acc, m) => {
    const stage = (m as { stage?: number }).stage ?? 0
    if (!acc[stage]) acc[stage] = []
    acc[stage].push(m)
    return acc
  }, {})

  const stageOrder = [0, 1, 2, 3, 4]

  return (
    <>
      <Section className="border-b border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Foundations"
              title="Foundations: Core concepts required to understand quantum machine learning systems."
              description="These modules are designed to support deeper exploration in the Research Lab."
              className="max-w-3xl"
            />
          </MotionBlock>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="space-y-10">
            {stageOrder.map((stage) => {
              const mods = byStage[stage]
              if (!mods?.length) return null
              return (
                <MotionBlock key={stage}>
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-4 border-b border-line pb-3">
                      <h2 className="text-xl font-semibold tracking-tight text-ink">Stage {stage}</h2>
                      <p className="text-sm text-muted">{mods.length} modules</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {mods.map((m, index) => (
                        <MotionCard key={m.slug} delay={index * 0.05}>
                          <Link href={`/foundations/${m.slug}`} className="block h-full">
                            <Card className="h-full">
                              <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">
                                {formatTitle(m.slug, (m as { title?: string }).title)}
                              </h3>
                              <p className="mt-4 text-sm font-medium text-accent">Open foundation</p>
                            </Card>
                          </Link>
                        </MotionCard>
                      ))}
                    </div>
                  </div>
                </MotionBlock>
              )
            })}
          </div>
        </Container>
      </Section>
    </>
  )
}
