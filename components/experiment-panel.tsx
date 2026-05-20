'use client'

import { useMemo, useState } from 'react'

type ExperimentVisualizationProps = {
  noise: number
  model: 'QML' | 'Hopfield'
  runCount: number
}

export function ExperimentVisualization({ noise, model, runCount }: ExperimentVisualizationProps) {
  const points = useMemo(() => {
    return Array.from({ length: 9 }, (_, index) => {
      const x = index / 8
      const base = model === 'QML' ? Math.sin(x * Math.PI) : 1 - Math.abs(x - 0.5) * 1.4
      const degradation = model === 'QML' ? noise * 0.55 : noise * 0.28
      const y = Math.max(0.08, Math.min(0.95, base * (1 - degradation) + 0.08 + runCount * 0.01))
      return { x: 24 + x * 312, y: 180 - y * 140 }
    })
  }, [model, noise, runCount])

  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')

  return (
    <div className="rounded-xl border border-line bg-cream p-4">
      <svg viewBox="0 0 360 200" className="h-56 w-full" role="img" aria-label="Dummy experiment response chart">
        <line x1="24" y1="180" x2="340" y2="180" className="stroke-line-strong" strokeWidth="1" />
        <line x1="24" y1="24" x2="24" y2="180" className="stroke-line-strong" strokeWidth="1" />
        {[0, 1, 2, 3].map((tick) => (
          <line
            key={tick}
            x1="24"
            x2="340"
            y1={40 + tick * 40}
            y2={40 + tick * 40}
            className="stroke-line"
            strokeWidth="1"
          />
        ))}
        <path d={path} fill="none" className="stroke-accent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="4" className="fill-card stroke-accent" strokeWidth="2" />
        ))}
      </svg>
      <p className="mt-3 text-sm leading-6 text-muted">
        Dummy output: {model} response at noise {noise.toFixed(2)}. Replace this with real experiment traces when simulations are ready.
      </p>
    </div>
  )
}

export function ExperimentPanel() {
  const [noise, setNoise] = useState(0.25)
  const [model, setModel] = useState<'QML' | 'Hopfield'>('QML')
  const [runCount, setRunCount] = useState(0)

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="rounded-xl border border-line bg-card p-5">
        <h2 className="text-xl font-semibold tracking-tight text-ink">Controls</h2>
        <label className="mt-6 block text-sm font-semibold text-ink" htmlFor="noise">
          Noise level: {noise.toFixed(2)}
        </label>
        <input
          id="noise"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={noise}
          onChange={(event) => setNoise(Number(event.target.value))}
          className="mt-3 w-full accent-accent"
        />

        <label className="mt-6 block text-sm font-semibold text-ink" htmlFor="model">
          Model
        </label>
        <select
          id="model"
          value={model}
          onChange={(event) => setModel(event.target.value as 'QML' | 'Hopfield')}
          className="mt-3 w-full rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-line-strong"
        >
          <option>QML</option>
          <option>Hopfield</option>
        </select>

        <button
          type="button"
          onClick={() => setRunCount((count) => count + 1)}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-ink bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition duration-200 hover:-translate-y-0.5 hover:bg-ink-soft"
        >
          Run
        </button>

        <p className="mt-5 text-sm leading-6 text-muted">
          Runs completed: {runCount}. This updates placeholder output only; no simulation is executed yet.
        </p>
      </div>

      <ExperimentVisualization noise={noise} model={model} runCount={runCount} />
    </div>
  )
}
