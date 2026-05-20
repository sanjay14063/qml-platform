import { Card, Container, Section, SectionHeader } from '@/components/ui'
import { MotionBlock, MotionCard } from '@/components/motion'

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <MotionBlock>
          <SectionHeader
            eyebrow="About"
            title="A grounded learning space for Quantum Machine Learning."
            description="QML Platform is a structured, code-first learning project focused on understanding quantum machine learning through practical examples, clear explanations, and realistic constraints."
            className="max-w-3xl"
          />
        </MotionBlock>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            [
              'Mission',
              'Make quantum machine learning understandable without hype by focusing on how models actually behave under real constraints like noise, scaling limits, and classical baselines.'
            ],
            [
              'Author',
              'Built and maintained by a student developer exploring quantum machine learning and machine learning systems. The content reflects ongoing learning, experimentation, and synthesis rather than expert authority.'
            ],
            [
              'Links',
              'References to tools like Qiskit, PennyLane, and related open-source ecosystems are included to connect ideas directly to runnable implementations.'
            ],
            [
              'Disclaimer',
              'This is a living project. Content will evolve, be corrected, and refined as understanding of the field improves.'
            ]
          ].map(([title, description], index) => (
            <MotionCard key={title} delay={index * 0.05}>
              <Card className="h-full">
                <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
                <p className="mt-3 leading-7 text-muted">{description}</p>
              </Card>
            </MotionCard>
          ))}
        </div>
      </Container>
    </Section>
  )
}
