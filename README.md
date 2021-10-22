# LabelBee-Client

- author laoluo
- createTime 2021-10-22
- updateTime 2021-10-22 15:54

## 项目概述

LabelBee-Client 是一款开箱即用的桌面客户端版本，集成封装了 [LabelBee-SDK]((https://gitlab.bj.sensetime.com/label-bee/beehive)) 的所有能力，且支持多工具、多步骤标注；支持Windows/Linux/Mac操作系统，支持本地读写标注图片和标注结果，为您在客户现场等不方便带出数据的情况下，提供迅速部署标注团队的能力。

本客户端基于 [LabelBee](https://gitlab.bj.sensetime.com/label-bee/beehive) 的组件库进行开发，若需更改请自行拉取代码关联。

## 快速使用

```bash

$ git clone git@gitlab.bj.sensetime.com:label-bee/labelbee-client.git
$ cd labelbee-client
$ npm install
$ npm run start # 启动 web 项目 (后续优化)
$ npm run electron-dev # 启动客户端项目
```


## 打包
```bash
$ npm run packager:win # 创建 window 版本客户端
$ npm run packager:mac # 创建 mac 客户端
$ npm run packager:linux # 创建 linux 客户端
```