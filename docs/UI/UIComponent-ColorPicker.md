# UI 控件-调色板

**阅读本文大概需要 2 分钟**

本文概述了 UI控件—调色板的各项属性以及使用方法。

## 什么是调色板？

通过**调色板**控件，玩家可以在游戏中选择颜色。

- 变换/对齐/通用/渲染属性请见 [UI 控件的基础属性](https://docs.ark.online/UI/UIWidget-BaseProperties.html)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnzxsOzfWhfgd3V1WSJYEqnb.gif)

## 如何使用调色板？

- 脚本示例：

```ts
const colorPick = this.uiWidgetBase.findChildByPath('RootCanvas/colorPick') as ColorPick
//设置调色板按钮图片
colorPick.imageGuid="45155";

//颜色调整监听
colorPick.onColorChanged.add(()=>{
})	

//颜色调整完毕监听
colorPick.onColorChangeFinished.add(()=>{
})	

//触摸开始监听
colorPick.onTouchStart.add(()=>{
})	

//触摸结束监听
colorPick.onTouchFinished.add(()=>{
})	
```
