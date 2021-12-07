[English](./README.md) | 简体中文

# 快速上手

## 概念速递
- 项目：标注任务的载体，可分为 `单步骤` 和 `多步骤`
- 单步骤：简单标注任务首选
- 多步骤：支持多种工具搭配标注，步骤分离标注能更加专注标注场景

## 一、项目创建

### 1. 打开界面
<img src="./assets/projectPlatform.png">

### 2. 新建项目

选择 `单步骤` 进行基础标注任务创建

<div  align="center">
<img src="./assets/project-step.png">
</div>

### 3. 基础配置

各款工具都有特定配置，既有操作的限制（框体最小范围），也有高阶标注配置（文本标注、属性标注），下方以目标检测（矩形框）为例。

<img src="./assets/create-project.png">

前三个配置为基础配置：

* a.	项目名称：单纯用于展示
* b.	图片路径： 选择需要标注的图片文件夹；LabelBee-Client 会将读取当前文件夹内所有的图片文件，包括嵌套文件夹内的图片。
* c.	结果路径： 选择标注结果保存文件夹；保存时将会以原有图片名及路径为参考进行数据存储；同理也可以当做预先标注数据注入，**注意：需要严格按照 LabelBee 数据才可以正确展示**，具体可以查看 [LabelBee 标注格式](./annotation/README.md)

<img src="./assets/common-config.png">

### 4. 标注进阶配置

基础类型标注任务可直接跳过下方配置

#### a. 图形类工具通用配置

- 最小尺寸： 检测框最小的范围限制
- 目标外标注： 默认不允许在图片外进行标注
- 复制上一张结果：直接复制上一张图片的标注结果（主要用于抽帧图片标注场景）
- 显示标注顺序：显示当前页面标注框体的顺序
<img src="./assets/rectTool-common-config.png">

#### b. 属性标注

预先配置检测框体可赋予的属性配置，表单左侧为标注展示值，右侧为写入标注结果值
<img src="./assets/config-attribute.png">

#### c. 文本标注

每个检测框体可输入特定文本，可对输入内容进行限制，主要开启于 OCR 场景
<img src="./assets/config-textAttribute.png">


点击确认即可创建项目

## 二、标注操作介绍

### 1. 进入项目

单击进入项目

<img src="./assets/project-face-detection.png">

### 2. 正式标注

左下角有详细的当前工具操作方式

<img src="./assets/annotation.png">

<img src="./assets/hotkey.png">

[基础操作展示视频](https://www.bilibili.com/video/BV1fZ4y1X7tq)


#### 基础标注操作

- 图片切换/提交： 快捷键 AD 进行前后翻页,将自动保存至结果路径
- 拖拽图片：右键长按移动
- 缩放图片：鼠标滚轮
- 标注（目标检测）： 左键点击 - 移动 - 左键点击
- 左上角进行项目退出

其他进阶操作参考快捷键即可

## 三、数据导出

支持 COCO、Mask 格式导出。

### 1.打开导出界面  

移动鼠标至指定项目上，点击有右下角第一个导出按钮

<img src="./assets/project-folder.png">


### 2. 导出限制说明

- 目标检测（矩形框）: 支持 COCO 格式导出
- 语义分割（多边形）: 支持 COCO、Mask 格式导出

<img src="./assets/export-rect-format.png">

---

## 四、LabelBee 格式介绍

[LabelBee 格式说明](./annotation/README.md)
