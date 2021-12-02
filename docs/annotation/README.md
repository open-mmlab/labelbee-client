# 标注格式说明

## 工具类型

- [目标检测](./rectTool.md)
- [目标分类](./tagTool.md)
- [语义分割](./polygonTool.md)
- [文本](./textTool.md)
- [线条](./lineTool.md)
- [标点](./pointTool.md)

## 通用格式说明

LabelBee 的标注格式以`步骤`为基础，最顶层的会放置图片的基础信息，`图片的宽度`、`高度`、`有无效性`、`旋转角度`。

标注的信息放置在`step_1`内，`1`表示当前为第一步，步骤内有`toolName` 和 `result` 两个字段，`toolName` 表示标注结果使用的工具类型，`result` 表示标注结果数组，具体细节点击上方工具。 


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


## COCO 数据类型说明


## Mask 格式导出说明
