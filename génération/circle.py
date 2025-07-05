from PIL import Image, ImageDraw
import os

def crop_circle(input_image_path, output_image_path):
    print(input_image_path, output_image_path)
    # Ouvrir l'image
    image = Image.open(input_image_path).convert("RGBA")

    radius = int(image.width/2)
    # Créer un masque circulaire
    mask = Image.new("L", (radius * 2, radius * 2), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, radius * 2 -1, radius * 2 -1), fill=255) #le -1 permet de couper le petit bord dégeu

    # Appliquer le masque à l'image
    result = Image.new("RGBA", (radius * 2, radius * 2))
    result.paste(image, (0, 0), mask)

    # Sauvegarder l'image résultante
    result.save(output_image_path)

count = 0
previous = ""
for dossier, sous_dossiers, fichiers in os.walk("C:\\Users\\axelo\\Pictures\\medal2\\dx_medal"):
    for sous_dossier in sous_dossiers:
        if previous != sous_dossier[:6]:
            count += 1

        if "B" in sous_dossier:
            crop_circle(f"C:\\Users\\axelo\\Pictures\\medal2\\dx_medal\\{sous_dossier}\\000.xi.00.png", f"C:\\Users\\axelo\\Pictures\\medal2\\{count}b.png")
        elif "d" in sous_dossier:
            crop_circle(f"C:\\Users\\axelo\\Pictures\\medal2\\dx_medal\\{sous_dossier}\\000.xi.00.png", f"C:\\Users\\axelo\\Pictures\\medal2\\{count}d.png")
        else:
            crop_circle(f"C:\\Users\\axelo\\Pictures\\medal2\\dx_medal\\{sous_dossier}\\000.xi.00.png", f"C:\\Users\\axelo\\Pictures\\medal2\\{count}.png")

        previous = sous_dossier[:6]
        print(sous_dossier[:6])

print("finished")

# npt = input("chemin de la médaille:")
# # opt = input("dossier de sortie:")
# # S'assure que le dossier de sortie se termine par un slash
# # if not opt.endswith(os.sep):
# #     opt += os.sep
# crop_circle(npt, npt)
