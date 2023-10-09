# UI表现与性能优化

**阅读本文大概需要 10 分钟**

本文提供了一些游戏界面开发中的建议，包括如何合理使用UI功能以提升UI表现效果，并减少性能消耗。

## UI表现优化建议
::: tip
美观精细的游戏界面通常是高品质游戏的重要一环，建议开发者增加对UI效果表现问题的关注，否则模糊/有锯齿的UI会影响玩家对于这款游戏的最初印象和基础体验。
:::


### UI图标避免大尺寸图缩小使用导致的锯齿现象

- UI贴图一定是上传的资源尺寸越大越清晰吗？其实并非如此，因为即使上传前的UI贴图处理过锯齿，如果实际使用时过度缩小这张UI贴图会破坏原图的抗锯齿，导致图像边缘有强烈的锯齿感。
- 出现这种情况时，需要重新上传尺寸合适的UI贴图资源，图标及图标底板推荐上传与UI编辑器中使用大小最接近的二次幂尺寸（在64*64/128*128/256*256这三种尺寸类型中选择）。
- 目前编辑器提供了默认DPI缩放规则，以确保在各种分辨率的屏幕上，同一套UI的实际表现尺寸都比较合理，但这会导致同一张UI贴图在UI编辑器中使用大小与最终玩家设备上的使用大小不可能完全一致，除非玩家设备和UI编辑器的设计尺寸（默认1920*1080）完全相同，否则贴图或多或少的都会存在一定缩放。
- 二次幂尺寸的意义在于编辑器中的二次幂尺寸UI贴图会自动开启Mipmap，能预先生成不同缩小倍率的图像缩略图（如下图），根据最终玩家设备上这张UI贴图的实际使用大小选择最接近的缩略图，使其UI贴图缩小使用时仍然能保持细节和清晰度，减轻锯齿感和摩尔纹。但是在某些情况下，Mipmap自动生成的缩略图可能会导致图像失真或者变形，尤其是较小倍率的缩略图，因此即使二次幂尺寸能开启Mipmap也不宜制作尺寸过大的图标。

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

九宫格绘制类型演示，使用方法请见 [UI 控件-图片](https://docs.ark.online/UI/UIComponent-Image.html) ：

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

在调整 UI 控件的可见性时，推荐使用 Collapsed 来隐藏 UI，因为 Hidden 在隐藏后依然占据布局空间（Layout Space），而 Collpsed 隐藏后不占用布局空间，因此在隐藏后不会进行 Prepass 的计算，性能优于 Hidden；合理选择更好的可见性模式可以有效优化性能。

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
const btn = this.uiWidgetBase.findChildByPath('Canvas/Button_Jump') as Button
//隐藏 并且在布局中不占用大小，节省性能
btn.visibility= SlateVisibility.Collapsed
//隐藏 并且在布局中占用大小
btn.visibility= SlateVisibility.Hidden
```
