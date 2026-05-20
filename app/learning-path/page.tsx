import Link from 'next/link'
import { Card, Container, Section, SectionHeader } from '@/components/ui'
import { MotionBlock, MotionCard } from '@/components/motion'
import { stages } from '@/lib/stages'

export default function LearningPathPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Learning path"
              title="A linear roadmap for Quantum Machine Learning."
              description="Each stage builds on the previous one. Prerequisites, estimated time, objectives, and module links are kept visible so the path feels deliberate rather than scattered."
              className="max-w-3xl"
            />
          </MotionBlock>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {stages.map((stage, index) => (
              <MotionCard key={stage.id} delay={index * 0.05}>
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                        Stage {stage.id}
                      </p>
                      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
                        {stage.title}
                      </h2>
                    </div>
                    <p className="shrink-0 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                      {stage.duration}
                    </p>
                  </div>

                  <p className="mt-4 leading-7 text-muted">{stage.overview}</p>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                        Objectives
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                        {stage.objectives.map((objective) => (
                          <li key={objective}>{objective}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                        Modules
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm leading-6">
                        {stage.modules.map((mod) => (
                          <li key={mod.slug}>
                            {stage.isPlaceholder ? (
                              <span className="text-muted">{mod.title}</span>
                            ) : (
                              <Link
                                href={`/foundations/${mod.slug}`}
                                className="font-medium text-accent transition-colors hover:text-ink"
                              >
                                {mod.title}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </MotionCard>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
