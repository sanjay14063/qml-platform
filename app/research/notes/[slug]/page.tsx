import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ButtonGhost, ButtonPrimary, Card, Container, Section, SectionHeader } from '@/components/ui'
import { MotionBlock, MotionCard } from '@/components/motion'
import { getResearchNote, researchNotes } from '@/lib/research-lab'

export function generateStaticParams() {
  return researchNotes.map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const note = getResearchNote(slug)

  return {
    title: note ? `${note.title} Research Notes | QML Platform` : 'Research Notes | QML Platform',
    description: note?.abstract,
  }
}

export default async function ResearchNotePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const note = getResearchNote(slug)
  if (!note) notFound()

  return (
    <>
      <div className="sticky top-16 z-40 border-b border-line bg-cream/82 backdrop-blur-md">
        <Container className="flex items-center justify-between gap-4 py-3">
          <Link href="/research" className="text-sm font-semibold text-muted transition-colors hover:text-ink">
            Back to Research Lab
          </Link>
          <nav className="hidden items-center gap-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted md:flex">
            <a href="#setup" className="transition-colors hover:text-ink">Setup</a>
            <a href="#observations" className="transition-colors hover:text-ink">Observations</a>
            <a href="#limits" className="transition-colors hover:text-ink">Limits</a>
          </nav>
        </Container>
      </div>

      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(47,111,104,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(47,111,104,0.08)_1px,transparent_1px)] bg-[size:44px_44px] opacity-45" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <Container className="relative py-16 md:py-20">
          <MotionBlock>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Notebook Companion
            </p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">
                  {note.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
                  {note.abstract}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-line bg-card/70 px-3 py-1 text-xs font-semibold text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonPrimary href={note.href} target="_blank" rel="noopener noreferrer">
                    Open in GitHub
                  </ButtonPrimary>
                  <ButtonGhost href={note.colab} target="_blank" rel="noopener noreferrer">
                    Open in Colab
                  </ButtonGhost>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-card/75 p-5 shadow-soft backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Briefing Mode</p>
                <div className="mt-5 space-y-4">
                  {['Problem', 'Setup', 'Observations', 'Limits'].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-cream text-xs font-semibold text-accent">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-semibold text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionBlock>
        </Container>
      </section>

      <Section>
        <Container>
          <MotionBlock>
            <Card className="grid gap-5 md:grid-cols-[220px_1fr] md:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  Problem / Question
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">What is being tested?</h2>
              </div>
              <p className="text-lg leading-8 text-ink-soft">{note.question}</p>
            </Card>
          </MotionBlock>
        </Container>
      </Section>

      <Section id="setup" className="border-t border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Experimental Setup"
              title="The moving parts of the notebook, kept visible."
              description="Each setup choice is small on purpose: the goal is to understand what the experiment is allowed to prove before interpreting the output."
            />
          </MotionBlock>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {note.setup.map((item, index) => (
              <MotionCard key={item.label} delay={index * 0.04}>
                <Card className="h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{item.label}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.value}</p>
                </Card>
              </MotionCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="observations" className="border-t border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Key Observations"
              title="The interpretation layer for the notebook."
              description="These are not headline claims. They are compact readings of the behavior worth inspecting when the notebook is open beside you."
              className="max-w-3xl"
            />
          </MotionBlock>
          <div className="mt-10 grid gap-5">
            {note.observations.map((observation, index) => (
              <MotionCard key={observation.title} delay={index * 0.05}>
                <div className="grid gap-0 overflow-hidden rounded-xl border border-line bg-card transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft md:grid-cols-[190px_1fr]">
                  <div className="border-b border-line bg-cream/70 p-5 md:border-b-0 md:border-r">
                    <p className="font-mono text-2xl font-semibold text-accent">{observation.metric}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {observation.signal}
                    </p>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-xl font-semibold tracking-tight text-ink">{observation.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink-soft">{observation.finding}</p>
                    <div className="mt-5 rounded-lg border border-line bg-cream/60 p-4">
                      <p className="text-sm leading-6 text-muted">{observation.interpretation}</p>
                    </div>
                  </div>
                </div>
              </MotionCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="limits" className="border-t border-line">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr]">
            <MotionBlock>
              <SectionHeader
                eyebrow="Limitations"
                title="What this notebook does not claim."
                description="The credibility of the experiment depends on keeping its boundary conditions explicit."
              />
            </MotionBlock>
            <div className="grid gap-3">
              {note.limitations.map((limitation, index) => (
                <MotionCard key={limitation} delay={index * 0.04}>
                  <div className="rounded-xl border border-line bg-card p-4 text-sm leading-6 text-muted transition duration-200 hover:border-line-strong hover:shadow-soft">
                    {limitation}
                  </div>
                </MotionCard>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Future Extensions"
              title="Next experiments to make the notebook sharper."
            />
          </MotionBlock>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {note.extensions.map((extension, index) => (
              <MotionCard key={extension} delay={index * 0.04}>
                <div className="flex h-full gap-4 rounded-xl border border-line bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-cream">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-muted">{extension}</p>
                </div>
              </MotionCard>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
