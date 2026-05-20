'use client'

import type { ExperimentControl } from '@/data/experiments/types'

type ControlValues = Record<string, number | string>

type ExperimentControlsProps = {
  controls: ExperimentControl[]
  values: ControlValues
  onChange: (id: string, value: number | string) => void
}

export function getDefaultControlValues(controls: ExperimentControl[]): ControlValues {
  return controls.reduce<ControlValues>((values, control) => {
    values[control.id] = control.defaultValue
    return values
  }, {})
}

export function ExperimentControls({ controls, values, onChange }: ExperimentControlsProps) {
  return (
    <div className="rounded-xl border border-line bg-card p-5 shadow-soft">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Controls</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink">Research Trace Parameters</h2>
      </div>

      <div className="mt-6 space-y-6">
        {controls.map((control) => {
          if (control.kind === 'segmented') {
            return (
              <fieldset key={control.id}>
                <legend className="text-sm font-semibold text-ink">{control.label}</legend>
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-line bg-cream p-1">
                  {control.options.map((option) => {
                    const selected = values[control.id] === option.value
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(control.id, option.value)}
                        className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                          selected ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            )
          }

          const value = Number(values[control.id])
          return (
            <label key={control.id} className="block">
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-semibold text-ink">{control.label}</span>
                <span className="rounded-full border border-line bg-cream px-2.5 py-1 font-mono text-xs text-muted">
                  {value.toFixed(control.step < 1 ? 2 : 0)}
                  {control.unit}
                </span>
              </div>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={value}
                onChange={(event) => onChange(control.id, Number(event.target.value))}
                className="demo-range mt-4 w-full"
              />
              {control.endpoints && (
                <div className="mt-2 flex items-center justify-between text-xs font-medium text-muted">
                  <span>{control.endpoints[0]}</span>
                  <span>{control.endpoints[1]}</span>
                </div>
              )}
            </label>
          )
        })}
      </div>
    </div>
  )
}
