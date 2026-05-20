'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type {
  BoundaryCell,
  ExperimentDataset,
  LineTrace,
  MatrixCell,
  MemoryPattern,
  MetricValue,
  ScatterPoint,
  TracePoint,
  VisualizationDefinition,
} from '@/data/experiments/types'

type ControlValues = Record<string, number | string>

const ease = [0.22, 1, 0.36, 1] as const

const toneClass: Record<LineTrace['tone'], string> = {
  clean: '#2f6f68',
  moderate: '#a77742',
  high: '#8f3f3f',
  accent: '#2f6f68',
  muted: '#8f8779',
}

function numberValue(values: ControlValues, id: string, fallback: number) {
  const value = values[id]
  return typeof value === 'number' ? value : fallback
}

function VisualCard({
  title,
  description,
  children,
  wide = false,
}: {
  title: string
  description: string
  children: ReactNode
  wide?: boolean
}) {
  return (
    <div className={`rounded-xl border border-line bg-card p-5 shadow-soft ${wide ? 'lg:col-span-2' : ''}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function pathFromPoints(points: TracePoint[], width: number, height: number, pad = 24) {
  const maxX = Math.max(...points.map((point) => point.x), 1)
  return points
    .map((point, index) => {
      const x = pad + (point.x / maxX) * (width - pad * 2)
      const y = pad + point.y * (height - pad * 2)
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function LineChart({ traces, pressure = 0 }: { traces: LineTrace[]; pressure?: number }) {
  const width = 560
  const height = 260
  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-72 w-full" role="img" aria-label="Synchronized experiment line chart">
        {[0, 1, 2, 3, 4].map((tick) => (
          <line
            key={tick}
            x1="24"
            x2="536"
            y1={28 + tick * 48}
            y2={28 + tick * 48}
            stroke="#ded8cb"
            strokeWidth="1"
          />
        ))}
        <line x1="24" x2="536" y1="236" y2="236" stroke="#c8beaa" />
        <line x1="24" x2="24" y1="24" y2="236" stroke="#c8beaa" />
        {traces.map((trace, index) => (
          <motion.path
            key={trace.id}
            d={pathFromPoints(trace.points, width, height)}
            fill="none"
            stroke={toneClass[trace.tone]}
            strokeWidth={trace.tone === 'high' ? 2.4 : 3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{
              opacity: trace.tone === 'high' ? 0.55 + pressure * 0.3 : 0.95 - index * 0.08,
              pathLength: 1,
            }}
            transition={{ duration: 0.35, ease }}
          />
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap gap-3">
        {traces.map((trace) => (
          <div key={trace.id} className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: toneClass[trace.tone] }} />
            {trace.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function BoundaryPanel({ label, cells, blur = 0 }: { label: string; cells: BoundaryCell[]; blur?: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
        <p className="font-mono text-xs text-muted">{Math.round((1 - blur) * 100)}% crisp</p>
      </div>
      <div className="grid overflow-hidden rounded-lg border border-line bg-cream" style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}>
        {cells.map((cell) => {
          const hue = cell.value > 0.5 ? '47, 111, 104' : '143, 63, 63'
          const alpha = 0.18 + cell.confidence * 0.62 * (1 - blur * 0.45)
          return (
            <motion.div
              key={`${cell.x}-${cell.y}`}
              className="aspect-square"
              initial={false}
              animate={{ backgroundColor: `rgba(${hue}, ${alpha})`, opacity: 0.72 + cell.confidence * 0.28 }}
              transition={{ duration: 0.25, ease }}
            />
          )
        })}
      </div>
    </div>
  )
}

function DecisionBoundaries({ dataset, values }: { dataset: ExperimentDataset; values: ControlValues }) {
  const noise = numberValue(values, 'noise', 0.35)
  const groups = dataset.boundaries ?? {}
  const entries = Object.entries(groups)
  return (
    <div className={`grid gap-4 ${entries.length > 1 ? 'md:grid-cols-3' : ''}`}>
      {entries.map(([key, cells], index) => (
        <BoundaryPanel key={key} label={key} cells={cells} blur={Math.min(0.85, noise + index * 0.12)} />
      ))}
    </div>
  )
}

function MetricsStrip({ metrics, values }: { metrics: MetricValue[]; values: ControlValues }) {
  const noise = numberValue(values, 'noise', numberValue(values, 'corruption', 0.25))
  const depth = numberValue(values, 'depth', 4)
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric, index) => {
        const adjusted = Math.max(0.04, Math.min(0.98, metric.value - noise * 0.22 - Math.max(0, depth - 5) * 0.025 + index * 0.035))
        return (
          <div key={metric.label} className="rounded-lg border border-line bg-cream p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-ink">{metric.label}</p>
              <motion.p className="font-mono text-sm text-accent" initial={false} animate={{ opacity: 0.65 + adjusted * 0.35 }}>
                {Math.round(adjusted * 100)}
                {metric.unit ?? '%'}
              </motion.p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8e0d1]">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={false}
                animate={{ width: `${adjusted * 100}%` }}
                transition={{ duration: 0.25, ease }}
              />
            </div>
            {metric.detail && <p className="mt-3 text-xs leading-5 text-muted">{metric.detail}</p>}
          </div>
        )
      })}
    </div>
  )
}

function Heatmap({ cells }: { cells: MatrixCell[] }) {
  const columns = Math.max(...cells.map((cell) => cell.col), 0) + 1
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-cream p-2">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {cells.map((cell) => (
          <motion.div
            key={`${cell.row}-${cell.col}`}
            className="aspect-square rounded-[2px]"
            initial={false}
            animate={{ backgroundColor: `rgba(47, 111, 104, ${0.1 + cell.value * 0.86})` }}
            transition={{ duration: 0.25, ease }}
          />
        ))}
      </div>
    </div>
  )
}

function Embedding({ points, values }: { points: ScatterPoint[]; values: ControlValues }) {
  const entanglement = numberValue(values, 'entanglement', 0.6)
  return (
    <svg viewBox="0 0 420 260" className="h-72 w-full rounded-lg border border-line bg-cream" role="img" aria-label="2D representation embedding">
      <line x1="28" x2="392" y1="130" y2="130" stroke="#ded8cb" />
      <line x1="210" x2="210" y1="24" y2="236" stroke="#ded8cb" />
      {points.map((point, index) => {
        const x = 28 + point.x * 364
        const y = 24 + point.y * 212
        const fill = point.label === 0 ? '#2f6f68' : '#8f3f3f'
        return (
          <motion.circle
            key={index}
            cx={x}
            cy={y}
            r={5.5}
            fill={fill}
            initial={false}
            animate={{ opacity: 0.54 + entanglement * 0.4, scale: 0.9 + (point.confidence ?? 0.5) * 0.22 }}
            transition={{ duration: 0.25, ease }}
          />
        )
      })}
    </svg>
  )
}

function OptimizationFreeze({ points, values }: { points: TracePoint[]; values: ControlValues }) {
  const depth = numberValue(values, 'depth', 7)
  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${36 + point.x * 348} ${24 + point.y * 204}`)
    .join(' ')
  return (
    <svg viewBox="0 0 420 260" className="h-72 w-full rounded-lg border border-line bg-cream" role="img" aria-label="Optimization trajectory freezing">
      {[0, 1, 2, 3].map((tick) => (
        <circle key={tick} cx="210" cy="130" r={35 + tick * 34} fill="none" stroke="#ded8cb" />
      ))}
      <motion.path d={path} fill="none" stroke="#2f6f68" strokeWidth="3" strokeLinecap="round" initial={false} animate={{ opacity: 1 - depth * 0.025 }} />
      {points.map((point, index) => (
        <motion.circle
          key={index}
          cx={36 + point.x * 348}
          cy={24 + point.y * 204}
          r={Math.max(3, 8 - index * 0.55)}
          fill={index > 4 ? '#8f8779' : '#2f6f68'}
          initial={false}
          animate={{ opacity: index > 4 ? 0.42 : 0.9 }}
        />
      ))}
    </svg>
  )
}

function PatternGrid({ pattern }: { pattern: MemoryPattern }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{pattern.label}</p>
        <p className="font-mono text-xs text-accent">{Math.round(pattern.confidence * 100)}%</p>
      </div>
      <div className="grid overflow-hidden rounded-lg border border-line bg-cream" style={{ gridTemplateColumns: `repeat(${pattern.size}, minmax(0, 1fr))` }}>
        {pattern.cells.map((cell, index) => (
          <motion.div
            key={index}
            className="aspect-square border border-card"
            initial={false}
            animate={{ backgroundColor: cell ? '#2f6f68' : '#e8e0d1', opacity: cell ? 0.95 : 0.7 }}
          />
        ))}
      </div>
    </div>
  )
}

function MemoryComparison({ dataset }: { dataset: ExperimentDataset }) {
  const patterns = dataset.memoryPatterns?.hopfield ?? []
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-lg border border-line bg-card p-4">
        <h4 className="text-sm font-semibold text-ink">Hopfield reconstruction behavior</h4>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {patterns.map((pattern) => (
            <PatternGrid key={pattern.id} pattern={pattern} />
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-line bg-card p-4">
        <h4 className="text-sm font-semibold text-ink">QML boundary confidence behavior</h4>
        <div className="mt-4">
          <DecisionBoundaries dataset={dataset} values={{ noise: 0.42 }} />
        </div>
      </div>
    </div>
  )
}

export function ExperimentVisualization({
  definition,
  dataset,
  values,
}: {
  definition: VisualizationDefinition
  dataset: ExperimentDataset
  values: ControlValues
}) {
  const metrics = dataset.metrics?.default ?? []
  const heatmap = dataset.heatmaps?.[definition.datasetKey ?? 'kernel'] ?? dataset.heatmaps?.gradients
  const embedding = dataset.embeddings?.[definition.datasetKey ?? 'representation']
  const trajectory = dataset.distributions?.trajectory
  const pressure = numberValue(values, 'noise', numberValue(values, 'randomness', 0.35))

  if (definition.kind === 'loss-curves' || definition.kind === 'gradient-collapse') {
    return (
      <VisualCard title={definition.title} description={definition.description} wide>
        <LineChart traces={dataset.traces ?? []} pressure={pressure} />
      </VisualCard>
    )
  }

  if (definition.kind === 'decision-boundaries') {
    return (
      <VisualCard title={definition.title} description={definition.description} wide={Object.keys(dataset.boundaries ?? {}).length > 1}>
        <DecisionBoundaries dataset={dataset} values={values} />
      </VisualCard>
    )
  }

  if (definition.kind === 'confidence-strip') {
    return (
      <VisualCard title={definition.title} description={definition.description} wide>
        <MetricsStrip metrics={metrics} values={values} />
      </VisualCard>
    )
  }

  if (definition.kind === 'kernel-heatmap' && heatmap) {
    return (
      <VisualCard title={definition.title} description={definition.description}>
        <Heatmap cells={heatmap} />
      </VisualCard>
    )
  }

  if (definition.kind === 'gradient-heatmap' && heatmap) {
    return (
      <VisualCard title={definition.title} description={definition.description}>
        <Heatmap cells={heatmap} />
      </VisualCard>
    )
  }

  if (definition.kind === 'embedding' && embedding) {
    return (
      <VisualCard title={definition.title} description={definition.description}>
        <Embedding points={embedding} values={values} />
      </VisualCard>
    )
  }

  if (definition.kind === 'optimization-freeze' && trajectory) {
    return (
      <VisualCard title={definition.title} description={definition.description}>
        <OptimizationFreeze points={trajectory} values={values} />
      </VisualCard>
    )
  }

  if (definition.kind === 'memory-comparison') {
    return (
      <VisualCard title={definition.title} description={definition.description} wide>
        <MemoryComparison dataset={dataset} />
      </VisualCard>
    )
  }

  return null
}
