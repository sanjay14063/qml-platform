import type {
  BoundaryCell,
  ExperimentDataset,
  ExperimentSlug,
  LineTrace,
  MatrixCell,
  MemoryPattern,
  MetricValue,
  ScatterPoint,
  TracePoint,
} from './types'

const round = (value: number, places = 3) => Number(value.toFixed(places))

function lineTrace(id: string, label: string, tone: LineTrace['tone'], values: number[]): LineTrace {
  return {
    id,
    label,
    tone,
    points: values.map((y, x) => ({ x, y: round(y) })),
  }
}

function boundary(key: string, softness: number, tilt = 0): BoundaryCell[] {
  const cells: BoundaryCell[] = []
  for (let y = 0; y < 18; y += 1) {
    for (let x = 0; x < 24; x += 1) {
      const nx = x / 23
      const ny = y / 17
      const wave = Math.sin((nx * 3.2 + tilt) * Math.PI) * 0.16
      const raw = ny - 0.52 - wave + (nx - 0.5) * tilt * 0.18
      const value = 1 / (1 + Math.exp(-raw * (12 - softness * 8)))
      const confidence = Math.max(0.08, Math.min(1, Math.abs(value - 0.5) * 2 * (1 - softness * 0.55)))
      cells.push({ x, y, value: round(value), confidence: round(confidence) })
    }
  }
  void key
  return cells
}

function matrix(size: number, focus: number, blockiness: number): MatrixCell[] {
  const cells: MatrixCell[] = []
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      const sameBlock = Math.floor(row / 4) === Math.floor(col / 4)
      const distance = Math.abs(row - col) / size
      const value = Math.max(
        0,
        Math.min(1, (sameBlock ? 0.42 * blockiness : 0.08) + Math.exp(-distance * focus) * 0.74),
      )
      cells.push({ row, col, value: round(value) })
    }
  }
  return cells
}

function embedding(depth: number, entanglement: number): ScatterPoint[] {
  return Array.from({ length: 36 }, (_, index) => {
    const label = index % 2 === 0 ? 0 : 1
    const ring = label === 0 ? 0.28 : 0.42
    const angle = (index / 36) * Math.PI * 2 + label * 0.72
    const warp = Math.sin(angle * depth) * entanglement * 0.1
    return {
      x: round(0.5 + Math.cos(angle) * (ring + warp)),
      y: round(0.5 + Math.sin(angle) * (ring - warp * 0.5)),
      label,
      confidence: round(0.62 + entanglement * 0.28),
    }
  })
}

function gradientHeatmap(rows: number, cols: number, collapse: number): MatrixCell[] {
  const cells: MatrixCell[] = []
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const ripple = Math.abs(Math.sin(row * 0.8) * Math.cos(col * 0.55))
      cells.push({ row, col, value: round(ripple * (1 - collapse) + 0.02) })
    }
  }
  return cells
}

function pattern(id: string, label: string, confidence: number, flips: number[]): MemoryPattern {
  const base = [
    1, 1, 1, 0, 1, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 0,
    0, 1, 0, 0, 1, 0, 1, 1,
    1, 0, 1, 0, 0, 1, 0, 1,
  ]
  const cells = base.map((value, index) => (flips.includes(index) ? 1 - value : value))
  return { id, label, cells, size: 8, confidence }
}

const noiseTraces = [
  lineTrace('clean', 'No noise', 'clean', [0.92, 0.72, 0.55, 0.41, 0.31, 0.24, 0.2, 0.17, 0.15, 0.13, 0.12, 0.11]),
  lineTrace('moderate', 'Moderate noise', 'moderate', [0.94, 0.78, 0.64, 0.55, 0.47, 0.44, 0.39, 0.41, 0.35, 0.37, 0.33, 0.35]),
  lineTrace('high', 'High noise', 'high', [0.95, 0.88, 0.82, 0.79, 0.75, 0.78, 0.73, 0.76, 0.71, 0.74, 0.72, 0.75]),
]

const barrenTraces = [
  lineTrace('four-qubits', '4 qubits', 'clean', [0.48, 0.42, 0.35, 0.28, 0.21, 0.17, 0.13, 0.1, 0.08]),
  lineTrace('eight-qubits', '8 qubits', 'moderate', [0.34, 0.25, 0.17, 0.11, 0.07, 0.045, 0.031, 0.022, 0.017]),
  lineTrace('twelve-qubits', '12 qubits', 'high', [0.22, 0.12, 0.061, 0.032, 0.017, 0.01, 0.007, 0.005, 0.004]),
]

const optimizationTrace: TracePoint[] = [
  { x: 0.1, y: 0.82 },
  { x: 0.22, y: 0.68 },
  { x: 0.34, y: 0.54 },
  { x: 0.43, y: 0.44 },
  { x: 0.49, y: 0.39 },
  { x: 0.52, y: 0.37 },
  { x: 0.535, y: 0.365 },
  { x: 0.542, y: 0.363 },
]

const memoryMetrics: MetricValue[] = [
  { label: 'Hopfield recall', value: 0.74, unit: '', detail: 'At current placeholder corruption' },
  { label: 'QML confidence', value: 0.58, unit: '', detail: 'Boundary confidence under comparable noise' },
  { label: 'Failure mode distance', value: 0.41, unit: '', detail: 'Representational behaviors diverge' },
]

export const experimentDatasets: Record<ExperimentSlug, ExperimentDataset> = {
  'noise-sensitivity-explorer': {
    slug: 'noise-sensitivity-explorer',
    version: 'placeholder.v1',
    source: 'placeholder',
    notes: 'Replace this file with notebook-exported loss traces, boundary grids, and scalar metrics.',
    traces: noiseTraces,
    boundaries: {
      low: boundary('low', 0.08),
      moderate: boundary('moderate', 0.44, 0.2),
      high: boundary('high', 0.82, -0.15),
    },
    metrics: {
      default: [
        { label: 'Fidelity', value: 0.79, unit: '', detail: 'State distinguishability retained' },
        { label: 'Gradient signal', value: 0.46, unit: '', detail: 'Useful update magnitude' },
        { label: 'Mean confidence', value: 0.61, unit: '', detail: 'Classifier certainty over the grid' },
      ],
    },
  },
  'quantum-feature-geometry-explorer': {
    slug: 'quantum-feature-geometry-explorer',
    version: 'placeholder.v1',
    source: 'placeholder',
    notes: 'Designed for exported kernel matrices, 2D embeddings, and boundary grids from feature-map notebooks.',
    boundaries: {
      geometry: boundary('geometry', 0.18, 0.62),
    },
    heatmaps: {
      kernel: matrix(16, 6.5, 1.1),
    },
    embeddings: {
      representation: embedding(3, 0.8),
    },
    metrics: {
      default: [
        { label: 'Kernel alignment', value: 0.68, detail: 'Placeholder label-geometry agreement' },
        { label: 'Class separation', value: 0.73, detail: 'Distance after feature-map reshaping' },
      ],
    },
  },
  'barren-plateau-explorer': {
    slug: 'barren-plateau-explorer',
    version: 'placeholder.v1',
    source: 'placeholder',
    notes: 'Accepts gradient-norm traces, parameter-gradient matrices, and optimizer trajectories from trainability notebooks.',
    traces: barrenTraces,
    heatmaps: {
      gradients: gradientHeatmap(10, 18, 0.72),
    },
    distributions: {
      trajectory: optimizationTrace,
    },
    metrics: {
      default: [
        { label: 'Trainability', value: 0.29, detail: 'Directional signal remaining' },
        { label: 'Gradient norm', value: 0.12, detail: 'Median placeholder magnitude' },
      ],
    },
  },
  'associative-memory-vs-qml': {
    slug: 'associative-memory-vs-qml',
    version: 'placeholder.v1',
    source: 'placeholder',
    notes: 'Built for side-by-side exported Hopfield recall states and QML confidence maps.',
    boundaries: {
      qml: boundary('qml', 0.52, -0.35),
    },
    memoryPatterns: {
      hopfield: [
        pattern('stored', 'Stored memory', 0.96, []),
        pattern('corrupted', 'Corrupted cue', 0.44, [1, 6, 9, 14, 18, 21, 25, 30]),
        pattern('recalled', 'Recalled state', 0.71, [6, 18, 25]),
      ],
    },
    metrics: {
      default: memoryMetrics,
    },
  },
}
