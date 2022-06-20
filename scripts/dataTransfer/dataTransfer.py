'''
Author: Laoluo luozefeng@sensetime.com
Date: 2022-01-14 11:29:11
LastEditors: Laoluo luozefeng@sensetime.com
LastEditTime: 2022-06-01 15:33:29
'''

from PIL import Image
from pathlib import Path, PurePath

folder_path = './img/'  # The folder of your exported data

p = Path(folder_path)
files = [x for x in p.iterdir() if PurePath(x).match('*_labelTrainIds.png')]

for file in files:
  p_path = file
  p = Image.open(p_path).convert('L') # Transfer to L mode (8-bit pixels, black and white)
  p.save(file.name + '_labelTrainIds.png')


def poly2mask(points, width, height):
    mask = np.zeros((width, height), dtype=np.int32)
    obj = np.array([points], dtype=np.int32)
    cv2.fillPoly(mask, obj, 1)
    return mask
