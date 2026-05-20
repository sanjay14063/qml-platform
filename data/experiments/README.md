# Experiment Data Layer

Placeholder traces currently live in `placeholder-traces.ts`.

Future notebook exports should use the shapes in `types.ts`:

- loss and gradient curves: `LineTrace[]`
- decision boundaries and confidence maps: `BoundaryCell[]`
- kernel matrices and gradient heatmaps: `MatrixCell[]`
- embeddings: `ScatterPoint[]`
- scalar metrics: `MetricValue[]`
- Hopfield or memory-state grids: `MemoryPattern[]`

Recommended workflow:

1. Export JSON, CSV, or static arrays from a Python notebook.
2. Place the exported artifact in `data/experiments/`.
3. Import or parse it in the experiment catalog.
4. Keep UI components unchanged unless a new visualization primitive is needed.
