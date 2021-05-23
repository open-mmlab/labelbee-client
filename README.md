# 标注工具 sdk demo 测试

## 运行方式

### 方式一 - (推荐)使用 pnpm 进行包依赖的安装。

1. pnpm install

2. pnpm install ~/your-path/little-bee
   （直接通过本地路径进行安装， 在这之前需要 clone little-bee 下来， ）

3. pnpm run start 运行


### 方式二 - 使用 npm link 进行依赖安装

1. 在 label-bee 项目内创建一个全局的软链

```bash
   cd xxx/label-bee
   sudo npm link
```

2. 进入本项目然后链接

```bash
   cd xxx/bee-sdk-demo
   npm link label-bee
```