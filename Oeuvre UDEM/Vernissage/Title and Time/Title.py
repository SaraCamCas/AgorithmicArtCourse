import matplotlib.pyplot as plt

px = 1/plt.rcParams['figure.dpi']  # pixel in inches
fig, ax = plt.subplots(figsize=(450*px, 330*px))

ax.text(0, 0.91, '.⊹ .˖ .', horizontalalignment='left',
        fontsize=20, fontweight='bold')
ax.text(0, 0.8, 'PLOTTED SHADOWS', horizontalalignment='left',
        fontsize=20, fontweight='bold')
ax.text(0, 0.69, '.₊ ⊹ . ݁˖ .', horizontalalignment='left',
        fontsize=20, fontweight='bold')
ax.text(0, 0.4, '⊹By: .D˖S9', horizontalalignment='left',fontsize=15, fontweight='bold')
ax.text(0, 0.3, '(✿◠‿◠)', horizontalalignment='left',fontsize=15, fontweight='bold')

plt.axis('off')

# Uncomment the line below to save as SVG  
#plt.savefig('Oeuvre UDEM\\Vernissage\\Title and Time\\Titresvg')

plt.savefig('Oeuvre UDEM\\Vernissage\\Title and Time\\Titre.png', dpi=300, bbox_inches='tight')
plt.show()