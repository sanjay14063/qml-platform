'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { ExperimentConfig } from '@/data/experiments/types'
import { ExperimentControls, getDefaultControlValues } from './controls'
import { ExperimentVisualization } from './visualizations'

const ease = [0.22, 1, 0.36, 1] as const

type ControlValues = Record<string, number | string>

export function ExperimentWorkspace({ experiment }: { experiment: ExperimentConfig }) {
  const defaults = useMemo(() => getDefaultControlValues(experiment.controls), [experiment.controls])
  const [values, setValues] = useState<ControlValues>(defaults)

  return (
    <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <ExperimentControls
            controls={experiment.controls}
            values={values}
            onChange={(id, value) => setValues((current) => ({ ...current, [id]: value }))}
          />

          <div className="rounded-xl border border-line bg-card p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Key Insight</p>
            <motion.p
              key={Object.values(values).join('-')}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease }}
              className="mt-3 text-base leading-7 text-ink"
            >
              {experiment.keyInsight ?? experiment.strongIdea}
            </motion.p>
            <p className="mt-4 text-sm leading-6 text-muted">{experiment.strongIdea}</p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {experiment.visualizations.map((definition) => (
            <ExperimentVisualization
              key={definition.id}
              definition={definition}
              dataset={experiment.dataset}
              values={values}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section className="rounded-xl border border-line bg-card p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Observations</p>
          <div className="mt-5 space-y-4">
            {experiment.observations.map((observation, index) => (
              <motion.div
                key={observation}
                className="grid gap-3 border-t border-line pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[2rem_1fr]"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.2, ease, delay: index * 0.04 }}
              >
                <span className="font-mono text-sm text-accent">0{index + 1}</span>
                <p className="text-sm leading-6 text-muted">{observation}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-line bg-card p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Research Connection</p>
          <p className="mt-4 text-sm leading-6 text-muted">{experiment.researchConnection}</p>
          <div className="mt-5 rounded-lg border border-line bg-cream p-4">
            <p className="font-mono text-xs leading-5 text-muted">
              Placeholder source: data/experiments/placeholder-traces.ts
              <br />
              Future exports: data/experiments/*.json or typed arrays imported into the catalog.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={experiment.links.notebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-ink bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-ink-soft"
            >
              Open Notebook
            </Link>
            <Link
              href={experiment.links.colab}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-line bg-transparent px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-line-strong hover:bg-cream"
            >
              Run in Colab
            </Link>
            <Link
              href={experiment.links.walkthrough}
              className="inline-flex items-center justify-center rounded-full border border-line bg-transparent px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-line-strong hover:bg-cream"
            >
              Related Walkthrough
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
