# 资源上传工具

::: tip **阅读本文预计15分钟。**

为了帮助开发者快速了解并使用资源上传工具，本文主要包含以下2个内容：

1. 资源上传工具简介
2. 资源上传工具使用指南
:::

# 资源上传工具简介

## 资源上传工具是什么

* 资源上传工具为开发者提供了上传原始美术资源的途径，可上传静态模型、UI贴图、场景贴图、角色数据、预制体、音效类型的资源
  ![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=YmQ2MmUzODk3OTI4NGMwMjY5MzY1OTc3ZmNlNTRkMWFfOEZ1d29FcTQxRXJ5ekg2bE9UOEdSc1ozR2R0Z2xJbkFfVG9rZW46Ym94Y25HYVplYXV2NHE1ZzFBSGFpOTlUcVVlXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)
* 当资源通过审核并完成打包后，开发者可在我的资源中使用其上传的资源

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=OGJhNWQ0ZGU1NDBlYWJmMzliZmY5Y2IxOThiN2JmMTdfbkpRcjRQek1yOUVacUsyM1J4dmxUNncwRENtWk5ndWZfVG9rZW46Ym94Y25OT1BHdGZMeVYwa0NNT3R5N0pBR1BjXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

## 创作者中心相关

* 开发者上传资源后，可在创作者中心的资源管理页面查看资源的审核状态，通过审核的资源将被打包，打包完成后可编辑资源的配置信息或公开资源

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=NTExMWI5ZGU5ZTUwOGNjOWEyYzUxNmEyMmFkZGFiYjRfVjd4Vk1uczBEeDVjUlBVU3M1V0lBUmVMZ3JvVHZXemxfVG9rZW46Ym94Y241aExla1dhR2V1TG8zOEozSFRENTNiXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

# 资源上传工具使用指南

## 资源上传工具入口

* 开发者可通过点击本地资源库下方的资源上传按钮，打开工具窗口
* 开发者也可通过点击工程内容中“角色”和“预制体”资源的上传按钮，打开工具窗口，同时自动导入选中的资源

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjlkYWU2MWYzZDkxMzViNGM2YmU5ZjVmYjQyZTNmNmFfbGlTb2lRSGE5cU1KQXpXQUx0V3poREhDelNsR2VnVE9fVG9rZW46Ym94Y25lZVNqblZGQ3d0aFpNQmtVWUtXcHJJXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

## 资源导入

* 除了自动导入的资源，开发者还可通过点击工具窗口的资源导入按钮，打开Windows文件资源管理器选择要导入的资源文件

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=ODkwMmRjMGFkMTE4ODRiOTcyOGFlMTNlNWRiMmE2ZjVfRWJGS0FxZ3h1V2puT0xIcURBM0tEZWVBRWZnV3VEbUVfVG9rZW46Ym94Y25kZGVHWmdJbXBSaFJpSk5rTTNDRHNjXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

### 资源校验

* 导入资源后，对这些资源进行校验，跳出窗口显示校验结果

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=NWUyNWM2MjY5NTliYjRmYzViZDIyZWY4OGM3MjM2NDRfdFVsT2lpbGpSbDV1RzJvY1JOY3h3ZXZ4Wk5kclFadFRfVG9rZW46Ym94Y25WNFZzbEYycG80N3JkcmxaN2dmOUJiXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

#### 各类型资源校验规则

##### 静态模型

* 资源类型：.FBX
* 资源限制：网格顶点数小于等于65535；仅有一个静态Mesh
* 注意事项：静态模型上传后只会保留原始模型的UV0（第一层UV），编辑器会为静态模型自动生成光照UV在UV1（第二层UV）

##### UI贴图

* 资源类型：.png、.jpg、.jpeg、.tga
* 图片像素限制：小于等于2048*2048

##### 场景贴图

* 资源类型：.png、.jpg、.jpeg、.tga
* 图片像素限制：小于等于1024*1024；必须为2的幂次方

##### 音效

* 资源类型：.wav
* 资源文件名：文件名必须是S_开头
* 大小限制：小于等于3M
* 只能导入PCM、ADPCM、DVI ADPCM编码方式的音频文件

##### 预制体和角色数据
* 资源由编辑器产出,默认无需校验

### 需要额外进行配置的资源类型

#### 静态模型资源

* 导入后可编辑模型各个UV通道默认材质的颜色和贴图

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=NzI1OTk0OWMxNDJhM2JlYTg5ZTBlNDFlZDUxOTBlZGVfdVZwQnhyaExJOGdHSDVwYjN1UkFKVkw4cE93cllFdzRfVG9rZW46Ym94Y25BNlZ0R0d4OHlod0FzNmR3dDVWZFZnXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

* 点击颜色图标，跳出颜色盘供开发者编辑颜色

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=YWI1Yjc0NmNkYWQ0M2Q1NzNjZWEzOTQ2NWMxYjBlMTFfVW9USzdaWXMxc1k2MGJQYk5GY2x0Rk5wcmtTcGlHS3RfVG9rZW46Ym94Y25GOWJmUTBUVzJaNjUyR05pVkExM0xmXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

* 点击贴图图标，跳出Windows文件资源管理器选择贴图文件

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=NmU3YjY2YzMzM2U2MzUxOTg4ZTA0MWY0ODNlMmJlZDlfb3JxeWV5U2toM3VBZU83NkZmMW9kc25GQXhhUUdWVldfVG9rZW46Ym94Y243Y0dzNU9TcHNmRmJPTGFKV1RydEpkXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

* 导入后为模型自动生成碰撞和LOD
* 给模型设置的贴图将自动成为场景贴图，作为一个独立的贴图资源存在

#### 场景贴图/UI贴图

* 导入后可选择将该资源设置为场景贴图或UI贴图

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=YTE1NTc3ODZlMjU4MjU4M2ViYjViMmQyMzZkMDZjNzdfTEJhZzNwU05yVjBhS1RRRkNHeUhtZml4Y0piV2w5NzZfVG9rZW46Ym94Y25FSFZLZGk4TWRISnR6ODVqNEhSdXNlXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

## 资源预览图

### 自动生成

* 资源成功导入后，自动生成资源预览图
* 模型、预制体、角色数据资源会在场景中以默认角度拍照作为预览图

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=OWZmNDdhOGNjYzRhMWU1YzIyNzMzMTcwOWNjY2FjZWVfUkx0aFJOb3JMYm9FZHpEcm9FcXJBUzVqNEU1alozODdfVG9rZW46Ym94Y25NNjFFazc2RUI4S29Qa1J4YXpTalhkXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

* 音效资源采用统一的默认预览图

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=MWI2OTE1YjZlNzJkZjdkMTIxYzk0ODIzZjhjMzY5ODJfQzRMNVNpWlZ3T3FMUzZQTlE5MFhjbFFSYnVHbGY1cFpfVG9rZW46Ym94Y25tSHdEcjdja1VTWFRkVWVsYm93c2ZoXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

* 贴图资源采用原图作为预览图

![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=YjBlZWNkNDljODM1ZTdkZDQ1NDgzNzA3MmY4OTFjNmZfWlE0QUg5UEJXR2dpbzRYcWxhWm12SWhob25kQ0pKZzRfVG9rZW46Ym94Y252TFA3N2hYZ3hmMXl1OU9QSzhPeVBiXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)

### 预览图生成工具

* 静态模型、预制体、角色数据资源可通过点击预览图右上角的按钮跳出工具窗口
* 开发者可在工具窗口中控制视口位置，点击生成按钮生成预览图，预制体资源还可切换成默认预览图

<video controls src=" https://cdn.233xyx.com/1684465236603_929.mp4"></video>

## 视口预览功能

* 开发者可将静态模型、预制体、角色数据资源拖入场景中进行预览，窗口内工具栏功能同编辑器工具栏
* 开发者可切换画面质量进行预览

<video controls src=" https://cdn.233xyx.com/1684465236550_374.mp4"></video>

## 资源上传

* 点击资源上传按钮，跳出资源选择窗口
  ![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=NDM3YTgxMjQyYWEwNGI5ODY5NThiY2NlYTNkN2E1YzBfWnlXUVBNMVBMelRLMlJGdjlhWGZhenpnSGtORjMycTdfVG9rZW46Ym94Y241em1MR1JEUnBkWGJlY1BweGNOZlZkXzE2ODQ0NjI5MzY6MTY4NDQ2NjUzNl9WNA)
* 开发者可在窗口中选择上传的资源，点击上传按钮后将已选的资源上传至审核流程

<video controls src=" https://cdn.233xyx.com/1684465236629_820.mp4"></video>
