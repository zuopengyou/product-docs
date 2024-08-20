# UI 控件-遮罩按钮

**阅读本文大概需要 15 分钟**

本文概述了 UI 控件—遮罩按钮的各项属性以及使用方法。

## 什么是遮罩按钮？

**遮罩按钮**是一种遮挡、遮盖部分图像内容，并显示特定区域的图像内容的 UI 控件；可用于实现技能冷却按钮、特殊形状按钮的遮罩效果；也可以不作为按钮，而用于场景过度、图片切割等效果。

- 示意图：

![](https://qn-cdn.233leyuan.com/online/hD83Hkq6euNW1724131713791.gif)

- 变换/对齐/通用/渲染属性请见 [UI 控件的基础属性](https://docs.ark.online/UI/UIWidget-BaseProperties.html)

  - 注意：如果不作为按钮使用时，请将可见性修改为可见不可交互仅自身（SelfHitTestInvisible）

## 遮罩按钮属性

- 遮罩类型

  - 可选择扇形遮罩、圆形遮罩、圆角矩形遮罩三种类型

本文为了清晰描述修改各项属性时，遮罩图片和普通图片（底图）各自的变化效果，图例中的遮罩图片和普通图片（底图）分别选用了不同的图片；

实际使用时，如果仅想实现按钮技能冷却的遮罩效果，**推荐遮罩图片选用和普通图片（底图）相同的图片资源，并使用不同的图片颜色和透明度**

### 2.1 扇形遮罩

![](https://qn-cdn.233leyuan.com/online/GhL4lZI7zTCw1724131704751.jpg)

- 普通图片/遮罩图片

  - 即遮罩按钮控件的底图和遮罩图，可以修改两张图的素材、颜色、透明度
  - 普通图片的绘制类型目前是针对整个遮罩控件的，也会影响遮罩图片的效果

![](https://qn-cdn.233leyuan.com/online/0P6zZj1tLxtu1724131705230.gif)

- 是否开启过渡模式

  - 勾选后，可以配置底图在按压/禁用状态下的样式，触发按压/禁用状态的逻辑与按钮完全相同

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnD88tOp2eN16siF491yrAuc.gif)

- 遮罩图轮廓裁剪底图

  - 即用遮罩图的轮廓裁剪底图，遮罩图轮廓外的透明度变为 0，遮罩图轮廓内的透明度统一变为遮罩图透明度

    - 此选项仅能完成裁剪底图，遮罩图仍覆盖在底图上方

![](https://qn-cdn.233leyuan.com/online/uUtRFnKA5x7q1724131710973.gif)

- 如果希望实现按遮罩图轮廓裁剪底图，并且不显示遮罩图，参考以下参数即可得到特殊形状的遮罩按钮：

  - 遮罩图轮廓裁剪底图：勾选
  - 扇形百分值：1
  - 扇形部分底图透明度：1
  - 扇形部分遮罩图透明度：0

![](https://qn-cdn.233leyuan.com/online/nuZjXixQiGKQ1724131702631.jpg)

- 旋转中心

  - 即修改扇形区域的圆心位置

![](https://qn-cdn.233leyuan.com/online/uzIHTU1YzWoz1724131712454.gif)

- 扇形百分值

  - 即扇形区域角度除以 360° 的百分值

![](https://qn-cdn.233leyuan.com/online/OqB4l8z67X7f1724131713359.gif)

- 旋转角度

  - 即扇形区域所在的位置；该属性为 0.25 时，从 12 点钟方向开始计算扇形区域的角度

![](https://qn-cdn.233leyuan.com/online/kC5mQwSrbBDr1724131707662.gif)

- 扇形部分底图透明度

  - 即底图在扇形区域内这部分的透明度

![](https://qn-cdn.233leyuan.com/online/aNXKx9omchrZ1724131709152.gif)

- 扇形部分遮罩图透明度

  - 即遮罩图在扇形区域内这部分的透明度

![](https://qn-cdn.233leyuan.com/online/dZoktYbZFkGN1724131707219.gif)

### 2.2 圆形遮罩

![](https://qn-cdn.233leyuan.com/online/XpYZmLQ00o8n1724131704255.jpg)

- 普通图片/遮罩图片

  - 即遮罩按钮控件底图和遮罩图，可以修改两张图的素材、颜色、透明度

![](https://qn-cdn.233leyuan.com/online/0kIjrCEZgte81724131712915.gif)

- 是否开启过渡模式

  - 勾选后，可以配置底图在按压/禁用状态下的样式，触发按压/禁用状态的逻辑与按钮完全相同

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnzcsPX7P4tWym3JkvLXcare.gif)

- 遮罩图轮廓裁剪底图

  - 即用遮罩图的轮廓裁剪底图，遮罩图轮廓外的透明度变为 0，遮罩图轮廓内的透明度统一变为遮罩图透明度

    - 此选项仅能完成裁剪底图，遮罩图仍覆盖在底图上方

![](https://qn-cdn.233leyuan.com/online/61h7BgOnjCoX1724131710057.gif)

- 同样的，如果希望实现按遮罩图轮廓裁剪底图，并且不显示遮罩图，参考以下参数即可得到特殊形状的遮罩按钮：

  - 遮罩图轮廓裁剪底图：勾选
  - 圆形百分值：1
  - 圆形部分底图透明度：1
  - 圆形部分遮罩图透明度：0

![](https://qn-cdn.233leyuan.com/online/nuZjXixQiGKQ1724131702631.jpg)

- 圆心位置

  - 即圆形部分的圆心位置

![](https://qn-cdn.233leyuan.com/online/jrygJQbGisWS1724131705716.gif)

- 外圈百分值

  - 用于调整外圈大小，即控件对角线上外圈到中心的距离/控件对角线长度的百分值；在此值为 1-√2/2（约 0.293）时，未被外圈遮挡部分刚好成为内切于控件边界的圆形

![](https://qn-cdn.233leyuan.com/online/OUeuOTEOhpMs1724131710521.gif)

- 外圈部分底图透明度

  - 即底图在外圈区域内这部分的透明度

![](https://qn-cdn.233leyuan.com/online/XqGSfYGD1JdU1724131706756.gif)

- 外圈部分遮罩图透明度

  - 即遮罩图在外圈区域内这部分的透明度

![](https://qn-cdn.233leyuan.com/online/OUeuOTEOhpMs1724131710521.gif)

### 2.3 圆角矩形遮罩

![](https://qn-cdn.233leyuan.com/online/9UXTZQXyopv51724131703748.jpg)

- 普通图片/遮罩图片

  - 可以修改底图的素材、颜色和透明度，以及圆角遮罩的颜色和透明度

![](https://qn-cdn.233leyuan.com/online/CsG5ej53z32I1724131711444.gif)

- 矩形边距 X/Y

  - 将普通图片在 X 轴和 Y 轴两个方向上进行裁剪，该属性调整 X 轴和 Y 轴两个方向上，被裁剪部分占控件大小的比例，该属性越大，裁剪的比例越大

![](https://qn-cdn.233leyuan.com/online/Wapa1pfkkLR21724131708111.gif)

- 角半径

  - 即圆角的半径；此属性为 0 时，变成直角矩形

![](https://qn-cdn.233leyuan.com/online/IOqLkwFuZ3Rt1724131708655.gif)

- 锐度

  - 即圆角矩形边缘的锐度

![](https://qn-cdn.233leyuan.com/online/SQwF5vJ3sO271724131711952.gif)

- 圆角调节

  - 此属性在固定圆角半径的情况下，调整圆角的圆心位置；用于调整出想要的圆角方向

![](https://qn-cdn.233leyuan.com/online/AqV8VZw8S1SJ1724131706242.gif)

## 如何使用遮罩按钮？

### 示例一：制作能时钟显示 CD 的技能按钮

在 UI 编辑器中设置好遮罩按钮控件和文本控件，并设置好技能图片（普通图片/按压图片/禁用图片/遮罩图片都要设置）

![](https://qn-cdn.233leyuan.com/online/XzxfMo83QBUq1724131703248.jpg)

- 在脚本中使用 UI.MaskButton 类实现遮罩的逻辑

```ts
export default class UIDefault extends UIScript {
    character: Character;

	/** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() { 

		 //设置能否每帧触发onUpdate
		 this.canUpdate = false;
		 //设置这个遮罩按钮的冷却时间
		 let cd_value = 5000;
 
		 //找到对应的遮罩按钮和文本
		 const fanShape_0 = this.uiWidgetBase.findChildByPath('Canvas/MaskButton') as MaskButton
		 const text_0 = this.uiWidgetBase.findChildByPath('Canvas/TextBlock_1') as TextBlock
		 //需要先设置文本不可见
		 text_0.visibility=1
		 //创建变量记录剩余时间
		 let timeleft=cd_value
		 //使扇形值归零
		 fanShape_0.fanShapedValue=0
		 //遮罩图片设置为完全透明
		 fanShape_0.maskImageColor=new LinearColor(0, 0, 0, 0)
		 //设置一下不可用时，底图禁用图片的颜色更深一些，也可以在编辑器设置
		 fanShape_0.disableImageColor=new LinearColor(0.5, 0.5, 0.5, 1)
 
		 //按下遮罩按钮后进入冷却计时状态
		 fanShape_0.pressedDelegate.add(() => {

			 console.warn("----> GameUI construct");
			 //遮罩图片设置为半透明黑色，展示遮罩效果
			 fanShape_0.maskImageColor=new LinearColor(0, 0, 0, 0.8)
			 //记得将遮罩按钮设为不可用
			 fanShape_0.enable=false
			 //显示冷却总时间
			 text_0.text=(""+timeleft/1000)
			 //设置文本为可见
			 text_0.visibility=3

			//开始计时，随时间，扇形值逐渐变大
			let _time=setInterval(() => {
				timeleft-=50
				fanShape_0.fanShapedValue=(fanShape_0.fanShapedValue+50/cd_value)
				//显示冷却剩余时间
				if (Math.ceil(timeleft/1000)>1) {
					text_0.text=(""+(Math.ceil(timeleft/1000)))
					
				}else{
					text_0.text=(""+(Math.ceil(timeleft/100)/10))
				}
				console.error(timeleft/1000)
			}, 50);
			 
			 //冷却结束后，按钮恢复正常状态
			 setTimeout(() => {
				 //停止计时
				 clearInterval(_time)
				 //使扇形值归零
				 fanShape_0.fanShapedValue=0
				 //遮罩图片设置为完全透明
				 fanShape_0.maskImageColor=new LinearColor(0, 0, 0, 0)
				 //记得将遮罩按钮设为可用
				 fanShape_0.enable=true
				 //设置文本不可见
				 text_0.visibility=1
				 //剩余时间重置
				 timeleft=cd_value
			 }, cd_value);
        });
    }
}
```

- 最终效果：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn9AFTdJsFiX5F90IIpErAkS.gif)

- 工程文件：  [点击下载](https://cdn.233xyx.com/online/fFb8HSV9m3571694499991758.7z)
