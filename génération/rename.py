import os

# Chemin du dossier parent
dossier_parent = 'C:/Users/axelo/Pictures/medal2/dx_medal2'

# Parcours de tous les éléments dans le dossier parent
for nom in os.listdir(dossier_parent):
    chemin_complet = os.path.join(dossier_parent, nom)
    # Vérifie si c'est un dossier
    if os.path.isdir(chemin_complet):
        nouveau_nom = nom + 'B'
        nouveau_chemin = os.path.join(dossier_parent, nouveau_nom)
        os.rename(chemin_complet, nouveau_chemin)
        print(f'Renommé : {nom} -> {nouveau_nom}')
