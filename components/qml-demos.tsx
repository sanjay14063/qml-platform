'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

function DemoCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border border-line bg-card p-5 shadow-soft md:p-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}

function DemoSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  endpoints,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  endpoints?: [string, string]
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-ink">{label}</span>
        <span className="font-mono text-muted">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="demo-range mt-4 w-full"
      />
      {endpoints && (
        <div className="mt-2 flex items-center justify-between text-xs font-medium text-muted">
          <span>{endpoints[0]}</span>
          <span>{endpoints[1]}</span>
        </div>
      )}
    </label>
  )
}

function ProbabilityBars({ values, faded = false }: { values: Array<{ label: string; value: number }>; faded?: boolean }) {
  return (
    <div className="space-y-3">
      {values.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-xs font-medium text-muted">
            <span>{item.label}</span>
            <span>{Math.round(item.value * 100)}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-[#ebe5d8]">
            <motion.div
              className={`h-full rounded-full bg-accent ${faded ? 'opacity-60' : 'opacity-100'}`}
              initial={false}
              animate={{ width: `${item.value * 100}%` }}
              transition={{ duration: 0.2, ease }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function NoiseVisualizationDemo() {
  const [noise, setNoise] = useState(0.18)
  const fidelity = Math.max(0, 1 - noise * 0.82)
  const p0 = 0.92 * (1 - noise) + 0.5 * noise
  const p1 = 1 - p0
  const insight =
    noise < 0.34
      ? 'Measurement outcomes remain highly distinguishable.'
      : noise < 0.68
        ? 'Quantum information begins degrading under noise.'
        : 'The system approaches a maximally random state.'

  const rows = [
    { label: '|0⟩', value: p0 },
    { label: '|1⟩', value: p1 },
  ]

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-line bg-card p-6 shadow-soft md:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Interactive intuition</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Noise makes quantum outcomes less distinguishable.
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          Increase the noise level and watch a confident one-qubit measurement drift toward randomness.
        </p>
      </div>

      <div className="mt-8 grid gap-7 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <motion.div
          className="rounded-2xl border border-line bg-cream p-5 md:p-6"
          animate={{
            opacity: 1 - noise * 0.16,
            filter: `saturate(${1 - noise * 0.34}) contrast(${1 - noise * 0.08})`,
          }}
          transition={{ duration: 0.22, ease }}
        >
          <div className="flex items-center justify-between">
            {['|0⟩', 'RY', 'Noise', 'M'].map((gate, index) => (
              <div key={gate} className="flex flex-1 items-center">
                <motion.div
                  className={`flex h-11 min-w-12 items-center justify-center rounded-xl border bg-card text-xs font-semibold ${
                    index === 2 ? 'border-line-strong text-accent' : 'border-line text-ink'
                  }`}
                  animate={
                    index === 2
                      ? {
                          scale: 1 + noise * 0.04,
                          x: noise > 0.55 ? [0, -noise * 1.4, noise * 1.2, 0] : 0,
                        }
                      : { scale: 1, x: 0 }
                  }
                  transition={index === 2 && noise > 0.55 ? { duration: 2.4, repeat: Infinity, ease } : { duration: 0.22, ease }}
                >
                  {gate}
                </motion.div>
                {index < 3 && <div className="h-px flex-1 bg-line" />}
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-5">
            {rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[3rem_1fr_3rem] items-center gap-4">
                <span className="font-mono text-sm text-ink">{row.label}</span>
                <div className="h-4 overflow-hidden rounded-full bg-[#e8e0d1]">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={false}
                    animate={{ width: `${row.value * 100}%`, opacity: noise > 0.72 ? 0.64 : 0.92 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 24, mass: 0.7 }}
                  />
                </div>
                <motion.span
                  className="text-right font-mono text-sm text-muted"
                  key={`${row.label}-${Math.round(row.value * 100)}`}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease }}
                >
                  {Math.round(row.value * 100)}%
                </motion.span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          <DemoSlider
            label="Noise Level"
            value={noise}
            min={0}
            max={1}
            step={0.01}
            display={noise.toFixed(2)}
            endpoints={['Low Noise', 'High Noise']}
            onChange={setNoise}
          />
          <div className="rounded-2xl border border-line bg-cream p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-ink">Fidelity</span>
              <motion.span
                className="font-mono text-accent"
                initial={false}
                animate={{ opacity: Math.max(0.45, fidelity), y: noise > 0.7 ? [0, 1, -1, 0] : 0 }}
                transition={noise > 0.7 ? { duration: 2.2, repeat: Infinity, ease } : { duration: 0.22, ease }}
              >
                {Math.round(fidelity * 100)}%
              </motion.span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8e0d1]">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={false}
                animate={{ width: `${fidelity * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 24, mass: 0.7 }}
              />
            </div>
          </div>
        </div>
      </div>

      <motion.p
        className="mx-auto mt-7 max-w-xl text-center text-sm leading-6 text-muted"
        key={insight}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease }}
      >
        {insight}
      </motion.p>
    </div>
  )
}

export function ParameterizedCircuitDemo() {
  const [theta, setTheta] = useState(Math.PI / 3)
  const probabilities = useMemo(() => {
    const p0 = Math.cos(theta / 2) ** 2
    return { p0, p1: 1 - p0 }
  }, [theta])

  const pointer = {
    x: 50 + Math.sin(theta) * 33,
    y: 50 - Math.cos(theta) * 33,
  }

  return (
    <DemoCard
      title="Parameterized Circuit Intuition"
      description="Move the rotation parameter and watch measurement probabilities change smoothly."
    >
      <div className="grid gap-6 md:grid-cols-[0.85fr_1fr] md:items-center">
        <div className="space-y-5">
          <DemoSlider
            label="Parameter theta"
            value={theta}
            min={0}
            max={Math.PI * 2}
            step={0.01}
            display={`${theta.toFixed(2)} rad`}
            onChange={setTheta}
          />
          <div className="rounded-xl border border-line bg-cream p-4 font-mono text-sm leading-7 text-ink">
            <p>P(0) = cos²(theta/2) = {probabilities.p0.toFixed(2)}</p>
            <p>P(1) = sin²(theta/2) = {probabilities.p1.toFixed(2)}</p>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-cream p-5">
          <div className="grid gap-5 md:grid-cols-[120px_1fr] md:items-center">
            <svg viewBox="0 0 100 100" className="mx-auto h-28 w-28" role="img" aria-label="State rotation approximation">
              <circle cx="50" cy="50" r="36" className="fill-card stroke-line-strong" strokeWidth="1.5" />
              <line x1="50" y1="14" x2="50" y2="86" className="stroke-line" strokeWidth="1" />
              <line x1="14" y1="50" x2="86" y2="50" className="stroke-line" strokeWidth="1" />
              <motion.line
                x1="50"
                y1="50"
                initial={false}
                animate={{ x2: pointer.x, y2: pointer.y }}
                transition={{ duration: 0.18, ease }}
                className="stroke-accent"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <motion.circle
                r="4"
                initial={false}
                animate={{ cx: pointer.x, cy: pointer.y }}
                transition={{ duration: 0.18, ease }}
                className="fill-accent"
              />
            </svg>
            <div>
              <div className="mb-5 flex items-center text-xs font-semibold text-muted">
                <span className="rounded-lg border border-line px-3 py-2">|0&gt;</span>
                <span className="h-px flex-1 bg-line" />
                <span className="rounded-lg border border-line-strong px-3 py-2 text-accent">RY(theta)</span>
                <span className="h-px flex-1 bg-line" />
                <span className="rounded-lg border border-line px-3 py-2">M</span>
              </div>
              <ProbabilityBars
                values={[
                  { label: 'P(0)', value: probabilities.p0 },
                  { label: 'P(1)', value: probabilities.p1 },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </DemoCard>
  )
}
