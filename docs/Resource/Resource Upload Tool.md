# 资源上传工具

<strong>阅读本文预计 15 分钟。</strong>

为了帮助开发者快速了解并使用资源上传工具，本文主要包含以下 2 个内容：

1. 资源上传工具简介
2. 资源上传工具使用指南

# 资源上传工具简介

## 资源上传工具是什么

- 资源上传工具为开发者提供了上传原始美术资源的途径，可上传静态模型、UI 贴图、场景贴图、角色数据、预制体、音效类型的资源

![](static/boxcnGaZeauv4q5g1AHai99TqUe.png)

- 当资源通过审核并完成打包后，开发者可在我的资源中使用其上传的资源

![](static/boxcnNOPGtfLyV0kCMOty7JAGPc.png)

## 创作者中心相关

- 开发者上传资源后，可在创作者中心的资源管理页面查看资源的审核状态，通过审核的资源将被打包，打包完成后可编辑资源的配置信息或公开资源

![](static/boxcn5hLekWaGeuLo38J3HTD53b.png)

# 资源上传工具使用指南

## 资源上传工具入口

- 开发者可通过点击本地资源库下方的资源上传按钮，打开工具窗口
- 开发者也可通过点击工程内容中“角色”和“预制体”资源的上传按钮，打开工具窗口，同时自动导入选中的资源

![](static/boxcneeSjnVFCwthZMBkUYKWprI.gif)

## 资源导入

- 除了自动导入
- 的资源，开发者还可通过点击工具窗口的资源导入按钮，打开 Windows 文件资源管理器选择要导入的资源文件

![](static/boxcnddeGZgImpRhRiJNkM3CDsc.png)

### 资源校验

- 导入资源后，对这些资源进行校验，跳出窗口显示校验结果

![](static/boxcnV4VslF2po47rdrlZ7gf9Bb.png)

#### 各类型资源校验规则

##### 静态模型

- 资源类型：.FBX
- 资源限制：网格顶点数小于等于 65535；仅有一个静态 Mesh
- 注意事项：静态模型上传后只会保留原始模型的 UV0（第一层 UV），编辑器会为静态模型自动生成光照 UV 在 UV1（第二层 UV）

##### UI 贴图

- 资源类型：.png、.jpg、.jpeg、.tga
- 图片像素限制：小于等于 2048*2048

##### 场景贴图

- 资源类型：.png、.jpg、.jpeg、.tga
- 图片像素限制：小于等于 1024*1024；必须为 2 的幂次方

##### 音效

- 资源类型：.wav
- 资源文件名：文件名必须是 S_开头
- 大小限制：小于等于 3M
- 预制体和角色数据资源由编辑器产出,默认无需校验

### 需要额外进行配置的资源类型

#### 静态模型资源

- 导入后可编辑模型各个 UV 通道默认材质的颜色和贴图

![](static/boxcnA6VtGGx8yhwAs6dwt5VdVg.png)

- 点击颜色图标，跳出颜色盘供开发者编辑颜色

![](static/boxcnF9bfQ0TW2Z652GNiVA13Lf.png)

- 点击贴图图标，跳出 Windows 文件资源管理器选择贴图文件

![](static/boxcn7cGs5OSpsfFbOLaJWTrtJd.png)

- 导入后为模型自动生成碰撞和 LOD
- 给模型设置的贴图将自动成为场景贴图，作为一个独立的贴图资源存在

#### 场景贴图/UI 贴图

- 导入后可选择将该资源设置为场景贴图或 UI 贴图

![](static/boxcnEHVKdi8MdHJtz85j4HRuse.png)

## 资源预览图

### 自动生成

- 资源成功导入后，自动生成资源预览图
- 模型、预制体、角色数据资源会在场景中以默认角度拍照作为预览图

![](static/boxcnM61Ek76EB8KoPkRxazSjXd.png)

- 音效资源采用统一的默认预览图

![](static/boxcnmHwDr7ckUSXTdUelbowsfh.png)

- 贴图资源采用原图作为预览图

![](static/boxcnvLP77hXgxf1yu9OPK8OyPb.png)

### 预览图生成工具

- 静态模型、预制体、角色数据资源可通过点击预览图右上角的按钮跳出工具窗口
- 开发者可在工具窗口中控制视口位置，点击生成按钮生成预览图，预制体资源还可切换成默认预览图

![](static/boxcn48sJvjPebiAhnPGqVWzCOh.gif)

## 视口预览功能

- 开发者可将静态模型、预制体、角色数据资源拖入场景中进行预览，窗口内工具栏功能同编辑器工具栏
- 开发者可切换画面质量进行预览

## 资源上传

- 点击资源上传按钮，跳出资源选择窗口

![](static/boxcn5zmLGRDRpdXbecPpxcNfVd.gif)

- 开发者可在窗口中选择上传的资源，点击上传按钮后将已选的资源上传至审核流程

![](static/boxcnyN9lxcqUXJU9SXwiqVE8fb.gif)
