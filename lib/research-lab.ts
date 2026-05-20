export const researchNotebooks = [
  {
    slug: 'vqc',
    title: 'Variational Quantum Classifier',
    description: 'Train a compact VQC on a toy classification task and inspect how ansatz choices affect decision boundaries.',
    tags: ['VQC', 'Optimization', 'PennyLane'],
    href: 'https://github.com/sanjay14063/qml-research-lab/blob/main/notebooks/variational-quantum-classifier.ipynb',
    colab: 'https://colab.research.google.com/github/sanjay14063/qml-research-lab/blob/main/notebooks/variational-quantum-classifier.ipynb',
    breakdown: '/research/notes/vqc',
  },
  {
    slug: 'quantum-kernels',
    title: 'Quantum Kernels from Feature Maps',
    description: 'Build kernel matrices from quantum feature maps and compare them against classical baselines.',
    tags: ['Kernels', 'Feature Maps', 'Baselines'],
    href: 'https://github.com/sanjay14063/qml-research-lab/blob/main/notebooks/quantum-kernel-feature-maps.ipynb',
    colab: 'https://colab.research.google.com/github/sanjay14063/qml-research-lab/blob/main/notebooks/quantum-kernel-feature-maps.ipynb',
    breakdown: '/research/notes/quantum-kernels',
  },
  {
    slug: 'noise-aware-training',
    title: 'Noise-Aware Circuit Training',
    description: 'Simulate depolarizing and readout noise to measure how training changes under NISQ constraints.',
    tags: ['Noise', 'NISQ', 'Simulation'],
    href: 'https://github.com/sanjay14063/qml-research-lab/blob/main/notebooks/noise-aware-training.ipynb',
    colab: 'https://colab.research.google.com/github/sanjay14063/qml-research-lab/blob/main/notebooks/noise-aware-training.ipynb',
    breakdown: '/research/notes/noise-aware-training',
  },
] as const

export const researchNotes = [
  {
    slug: 'vqc',
    title: 'Variational Quantum Classifier',
    abstract:
      'A compact companion briefing for the VQC notebook: how a parameterized circuit learns a nonlinear boundary, where extra depth helps, and where optimization starts to fight the model.',
    tags: ['VQC', 'Decision Boundaries', 'Trainability'],
    href: researchNotebooks[0].href,
    colab: researchNotebooks[0].colab,
    question:
      'Can a small variational quantum circuit represent a useful nonlinear classifier on a toy dataset, and how quickly do ansatz choices turn expressivity into optimization friction?',
    setup: [
      { label: 'Dataset', value: 'Two-dimensional synthetic classification data with intentionally small sample counts.' },
      { label: 'Encoding', value: 'Angle encoding maps normalized features into single-qubit rotations.' },
      { label: 'Ansatz', value: 'Layered entangling circuit with adjustable depth and trainable rotation parameters.' },
      { label: 'Optimizer', value: 'Gradient-based updates with loss and accuracy tracked across epochs.' },
      { label: 'Framework', value: 'PennyLane-style differentiable circuit simulation.' },
      { label: 'Readout', value: 'Expectation-value measurement converted into class predictions.' },
    ],
    observations: [
      {
        title: 'Depth expands the boundary, then taxes the optimizer.',
        finding:
          'Increasing ansatz depth improves boundary flexibility in the toy setting, but deeper circuits introduce a rougher training surface and more variable convergence.',
        interpretation:
          'The notebook is useful because it makes expressivity feel conditional: more parameters can help only while the optimizer can still find a stable direction.',
        metric: 'Depth',
        signal: 'More flexible, less calm',
      },
      {
        title: 'Small data makes the result readable, not decisive.',
        finding:
          'The compact dataset makes shifts in the decision boundary easy to inspect, while also making any accuracy number fragile.',
        interpretation:
          'Treat the classifier as an experimental lens on trainability rather than a benchmark result.',
        metric: 'Data',
        signal: 'Interpretive scale',
      },
      {
        title: 'Trainability is the central behavior.',
        finding:
          'Loss curves and boundary movement matter more here than final test accuracy because they show when the circuit learns smoothly and when it stalls.',
        interpretation:
          'The core research habit is to inspect optimization behavior before making claims about model quality.',
        metric: 'Loss',
        signal: 'Optimization first',
      },
    ],
    limitations: [
      'The dataset is intentionally tiny and should not be read as evidence of practical quantum advantage.',
      'The circuit lives in a classically simulable regime, so the notebook studies behavior rather than computational superiority.',
      'Ansatz depth is explored in a narrow range and does not resolve scaling, barren plateau, or hardware deployment questions.',
      'Simulator results omit many device-level effects that would affect a real NISQ run.',
    ],
    extensions: [
      'Compare multiple ansatz families with equal parameter budgets.',
      'Add repeated seeds and confidence intervals for loss, accuracy, and boundary smoothness.',
      'Track gradient norms to expose early signs of trainability collapse.',
      'Run the same task under injected shot noise and hardware-inspired noise channels.',
    ],
  },
  {
    slug: 'quantum-kernels',
    title: 'Quantum Kernels from Feature Maps',
    abstract:
      'A notebook companion for thinking about quantum feature maps as geometry: what the kernel matrix reveals, how it compares to classical RBF baselines, and why fair comparison matters.',
    tags: ['Quantum Kernels', 'Feature Maps', 'Baselines'],
    href: researchNotebooks[1].href,
    colab: researchNotebooks[1].colab,
    question:
      'Does a quantum feature map create a similarity structure that is meaningfully different from classical kernels, and can that difference survive careful baseline comparison?',
    setup: [
      { label: 'Dataset', value: 'Low-dimensional synthetic samples chosen for matrix inspection and visual comparison.' },
      { label: 'Feature Map', value: 'Parameterized rotations and entangling operations define an implicit Hilbert-space embedding.' },
      { label: 'Kernel Object', value: 'Pairwise circuit overlaps produce the quantum kernel matrix.' },
      { label: 'Classical Baseline', value: 'RBF kernel comparison with tuned bandwidth to avoid strawman baselines.' },
      { label: 'Estimator', value: 'Simulator-backed kernel evaluation before any hardware sampling assumptions.' },
      { label: 'Evaluation', value: 'Matrix structure, classifier behavior, and sensitivity to feature scaling.' },
    ],
    observations: [
      {
        title: 'The kernel matrix is the experiment.',
        finding:
          'The most informative artifact is the similarity matrix itself: blocks, diagonals, and off-class similarities show what geometry the feature map actually creates.',
        interpretation:
          'This turns the notebook from a classifier demo into a geometry audit.',
        metric: 'K(x, x\')',
        signal: 'Geometry made visible',
      },
      {
        title: 'RBF is a serious baseline, not a checkbox.',
        finding:
          'Classical RBF kernels can already generate strong nonlinear similarity patterns, especially on low-dimensional data.',
        interpretation:
          'A quantum kernel only becomes interesting after the classical baseline is tuned and treated respectfully.',
        metric: 'Baseline',
        signal: 'Fairness required',
      },
      {
        title: 'Different does not automatically mean better.',
        finding:
          'A quantum feature map may reshape distances in Hilbert space without improving classification or generalization.',
        interpretation:
          'The notebook keeps skepticism close to the implementation: inspect difference, then ask whether it matters.',
        metric: 'Advantage',
        signal: 'Not claimed',
      },
    ],
    limitations: [
      'The explored sample sizes and qubit counts are small enough for classical simulation and direct matrix inspection.',
      'No quantum advantage claim is supported by this experiment; the comparison is qualitative and diagnostic.',
      'Kernel performance depends heavily on preprocessing, feature scaling, and baseline tuning choices.',
      'Hardware estimation would introduce shot noise, calibration issues, and cost that are not captured by the current simulator run.',
    ],
    extensions: [
      'Add kernel alignment metrics against labels and classical baselines.',
      'Sweep feature-map depth and entanglement patterns while holding evaluation protocol fixed.',
      'Introduce trainable kernel parameters with validation-only selection.',
      'Estimate shot requirements for stable kernel entries on realistic hardware.',
    ],
  },
  {
    slug: 'noise-aware-training',
    title: 'Noise-Aware Circuit Training',
    abstract:
      'An experiment briefing for training circuits under depolarizing noise: how noise distorts convergence, weakens gradients, and keeps NISQ-era claims grounded.',
    tags: ['Noise', 'Depolarizing Channels', 'NISQ'],
    href: researchNotebooks[2].href,
    colab: researchNotebooks[2].colab,
    question:
      'How does depolarizing noise change the training behavior of a small variational circuit, and what does that reveal about the gap between clean simulation and hardware realism?',
    setup: [
      { label: 'Noise Model', value: 'Depolarizing noise injected at controlled probabilities across circuit operations.' },
      { label: 'Training Loop', value: 'Same objective tracked under clean and noisy simulation conditions.' },
      { label: 'Gradient Signal', value: 'Noisy parameter updates monitored through convergence instability and loss variance.' },
      { label: 'Regime', value: 'Small NISQ-style circuits where device effects are visible but still inspectable.' },
      { label: 'Framework', value: 'Simulator workflow designed to make noise assumptions explicit.' },
      { label: 'Readout', value: 'Prediction confidence and loss response compared across noise levels.' },
    ],
    observations: [
      {
        title: 'Noise compresses confidence.',
        finding:
          'Depolarizing channels push outputs toward less informative measurements, reducing prediction confidence even when the clean circuit appears trainable.',
        interpretation:
          'The model does not just become less accurate; it becomes less decisive.',
        metric: 'p',
        signal: 'Confidence collapse',
      },
      {
        title: 'Convergence becomes irregular.',
        finding:
          'Noisy training can show plateaus, jumps, and seed-dependent behavior that are easy to miss in a clean simulator.',
        interpretation:
          'Training curves should be read as stability evidence, not decorative diagnostics.',
        metric: 'Loss',
        signal: 'Unstable path',
      },
      {
        title: 'Gradients become harder to trust.',
        finding:
          'Noise perturbs the optimization signal, making small parameter updates less reliable and increasing the risk of false progress.',
        interpretation:
          'Noise-aware training is partly an honesty mechanism: it asks whether the learning signal survives device-like conditions.',
        metric: 'Gradients',
        signal: 'Lower signal quality',
      },
    ],
    limitations: [
      'Depolarizing noise is a simplified model and cannot represent the full structure of real hardware errors.',
      'The circuits remain small and classically simulable, so the experiment is about robustness rather than advantage.',
      'Shot noise, readout calibration, crosstalk, drift, and queue-time variability are not fully modeled.',
      'Observed instability may depend on optimizer settings and random seeds, so repeated trials are required for stronger conclusions.',
    ],
    extensions: [
      'Add readout noise and amplitude damping alongside depolarizing channels.',
      'Run seed sweeps and report convergence bands instead of single trajectories.',
      'Compare mitigation strategies such as zero-noise extrapolation or simple readout correction.',
      'Estimate training cost under finite shots and realistic hardware execution budgets.',
    ],
  },
] as const

export const experiments = experimentCatalog.map((experiment) => ({
  slug: experiment.slug,
  title: experiment.title,
  description: experiment.description,
  hook: experiment.hook,
}))

export function getExperiment(slug: string) {
  return getExperimentConfig(slug)
}

export function getResearchNote(slug: string) {
  return researchNotes.find((note) => note.slug === slug)
}
import { experimentCatalog, getExperimentConfig } from '@/content/experiments'
