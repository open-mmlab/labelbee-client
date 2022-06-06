# 导出 yolo 类型

YOLO(You only look once)是一种将图像划分为网格系统的对象检测算法，网格中的每个单元都负责检测自身内部的对象。详情请前往（https://docs.ultralytics.com/#yolov5）查看

## 格式说明

- 仅`单步骤矩形`可导出 Yolo。

- 每张图片导出一个对应的 txt 格式的文件（若图片中无拉框，则返回空文件），其中生成的 XX-yolo_ids.txt 文件的内容是属性配置参照。

导出 txt 文件格式，数据格式: labelClass ratioX ratioY ratioWidth ratioHeight

         labelClass: 映射class
         ratioX: 横坐标与图像宽度比值
         ratioY: 纵坐标与图像高度比值
         ratioWidth: 图形宽度与图像宽度比值
         ratioHeight: 图形高度与图像高度比值

    | 名称      | 描述
    | --------  | ---------------------------------------
    | dataList  | 导出yolo格式文件内容
    | idString  | 导出属性映射文件内容

## 格式配置

按照属性配置生成， -1 是表述属性为空或不开属性设置

```txt
  -1 null
  0  类别1
  1  class-N6
  2  class-Eq
  3  class-Mc
```
