import { experimentDatasets } from '@/data/experiments/placeholder-traces'
import type { ExperimentConfig } from '@/data/experiments/types'

const notebookBase = 'https://github.com/sanjay14063/qml-research-lab/blob/main/notebooks'
const colabBase = 'https://colab.research.google.com/github/sanjay14063/qml-research-lab/blob/main/notebooks'

export const experimentCatalog: ExperimentConfig[] = [
  {
    slug: 'noise-sensitivity-explorer',
    title: 'Noise Sensitivity Explorer',
    hook: 'Noise destroys distinguishability before it merely lowers accuracy.',
    description:
      'A synchronized visual layer for inspecting how noise blurs decision regions, destabilizes convergence, and weakens useful gradient signal.',
    overview:
      'This placeholder trace package treats noise as a pressure applied to every research artifact at once: loss curves, boundary sharpness, confidence, fidelity, and gradient signal. The goal is to make the degradation legible before real simulator exports are attached.',
    strongIdea: 'Learning fails when the model can no longer separate states decisively.',
    controls: [
      { id: 'noise', kind: 'range', label: 'Noise level', min: 0, max: 1, step: 0.01, defaultValue: 0.38, endpoints: ['Clean', 'Device-like'] },
      { id: 'depth', kind: 'range', label: 'Circuit depth', min: 1, max: 8, step: 1, defaultValue: 4, endpoints: ['Shallow', 'Deep'] },
      { id: 'epochs', kind: 'range', label: 'Training epochs', min: 20, max: 220, step: 10, defaultValue: 120, unit: ' epochs' },
    ],
    visualizations: [
      { id: 'loss', kind: 'loss-curves', title: 'Synchronized Loss Traces', description: 'Clean, moderate, and high-noise runs share one epoch axis.' },
      { id: 'boundaries', kind: 'decision-boundaries', title: 'Decision Boundary Degradation', description: 'The classifier boundary loses contrast as uncertainty spreads.' },
      { id: 'confidence', kind: 'confidence-strip', title: 'Confidence and Signal', description: 'Fidelity and gradients compress as noise increases.' },
    ],
    observations: [
      'The clean run keeps a stable descent path while high noise jitters around a shallow improvement.',
      'Boundary blur is shown as uncertainty, not as decorative softness.',
      'Gradient signal and confidence degrade together, making updates less informative.',
    ],
    keyInsight: 'Noise is a representation problem and an optimization problem at the same time.',
    researchConnection:
      'This experiment is the visual companion to noise-aware training notes. Notebook exports should land as JSON loss traces, boundary grids, and scalar metrics in data/experiments.',
    links: {
      notebook: `${notebookBase}/noise-aware-training.ipynb`,
      colab: `${colabBase}/noise-aware-training.ipynb`,
      walkthrough: '/research/notes/noise-aware-training',
    },
    dataset: experimentDatasets['noise-sensitivity-explorer'],
  },
  {
    slug: 'quantum-feature-geometry-explorer',
    title: 'Quantum Feature Geometry Explorer',
    hook: 'Feature maps matter because they reshape which samples become similar.',
    description:
      'An elegant geometry-first view of quantum kernels, representation embeddings, and separability under feature-map choices.',
    overview:
      'Instead of framing the model as a black-box classifier, this experiment shows the geometry produced by a feature map. The kernel matrix, boundary, and embedding are synchronized placeholders for future notebook outputs.',
    strongIdea: 'The kernel matrix is a map of the model’s learned similarity world.',
    controls: [
      { id: 'featureDepth', kind: 'range', label: 'Feature map depth', min: 1, max: 6, step: 1, defaultValue: 3, endpoints: ['Local', 'Expressive'] },
      { id: 'entanglement', kind: 'range', label: 'Entanglement strength', min: 0, max: 1, step: 0.01, defaultValue: 0.62, endpoints: ['Independent', 'Correlated'] },
      {
        id: 'kernel',
        kind: 'segmented',
        label: 'Kernel type',
        defaultValue: 'quantum',
        options: [
          { label: 'Quantum', value: 'quantum' },
          { label: 'RBF baseline', value: 'rbf' },
        ],
      },
    ],
    visualizations: [
      { id: 'boundary', kind: 'decision-boundaries', title: 'Boundary as Geometry', description: 'The separating curve follows the similarity geometry.' },
      { id: 'kernel', kind: 'kernel-heatmap', title: 'Kernel Matrix', description: 'Blocks and off-diagonal structure reveal sample similarity.' },
      { id: 'embedding', kind: 'embedding', title: 'Representation Geometry', description: 'A 2D placeholder projection of the feature-space relationships.' },
    ],
    observations: [
      'The heatmap is the primary research artifact: it shows what the feature map considers close.',
      'Entanglement changes geometry, but different geometry is not automatically better geometry.',
      'The RBF toggle keeps the comparison grounded in a serious classical baseline.',
    ],
    keyInsight: 'A feature map should be inspected as geometry before it is judged as a classifier.',
    researchConnection:
      'Kernel notebooks can export matrices, embeddings, and alignment metrics directly into this dataset shape.',
    links: {
      notebook: `${notebookBase}/quantum-kernel-feature-maps.ipynb`,
      colab: `${colabBase}/quantum-kernel-feature-maps.ipynb`,
      walkthrough: '/research/notes/quantum-kernels',
    },
    dataset: experimentDatasets['quantum-feature-geometry-explorer'],
  },
  {
    slug: 'barren-plateau-explorer',
    title: 'Barren Plateau Explorer',
    hook: 'As circuits grow, the optimizer can lose directional information.',
    description:
      'A trainability-focused experiment showing gradient collapse, fading parameter signal, and optimization trajectories that nearly freeze.',
    overview:
      'This experiment is intentionally more theoretical. It links circuit complexity to disappearing gradients and makes the optimizer’s loss of direction visible through multiple placeholder artifacts.',
    strongIdea: 'The problem is not only slow learning; it is the disappearance of useful direction.',
    controls: [
      { id: 'qubits', kind: 'range', label: 'Qubit count', min: 4, max: 14, step: 1, defaultValue: 9, endpoints: ['Small', 'Wide'] },
      { id: 'depth', kind: 'range', label: 'Circuit depth', min: 1, max: 12, step: 1, defaultValue: 7, endpoints: ['Shallow', 'Deep'] },
      { id: 'randomness', kind: 'range', label: 'Initialization randomness', min: 0, max: 1, step: 0.01, defaultValue: 0.58, endpoints: ['Structured', 'Random'] },
    ],
    visualizations: [
      { id: 'collapse', kind: 'gradient-collapse', title: 'Gradient Norm Collapse', description: 'Magnitude falls rapidly as complexity rises.' },
      { id: 'heatmap', kind: 'gradient-heatmap', title: 'Parameter Gradient Field', description: 'Parameter-wise signal fades into low-contrast noise.' },
      { id: 'trajectory', kind: 'optimization-freeze', title: 'Optimization Freezing', description: 'Updates shrink until the path barely moves.' },
    ],
    observations: [
      'The collapse trace makes trainability a scaling behavior, not a cosmetic chart.',
      'The gradient heatmap fades because the optimizer receives less directional structure.',
      'The trajectory panel shows the practical consequence: motion slows before the objective is solved.',
    ],
    keyInsight: 'A barren plateau is an information problem for the optimizer.',
    researchConnection:
      'Connect this page to barren plateau notebook sweeps by exporting gradient norms, per-parameter gradients, and optimizer trajectories.',
    links: {
      notebook: `${notebookBase}/barren-plateaus.ipynb`,
      colab: `${colabBase}/barren-plateaus.ipynb`,
      walkthrough: '/research/barren-plateaus-training-variational-quantum-classifiers',
    },
    dataset: experimentDatasets['barren-plateau-explorer'],
  },
  {
    slug: 'associative-memory-vs-qml',
    title: 'Associative Memory vs QML',
    hook: 'Different representations fail in different ways under corruption.',
    description:
      'A careful side-by-side comparison of Hopfield-style reconstruction behavior and QML-style classification confidence under noisy inputs.',
    overview:
      'This is not a quantum advantage claim. It is a representational behavior comparison: associative memory tries to reconstruct a stored pattern, while a QML classifier expresses uncertainty through its boundary and confidence map.',
    strongIdea: 'Failure mode is part of the model’s representation.',
    controls: [
      { id: 'corruption', kind: 'range', label: 'Corruption', min: 0, max: 1, step: 0.01, defaultValue: 0.34, endpoints: ['Clean cue', 'Damaged cue'] },
      { id: 'memoryLoad', kind: 'range', label: 'Memory load', min: 2, max: 12, step: 1, defaultValue: 6, endpoints: ['Sparse', 'Crowded'] },
      { id: 'noise', kind: 'range', label: 'Noise level', min: 0, max: 1, step: 0.01, defaultValue: 0.42, endpoints: ['Low', 'High'] },
    ],
    visualizations: [
      { id: 'comparison', kind: 'memory-comparison', title: 'Representational Failure Modes', description: 'Hopfield recall and QML confidence degrade differently.' },
      { id: 'boundary', kind: 'decision-boundaries', title: 'QML Confidence Map', description: 'The classifier becomes less decisive near the boundary.' },
      { id: 'confidence', kind: 'confidence-strip', title: 'Comparison Metrics', description: 'Recall, classifier confidence, and behavior distance.' },
    ],
    observations: [
      'Hopfield behavior is reconstruction-centered: the output snaps toward or away from stored memories.',
      'QML behavior is boundary-centered: corruption appears as confidence loss and ambiguous regions.',
      'The comparison is about representational texture, not superiority.',
    ],
    keyInsight: 'A fair comparison asks how models fail, not which one gets a louder headline.',
    researchConnection:
      'Future exports should pair Hopfield recall states with QML confidence grids generated from the same corrupted inputs.',
    links: {
      notebook: `${notebookBase}/associative-memory-vs-qml.ipynb`,
      colab: `${colabBase}/associative-memory-vs-qml.ipynb`,
      walkthrough: '/research/notes/vqc',
    },
    dataset: experimentDatasets['associative-memory-vs-qml'],
  },
]

export function getExperimentConfig(slug: string) {
  return experimentCatalog.find((experiment) => experiment.slug === slug)
}
