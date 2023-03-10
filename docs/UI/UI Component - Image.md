# UI 组件-图片

<strong>阅读本文大概需要 10 分钟</strong>

本文概述了 UI 组件—图片的各项属性以及使用方法。

# 什么是图片？

<strong>图片</strong>是 2D 平面模式下显示的静态的高保真效果图，该图片内容可以替换。

- 变换/对齐/通用/渲染属性请见 [UI 组件的基础属性](https://meta.feishu.cn/wiki/wikcn5pYngyHnkkrJlz8bLMhC9e)

# 图片属性-样式

![](static/boxcnOZaMDsHZ10veG8iHNcCDpT.png)

![](static/boxcnnfEl86wIvL8jByILMOXjba.png)

###### 图片大小

- 图片资源的初始大小，他的改变并不会影响实际效果。

###### 图片颜色

- 可以修改图片的本身颜色，如果图片本身具有颜色，则颜色效果为叠加关系。

![](static/boxcnIZfL4nenJR3rktSUQMXxSb.gif)

###### 绘制类型

- 绘制类型包括无、九宫格、边界绘制、图片、九宫格（像素单位）共五种

![](static/boxcncdWvlVMuyxTQz6U6HMvyZc.png)

![](static/boxcn1HLpdo25K95PPmGBY27NDh.png)

######## 无

- 不执行任何绘制工作，则效果为空。

![](static/boxcnPlC9fvxqpqwOaYNgAv08nl.png)

######## 九宫格

- 九宫格是将一张图分割为 9 块，四个角(1,3,7,9)在缩放的时候是保持大小不变，图块 2，8 仅当宽度变化时缩放宽度，图块 4，6 仅当高度变化时缩放高度，图块 5 当图片大小发生变化，宽度和高度都进行缩放。
- 举例说明：当我们拉伸圆角矩形的图片时会导致图片失真。如果我们选择九宫格绘制模式，将(1,3,7,9)四个角固定，那么拉伸时就不会影响圆角的形状，也不会出现失真的情况。

![](static/boxcntXXS7j4CjHQSm66qHLyMqg.png)

![](static/boxcnF3IE9MRte9942zfCXmMvXb.png)

- 九宫格类型的图片边距单位是比例，比如左边距=0.5 时，1,4,7 三个图块的宽度为整张图片宽度的 0.5 倍。

######## 边界绘制

- 边界绘制也是将一张图分割为 9 块，四个角(1,3,7,9)在缩放的时候是保持大小不变，图块 2，8 仅当宽度变化时缩放宽度，图块 4，6 仅当高度变化时缩放高度，与九宫格不同的是扣掉了图块 5。

![](static/boxcntHX3cpLb0hqV8bwGMxSMnf.png)

![](static/boxcnZeYCHYYFXmuOAcO5NSfTyb.png)

- 边界绘制的图片边距单位是比例，比如左边距=0.5 时，1,4,7 三个块的宽度为整张图片宽度的 0.5 倍

######## 图片

- 正常绘制一张图片

![](static/boxcnCG6OG8ZLNMCowBElsZU7xb.png)

######## 九宫格（像素单位）

- 九宫格（像素单位）的效果与九宫格一样，只是图片边距属性的单位不同

![](static/boxcnjlhXYLYHs7CFEkFHH8dfTf.png)

![](static/boxcneeEZ06sjfi7CNMktrqZcIb.png)

- 九宫格类型的图片边距单位是像素，比如左边距=20 时，1,4,7 三个图块的宽度固定为 20 像素。

###### 图片

- 可以替换图片资源
- 操作方法一：将本地资源库内的图片资源直接拖入此处，效果图：

![](static/boxcnk88sZUdxcdslYWlWaIJrYd.gif)

- 操作方法二：将 UI 贴图拖进设计器并松开后，将直接替换鼠标所在位置渲染在最上方的图片组件的图片资源，效果图：

![](static/boxcn82TMZtBhsee6ByNoG8wahd.gif)

# 如何使用图片？

- 图片组件是比较基础的 UI 组件之一，与按钮不同，没有点击等交互功能。通常情况下图片是被当做渲染图或点缀提示等用途。

###### 示例一：动态生成一张图片并设置绘制类型

比如我们希望在游戏中使用这张图作为 UI 界面的底图（GUID：128701，原尺寸 252*120），并且希望将其尺寸改为正方形且放大，同时不希望改变图片外圈的宽度，这时候就需要使用九宫格绘制类型了；这些操作可以在属性面板中完成，而下面将演示如何在脚本中动态完成这些操作

![](static/boxcnzjzd76fH7lYS6cfxoLX0Cb.png)

脚本示例：

```
//找到对应的UI文件
        const base = (this.uiObject) as UI.UserWidget;
        //找到容器
        const canvas = (base.findChildByPath("MWCanvas")) as UI.Canvas; 
        //新建一个图片组件
        let image= UI.Image.newObject(canvas,"NewUI_1") as UI.Image
        //设置图片的位置、大小、资源
        image.position=new Type.Vector2(1000,400)
        image.size=new Type.Vector2(400,400)
        image.imageGuid="128701"
        //最后设置图片的绘制类型为九宫格，并且设置好九宫格的边距
        image.imageDrawType=1
        image.margin=new UI.Margin(0.2)
```

最终效果：

![](static/boxcnwwT0YO3QdL4dHWpjSMNLkf.png)

工程项目：
