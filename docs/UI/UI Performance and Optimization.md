# UI 性能与优化

<strong>阅读本文大概需要 10 分钟</strong>

本文概述了游戏界面开发中性能相关的建议，如何合理使用 UI 功能并减少性能消耗。

### 单张贴图分辨率建议不超过 1280x720

OPPOA57 屏幕分辨率为：1280x720，而下面两张图原始分辨率分别为：3380x1565 和 1280x593；当贴图分辨率大于手机实际分辨率时，将不会有任何效果提升，因此建议单张贴图分辨率建议不超过 1280x720。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnvOwQWe1TzgZeWMvaXHd28b.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn8tCSUwh1oQxgZqTvPys90f.png)

### 尽量贴近屏幕真实显示尺寸制作贴图尺寸

下图中左上角的骷髅图标实际显示尺寸是 107x101。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnyyZchl73WSuPdimKYdSH3e.png)

而这张贴图的原始尺寸是 324x324，就这张贴图而言，实际会有约 10 倍的内存多余占用。因此，建议尽量贴近屏幕真实显示尺寸制作贴图尺寸。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnr8rarmHbqRUh26vYjtTFuh.png)

### 合理使用拆分重用原则

左图是一张整图，而这张整图可以使用右图进行【旋转】拼接成左一图；由此可见，合理的拆分重用一张整图能节省内存。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn1tFiEncnmtzaeVZXGOvc8b.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnbqvJnnlmh4rUfVVL8mLRHb.png)

### 合理使用图片的绘制类型

灵活使用图片绘制类型中的九宫格和边界绘制，可以将一张 100x100 的图不失真的放大到任何大小。

九宫格绘制类型演示，使用方法请见 [2.图片](https://meta.feishu.cn/wiki/wikcnAT3oxwkOtbE9jzsjo2xUyg) ：

示例：

以下这些图都是一个游戏中的不同 UI 贴图（类似的还有很多）。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnXR3ZqZ39u4Ca4v7NxZUlhe.png)

3324x1378

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnYxdSfwalshTJxWLcN6uERe.png)

1734x1370

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnefOnO2Meec4bdkRR493foh.png)

1734x1370

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnp1MEeq9tv9xKEivrhvmUGc.png)

1734x1370

而事实上，只需要用到下面两张图，并且合理利用拆分重用原则、九宫格绘制类型、再加上修改图片颜色就可以组合出上面所有图的样子，这将能节省上千倍的内存占用。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcndGDbw669P12PWiGFKqNowh.png)

198x127

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnxNFo7sw0Tu8SPMqxEUCHEb.png)

100x100

### 推荐使用 Collapsed 隐藏 UI 而不是 Hidden

在调整 UI 组件的可见性时，推荐使用 Collapsed 来隐藏 UI，因为 Hidden 在隐藏后依然占据布局空间（Layout Space），而 Collpsed 隐藏后不占用布局空间，因此在隐藏后不会进行 Prepass 的计算，性能优于 Hidden；合理选择更好的可见性模式可以有效优化性能。

```ts
//UI节点显示规则
    enum SlateVisibility {
        /** 可见 */
        Visible = 0,
        /** 隐藏 并且不占用大小 */
        Collapsed = 1,
        /** 隐藏 占用计算大小 */
        Hidden = 2,
        /** 可见 自身以及子节点不可响应事件 */
        HitTestInvisible = 3,
        /** 可见 自身不可响应事件 */
        SelfHitTestInvisible = 4
    }
```

示例：

```ts
const Btn = this.uiWidgetBase.findChildByPath('Canvas/Button_Jump') as UI.Button
//隐藏 并且在布局中不占用大小，节省性能
JumpBtn.visibility= UI.SlateVisibility.Collapsed
//隐藏 并且在布局中占用大小
JumpBtn.visibility= UI.SlateVisibility.Hidden
```
