# 水体区域

**阅读本文大概需要 10 分钟**

本文概述了水体区域的定义，水体区域都有哪些功能，表现效果以及使用方式。

## 什么是水体区域

水体区域定义：水体区域是一个具有一定形状的区域，它具有水面和水下效果，并且可以在角色进入该区域时，切换为游泳状态。开发者使用该对象在自己想要的区域，实现角色游泳效果。例如场景中的游泳池，河流湖泊和海洋都可以放置水体区域。

水体区域在编辑器中以功能对象的形式存在，打开编辑器后在左侧资源栏中的“逻辑资源”中，选取“游戏功能对象”，红框中就是水体区域，资源ID为WaterVolume。


## 水体区域使用

### 如何找到水体区域？

在【资源库】-【游戏功能对象】列表中找到【水体区域】的对象。

![](https://qn-cdn.233leyuan.com/online/IZf5a16KK9QL1723785888559.png)

![](https://qn-cdn.233leyuan.com/online/0FTrpmSp4g3Z1723785892905.png)

### 使用水体区域

我们在找到水体区域后，可以根据需求手动拖入场景内，修改其属性来实现相应的效果，也可以通过代码动态生成水体区域。

![](https://qn-cdn.233leyuan.com/online/6Y7qBO2uoPnL1723785897618.png)

![](https://qn-cdn.233leyuan.com/online/MVuQJLQacJRW1723785902794.png)

基础属性中包括了水体的物理属性和水体的表现效果。我们可以通过调节水体摩擦力，改变角色在水中的移动效果。我们也可以通过调节水体属性和水波效果调整水面的表现效果。

### 动态生成水体区域

![](https://qn-cdn.233leyuan.com/online/f9A6PWTuzcdm1723785907064.png)

![](https://qn-cdn.233leyuan.com/online/JKfCOV45pz9h1723785910400.png)

也可以将鼠标悬停在要的的资源上方，查看资源的GUID；也可以通过右键，复制对象的GUID。然后通过GUID动态创建相应的资源。

动态生成特效的示例脚本：

```ts
// 异步spawn，没有找到资源时会下载后在生成
GameObject.asyncSpawn("12683").then((obj) => {
    let pool = obj as WaterVolume;
})
```

```ts
// 普通spawn生成，没有优先加载或预加载资源则无法生成
let pool = GameObject.spawn("WaterVolume") as WaterVolume;
```

::: danger 注意
为了保证之前版本水体的兼容性，我们新增水体的逻辑对象，它将会使用的是WaterVolume的GUID，之前游泳区域的逻辑对象GUID依旧是SwimmingVolume，在后续的版本中我们依旧会保留SwimmingVolume的功能，之前的项目可以正常使用。
:::


## 游泳区属性介绍

### 水体摩擦力

功能说明：角色在游泳区域内的摩擦力，影响角色移动的加速度和表现效果,角色在水中的制动力表现同时受角色属性中[游泳属性]-[游泳制动速度]的影响

演示效果：

| 水体摩擦力=1  | 水体摩擦力=100 |
| ----- | ----- |
| <video controls src="https://qn-cdn.233leyuan.com/online/H9c97bkQIZvt1723786623073.mp4"></video> | <video controls src="https://qn-cdn.233leyuan.com/online/oJ9rpZyTwB7J1723786640376.mp4"></video> |


### 启用浮力

功能说明：为水体区域添加浮力效果,可能将具有物理模拟属性的对象浮在水体中.

演示效果：
<video controls src="https://cdn.233xyx.com/online/3PyIlqBEpBPZ1721958692529.mp4"></video>



## 水体属性介绍

### 主体颜色

功能说明：水体区域主要显示的颜色

演示效果：

<video controls src="https://cdn.233xyx.com/online/J10xdw75QPuj1709714874837.mp4"></video>

相关接口：

```ts
//找到水体区域
let water = GameObject.findGameObjectById("21C44BBD") as WaterVolume;
//主体颜色设置为红色
water.waterColor = LinearColor.red
```

### 透明度

功能说明：水体区域的透明化程度。0为完全透明，1为完全不透明。

演示效果：

<video controls src="https://cdn.233xyx.com/online/axtIY9rpShFR1709714874837.mp4"></video>

相关接口：

```ts
//透明度设置为0.6
water.transmittance = 0.6
```

## 水波属性介绍

### 水波强度

功能说明：水面上的水波强弱显示效果

演示效果：

<video controls src="https://cdn.233xyx.com/online/jBJ8Gn0K4BNc1709714874837.mp4"></video>

相关接口：

```ts
//设置水波强度为0.3
water.normalFlat = 0.3
```

### 水波角度

功能说明：水波的倾斜角度效果

演示效果：

<video controls src="https://cdn.233xyx.com/online/9wmvu0v07uFw1709714874837.mp4"></video>

相关接口：

```ts
//设置水波的角度为0.5
water.flowAngle = 0.5
```

### 水波速度

功能说明：水波的流动速度

演示效果：

<video controls src="https://cdn.233xyx.com/online/X1rP7FYxtKXa1709714874837.mp4"></video>

相关接口：

```ts
//设置水波的速度为20
water.flowSpeed = 20
```

### 水波密度

功能说明：水波在水面上的整体密集程度

演示效果：

<video controls src="https://cdn.233xyx.com/online/0GItUo0pBHSr1709714874837.mp4"></video>

相关接口：

```ts
//设置水波密度为500
water.flowTile = 500
```

## 其他说明

**控制角色上浮下沉**

演示效果：

<video controls src="https://cdn.233xyx.com/online/e7yCtVRUyrWh1709714874837.mp4"></video>

相关接口：

```ts
@Component
export default class Example_Character_SwimDown extends Script {
    // 当脚本被实例后，会在第一帧更新前调用此函数
    protected onStart(): void {
        // 下列代码仅在服务端执行
        if(SystemUtil.isServer()) {
            // 生成拱形容器并适配游泳区域
            GameObject.spawn("WaterVolume",{transform: new Transform(new Vector(0, 0, 500), new Rotation(0, 0, 90), new Vector(10, 10, 10))});
        }
        // 下列代码仅在客户端执行
        if(SystemUtil.isClient()) {
            // 获取当前客户端的玩家(自己)
            let myPlayer = Player.localPlayer;
            // 获取当前玩家控制的角色
            let myCharacter = myPlayer.character;
            // 添加一个按键方法：按住键盘“1”，角色上浮
            InputUtil.onKeyPress(Keys.One, () => {
                myCharacter.swimUp(5);
            });
            // 添加一个按键方法：按住键盘“2”，角色下潜
            InputUtil.onKeyPress(Keys.Two, () => {
                myCharacter.swimDown(5);
            });
        }
    }
}
```
