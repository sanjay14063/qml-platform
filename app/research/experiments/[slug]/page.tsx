import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, Container, Section, SectionHeader } from '@/components/ui'
import { MotionBlock } from '@/components/motion'
import { ExperimentWorkspace } from '@/components/experiments/experiment-workspace'
import { experiments, getExperiment } from '@/lib/research-lab'

export function generateStaticParams() {
  return experiments.map((experiment) => ({ slug: experiment.slug }))
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const experiment = getExperiment(slug)
  if (!experiment) notFound()

  return (
    <>
      <Section className="border-b border-line">
        <Container>
          <MotionBlock>
            <Link href="/research" className="text-sm font-medium text-muted transition-colors hover:text-ink">
              Back to Research Lab
            </Link>
            <SectionHeader
              eyebrow="Mini Experiment"
              title={experiment.title}
              description={experiment.hook}
              className="mt-6 max-w-3xl"
            />
          </MotionBlock>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h2 className="text-xl font-semibold tracking-tight text-ink">Overview</h2>
              <p className="mt-3 leading-7 text-muted">{experiment.overview}</p>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold tracking-tight text-ink">One Strong Idea</h2>
              <p className="mt-3 leading-7 text-muted">{experiment.strongIdea}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Controls & Visualization"
              title="Interactive research trace layer"
              description="Adjust the controls to read synchronized placeholder traces. No real simulation is running yet; the page is shaped for notebook-exported JSON, CSV, or typed arrays."
            />
          </MotionBlock>
          <div className="mt-10">
            <ExperimentWorkspace experiment={experiment} />
          </div>
        </Container>
      </Section>
    </>
  )
}
