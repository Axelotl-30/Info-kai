from PIL import Image
import sys 
import os

script_path = sys.argv[0]
script_dir = os.path.dirname(os.path.abspath(script_path))
medallium_dir = os.path.dirname(script_dir)

image = Image.open(medallium_dir+"\\assets\\face_icon.00.png")

width, height = image.size
cut_size = 148 #on coupe des carrés 

num_vertical = height//cut_size

for j in range(num_vertical):
    for i in range(width//cut_size):
        left = i * cut_size
        upper = j * cut_size
        right = left + cut_size
        lower = upper + cut_size
        carré = image.crop((left, upper, right, lower))

        num = str(num_vertical*j+i+1)
        carré.save(f'{medallium_dir}\\assets\\medal2\\{num.rjust(3,'0')}.png')

print("finished")