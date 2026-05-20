import Link from 'next/link'
import { ButtonGhost, ButtonPrimary, Card, Container, Section, SectionHeader } from '@/components/ui'
import { MotionBlock, MotionCard } from '@/components/motion'
import { getResearchPaperWalkthroughs } from '@/lib/mdx'
import { experiments, researchNotebooks } from '@/lib/research-lab'

export default async function ResearchLabPage() {
  const paperWalkthroughs = await getResearchPaperWalkthroughs()

  return (
    <>
      <Section className="border-b border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Research Lab"
              title="Explore experiments, research notes, and paper breakdowns."
              description="The Research Lab connects foundational modules to implementation traces, paper walkthroughs, and controlled experiment pages. It is a workspace for technical exploration, not a casual publishing feed."
              className="max-w-3xl"
            />
          </MotionBlock>
        </Container>
      </Section>

      <Section>
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Section A"
              title="Experiment Logs / Research Notes"
              description="Jupyter-style notes and implementation logs for turning concepts into inspectable experiments."
            />
          </MotionBlock>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {researchNotebooks.map((note, index) => (
              <MotionCard key={note.title} delay={index * 0.05}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-xl font-semibold tracking-tight text-ink">{note.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted">{note.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonPrimary href={note.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2">
                      Open in GitHub
                    </ButtonPrimary>
                    <ButtonPrimary href={note.colab} target="_blank" rel="noopener noreferrer" className="px-4 py-2">
                      Open in Colab
                    </ButtonPrimary>
                    {note.breakdown && (
                      <ButtonGhost href={note.breakdown} className="px-4 py-2">
                        Read Breakdown
                      </ButtonGhost>
                    )}
                  </div>
                </Card>
              </MotionCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Section B"
              title="Paper Walkthroughs"
              description="Detailed breakdowns of relevant quantum ML papers."
            />
          </MotionBlock>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {paperWalkthroughs.length > 0 ? (
              paperWalkthroughs.map((post, index) => (
                <MotionCard key={post.slug} delay={index * 0.05}>
                  <Card className="group flex h-full flex-col overflow-hidden">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                        Paper Walkthrough
                      </p>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-ink">
                      {(post as { paperTitle?: string }).paperTitle ?? (post as { title?: string }).title}
                    </h3>
                    <p className="mt-3 text-sm font-medium text-muted">
                      {(post as { authors?: string }).authors}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-6 text-muted">
                      {(post as { description?: string }).description}
                    </p>
                    <div className="mt-6">
                      <ButtonGhost href={`/research/${post.slug}`} className="px-4 py-2 group-hover:border-line-strong group-hover:bg-cream">
                        Open Walkthrough
                      </ButtonGhost>
                    </div>
                  </Card>
                </MotionCard>
              ))
            ) : (
              <Card>
                <p className="text-muted">Paper walkthroughs will appear here as the lab develops.</p>
              </Card>
            )}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Section C"
              title="Mini Experiments"
              description="Interactive intuition layers built on placeholder research traces, ready for notebook-exported datasets when the simulations mature."
            />
          </MotionBlock>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {experiments.map((experiment, index) => (
              <MotionCard key={experiment.slug} delay={index * 0.05}>
                <Link href={`/research/experiments/${experiment.slug}`} className="block h-full">
                  <Card className="h-full">
                    <h3 className="text-xl font-semibold tracking-tight text-ink">{experiment.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-accent">{experiment.hook}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">{experiment.description}</p>
                    <p className="mt-5 text-sm font-medium text-accent">Open experiment</p>
                  </Card>
                </Link>
              </MotionCard>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
