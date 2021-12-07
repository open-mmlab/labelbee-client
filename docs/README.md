English | [简体中文](./README_zh-CN.md)

# Getting Started

## Concept
- Project：A annotation Task，divided into `Single Step` and `Multiple Step`
- Single Step：The first choice for simple annotation task
- Multiple Step：Support multiple tools with annotation, step separation annotation can be more focused on annotation the scene

## A、Project creation

### 1. Open it
<img src="./assets/projectPlatform.png">

### 2. Create Project

Select `one step` to create a basic annotation task

<div  align="center">
<img src="./assets/project-step.png">
</div>

### 3. Basic Configuration

Each tool has a specific configuration, both operating restrictions (minimum range of the frame), and high-level annotation configuration (text annotation, attribute annotation), the following is an example of `Detection`.

<img src="./assets/create-project.png">

The first three configurations are basic:

* a.	Project name: For display
* b.	Image path: Select the path to be labeled; LabelBee-Client will read all image files from the path, including images in nested folders.
* c. Result Path: Select the save path of annotation result; Images' filename and path will be used as a reference for data storage when saving; The same can also be used as pre-labeled data injection, **Note: You need to strictly follow the LabelBee format to display correctly **, you can check for details [LabelBee format](./annotation/README.md)

<img src="./assets/common-config.png">

### 4. Advanced Configuration

Basic annotation tasks can be skipped directly below the configuration
#### a. General configuration of graphics tools

- Smallest Size: The smallest range limit of the bounding box
- Out-Of-Target: By default, annotate outside the picture is not allowed
- Copy Prev: Directly copy the annotation result of the previous picture (mainly used to annotate the scene of the framed image)
- Show Order: Display the order of bounding boxes

<img src="./assets/rectTool-common-config.png">

#### b. Attribute

Pre-configure the attribute configuration that can be assigned to the detection box, the left side of the form is the annotation display value, and the right side is the written annotation result value

<img src="./assets/config-attribute.png">

#### c. Text Annotation

Each bounding box can input specific text, and can restrict the input content, mainly open in OCR scene

<img src="./assets/config-textAttribute.png">

Click OK to create the project

## B、Annotation Operation

### 1. Start the project

Click to Start the project

<img src="./assets/project-face-detection.png">

### 2. Annotation

More detail operation methods in the lower left corner

<img src="./assets/annotation.png">

<img src="./assets/hotkey.png">

[Basic operation demonstration video](https://www.bilibili.com/video/BV1fZ4y1X7tq)


#### Basic annotation operations

- Picture switch/submit: Shortcut key AD to turn page forward and backward, it will be automatically saved to the result path
- Drag and drop the picture: Right click and long press to move
- Zoom Image: Mouse wheel
- Annotation (Detection): left click - move - left click
- Project exit in the upper left corner

For other advanced operations, please refer to the shortcut keys
## C、Data Export

The data supports COCO and Mask format export.
### 1.Open the Export

Move the mouse to the designated item and click the first export button in the lower right corner

<img src="./assets/project-folder.png">

### 2. Export restrictions

- Target detection (rectangular frame): Support COCO format export
- Semantic segmentation (polygon): Support COCO, Mask format export

<img src="./assets/export-rect-format.png">

---

## D、LabelBee Format

[LabelBee Format](./annotation/README.md)
