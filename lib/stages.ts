export const stages = [
  {
    id: 0,
    title: 'Mathematical & ML Prerequisites',
    overview:
      'Linear algebra, probability, optimization, and classical ML fundamentals required before engaging with quantum concepts.',
    duration: 'Variable',
    modules: [
      { slug: 'linear-algebra-review', title: 'Linear Algebra Review' },
      { slug: 'probability-and-optimization', title: 'Probability and Optimization' },
      { slug: 'classical-ml-foundations', title: 'Classical ML Foundations' },
    ],
    objectives: [
      'Vector spaces, inner products, eigenvalues, and eigendecomposition',
      'Gradients, chain rule, and gradient descent',
      'Supervised learning, loss functions, and overfitting',
    ],
    isPlaceholder: false,
  },
  {
    id: 1,
    title: 'Quantum Foundations for Machine Learning',
    overview:
      'Quantum states, measurements, and parameterized circuits: the building blocks of variational QML.',
    duration: '2-4 weeks',
    modules: [
      { slug: 'qubits-states-measurements', title: 'Qubits, States, and Measurements (for ML practitioners)' },
      { slug: 'observables-expectation-values', title: 'Observables and Expectation Values' },
      { slug: 'parameterized-quantum-circuits', title: 'Parameterized Quantum Circuits' },
    ],
    objectives: [
      'Understand qubits as unit vectors and the Born rule',
      'Compute expectation values of observables',
      'Design and reason about parameterized quantum circuits',
    ],
    isPlaceholder: false,
  },
  {
    id: 2,
    title: 'Variational Quantum Models',
    overview:
      'Variational quantum circuits, feature maps, and quantum kernels: the core algorithmic tools of QML.',
    duration: '2-3 weeks',
    modules: [
      { slug: 'variational-quantum-circuits', title: 'Variational Quantum Circuits (VQCs)' },
      { slug: 'quantum-feature-maps', title: 'Quantum Feature Maps' },
      { slug: 'quantum-kernels', title: 'Quantum Kernels' },
    ],
    objectives: [
      'Construct and train variational quantum classifiers',
      'Map classical data into quantum Hilbert space',
      'Understand quantum kernel methods and their advantages',
    ],
    isPlaceholder: false,
  },
  {
    id: 3,
    title: 'Training, Noise, and Limitations',
    overview:
      'Gradient estimation, barren plateaus, and NISQ constraints: critical for realistic QML research.',
    duration: '2-3 weeks',
    modules: [
      { slug: 'gradient-estimation-parameter-shift', title: 'Gradient Estimation & Parameter Shift Rule' },
      { slug: 'barren-plateaus', title: 'Barren Plateaus' },
      { slug: 'noise-models-nisq-limitations', title: 'Noise Models and NISQ Limitations' },
    ],
    objectives: [
      'Derive and implement the parameter-shift rule',
      'Identify and mitigate barren plateau behavior',
      'Model noise and reason about NISQ-era constraints',
    ],
    isPlaceholder: false,
  },
  {
    id: 4,
    title: 'Research-Level Topics',
    overview:
      'Current research directions: expressibility, trainability, quantum advantage, and beyond.',
    duration: 'Ongoing',
    modules: [
      { slug: 'expressibility-and-entanglement', title: 'Expressibility and Entanglement' },
      { slug: 'quantum-advantage-debate', title: 'Quantum Advantage: The Debate' },
      { slug: 'error-mitigation', title: 'Error Mitigation' },
    ],
    objectives: [
      'Engage with open research questions',
      'Critically evaluate claims of quantum advantage',
      'Survey error mitigation and fault-tolerant prospects',
    ],
    isPlaceholder: false,
  },
] as const
