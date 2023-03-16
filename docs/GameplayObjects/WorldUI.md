# 世界 UI

| 修改日期            | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------- | ------ | -------- | -------------- |
| 2022 年 10 月 16 日 | 郑毓琳 | 创建文档 | v0.15          |

**阅读本文大概需要 10 分钟。**

本文概述了如何制作世界 UI 并修改属性以实现各种各样的效果。

### 什么是世界 UI？

世界 UI 的主要作用是提供一个在 3D 环境下的表面，可将正常情况下渲染到屏幕的 UI 组件渲染到该对象上，例如创建商店招牌、游戏提示板的世界类型 UI，角色名称，角色血条的头顶类型 UI。

### 如何编辑世界 UI？

在本地资源库-游戏功能对象列表中找到世界 UI，将其拖入到场景中，即完成了世界 UI 的创建

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnMAmfHx6NhmeQlI5WttEcBg.png)

然后将工程内容中做好的 UI 拖拽到世界 UI 属性面板的绑定 UI 对象内，完成绑定后，世界 UI 就会显示在主视口内了。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcn5bJpAzEDxH62UBGXEMSzje.png)

如果是头顶类型的世界 UI，还需要将世界 UI 对象挂载在人形对象上，并设置好与角色的相对位置

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnh3ZKjUW4hPDoUebDJpxibb.png)

世界 UI 有世界/屏幕/头顶三种类型，以下展开介绍：

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnSiYETEQoInLIIKD3igZLKG.png)

#### 1、世界类型

- 世界类型世界 UI 是将 UI 组件以网格体的形式在世界场景中进行渲染，并且可被遮挡，使得 UI 不再脱离在场景层之外，而是成为场景层的一部分给玩家带来更强的代入感

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnVgh5EbM2vbw1AMQmcCHqEh.gif)

- 世界类型世界 UI 包括以下属性：

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnO0ueU8B4l5fbDOeqnLfZCd.png)

- 几何体模式：世界 UI 界面的形状
- 圆柱体弧形角度：几何体模式为圆柱类型时 UI 界面的角度

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnvgokdofzQGlE73RbbYxgOf.png)

平面

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnm5y0cKMp5pQXcPuxpQ72re.png)

圆柱-180°

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnO72wfYkyGb5cTId6PxhZgd.png)

圆柱-90°

- 是否可交互：当勾选此属性时，可以与世界 UI 中的各种 UI 组件进行交互，此功能会穿透摄像机滑动区；但是无法穿透摇杆，如果场景中有可交互的世界 UI，请勿使用范围过大的摇杆

#### 2、屏幕类型

- 屏幕类型世界 UI 在完全处于世界场景之外的屏幕上渲染控件，控件永远不会被遮挡，且永远面朝摄像机的功能。
- 屏幕类型世界 UI 包括以下属性：

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnJzF544YortUqz5G3qKLq2d.png)

#### 3、头顶类型

- 与屏幕类型相似，UI 界面都会永远面朝摄像机，确保是会使用射线检测方法检测玩家和头顶 UI 之间是否有物体阻挡，从而控制头顶 UI 的显示/隐藏，同时计算两者之间的距离去缩放头顶 UI 实现近大远小的效果

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnmKgmjBq5zyiJcVHzX6lfx2.gif)

- 头顶类型世界 UI 包括以下属性：

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnOF8IMf72zFgc4gjb0ly3Dc.png)

- 是否可以被遮挡：头顶 UI 是否可以被建筑物等物体遮挡并隐藏，勾选则被遮挡，不勾选则不会被遮挡

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnr9dxDZFTP5SnWUDGMgISMd.gif)

- 是否开启近大远小：头顶 UI 是否有近大远小的效果，勾选则有近大远小的效果，不勾选则始终是一个大小不会变化
- 缩放距离系数：头顶 UI 距离摄像机每 n 米单位时，将世界 UI 的尺寸进行百分比缩放。例如，太空游戏每个星球都有名称，但距离都会很远，这个系数就可以放大一些，每 1 万米进行 UI 缩放。正常游戏中，大多数距离较近，这个系数就可以缩小一些，每 10 米进行 UI 缩放。
- 是否开启最大可见距离：是否启用头顶 UI 的最大距离，如果不启用，则无论多远距离都不会隐藏此头顶 UI
- 最大可见距离：头顶 UI 可以看见的最大距离，超过该距离，头顶 UI 就会被隐藏

### 如何通过 API 动态修改世界 UI 的属性？
