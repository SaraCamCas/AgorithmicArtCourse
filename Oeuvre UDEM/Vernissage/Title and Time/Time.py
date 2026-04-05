import matplotlib.pyplot as plt

px = 1/plt.rcParams['figure.dpi']  # pixel in inches
fig, ax = plt.subplots(figsize=(500*px, 340*px))

ax.text(0, 0.51, '-°·_·°-', horizontalalignment='left',
        fontsize=17, fontweight='bold')
ax.text(0, 0.4, 'Time: between 7 - 12 minutes', horizontalalignment='left',
        fontsize=17, fontweight='bold')
ax.text(0, 0.29, '-°·_·°-', horizontalalignment='left',
        fontsize=17, fontweight='bold')

plt.axis('off')

# Uncomment the line below to save as SVG  
#plt.savefig('Oeuvre UDEM\Vernissage\Examples\Time.svg')

plt.savefig('Oeuvre UDEM\Vernissage\Examples\Time.png', dpi=300, bbox_inches='tight')
plt.show()