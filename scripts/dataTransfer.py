from PIL import Image
from pathlib import Path, PurePath

folder_path = './img/'  # The folder of your exported data

p = Path(folder_path)
files = [x for x in p.iterdir() if PurePath(x).match('*_labelTrainIds.png')]

for file in files:
  p_path = file
  p = Image.open(p_path).convert('L') # Transfer to L mode (8-bit pixels, black and white)
  p.save(file.name + '_labelTrainIds.png')