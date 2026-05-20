import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics.pairwise import rbf_kernel

np.random.seed(42)

cluster_1 = np.random.normal(loc=[-2, -2], scale=0.5, size=(40, 2))
cluster_2 = np.random.normal(loc=[2, 2], scale=0.5, size=(40, 2))
cluster_3 = np.random.normal(loc=[-2, 2], scale=0.5, size=(40, 2))

X_structured = np.vstack([cluster_1, cluster_2, cluster_3])

# -----------------------------
# Structured kernel
# Preserves cluster geometry
# -----------------------------

K_structured = rbf_kernel(X_structured, gamma=0.3)

# -----------------------------
# Concentrated kernel
# Extremely high gamma creates
# similarity concentration
# -----------------------------

K_concentrated = rbf_kernel(X_structured, gamma=25)

# Remove diagonal dominance
# to better visualize collapse
np.fill_diagonal(K_concentrated, 0)

# -----------------------------
# Plot comparison
# -----------------------------

fig, axes = plt.subplots(1, 2, figsize=(15, 6))

# Structured feature space
im1 = axes[0].imshow(
    K_structured,
    cmap="viridis",
    aspect="auto"
)

axes[0].set_title(
    "Structured Feature Space",
    fontsize=16
)

axes[0].set_xlabel("Data Index", fontsize=13)
axes[0].set_ylabel("Data Index", fontsize=13)

# Concentrated feature space
im2 = axes[1].imshow(
    K_concentrated,
    cmap="viridis",
    aspect="auto"
)

axes[1].set_title(
    "Concentrated Feature Space",
    fontsize=16
)

axes[1].set_xlabel("Data Index", fontsize=13)
axes[1].set_ylabel("Data Index", fontsize=13)

# Shared colorbar
cbar = fig.colorbar(
    im2,
    ax=axes.ravel().tolist(),
    shrink=0.82,
    pad=0.03
)

cbar.set_label(
    "Similarity",
    fontsize=13
)

# Main title
plt.suptitle(
    "Kernel Concentration and Similarity Structure",
    fontsize=22,
    y=0.98
)

# Better spacing
plt.subplots_adjust(wspace=0.25)

# Save high-resolution figure
plt.savefig(
    "kernel-concentration-comparison.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()