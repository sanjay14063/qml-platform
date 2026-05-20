export type ExperimentSlug =
  | 'noise-sensitivity-explorer'
  | 'quantum-feature-geometry-explorer'
  | 'barren-plateau-explorer'
  | 'associative-memory-vs-qml'

export type ControlKind = 'range' | 'segmented'

export type RangeControl = {
  id: string
  kind: 'range'
  label: string
  min: number
  max: number
  step: number
  defaultValue: number
  unit?: string
  endpoints?: [string, string]
}

export type SegmentedControl = {
  id: string
  kind: 'segmented'
  label: string
  defaultValue: string
  options: Array<{ label: string; value: string }>
}

export type ExperimentControl = RangeControl | SegmentedControl

export type TracePoint = {
  x: number
  y: number
}

export type LineTrace = {
  id: string
  label: string
  tone: 'clean' | 'moderate' | 'high' | 'accent' | 'muted'
  points: TracePoint[]
}

export type BoundaryCell = {
  x: number
  y: number
  value: number
  confidence: number
}

export type ScatterPoint = {
  x: number
  y: number
  label: 0 | 1
  confidence?: number
}

export type MatrixCell = {
  row: number
  col: number
  value: number
}

export type MetricValue = {
  label: string
  value: number
  unit?: string
  detail?: string
}

export type MemoryPattern = {
  id: string
  label: string
  cells: number[]
  size: number
  confidence: number
}

export type ExperimentDataset = {
  slug: ExperimentSlug
  version: string
  source: 'placeholder'
  notes: string
  traces?: LineTrace[]
  boundaries?: Record<string, BoundaryCell[]>
  heatmaps?: Record<string, MatrixCell[]>
  embeddings?: Record<string, ScatterPoint[]>
  metrics?: Record<string, MetricValue[]>
  distributions?: Record<string, TracePoint[]>
  memoryPatterns?: Record<string, MemoryPattern[]>
}

export type VisualizationKind =
  | 'loss-curves'
  | 'decision-boundaries'
  | 'confidence-strip'
  | 'kernel-heatmap'
  | 'embedding'
  | 'gradient-collapse'
  | 'gradient-heatmap'
  | 'optimization-freeze'
  | 'memory-comparison'

export type VisualizationDefinition = {
  id: string
  kind: VisualizationKind
  title: string
  description: string
  datasetKey?: string
}

export type ExperimentLinks = {
  notebook: string
  colab: string
  walkthrough: string
}

export type ExperimentConfig = {
  slug: ExperimentSlug
  title: string
  hook: string
  description: string
  overview: string
  strongIdea: string
  controls: ExperimentControl[]
  visualizations: VisualizationDefinition[]
  observations: string[]
  keyInsight?: string
  researchConnection: string
  links: ExperimentLinks
  dataset: ExperimentDataset
}
