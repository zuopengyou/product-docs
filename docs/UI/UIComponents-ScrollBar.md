# UI 控件-滚动框

**阅读本文大概需要 10 分钟**

本文概述了 UI 控件—滚动框的各项属性以及使用方法。

## 什么是**滚动框**？

**滚动框**是比较常用的滑动类型的容器控件，经常在界面不够放置所有内容时使用滚动框，通过滑动来展示所有内容。

- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnOLK02sV1ecT9OtnS1rBPZz.gif)

- 变换/对齐/通用/渲染属性请见 [UI 控件的基础属性](https://docs.ark.online/UI/UIWidget-BaseProperties.html)

## 滚动框属性-滚动面板设置

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnFun5JvW35J1Hs85yIxcMhe.png)

#### 滚动朝向

- 水平滚动

  - 滚动框可以进行水平方向滚动内容。
- 垂直滚动

  - 滚动框可以进行垂直方向滚动内容。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnOlEWSSfXIN1LWDnwFIeuwh.gif)

#### 运动类型

- 弹性运动（Elastic）

  - 滚动框拉到顶部或底部边缘时，还能再拉动一小段距离，并且具有回弹效果。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnvYrx3qcx2WLUTEdsauIpnc.gif)

- 限制（Limited）

  - 滚动框拉到顶部或者底部边缘就不能继续往下拉了。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnlvV3CHJJfWiQ6dPhPVRMDf.gif)

#### 滚动条默认位置

- 在玩家没有操作滚动条的情况下滚动条的默认位置；每次滑动框重新渲染后，滑动条都回到这个默认位置

|            | 水平滚动                                    | 垂直滚动                                    |
| ---------- | ------------------------------------------- | ------------------------------------------- |
| 顶部或左侧 | ![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnebB9XJZ9YKl7d5jbcgqrcd.png) | ![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnjeLX8j5ZtKKHiy8OGrApRc.png) |
| 居中       | ![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnoqYG3QSXoBfbpIkOMnr8kh.png) | ![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcndNbO45MMAln9Lsd5BowWmc.png) |
| 底部或右侧 | ![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnLzpmO9FQW9baQa4DS46cWb.png) | ![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnUNSPxFNIwvKIjGtBRiyGVe.png) |

#### 弹性系数

- 在运动类型为弹性运动时，滚动框拉到顶部或底部边缘时，还能再拉动一小段距离，此系数决定了能超出滚动框正常范围的距离大小。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnnxgGUBibsi4knIX0aY1Lrg.gif)

左侧弹性系数=0.2，右侧弹性系数=2

#### 是否有惯性

- 使用滚动框滚动内容结束后，会不会根据惯性再滑动一段距离。勾选即有惯性，可以滑动一段距离，不勾选的话即无惯性。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn0n3r8YpG49oJOn72KtjsGf.gif)

左侧无惯性，右侧有惯性

#### 显示滚动条

- 是否显示滚动条。勾选则显示，不勾选则不显示。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnBugWniVX8KOemAXagJLBJc.png)

左侧显示滚动条，右侧不显示滚动条

#### 边缘阴影

- 是否显示滚动边缘的阴影部分。勾选则显示，不勾选则不显示。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnBYWbgv7KmeCR5cwDZ9H04g.gif)

左侧不显示边缘阴影，右侧显示边缘阴影

#### 滚动条宽度

- 即滚动条的宽度，X 和 Y 的值分别为垂直滚动和水平滚动时的宽度

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcne1nkXy6uP3dknlFoMj5hHg.gif)

#### 滚动条颜色

- 可以修改滚动条的颜色和透明度

## 滚动框属性-样式设置

- 这里修改的是滚动条的图片及样式。图片属性请见 [UI 控件-图片](https://meta.feishu.cn/wiki/wikcnFg4z5zLX0puYIncTBIJGtf)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn4QjLI6cVQzLHcMgsy9UHAf.png)

## 如何使用滚动框？

### 示例一：制作动态增加内容的无限滚动列表

- 首先摆放一个空的滚动框，并在其内部放一个开启自动布局和自适应高度的容器

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnGHdy0MOpktpGpRFgrU8MqK.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnYp08CtOCzC0VcQJVk6cJmP.png)

- 然后编写脚本，动态生成其他 UI 控件并添加为滚动框内容器的子级，这里生成一张图片控件作为示例；运行游戏后，点击按钮就能看到动态生成的 UI 控件出现在滚动框内部了

```ts
@UI.UICallOnly('')
export default class UIDefault extends UI.UIBehavior{
    Character: Gameplay.Character;

    /** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() { 
        //找到对应的按钮和容器
        const newBtn = this.uiWidgetBase.findChildByPath('MWCanvas/StaleButton') as UI.StaleButton
        const canvas = this.uiWidgetBase.findChildByPath('MWCanvas/ScrollBox/Canvas') as UI.Canvas
        //点击按钮,创建图片
        newBtn.onPressed.add(()=>{
            //创建图片控件
            let image= UI.Image.newObject()
            //把图片控件挂载滚动框下
            canvas.addChild(image)
            image.slot.size=new Type.Vector2(225,225)
            image.imageGuid="76721"
        })  
    }
}
```

- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn8b9vo8R52rBLLp9iRw0ZLc.gif)

- 工程文件：
