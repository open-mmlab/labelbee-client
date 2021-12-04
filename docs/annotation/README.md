# 标注格式说明

## 工具类型

- [通用配置](./common.md)
- [目标检测](./rectTool.md)
- [目标分类](./tagTool.md)
- [语义分割](./polygonTool.md)
- [文本转写](./textTool.md)
- [轮廓线检测](./lineTool.md)
- [关键点检测](./pointTool.md)

## 通用格式

LabelBee 的标注格式以`步骤`为基础，最顶层的会放置图片的基础信息，`图片的宽度`、`高度`、`有无效性`、`旋转角度`。

标注的信息放置在`step_1`内，`step_1`内表示为第一步数据，步骤内有`toolName` 和 `result` 两个字段，`toolName` 表示标注结果使用的工具类型，`result` 表示标注结果数组，具体细节点击上方工具。 


```json
{
  "width": 4368,
  "height": 2912,
  "valid": true,
  "rotate": 0,
  "step_1": {
    "toolName": "rectTool",
    "result": [
      {
        "x": 530.7826086956522,
        "y": 1149.217391304348,
        "width": 1314.7826086956522,
        "height": 1655.6521739130435,
        "attribute": "",
        "valid": true,
        "id": "Rp1x6bZs",
        "sourceID": "",
        "textAttribute": "",
        "order": 1
      }
    ]
  }
}
```

## COCO 数据类型
 
COCO(Common Object in Context) 是一个大规模的对象检测、分割和字幕数据集。具体定义请前往[官网](https://cocodataset.org/#home)查看

LabelBee-Client 的`目标检测`、`语义分割`支持直接导出 COCO 数据类型。

## Mask 格式导出说明

仅`语义分割`可导出 Mask。

- 背景色默认为黑色：  0 `（rgb(0,0,0))`
- 语义的唯一性：语义分割的属性标注配置
- 导出内容:
  - JSON 文件： 表示当前语义与颜色的索引关系
  - 彩色 Mask
 

```json
[
  {
    "attribute": "cat",
    "color": "rgb(128,0,0)",
    "trainIds": 1 
  },
  {
    "attribute": "dog",
    "color": "rgb(0,128,0)",
    "trainIds": 2
  },
  {
    "attribute": "bird",
    "color": "rgb(128,128,0)",
    "trainIds": 3
  },
]
```

| 名称      | 描述                           |
| --------- | ------------------------------ |
| attribute | 当前语义                       |
| color     | 当前语义颜色                   |
| trainIds  | 训练使用的 ID （灰度值 1 - N） |


- 可使用下方脚本将导出的 Mask 按照上方 JSON 文件 Color => TrainIds 的映射转换为灰度图，以用于[mmsegmentation](https://github.com/open-mmlab/mmsegmentation) 训练


```python
from PIL import Image
from pathlib import Path, PurePath

folder_path = './img/'  # Your Export Folder

p = Path(folder_path)
files = [x for x in p.iterdir() if PurePath(x).match('*.png')]

for file in files:
  p_path = file
  p = Image.open(p_path).convert('L') # Transfer to L mode (8-bit pixels, black and white)
  p.save(file.name + '_labelTrainIds.png')
```