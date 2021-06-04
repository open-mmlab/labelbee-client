# 标注工具 sdk - Demo

## 快速使用

```bash
$ npm install
$ node ./script/static.js ## 启动静态服务器获取本地图片
$ npm run start
```


## 本地开发

### 拉取代码

```bash
$ git clone git@gitlab.bj.sensetime.com:fdc/frontend/bee-sdk-demo.git
$ cd bee-sdk-demo
$ yarn install
```

### 依赖获取

```bash
$ cd ../
$ git clone -b v1.0.0 git@gitlab.bj.sensetime.com:fdc/frontend/label-bee.git
$ cd label-bee
$ npm link

$ cd ../bee-sdk-demo
$ npm link label-bee
```

### 启动项目
```bash
$ node ./script/static.js ## 启动静态服务器获取本地图片
$ yarn start
```