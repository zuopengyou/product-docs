# UI 组件-容器

**阅读本文大概需要 15 分钟**

本文概述了 UI 组件—容器的各项属性以及使用方法。

## 什么是容器?

**容器**是承载其他 UI 组件的背景板，UI 组件也必须依托于容器才能显示和产生作用。

- 变换/对齐/通用/渲染属性请见 [UI 组件的基础属性](https://meta.feishu.cn/wiki/wikcn5pYngyHnkkrJlz8bLMhC9e)

## 容器属性-布局

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcndWr09C5ra5oh6gdkKCkR2g.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnUBA18BtZLWi2va3tre6QDc.png)

- 布局是容器的独有属性，主要作用是将容器内的所有子项进行有规则的排序，方便用户进行使用。
- 举例说明：背包功能就是典型利用容器布局所制作的 UI 效果。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn4V8N1j9wLi8gqGJweYl2qg.png)

######## 自动布局

- 开启自动布局功能，将容器内所有子项的 UI 组件有序的排列成一排。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnmTJ2mNKZI4Go3UkLxrqAFe.png)

######## 网格布局

- 根据容器大小将其子项的 UI 组件进行自动换行。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnHIxN8R3rEltxMBxNyTsXvh.png)

######## 容器类型

- 水平布局

  - 水平方向进行有序排列
  - 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnkdyeGpGYysxiJpJzzTpV1e.png)

- 垂直布局

  - 垂直方向进行有序排列
  - 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcndTrAYxQqsQ8LDeMJUYwvNc.png)

######## 排列规则

- 左上对齐

  - 以左上位置进行对齐
- 左中对齐

  - 以左中位置进行对齐
- 左下对齐

  - 以左下位置进行对齐
- 右上对齐

  - 以右上位置进行对齐
- 右中对齐

  - 以右中位置进行对齐
- 右下对齐

  - 以右下位置进行对齐
- 中上对齐

  - 以中上位置进行对齐
- 居中对齐

  - 以居中位置进行对齐
- 中下对齐

  - 以中下位置进行对齐
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnBEYyIEEq2vlbZ77zbhwCQc.gif)

######## 间隔

- 容器中 UI 组件的相距间隔
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnmMXoiVC5secAajnMCXogFh.gif)

######## 子项排列规则

- 启用自动布局后，容器内所有子对象默认会根据从上到下，从左到右的顺序进行排序；如果希望修改这些子对象的排序规则，可以修改子项排列规则的水平排序和垂直排序属性。
- 水平排序

  - 从左到右
  - 从右到左
- 垂直排序

  - 从上到下
  - 从下到上
- 再加上上文的容器类型和排列规则，共能实现 9X2X2X2=72 种容器的布局方式。

  - 可以理解为：

    - 第一步：排列规则是决定被排列对象的整体位置在容器的哪个角落，用容器九个锚点中的哪一个来对齐；
    - 第二步：子项排列规则的水平排序和垂直排序决定这些被排列对象整体内部是如何排列的，具体来说就是层级在最上的对象会在被排列对象整体位置的哪个角落；
    - 第三步：按照容器类型（水平分布/垂直分布）来决定排列方向，层级在最上的对象被放置在第二步中确定的角落，剩余对象根据这个排列方向进行分布
  - 举例说明：开启网格布局的默认情况下，容器类型默认值为水平布局，排列规则默认值为左上对齐。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnyqW1DABhRMqnmhZlZPIYzb.png)

- 将从左到右属性修改为从右到左，从上到下属性改为从下到上。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnmBozgbdPuJisxurjrikync.png)

- 再举例说明：开启网格布局的默认情况下，将容器类型设置为垂直布局，排列规则设置为右上对齐。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnfNbVkYbvrARQ0NByokpqYd.png)

- 将从左到右属性修改为从右到左，从上到下属性改为从下到上。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn6lenGSS6jci4DuzdnJlupb.png)

######## 自适应规则

- 水平适应

  - 固定宽度

    - 根据变换大小，显示水平的宽度
  - 自适应宽度

    - 根据容器内的内容大小，显示水平的宽度
- 垂直适应

  - 固定高度

    - 根据变换大小，显示垂直的高度
  - 自适应高度

    - 根据容器内的内容大小，显示垂直的高度
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcncA6nH9CpQgflWEkT4XT8Qh.gif)

######## 边缘间距

- 左边距

  - 容器内的子项内容距离容器左边框的距离间距
- 上边距

  - 容器内的子项内容距离容器上边框的距离间距
- 右边距

  - 容器内的子项内容距离容器右边框的距离间距
- 下边距

  - 容器内的子项内容距离容器下边框的距离间距
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnjJSMrtjfu5HR29qyaRvPgc.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnlHQpKpDRl69wymJ0x5g0Dd.png)

## 如何使用容器？

###### 示例一：通过容器的自动布局，使 UI 组件有规律排序

- 举例说明：很多情况下我们需要创建整齐的 UI 组件，下面左图中活动页签按钮就需要进行竖向的垂直排列，而下面右图的活动奖励内容需要水平排列；
- 想实现这样的效果，我们可以把底部的容器设置开启自动布局，并且把 UI 组件挂在在这个容器下，就可以实现快捷的自动布局了
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnDYLaS6iCo7eE1CIzov4uNh.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnqUt10qT1KN6jsThwMqXhRc.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnIcbGxhE4k66RF7UCzY5Usc.gif)

###### 示例二：制作活动页签的面板，用于整理 UI 组件并使其方便管理

- 举例说明：下面我们制作简单的活动面板，该面板有 4 种活动。点击每个活动页签的按钮点击后，右边的活动详情就会切换到不同的内容；

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnWrpj2O6RL09cahEz1vwFjh.png)

- 为了方便控制我们将同一个活动的所有 UI 组件放到同一个容器内，并在点击活动页签按钮时，将该容器设置为显示，其他为隐藏，即可实现效果（关于如何制作页签按钮的选中态，请参考 UI 组件-按钮部分的思路）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnfEFge52FO7U6ARQDR0yI5f.png)

- 示例脚本：

```ts
import activity_generate from "./ui-generate/activity_generate";

/** 页签选择枚举 */
export enum PropSelect {
    Prop1,
    Prop2,
    Prop3,
    Prop4,
}

@UI.UICallOnly('')
export default class activity extends activity_generate {
    
    PlayerPropSelect: PropSelect = PropSelect.Prop1;

    protected onStart() { 
        //点击页签按钮1时，页签选择为页签1，并且执行一遍页签选择的方法
        this.mBtn.onPressed.add(() => {
            this.PlayerPropSelect = PropSelect.Prop1;
            this.Prop_Select(this.mBtn, this.mBtn1, this.mBtn2, this.mBtn3)
        });

        //点击页签按钮2时，页签选择为页签2，并且执行一遍页签选择的方法
        this.mBtn1.onPressed.add(() => {
            this.PlayerPropSelect = PropSelect.Prop2;
            this.Prop_Select(this.mBtn, this.mBtn1, this.mBtn2, this.mBtn3)
        });
        //点击页签按钮3时，页签选择为页签3，并且执行一遍页签选择的方法
        this.mBtn2.onPressed.add(() => {
            this.PlayerPropSelect = PropSelect.Prop3;
            this.Prop_Select(this.mBtn, this.mBtn1, this.mBtn2, this.mBtn3)
        });

        //点击页签按钮4时，页签选择为页签4，并且执行一遍页签选择的方法
        this.mBtn3.onPressed.add(() => {
            this.PlayerPropSelect = PropSelect.Prop4;
            this.Prop_Select(this.mBtn, this.mBtn1, this.mBtn2, this.mBtn3)
        })
    }

    //创建一个页签选择的方法：判断条件为页签选择是哪个页签
    Prop_Select(Btn1: UI.StaleButton, Btn2: UI.StaleButton, Btn3: UI.StaleButton, Btn4: UI.StaleButton) {
        switch (this.PlayerPropSelect) {
            //页签选择为页签1时，按钮的颜色效果
            case PropSelect.Prop1:
                {
                    this.mButton_Select.visibility=0
                    this.mButton_Select1.visibility=1
                    this.mButton_Select2.visibility=1
                    this.mButton_Select3.visibility=1
                    //使页签1可见，剩余隐藏
                    this.mCanvas.visibility=0
                    this.mCanvas_1.visibility=1
                    this.mCanvas_2.visibility=1
                    this.mCanvas_3.visibility=1
                }
                break;
            //页签选择为页签2时，按钮的颜色效果
            case PropSelect.Prop2:
                {
                    this.mButton_Select.visibility=1
                    this.mButton_Select1.visibility=0
                    this.mButton_Select2.visibility=1
                    this.mButton_Select3.visibility=1
                    //使页签2可见，剩余隐藏
                    this.mCanvas.visibility=1
                    this.mCanvas_1.visibility=0
                    this.mCanvas_2.visibility=1
                    this.mCanvas_3.visibility=1
                }
                break;
            //页签选择为页签3时，按钮的颜色效果
            case PropSelect.Prop3:
                {
                    this.mButton_Select.visibility=1
                    this.mButton_Select1.visibility=1
                    this.mButton_Select2.visibility=0
                    this.mButton_Select3.visibility=1
                    //使页签3可见，剩余隐藏
                    this.mCanvas.visibility=1
                    this.mCanvas_1.visibility=1
                    this.mCanvas_2.visibility=0
                    this.mCanvas_3.visibility=1
                }
                break;
            //页签选择为页签4时，按钮的颜色效果
            case PropSelect.Prop4:
                {
                    this.mButton_Select.visibility=1
                    this.mButton_Select1.visibility=1
                    this.mButton_Select2.visibility=1
                    this.mButton_Select3.visibility=0
                    //使页签4可见，剩余隐藏
                    this.mCanvas.visibility=1
                    this.mCanvas_1.visibility=1
                    this.mCanvas_2.visibility=1
                    this.mCanvas_3.visibility=0
                }
                break;
        }
    }
}
```

- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnWCPp8wXO1mVZ86z3Wc53cb.gif)

- 工程项目：
