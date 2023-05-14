# 后处理
**阅读本文预计 5 分钟**
使用【后处理】给项目画面添加不同风格

# 后处理对象

后处理是一个提供游戏滤镜的对象，通过自定义各类显示参数将画面调整为理想的效果。你可以在【本地资源库】中的【游戏功能对象】栏中找到【后处理】。

![image](https://arkimg.ark.online/image-20230514152552124-1684049154359-301.webp)

# 自定义后处理
- 后处理-色调映射

色调映射功能的目的是将广泛的高动态范围（HDR）颜色映射到显示器能够输出的低动态范围（LDR）。这是后期处理的最后一个阶段，经过法线渲染后，这个过程在后期处理期间执行。你可以将色调映射的过程想象成一种模拟胶片对光线的反应的方法(属性范围0~100)：

![img](https://arkimg.ark.online/1684048677631-157.webp)![img](https://arkimg.ark.online/1684048682169-160.webp)

- 后处理-泛光

设置物体的泛光效果，光晕能使光源等明亮物体产生辉光效果（属性范围0~8）

![img](https://arkimg.ark.online/1684048685002-163.webp)![img](https://arkimg.ark.online/1684048687907-166.webp)

- 后处理-全局饱和度

该属性调整所表现的颜色（色调）的强度（纯度）。饱和度越高，颜色看起来越接近原色（红色、绿色、蓝色），饱和度降低时，颜色的灰色或褪色效果变得明显。（属性范围0~2）

![img](https://arkimg.ark.online/1684048691066-169.webp)![img](https://arkimg.ark.online/1684048694765-172.webp)

- 后处理-全局对比度

该属性将调节场景中光线和深色值的色调范围。降低强度会去除高亮，让图像显得更亮，营造出一种褪色效果，而强度提升会加强高亮，让整体图像变暗。（属性范围0.2~5）

![img](https://arkimg.ark.online/1684048697723-175.webp)![img](https://arkimg.ark.online/1684048700628-178.webp)

- 后处理-全局伽马值

该属性将调节图像中间色调的亮度以准确重现颜色。降低或增大该值会让图像呈现出褪色或过暗的效果。（属性范围0~5）

![img](https://arkimg.ark.online/1684048704186-181.webp)![img](https://arkimg.ark.online/1684048707442-184.webp)

- 后处理-LDR饱和度

设置低动态范围图片的饱和度（属性范围0~2）

![img](https://arkimg.ark.online/1684048710385-187.webp)![img](https://arkimg.ark.online/1684048713194-190.webp)

- 后处理-LDR对比度

设置低动态范围图片的对比度（属性范围0.2~5）

![img](https://arkimg.ark.online/1684048716018-193.webp)![img](https://arkimg.ark.online/1684048719353-196.webp)

- 后处理-LDR伽马值

设置低动态范围图片的伽马值（属性范围0~5）

![img](https://arkimg.ark.online/1684048722851-199.webp)![img](https://arkimg.ark.online/1684048725290-202.webp)

- 后处理-HDR饱和度

设置高动态范围图片的饱和度（属性范围0~2）

![img](https://arkimg.ark.online/1684048727877-205.webp)![img](https://arkimg.ark.online/1684048730602-208.webp)

- 后处理-HDR对比度

设置高动态范围图片的对比度 （属性范围0.2~5）

![img](https://arkimg.ark.online/1684048733499-211.webp)![img](https://arkimg.ark.online/1684048735881-214.webp)

- 后处理-HDR伽马值

设置高动态范围图片的伽马值（属性范围0~5）

![img](https://arkimg.ark.online/1684048739106-217.webp)![img](https://arkimg.ark.online/1684048741738-220.webp)

- 后处理-LUT颜色查找表百分比

LUT颜色值查找表百分比是一种控制颜色校正效果的比例因子(属性范围0~100)

![img](https://arkimg.ark.online/1684048744634-223.webp)![img](https://arkimg.ark.online/1684048747097-226.webp)

- 后处理-LUT颜色查找表纹理

LUT颜色查找表纹理用作颜色校正的查找表的LUT纹理

![img](https://arkimg.ark.online/1684048750289-229.webp)

![img](https://arkimg.ark.online/1684048752613-232.webp)

- 后处理-环境光遮蔽强度

环境光遮蔽强度是一种近似计算因遮蔽而造成的光线衰减的效果。通常是在标准全局光照的基础上增添细微效果，例如让角落、裂缝或其他生物变暗，以形成一种更加自然真实的视觉效果（属性范围0~1）

![img](https://arkimg.ark.online/1684048755309-235.webp)![img](https://arkimg.ark.online/1684048758857-238.webp)

- 后处理-环境光遮蔽半径

设置环境光遮蔽的半径范围（属性范围0.1~500）

![img](https://arkimg.ark.online/1684048762378-241.webp)![img](https://arkimg.ark.online/1684048765305-244.webp)

- 后处理-动态模糊

动态模糊将两帧画面进行模糊运算（属性范围0~1）

- 后处理-LDR与HDR阈值

设置LDR与HDR的范围（属性范围-1~1）

![img](https://arkimg.ark.online/1684048769212-247.webp)![img](https://arkimg.ark.online/1684048772570-250.webp)

- 后处理-色调映射斜率

调整用于色调映射的S曲线的斜率，较大值将使斜率更大（更深），较低值将使斜率更小（更浅）

![img](https://arkimg.ark.online/1684048775274-253.webp)![img](https://arkimg.ark.online/1684048777777-256.webp)

- 后处理-色调映射低位阈值

调整色调映射中的深色(属性范围0~1）

![img](https://arkimg.ark.online/1684048781361-259.webp)![img](https://arkimg.ark.online/1684048783649-262.webp)

- 后处理-色调映射高位阈值

调整色调映射中的亮色(属性范围0~1)

![img](https://arkimg.ark.online/1684048786457-265.webp)![img](https://arkimg.ark.online/1684048789233-268.webp)

- 后处理-色调映射暗部裁剪

色调映射暗部裁剪设置交叉位置，也就是黑色开始切断数值的位置。一般来说，这个值 不应该调整(属性范围0~1)

![img](https://arkimg.ark.online/1684048791915-271.webp)![img](https://arkimg.ark.online/1684048794337-274.webp)

- 后处理-色调映射亮部裁剪

色调映射亮部裁剪设置交叉位置，也就是白色开始切断数值的位置。大多数情况下，变化都比较微妙(属性范围0~1)

![img](https://arkimg.ark.online/1684048796603-277.webp)![img](https://arkimg.ark.online/1684048799170-280.webp)

- 后处理-曝光补偿

曝光补偿曝光的对数调整，仅在指定色调映射器的情况下使用。设为0时，没有调整；设为-1时，为两倍暗，设为-2时，为四倍暗，设为1时，为两倍亮，设为2时，为四倍亮。(属性范围-15~15)

![img](https://arkimg.ark.online/1684048801843-283.webp)![img](https://arkimg.ark.online/1684048804394-286.webp)

- 后处理-曝光最小亮度

曝光最小亮度自动曝光的最小亮度，用于限定眼部可适应的最低亮度。值必须小于0，并且必须大于或等于 最大亮度（Max Brightness）。合适的值应为接近0的正值，并应在黑暗的光照条件下调整。例如，若该值过小，则图像会显得太亮。若值过大，则图像会显得太暗。实际值取决于所使用内容的HDR范围。若最小亮度（Min Brightness）等于最大亮度（Max Brightness），自动曝光将禁用。(属性范围-10~20)

![img](https://arkimg.ark.online/1684048806881-289.webp)![img](https://arkimg.ark.online/1684048809970-292.webp)

- 后处理-曝光最大亮度

曝光最大亮度自动曝光的最大亮度，用于限定眼部可适应的最高亮度。值必须大于0，并且必须大于或等于 最小亮度（Min Brightness）。合适的值应为正值（2是不错的起始值），并将在明亮的光照条件调整。例如，若该值过小，则图像会显得太亮。若值过大，则图像会显得太暗。实际值取决于所使用内容的HDR范围。若最大亮度（Max Brightness）等于最小亮度（Min Brightness），自动曝光将禁用。(属性范围-10~20)

![img](https://arkimg.ark.online/1684048813218-295.webp)![img](https://arkimg.ark.online/1684048815561-298.webp)

- 描边设置-描边颜色

描边颜色设置描边的颜色

![img](https://arkimg.ark.online/1684048164280-50.webp)

- 描边设置-描边宽度

描边宽度设置描边显示宽度，值越大显示越宽（ 属性范围 0~4）

- 描边设置-被遮挡融合比例

被遮挡融合比例描边的部分可能有被遮挡的，可能有不被遮挡的，这个修改是全局的，不能只单独设置某一个队伍的融合比例（属性范围 0~1）




# 使用 后处理

### 在编辑器工作区中直接使用：

1. **将后处理拖入场景并自定义它的各种属性。**

![image](https://arkimg.ark.online/image-20230514152933832-1684049376760-303.webp)

### 在代码中动态生成

1. 将”后处理“功能对象拖入优先加载栏，或者在代码中预加载后处理的资源ID，不然需要使用`asyncSpawn`才能使用对应资源

```TypeScript
@Core.Property()
preloadAssets: string = "PostProcessAdvance";
```

2. 动态spawn后处理，通过上面介绍的接口修改其属性

```TypeScript
// 异步spawn，没有找到资源时会下载后在生成
Core.GameObject.asyncSpawn("PostProcessAdvance").then((obj) => {
    let p = obj as GamePlay.PostProcess;
}
// 普通spawn生成，没有优先加载或预加载资源则无法生成
let p = Core.GameObject.spawn("PostProcessAdvance") as GamePlay.PostProcess;
```
::: tip
后处理对象是全局的，所以多个后处理的效果会被覆盖而不是叠加，始终展示最上层的后处理画面。
:::
