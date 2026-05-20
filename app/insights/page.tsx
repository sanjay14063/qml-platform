import Link from 'next/link'
import { Card, Container, Section, SectionHeader } from '@/components/ui'
import { MotionBlock, MotionCard } from '@/components/motion'

const insights = [
  {
    title: 'Limitations of QML under Noise',
    description: 'Noise can distort measurements, flatten optimization signals, and make apparent model behavior difficult to interpret.',
    href: '/insights/limitations-of-qml-under-noise',
  },
  {
    title: 'Classical vs Quantum Tradeoffs',
    description: 'Quantum models need to be compared against strong classical baselines before any advantage claim becomes meaningful.',
    href: '/insights/classical-vs-quantum-tradeoffs',
  },
  {
    title: 'Trainability and Scaling Limits in QML',
    description: 'Variational quantum models face optimization challenges such as vanishing gradients and poor scaling as system size increases, limiting when learning is feasible.',
    href: '/insights/trainability-and-scaling-limits-in-qml',
  },
]

export default function InsightsPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container>
          <MotionBlock>
            <SectionHeader
              eyebrow="Insights"
              title="Key takeaways from experiments and research."
              description="Insights collect interpretations from the foundations and Research Lab: what seems robust, what remains speculative, and where the limitations become visible."
              className="max-w-3xl"
            />
          </MotionBlock>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((insight, index) => (
              <MotionCard key={insight.title} delay={index * 0.05}>
                <Card className="h-full">
                  <h2 className="text-xl font-semibold tracking-tight text-ink">{insight.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{insight.description}</p>
                  <Link href={insight.href} className="mt-6 inline-flex text-sm font-semibold text-accent transition-colors hover:text-ink">
                    Read More
                  </Link>
                </Card>
              </MotionCard>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
