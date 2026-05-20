import Link from 'next/link'
import { ButtonGhost, ButtonPrimary, Card, Container, Section, SectionHeader } from '@/components/ui'
import { MotionBlock, MotionCard } from '@/components/motion'
import { NoiseVisualizationDemo } from '@/components/qml-demos'

const structure = [
  {
    title: 'Foundations',
    description: 'Core concepts and structured modules for the mathematical and quantum background needed to reason about QML systems.',
    href: '/foundations',
  },
  {
    title: 'Research Lab',
    description: 'Jupyter-style notes, paper walkthroughs, and experiment scaffolds that connect theory to research behavior.',
    href: '/research',
  },
  {
    title: 'Insights',
    description: 'Key conclusions and interpretations about where quantum models help, fail, or require more evidence.',
    href: '/insights',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-20 md:py-24">
          <MotionBlock>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Structured QML exploration
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl">
              Quantum Machine Learning: From Foundations to Experimental Insights
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-8 text-muted md:text-xl">
              Learn the core concepts, explore research experiments, and understand the real limitations of quantum models.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonPrimary href="/foundations">Start Foundations</ButtonPrimary>
              <ButtonGhost href="/research">Explore Research</ButtonGhost>
              <ButtonGhost href="/insights">View Insights</ButtonGhost>
            </div>
          </MotionBlock>
        </Container>
      </section>

      <Section>
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="What this platform is"
              title="A guided system from theory to experimentation to conclusions."
              description="This is not just a course, and not just research notes. It is a structured exploration of quantum machine learning: first the foundations, then the research lab, then the insights that emerge from experiments and paper analysis."
              className="max-w-3xl"
            />
          </MotionBlock>
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Platform structure"
              title="Three layers, one research-driven path."
            />
          </MotionBlock>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {structure.map((item, index) => (
              <MotionCard key={item.title} delay={index * 0.05}>
                <Link href={item.href} className="block h-full">
                  <Card className="h-full">
                    <h3 className="text-2xl font-semibold tracking-tight text-ink">{item.title}</h3>
                    <p className="mt-4 leading-7 text-muted">{item.description}</p>
                  </Card>
                </Link>
              </MotionCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <MotionBlock>
            <NoiseVisualizationDemo />
          </MotionBlock>
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <MotionCard>
              <Card className="h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Featured research</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">Associative Memory vs QML</h2>
                <p className="mt-4 leading-7 text-muted">
                  A research trace layer comparing representational failure modes under corruption and noise.
                </p>
                <div className="mt-6">
                  <ButtonPrimary href="/research/experiments/associative-memory-vs-qml">Open Research</ButtonPrimary>
                </div>
              </Card>
            </MotionCard>

            <MotionCard delay={0.05}>
              <Card className="h-full">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Featured insight</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">Where Quantum ML Breaks Under Noise</h2>
                <p className="mt-4 leading-7 text-muted">
                  A developing interpretation of how noise changes trainability, output stability, and the credibility of claimed advantage.
                </p>
                <div className="mt-6">
                  <ButtonGhost href="/insights">View Insight</ButtonGhost>
                </div>
              </Card>
            </MotionCard>
          </div>
        </Container>
      </Section>
    </>
  )
}
