# 摄像机

<strong>阅读本文大概需要 20 分钟。</strong>

本文概述了如何通过修改摄像机的各种属性，实现各种各样的镜头效果。

## 什么是摄像机？

<strong>摄像机</strong>就像我们的眼睛， 决定了玩家在 3D 游戏世界中看到什么样的画面；游戏进行时，摄像机默认和玩家角色绑定在一起<strong>。</strong>

## 如何编辑摄像机？

在编辑器右上角【世界】中，找到【摄像机】，点击后在右下属性列表中修改摄像机的属性

![](static/boxcn4ujiEwJWC0u4EKxa2yKuie.png)

### 基础属性

![](static/boxcn9lVsqINIcZ0geOrCtAm5af.png)

- <strong>距离调整：</strong>

  - 摄像机与摄像机插槽之间存在一定距离，这个距离称为弹簧臂长度，改变摄像机之间的距离，就是改变弹簧臂的长度。

![](static/boxcnOUNH5RuhI6Fj9nbjzrIwHc.png)

弹簧臂长度（即距离调整）示意图

- <strong>摄像机位置延迟</strong>

  - 摄像机延迟是对摄像机跟随人物的运动、视角的旋转进行延迟、滞后，使得运镜更顺滑、更有代入感。开启摄像机位置延迟后，在人物位移时，摄像机跟随人物的运动会有延迟效果
- <strong>摄像机位置延迟速度</strong>

  - 控制人物在位移时，摄像机抵达目标位置的速度。低数值较慢(延迟高)，高数值较快(延迟低)，零为即时(无延迟)。
- <strong>摄像机旋转延迟</strong>

  - 开启摄像机旋转延迟后，在手指/鼠标控制摄像机滑动区进行视角旋转时，摄像机旋转会有延迟效果
- <strong>摄像机旋转延迟速度</strong>

  - 控制视角在旋转时，摄像机抵达目标位置的速度。低数值较慢(延迟高)，高数值较快(延迟低)，零为即时(无延迟)。
- <strong>视场</strong>

  - 视场俗称 FOV，也就是透视模式下的水平视野角度，FOV 越大，可见的视野角度越大。

如果需要使用正交视角（例如制作拥有 3D 效果的 2D 休闲游戏），推荐使用<strong>视场=35（或更小）</strong>，并同时调整<strong>摄像机距离、位置、角度</strong>等参数来模拟正交视角

![](static/boxcncR0w9JXgVNeqC4oSS4oMJg.png)

- <strong>是否有摄像机碰撞</strong>

  - 摄像机与其他物体存在碰撞效果，碰撞后会将摄像机位置前移或上移，防止穿模。开启或关闭还会影响后续的属性设置。

<strong>关闭摄像机碰撞时：</strong>

- <strong>物体透明</strong>

  - 开启后当摄像机与角色之间有其他障碍物体时，会让障碍物体变透明。
  - 关闭后则不会让障碍物体变透明。
- <strong>物品透明度</strong>

  - 开启物体透明时，当摄像机与角色之间障碍物体的透明度，越接近 0 越透明，越接近 1 越不透明。

<strong>开启摄像机碰撞时：</strong>

- <strong>碰撞抬高</strong>

  - 开启后摄像机与其他物体存在碰撞效果，碰撞后会将摄像机位置试图上移，上方也有物体时则会向前移。
  - 关闭后摄像机与其他物体仍存在碰撞效果，碰撞后不会将摄像机位置试图上移，而是尽可能地在方向固定的情况下，紧贴碰撞物同时和人物保持最远距离，但不超过给定的操控杆长度。
- <strong>抬高高度</strong>

  - 当摄像机与其他物体发生碰撞时，相机抬高的高度

<strong>注意 </strong>在相机碰撞开启的情况下，同时开启碰撞抬高和物体透明时，会优先让相机抬高。

### 摄像机变换（API：cameraRelativeTransform）和弹簧臂变换（API：cameraSystemRelativeTransform）

![](static/boxcnaXZFfxHIBWZFa2uZhVysBe.png)

- <strong>摄像机变换-相对位置</strong>

  - 即摄像机相对默认位置的偏移，修改此属性时，不会改变镜头旋转时围绕的中心位置
- <strong>弹簧臂变换-相对位置</strong>

  - 即弹簧臂挂点相对角色的位置，摄像机通过弹簧臂挂点连接到角色，旋转视角时，镜头围绕弹簧臂挂点旋转

摄像机变换-相对位置（0,100,0）

弹簧臂变换-相对位置（0,0,0）

摄像机变换-相对位置（0,0,0）

弹簧臂变换-相对位置（0,100,0）

- <strong>摄像机变换-相对旋转</strong>

  - 即摄像机相对默认位置的旋转
- <strong>弹簧臂变换-相对旋转</strong>

  - 设定弹簧臂角度，即摄像机相对弹簧臂挂点角度，在游戏中拖动屏幕转动视角就相当于动态调整此属性，因此该属性仅在摄像机朝向模式为固定朝向和跟随朝向时生效，用于制作俯视角游戏；摄像机变换-相对旋转相比于此属性不同的是仅改变摄像机角度，不改变弹簧臂角度

![](static/boxcn4IxXADbu33kLiS4vFrB22g.png)

弹簧臂变换-相对旋转（0,-30,0）

摄像机变换-相对旋转（0,0,0）

![](static/boxcnpqyKSzZZP74GNLvumSKLx2.png)

弹簧臂变换-相对旋转（0,0,0）

摄像机变换-相对旋转（0,-30,0）

### 摄像机模式

![](static/boxcnuljqIXpolWbPKvoVNm3Ajc.png)

- <strong>摄像机模式</strong>

  - 为了开发者能快捷选择需要的视角，编辑器提供【摄像机模式】功能，开发者可以在摄像机属性面板中新增的下拉选项中快捷选择摄像机模式；选择后，属性面板将会按照预设值进行修改刷新。

<strong>摄像机模式-枚举（CameraMode）</strong>

| 枚举名称     | 英文名称             | 枚举值 | 说明                         |
| ------------ | -------------------- | ------ | ---------------------------- |
| 第一人称     | FirstPerson          | 0      | 第一人称视角的摄像机效果     |
| 第三人称     | ThirdPerson          | 1      | 第三人称视角的摄像机效果     |
| 俯视角       | TopDownAngle         | 2      | 俯视角 45 度的摄像机效果     |
| 默认         | Default              | 3      | 类似樱花校园模拟器的默认效果 |
| TPS 过肩视角 | TPSOverShoulderAngle | 4      | 第三人称过肩视角的摄像机效果 |
| FPS 射击视角 | FPSShootingAngle     | 5      | 第一人称射击视角的摄像机效果 |

- <strong>开启真实效果</strong>

  - 如果开启真实效果，摄像机会跟随角色模型头部移动，模拟角色移动时跟随头部上下抖动的画面，用于制作第一视角游戏；如果关闭真实效果，摄像机会跟随角色胶囊体移动，不会跟着头部上下抖动

![](static/boxcnmECwvCy14YAH914x6PobWb.gif)

关闭真实效果

![](static/boxcnp6HpYNCLuXB1PUKraYfOEc.gif)

开启真实效果

### 摄像机位置

![](static/boxcnGloPN25Rqq3paEnTXLIUug.png)

- <strong>摄像机位置模式</strong>

  - 固定模式

    - 摄像机固定在某一位置，不可移动。
  - 跟随模式

    - 摄像机跟随某个物体(默认是人物角色)一直移动。
- <strong>固定摄像机 Z 轴方向</strong>

  - 固定摄像机在 Z 轴上的坐标，比如角色在跳跃时，摄像机不会跟随角色改变 Z 轴位置，用于制作俯视角游戏。

关闭固定摄像机 Z 轴方向

![](static/boxcnlkgUBGMikCrTnmUwjCxHKN.gif)

开启固定摄像机 Z 轴方向

### 摄像机朝向

![](static/boxcnFm8N3CRyvbFTmEpfXUGxhg.png)

- <strong>摄像机朝向模式</strong>

  - 固定朝向：摄像机固定朝向某一个方向。
  - 跟随朝向：摄像机跟随目标面朝方向。
  - 控制朝向：摄像机的朝向受到输入控制。
- <strong>向上限制角度</strong>

  - 摄像机向上旋转时的最大角度，防止旋转至角色模型下方，导致穿模效果。
  - 范围：0~90°  数值越大，可旋转的角度越大。
- <strong>向下限制角度</strong>

  - 摄像机向下旋转时的最大角度，防止旋转至角色模型上方，导致穿模效果。
  - 范围：0~90°  数值越大，可旋转的角度越大。

![](static/boxcnKh5HB410OoxfCelWMrDMth.png)

限制角度示意图

## 如何通过 API 动态修改摄像机效果？

### 示例 1：使用预设的摄像机模式制作狙击枪

- 脚本示例：

```
fireButton.onJoyStickDown.add(() => {
    //按下摇杆进入第一人称瞄准视角，并开启真实效果
    Gameplay.getCurrentPlayer().character.cameraSystem.switchCameraMode(0,true)
    Gameplay.getCurrentPlayer().character.cameraSystem.cameraFOV=70
    fireButton.inputScale=(new Type.Vector2(0.2, 0.2))
});

fireButton.onJoyStickUp.add(() => {
    //松开摇杆发射子弹，并恢复第三人称过肩视角，并开启真实效果          
    Events.dispatchLocal("FIRE_CLICK_Gun");
    Gameplay.getCurrentPlayer().character.cameraSystem.switchCameraMode(4,true)
    Gameplay.getCurrentPlayer().character.cameraSystem.cameraFOV=90
    fireButton.inputScale=(new Type.Vector2(0.5, 0.5))
});
```

- 实现效果：
