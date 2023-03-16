# 按键绑定（针对 PC 端）及预设 UI

**阅读本文大概需要 10 分钟**

本文概述了如何使用按键绑定和鼠标锁定功能快捷设置 PC 游戏端玩家的控制方案，以及如何使用新建项目的预设 UI。

## 什么是按键绑定？

**按键绑定**是指开发者在制作游戏时，可以在移动端 UI 基础上完成按键绑定，高效快捷的设置 PC 游戏端玩家的控制方案，而不需要重新设计一套 PC 端 UI，玩家在游戏中键盘鼠标操作将会映射到对应的移动端 UI 上；

**预设 UI**是指编辑器为新建项目提供的一套可修改的移动端预设 UI，及对应的 PC 端按键绑定。

## UI 编辑器内的【按键绑定】菜单

- 双击工程内容中的任意 UI 文件，点击 UI 编辑器工具栏的【按键绑定】按钮后，打开【按键绑定】菜单，开发者可以在此菜单直接将移动端 UI（包括摇杆、摄像机滑动区、按钮）绑定或覆盖到键鼠键位上
- 每个 UI 文件的按键绑定菜单会自动读取该 UI 文件内所有的摇杆、摄像机滑动区、按钮、按钮（废弃）这四类 UI 控件

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnuSXwPA9zT2bIOvFYbhS1kc.png)

- 对于摄像机滑动区、按钮、按钮（废弃）：点击/释放/按住绑定的键鼠按键就会触发点击/释放/按住对应 UI 控件
- 对于摇杆：支持绑定摇杆的上下左右四个方向和仅按下/抬起，

  - 上下左右四个方向：分别对应摇杆输入值为（0,0.8）、（0,-0.8）、（-0.8,0）和（0.8,0）四种效果
  - 仅按下/抬起：按下绑定的键鼠按键会触发摇杆的按下抬起事件，但摇杆的当前值保持在（0,0）不变
  - 使用场景：为了实现一边开火一边转动摄像机来瞄准，射击游戏中的开火键推荐使用摇杆控件；而如果需要为 PC 端提供控制方案，可以将开火摇杆的仅按下/抬起绑定在鼠标左键，这样，玩家可以按住鼠标右键拖动或者直接拖动鼠标（鼠标锁定时）来转动摄像机进行瞄准，并使用左键触发摇杆完成开火

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnhmdpZQxxnjfkGIrqSvmxfe.gif)

- 点击菜单中的按钮可以更换绑定，点击重置按钮可以恢复到默认绑定键位

## 键鼠绑定相关 API

- 除了 UI 编辑器内的按键绑定菜单，开发者也可以使用脚本自定义控制方案，或者覆盖默认键位

**脚本示例：**

```ts
const JumpBtn = this.uiWidgetBase.findChildByPath('MWCanvas/MWButton_Jump') as UI.Button
//绑定按键
Util.InputUtil.bindButton(Type.Keys.Up,JumpBtn)
//解绑按键
Util.InputUtil.unbindButton(Type.Keys.Up)
```

- 为了满足开发者针对 PC 游戏端的不同需求，比如希望某个摄像机滑动区/摇杆是否可以被鼠标点击，因此在 MWUIVirtualJoystickPanel 和 MWUITouchPad 类中提供了是否被鼠标控制的接口，编辑器内也可以在摄像机滑动区/摇杆属性面板中勾选此属性

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnGgX88e45wIi9fPbNj6s2Sc.png)

- 此功能的使用场景请见 [UI 组件-摇杆](https://meta.feishu.cn/wiki/wikcn3gWEoxEgKwAzgYPBl2zeCc?table=tblDgsts19OW2IJA) 和 [UI 组件-摄像机滑动区](https://meta.feishu.cn/wiki/wikcnlsPgoUkmlLTnCwO3vuRCLc?table=tblDgsts19OW2IJA)

**脚本示例：**

```ts
let touchpad=this.uiWidgetBase.findChildByPath('MWCanvas/MWUITouchPad_1') as UI.TouchPad
let joystick=this.uiWidgetBase.findChildByPath('MWCanvas/MWUIVirtualJoystickPanel_1') as UI.VirtualJoystickPanel
//设置摇杆和摄像机滑动区可以被鼠标点击
touchpad.controlByMouseEnable(true)
joystick.controlByMouseEnable(true)
//获取摇杆和摄像机滑动区是否可以被鼠标点击
let bool1 = touchpad.controlByMouseEnable
let bool2 = joystick.controlByMouseEnable
```

## 新建项目的预设 UI 控制方案

- 为新建项目提供一个预设 UI 文件，并且绑定了一套键鼠默认键位，作为默认的控制方案
- 预设 UI 文件包括左侧的摇杆、右侧的摄像机滑动区和右下的三个按钮（跳跃/攻击/交互）
- 预设 UI 脚本文件内包括控制点击跳跃按钮可以实现人物跳跃的逻辑

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcnSVMmjt7W9I5jC799sLcjsb.png)

![](https://wstatic-a1.233leyuan.com/static/productdocs/boxcn4IzaVy9OridnZrlxhVBg2g.png)

| 按键     | 行动             | 对应的预设 UI 控件 |
| -------- | ---------------- | ------------------ |
| W        | 向前移动         | MWMobileJoyStick   |
| S        | 向后移动         |                    |
| A        | 向左移动         |                    |
| D        | 向右移动         |                    |
| 鼠标右键 | 旋转镜头（按住） | MWCamarSlideZone   |
| 空格键   | 跳跃             | MWButton_Jump      |
| 鼠标左键 | 攻击/热武器开火  | MWButton_Attack    |
| F        | 交互/触发键      | MWButton_Interact  |

## PC 端鼠标锁定功能及 API

- PC 游戏端允许使用鼠标锁定功能，玩家按 Shift 可以切换鼠标锁定，鼠标锁定情况下隐藏鼠标，转动鼠标直接旋转镜头和人物朝向，这样可以同时解放左键和右键留给其他角色行动，比如实现 PC 射击游戏常见的右键瞄准 + 左键射击
- 开发者可以在脚本中控制是否允许玩家切换鼠标锁定状态

**脚本示例：**

```ts
//设置为不允许玩家切换鼠标锁定状态
Util.InputUtil.setCanBeLockMouse(false)
//设置为允许玩家切换鼠标锁定状态
Util.InputUtil.setCanBeLockMouse(true)
```
