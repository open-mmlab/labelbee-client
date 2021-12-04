English | [简体中文](./README_zh-CN.md)

# Getting Started

## Concept
- Project：A annotation Task，divided into `Single Step` and `Multiple Step`
- Single Step：The first choice for simple annotation Task
- Multiple Step：Support multiple tools with labeling, step separation labeling can be more focused on labeling the scene

## 一、Project creation

### 1. Open it
<img src="./assets/projectPlatform.png">

### 2. Create Project

select `one step` to create a basic Annotation Task.

<div  align="center">
<img src="./assets/project-step.png">
</div>

### 3. Basic Configuration

Each tool has a specific configuration, both operating restrictions (minimum range of the frame), and high-level labeling configuration (text labeling, attribute labeling), the following is an example of `Detection`.

<img src="./assets/create-project.png">

The first three configurations are basic configurations:

* a.	Project name: purely for display
* b.	Image path: Select the image folder to be marked; LabelBee-Client will read all image files in the current folder, including images in nested folders.
* c. Result Path: Select the labeling result save folder; the original image name and path will be used as a reference for data storage when saving; the same can also be used as pre-labeled data injection, **Note: You need to strictly follow the LabelBee format to display correctly **, you can check for details [LabelBee format](./annotation/README.md)

<img src="./assets/common-config.png">

### 4. Advanced Configuration

Basic type labeling tasks can be skipped directly below the configuration
#### a. General configuration of graphics tools

- Minimum size: the smallest range limit of the detection frame
- Annotation outside the target: By default, annotation outside the picture is not allowed
- Copy the last result: directly copy the annotation result of the previous picture (mainly used to mark the scene of the framed image)
- Display labeling order: display the order of labeling boxes on the current page

<img src="./assets/rectTool-common-config.png">

#### b. Attribute

Pre-configure the attribute configuration that can be assigned to the detection box, the left side of the form is the label display value, and the right side is the written label result value

<img src="./assets/config-attribute.png">

#### c. Text Annotation

Each detection box can input specific text, and can restrict the input content, mainly open in OCR scene

<img src="./assets/config-textAttribute.png">

Click OK to create the project

## 二、Annotation Operation

### 1. Start the project

Click to Start the project

<img src="./assets/project-face-detection.png">

### 2. Annotation

There are detailed current tool operation methods in the lower left corner

<img src="./assets/annotation.png">

<img src="./assets/hotkey.png">

[Basic operation demonstration video](https://www.bilibili.com/video/BV1wQ4y1e7MJ/)


#### Basic labeling operations

- Picture switch/submit: Shortcut key AD to turn page forward and backward, it will be automatically saved to the result path
- Drag and drop the picture: Right click and long press to move
- Zoom Image: Mouse wheel
- Annotation (Detection): left click - move -left click
- Project exit in the upper left corner

For other advanced operations, please refer to the shortcut keys
## 三、Data Export

The data supports COCO and Mask format export.
### 1.Open the Export

Move the mouse to the designated item and click the first export button in the lower right corner

<img src="./assets/project-folder.png">

### 2. Export restrictions

- Target detection (rectangular frame): Support COCO format export
- Semantic segmentation (polygon): Support COCO, Mask format export

<img src="./assets/export-rect-format.png">

---

## 四、LabelBee Format

[LabelBee Format](./annotation/README.md)
