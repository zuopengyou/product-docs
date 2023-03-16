# 天空球

**阅读本文大概需要 15 分钟。**

本文概述了如何修改天空球的基础属性，制作出各式各样、五彩缤纷的天空。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnb2Ge3avWEqm6Eet8aDnvOW.png)

### 什么是天空球？

编辑器中的天空球采用传统的天空球原理，将天空球分为顶层、上层、下层三部分，分别对应天空球图片的不同部分。天空盒位于编辑器三维世界的最外层，包裹编辑器区域内所有对象。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnjrsN9inh5eV5qKLykMQIrd.png)

天空球原理

### 如何编辑天空球？

鼠标左键点击对象管理器(默认右上角)中的 BP_MWSysSkyBox 对象，即可在属性面板(默认右下角)中编辑天空球。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnN3X3mjJRq2DwGl10JYzzTc.png)

天空球主要构件有：天空球贴图、渐变效果、星星、太阳、月亮、云。以下展开介绍：

#### 2.1. 天空球预设

编辑器提供了 8 种常用的天空球预设效果，当选择其中一个预设效果时，下面其他的天空球基础属性将会自动刷新，并将其属性设置为预设的默认值。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnZBXXp5ZFD3Ve4Z5rnRbBSf.gif)

#### 2.2. 天空球贴图

更改天空球贴图：从左侧资源管理器拖出要更换的天空球贴图，拖拽到右侧属性面板 → 天空球贴图处松开。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnxOFRZVXPR1YZi5UFPx161k.gif)

更改天空球贴图(后续更改贴图同理)

在确定了贴图之后，开发者还可以通过以下两种方式对天空进行再次编辑：

- **天空球亮度：**可以改变天空自身发出的颜色亮度，数值为 0-100 之间。
- **天空球整体颜色：**可以改变天空球整体颜色，相当于在天空球上叠加了一层颜色滤镜。

#### 2.3. 渐变效果

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnqpWy9HieWYRXND6rd1IP4b.png)

开启渐变效果时，开发者可对天空球顶层、上层和下层进行编辑。顶层、上层、下层的颜色将会与天空球整体颜色进行乘法。

- **是否开启渐变效果：**勾选后，渐变效果生效；若不勾选，开发者所选的天空球顶层/上层/下层颜色均不会生效。

  - **天空球顶层颜色：**天空球的 65-100% 部分，若开启渐变效果，将与天空球整体色调进行乘法。
  - **天空球上层颜色：**天空球的 50-64% 部分，若开启渐变效果，将与天空球整体色调进行乘法。
  - **天空球下层颜色：**天空球的 0-49% 部分，若开启渐变效果，将与天空球整体色调进行乘法。
  - **地平线渐出：**影响地平线的渐变宽度，范围为 1-20。此值越小，两相邻部分之间的颜色交替部分越宽；此值越大，两相邻部分之间的颜色交替部分越窄。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnpJJbwok3KVMs2RwP5Hs3sf.png)

地平线渐出值为 1 时，上层（红）和下层（黄）的交替效果

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcn0txNcUVwMR1vwos89lgqde.png)

地平线渐出值为 20 时，上层（红）和下层（黄）的交替效果

#### 2.4. 星星

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnbWhzkEGmIbWdyC7kmW2pnf.png)

- **是否开启星星：**开启时，可以修改星星的属性，并且天空球中将会添加星星效果；关闭时，星星不会出现在天空中。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnXxV09ljF4oH4IQ9IxvH1mg.png)

开启星星

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnZnDkd6gxMCNFfhZBYal39g.png)

关闭星星效果

- **星星贴图：**改变星星贴图，可以改变星星的效果。
- **星星亮度：**用以控制天空中所有星星的亮度，范围为 0-1。亮度越大，星星越明亮；亮度越小，星星越暗淡。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcndtEHrqNb4fZJBvTbhhuCSb.png)

亮度 0.5

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnp5IYXfOC8wHuoQY7qAGwUj.png)

亮度 1.0

- **星星密度：**用以控制天空中星星的数量，范围为 0-100。密度越大，星星越多并且越小；密度越小，星星越小并且越大。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcn3mstn5r6wpvP5lqn81ieJf.png)

密度 10

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnFtyi6x15SY7i7p9HDqSSEK.png)

密度 50

#### 2.5. 太阳

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnSnzUsjRHe8NzJDaEIXItrd.png)

- **是否开启太阳：**开启时，可以修改太阳的属性，并且天空球中将会添加太阳效果；关闭时，太阳不会出现在天空中。

**＃注意＃** 当太阳和月亮同时开启的时，无论大小，永远只显示太阳：

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnvjwgQBzW0cYIgOrnDkGMCb.gif)

- **太阳贴图：**改变太阳贴图，可以改变太阳的效果。
- **太阳亮度：**用以控制天空中太阳的亮度，范围为 0-2000。亮度越大，太阳越明亮；亮度越小，太阳越暗淡。下图分别为亮度 0、200、2000 的太阳表现效果

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnnjyBXgmaGTUk9CzEpZUIPh.png)

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnnWLUBVwdV6yJVLid9ugwyb.png)

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnurpCXk4brlNWJbbEgupnbb.png)

- **太阳颜色：**太阳的颜色。
- **太阳大小：**太阳的大小，范围为 0-100。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnm4btnrquxBU6jKR5sDdyTd.png)

大小为 10

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcn7heIAyGt6kf0Bo5m4CAw0e.png)

大小为 50

#### 2.6. 月亮

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnDipHjkPhIPtPrpN23GmFgc.png)

- **是否开启月亮：**开启时，可以修改月亮的属性，并且天空球中将会添加月亮效果；关闭时，月亮不会出现在天空中。

  - **月亮贴图：**改变月亮贴图，可以改变月亮的效果。
  - **月亮亮度：**用以控制天空中月亮的亮度，范围为 0-2000。亮度越大，月亮越明亮；亮度越小，月亮越暗淡。下图分别为亮度 0、200、2000 的月亮表现效果

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnsVyLf6tdnajtfzGFfvQgtg.png)

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnRj2RAblzrqo8g6sWOzBemg.png)

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnYtlf0gXXqNIwoALsoHfK1b.png)

- **月亮颜色：**月亮的颜色。
- **月亮大小：**月亮的大小，范围为 0-100。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnxd2OFbzGoDbrjWFH2ZpZvd.png)

大小为 10

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnmvBg131iiGdZafyfyIHYfb.png)

大小为 50

#### 2.7. 云

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnAxtgXV2CdzxkJvBR8tbQLb.png)

- **是否开启云：**开启时，可以修改云的属性，并且天空球中将会添加云效果；关闭时，云不会出现在天空中。

  - **云贴图：**改变云贴图，可以改变云的效果。
  - **云透明度：**云的透明效果，范围为 0-1。透明度越小，云越透明；透明度越大，云越明显。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnxbGGwXd5RsCcXuSr4ZV6Zg.png)

透明度 0.2 的云

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnTABGkKRZQEpf8iLP1AvZec.png)

透明度 0.8 的云

- **云颜色：**云的颜色。
- **云密度：**云在天空中显示的密度范围，范围为 0-1。密度越大，云的样式就越”稀疏“；密度越小，云的样式就越“紧凑”。

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnHkfiqlbr7IvMMW28i1AjPh.png)

密度 0.2 的云

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnPw2AGYZNlKbtnOaHXyjU8b.png)

密度 0.8 的云

- **云速度：**云在天空中的移动速度，范围为 0-10。速度越大，云的移动速度就越快；速度越小，云的移动速度就越慢。

速度为 10

### 如何通过 API 动态修改天空球的属性？
