# UI 控件-绘图画布

**阅读本文大概需要 5 分钟**

本文概述了 UI 控件—绘图画布的各项属性以及使用方法。


## 什么是绘图画布？

**绘图画布**可用于绘制直线、曲线、文本和自定义图形。绘图功能需要在TS脚本中实现。
- 变换/对齐/通用/渲染属性请见 [UI 控件的基础属性](https://docs.ark.online/UI/UIWidget-BaseProperties.html)
- 绘图画布控件的渲染属性不会影响其绘制的图形，并且其绘制的图形可以超过绘图画布控件范围外。
- 为了节省性能，从下层到上层连续渲染的同类图形会合批。
- 请注意：drawLines、drawSpline、drawCubicBezierSpline三种线暂不支持在世界UI上绘制。
![](https://cdn.233xyx.com/online/GivYpPd95Uf01719380681540.png)


## 绘图画布的功能介绍
### 绘制直线
- 两点之间连接一条直线；线的长度、颜色、层级在DrawDataBase类中配置。
```ts
    let lineDrawData1= new DrawDataBase
    lineDrawData1.lineColor=new LinearColor(1,0,0)
    lineDrawData1.lineThickness=3
    let drawcanvas = this.uiWidgetBase.findChildByPath("RootCanvas/MWDrawCanvas") as DrawCanvas;
    drawcanvas.drawLines([new Vector2(500, 500),new Vector2(500, 800)], lineDrawData1)
```

### 绘制埃尔米特曲线
- 两点之间连接一条埃尔米特曲线，并可以指定开始点和结束点的方向；线的长度、颜色、层级在DrawDataBase类中配置。
```ts
    let drawcanvas = this.uiWidgetBase.findChildByPath("RootCanvas/MWDrawCanvas") as DrawCanvas;
    drawcanvas.drawSpline(new Vector2(1200, 500), new Vector2(100, 100),new Vector2(1700, 500),new Vector2(100, -100), lineDrawData1);
```

### 绘制三阶贝塞尔曲线
- 根据四个点的位置绘制一条三阶贝塞尔曲线；线的长度、颜色、层级在DrawDataBase类中配置。
- 也可以用三阶贝塞尔曲线绘制圆形或者半圆形。
```ts
    let drawcanvas = this.uiWidgetBase.findChildByPath("RootCanvas/MWDrawCanvas") as DrawCanvas;
    drawcanvas.drawCubicBezierSpline(new Vector2(1200, 800), new Vector2(1300, 900),new Vector2(1400, 800),new Vector2(1500, 900), lineDrawData1);
```

### 绘制文字
- 相比文本框控件，仅单纯绘制文本，没有换行/文本对齐/富文本等功能。
```ts
    let drawcanvas = this.uiWidgetBase.findChildByPath("RootCanvas/MWDrawCanvas") as DrawCanvas;
    drawcanvas.drawText("text", new Vector2(200, 800), 50, new LinearColor(1,0,0), 0);
```

### 绘制自定义图形
- 先确定若干个顶点位置，并设置顶点的位置信息、颜色信息、纹理坐标信息；然后三个一组的将顶点连接为三角形并组成自定义图形；
  - 每个三角形的颜色能根据顶点的颜色信息自动实现为渐变效果；
  - 并且自定义图形可以配置一张UI贴图，UI贴图的方向取决于各顶点的纹理坐标信息；
```ts
    //创建UIDrawCustomVertex数组，设置顶点的位置信息、颜色信息、纹理坐标信息
    let vertex = [];
    let data = new UIDrawCustomVertex();
    data.color = LinearColor.white;
    data.texCoord = new Vector2(0, 0);
    data.position = new Vector2(0, 0);
    vertex.push(data);

    data = new UIDrawCustomVertex();
    data.color = LinearColor.red;
    data.texCoord = new Vector2(0.5, 0);
    data.position = new Vector2(500, 0);
    vertex.push(data);

    data = new UIDrawCustomVertex();
    data.color = LinearColor.blue;
    data.texCoord = new Vector2(1, 0);
    data.position = new Vector2(1000, 0);
    vertex.push(data);

    data = new UIDrawCustomVertex();
    data.color = LinearColor.blue;
    data.texCoord = new Vector2(1, 1);
    data.position = new Vector2(1000, 50);
    vertex.push(data);

    data = new UIDrawCustomVertex();
    data.color = LinearColor.red;
    data.texCoord = new Vector2(0.5, 1);
    data.position = new Vector2(500, 50);
    vertex.push(data);

    data = new UIDrawCustomVertex();
    data.color = LinearColor.white;
    data.texCoord = new Vector2(0, 1);
    data.position = new Vector2(0, 50);
    vertex.push(data);
    
    let drawcanvas = this.uiWidgetBase.findChildByPath("RootCanvas/MWDrawCanvas") as DrawCanvas;
    //绘制自定义图形，根据UIDrawCustomVertex数组中各顶点的信息，三个一组的将顶点连接为三角形
    drawcanvas.drawCustom(vertex,[0,1,4,4,5,0,1,2,3,3,4,1],"assetID",0);
```

## 如何使用绘图画布？
### 示例一：用绘图画布制作一个简单的画板功能
- 下面我们使用绘图画布来实现一个画板功能，玩家可以通过手指/鼠标在屏幕上触碰并拖动来绘制线条。
- 首先我们在UI编辑器中创建一个绘图画布控件，并铺满全屏；
- 然后编写脚本：
```ts
@UIBind('')
export default class DefaultUI extends UIScript {
drawcanvas:DrawCanvas
lineDrawData1: DrawDataBase
point1:Vector2
point2:Vector2

    /** 仅在游戏时间对非模板实例调用一次 */
    protected  onStart() {
        this.drawcanvas = this.uiWidgetBase.findChildByPath("RootCanvas/MWDrawCanvas") as DrawCanvas;
        //新建一个DrawDataBase类，配置线的长度、颜色、层级。
        this.lineDrawData1= new DrawDataBase
        this.lineDrawData1.lineColor=new LinearColor(1,0,0)
        this.lineDrawData1.lineThickness=5
        //按下数字键1清空当前所有绘制的图形
        InputUtil.onKeyDown(Keys.One, () => {
            this.drawcanvas.clearDraws()
        });
    }
    //需要注意为了能触发onTouchMoved，onTouchStarted必须返回EventReply.handled
    protected onTouchStarted(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
        return EventReply.handled; //EventReply.handled
    }
    //用onTouchMoved检测手指/鼠标移动，并且在移动前后的两点之间绘制线段
    protected onTouchMoved(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
        console.log("onTouchMoved");    
        this.point1=absoluteToLocal(this.drawcanvas.tickSpaceGeometry,InPointerEvent.lastScreenSpacePosition)
        this.point2=absoluteToLocal(this.drawcanvas.tickSpaceGeometry,InPointerEvent.screenSpacePosition)
        this.drawcanvas.drawLines([this.point1,this.point2], this.lineDrawData1)
        return EventReply.unHandled; //EventReply.handled
    }
}

```
- 启动游戏后，在屏幕上绘制，可实现以下效果：
![](https://cdn.233xyx.com/online/TLrtUFTnU1fy1719380674935.gif)
