# UI 组件-调色板

**阅读本文大概需要 5 分钟**

本文概述了 UI 组件—调色板的各项属性以及使用方法。

## 什么是调色板？

通过**调色板**组件，玩家可以在游戏中选择颜色。

- 变换/对齐/通用/渲染属性请见 [UI 组件的基础属性](https://meta.feishu.cn/wiki/wikcn5pYngyHnkkrJlz8bLMhC9e)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnzxsOzfWhfgd3V1WSJYEqnb.gif)

## 如何使用调色板？

- 脚本示例：

```ts
//设置调色板按钮图片
ColorPick.ImageByGuid="45155";

//颜色调整监听
let _Delegate = Common.MulticastDelegate<(Content: Type.LinearColor) => void>;
ColorPick.onColorChanged(_Delegate);

//颜色调整完毕监听
let _Delegate = Common.MulticastDelegate<(Content: Type.LinearColor) => void>;
ColorPick.onColorChangeFinished(_Delegate);

//触摸开始监听
let _Delegate = Common.MulticastDelegate<(Content: Type.LinearColor) => void>;
ColorPick.onTouchStart(_Delegate);

//触摸结束监听
let _Delegate = Common.MulticastDelegate<(Content: Type.LinearColor) => void>;
ColorPick.onTouchFinished(_Delegate);
```
