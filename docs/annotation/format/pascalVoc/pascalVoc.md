# 导出 VOC2012 Detection 类型

PASCAL VOC 为图像识别和分类提供了一整套标准化的数据集，VOC2012 Detection 预测图片中每一个目标的 bounding box（位置） and label（类别）。

## 格式说明

- 仅`矩形`可导出 VOC2012 Detection。

- Annotations: 一张图片导出一个 xml 文件，图片中的每一个标注框的信息需要一个 `<object> </object>` 包裹，无标注框则无`<object/>` 标签。

- 无拉框，则对应标签包裹内容为空。

标签格式:

    | 标签名称      | 包裹值
    ------------------------------------
    | folder        | 图片所处文件夹
    | filename      | 图片名
    | path          | 图片路径
    | source        | 图片来源相关信息
    |   database    | 导出属性映射文件内容
    | size          | 图片尺寸
    |   width       | 宽
    |   height      | 高
    |   depth       | 管道
    | segmented     | 是否有分割
    | object        | 包含物体
    |   name        | 物体类别
    |   pose        | 物体姿态（默认 Unspecified）
    |   truncated   | 物体是否被遮挡（默认 0）
    |   difficult   | 是否为难识别的物体（默认 0）
    |   bndbox      | 物体bound box
    |     xmin      | 最小横坐标
    |     ymin      | 最小纵坐标
    |     xmax      | 最大横坐标
    |     ymax      | 最大纵坐标
