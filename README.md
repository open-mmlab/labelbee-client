
<div align="center">
<article style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <p align="center"><img width="300" src="./src/assets/logo.svg" /></p>
    <h1 style="width: 100%; text-align: center;">LabelBee-Client</h1>
    <p>
        <a href="https://github.com/open-mmlab/labelbee-client/releases">Releases</a>
        ·
        <a href="./docs/README.md" >Getting Started</a>
        ·
        <a href="./README_zh-CN.md" >简体中文</a>
    </p>
</article>
<img style="width: 700px" src="./docs/assets/main.png">

</div>

## Features

- 📦 Out of the Box, built-in six annotation tools, simple configurations
- 🪵 Flexible combinations, multiple tools can directly rely on each other
- 💻 Multiple operating systems: Mac / Linux / Windows
- 🏁 Support Data Formats

|        | General Data | COCO | Semantic Segmentation Mask |
| ------ | ------------ | ---- | -------------------------- |
| Export | ✔️            | ✔️    | ✔️                          |
| Import | ✔️            | ✖    | ✖                          |

## Support Scenes

- Detection: Detection scenes for vehicles, license plates, pedestrians, faces, industrial parts, etc.
- Classification: Detection of object classification, target characteristics, right and wrong judgments, and other classification scenarios
- Semantic segmentation: Human body segmentation, panoramic segmentation, drivable area segmentation, vehicle segmentation, etc.
- Text transcription: Text detection and recognition of license plates, invoices, insurance policies, signs, etc.
- Contour detection: positioning line scenes such as human contour lines, lane lines, etc.
- Key point detection: positioning scenes such as human face key points, vehicle key points, road edge key points, etc.

<div align="center">
  <img src="./docs/assets/annotation-detection-segmentation.gif"/>

  <i style="text-align: center;">Detection / Segmentation </i>
  
  <img src="./docs/assets/annotation-line-point-text.gif"/>

  <i style="text-align: center;">Line / Point / Text </i>
</p> 
</div>

## Usage

-  [Getting Started](./docs/README.md) 

## Annotation Format

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
For details, click to view [LabelBee Annotation Format](./docs/annotation/README.md)

## Links

- [LabelBee](https://github.com/open-mmlab/labelbee)（Powered by LabelBee）

## LICENSE

This project is released under the [Apache 2.0 license](./LICENSE).
