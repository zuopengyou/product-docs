# 特效

::: info
阅读本文预计 15 分钟
本文概述了特效的工作机制，展示在编辑器创建并使用特效的过程和特效在游戏中的应用。
:::

## 1. 什么是特效？

- 特效是游戏中丰富表现的特殊效果，如烟花、刀光、雨雪等。
- 编辑器中的特效分为**美术效果特特效**和**预制体特效**。
- **预制体特效**实际上是通过编辑器内置的游戏功能对象[**粒子发射器**](https://docs.ark.online/GameplayObjects/ParticleEmitter.html)制作而成，所以您可以修改其中的每一个参数。
- **美术效果特特效**虽然可修改范围小，但提供了精美的成品效果。所以其请在实际开发过程中，挑选适合自己项目的特效。

## 2. 如何添加特效？

### 2.1 如在项目中添加特效？

- 添加**美术效果特特效**

| 中文示例 | 英文示例 |
| - | - |
| ![](https://qn-cdn.233leyuan.com/athena/online/7fc135e08e064eb489b73c03a5a4e8b6_358396690.webp) | ![](https://qn-cdn.233leyuan.com/athena/online/c069d9163a374de39935b455f2df018f_357785636.webp) |

- 添加**预制体特效**

| 中文示例 | 英文示例 |
| - | - |
| ![](https://qn-cdn.233leyuan.com/athena/online/94f6496ab5bc4e13a8710a0ef7edb439_358426376.webp) | ![](https://qn-cdn.233leyuan.com/athena/online/e09a2ffa463c4129949457090d3deb51_358420401.webp) |

::: tip
**预制体特效**的使用方法详见[**粒子发射器**](https://docs.ark.online/GameplayObjects/ParticleEmitter.html)，接下来的介绍围绕**美术效果特特效**展开。
:::

### 2.2 如何在项目中动态生成美术效果特效？

| 中文示例 | 英文示例 |
| - | - |
| ![](https://qn-cdn.233leyuan.com/athena/online/f4ac8ab0c2fd4c13b4c4b609a7e2f3e3_358579229.webp) | ![](https://qn-cdn.233leyuan.com/athena/online/cd6d6b8737a54526a0f7d16f471ea832_358579230.webp) |

- 将鼠标悬停在要的的资源上方，查看资源的Asset ID；也可以通过右键，复制对象的Asset ID。
- 通过Asset ID动态创建相应的资源，动态生成特效的示例脚本：

```ts
@Component
export default class Effect extends Script {

    private readonly effect = {
        assetID: "4330",
        object: null as mw.Effect,
    };

    protected onStart(): void {
        this.createEffect();
    }

    @RemoteFunction(Client)
    public async createEffect(): Promise<void> {
        const success = await mw.AssetUtil.asyncDownloadAsset(this.effect.assetID);
            if (success) {
                // 下载完毕创建特效
                this.effect.object = await mw.GameObject.asyncSpawn(this.effect.assetID) as mw.Effect;

                // 设置特效transform
                const transform = new mw.Transform(new mw.Vector(0, 0, 0), new mw.Rotation(0, 0, 0), new mw.Vector(1, 1, 1));
                this.effect.object.localTransform = transform;

                // 播放特效
                this.effect.object.play();
            }
    }
}
```

## 3. 美术对象特效有哪些属性？

### 3.1. 特效资源

- 属性说明：特效资源指的是特效的资源ID，我们可以通过将【本地资源库】中的【特效资源】直接拖入到属性面板中实现更换资源，也可以通过更换资源ID更换相应的特效资源。

### 3.2 自动启用

- 属性说明：设置特效是否在游戏开始时自动激活，是则会自动播放，否则需要脚本触发播放。

### 3.3 生成粒子个数（Rate）

- 属性说明：特效粒子的生成数量，支持范围随机，即每个粒子都是在设定范围内随机生成。
- 演示效果：

| Rate = 0.5 | Rate = 3 |
| - | - |
| ![](https://qn-cdn.233leyuan.com/online/hBqY9vFAqfyp1724310760795.gif) | ![](https://qn-cdn.233leyuan.com/online/iqI9sUaXbrOH1724310761464.gif) |

- 相关接口：

```ts
//设置特效生成粒子个数为3个
eff.setFloat("Rate",3)
//设置特效生成粒子个数在3到10之间随机取值
eff.setFloatRandom("Rate",10,3)
```

### 3.4 生命周期（LifeTime）

- 属性说明：特效粒子的生存时间，支持范围随机，即每个粒子都是在设定范围内随机生成。

- 相关接口：

```ts
//设置特效生成周期为10
eff.setFloat("LifeTime",10)
//设置特效生成周期在10到100之间随机取值
eff.setFloatRandom("LifeTime",100,10)
```

### 3.5 大小（Size）

- 属性说明：特效粒子的大小，支持范围随机，即每个粒子都是在设定范围内随机生成。
- 演示效果：

| Size = 2 | Size = 5 |
| - | - |
| ![](https://qn-cdn.233leyuan.com/online/n7Fz4ZLwt0j41724311245500.gif) | ![](https://qn-cdn.233leyuan.com/online/q5yMKmZf99Xt1724311246467.gif) |

- 相关接口：

```ts
//设置特效大小为10
eff.setVector("Size",new Vector(10,10,10))
//设置特效大小在10到20之间随机取值
eff.setVectorRandom("Size",new Vector(20,20,20)，new Vector(10,10,10))
```

### 3.6 速度（Speed）

- 属性说明：特效粒子的方向与速度，支持范围随机，即每个粒子都是在设定范围内随机生成。

- 相关接口：

```ts
//设置特效在Z轴方向的速度为50
eff.setVector("Speed",new Vector(0,0,50))
//设置特效在Z轴方向的速度为在0到50之间随机取值
eff.setVectorRandom("Speed",new Vector(0,0,50)，new Vector(0,0,0))
```

### 3.7 发射器位置（EmitterLocation）

- 属性说明：特效粒子的生成位置，支持范围随机，即每个粒子都是在设定范围内随机生成。

- 相关接口：

```ts
//设置特效的播放位置为（0,0,0）
eff.setVector("EmitterLocation",new Vector(0,0,0))
//设置特效的播放位置在（0,0,0）到（50,50,50）之间随机取值
eff.setVectorRandom("EmitterLocation",new Vector(50,50,50)，new Vector(0,0,0))
```

### 3.8 颜色（InitialColor）

- 属性说明：特效粒子的颜色，支持范围随机，即每个粒子都是在设定范围内随机生成。
- 演示效果：颜色比较简单，我们将随机颜色与正常颜色放在一起展示。

| Color = FF91C7FF | Color = 72B5FFFF |
| - | - |
| ![](https://qn-cdn.233leyuan.com/online/n7Fz4ZLwt0j41724311245500.gif) | ![](https://qn-cdn.233leyuan.com/online/Hjm2O2qq9Xgs1724311508951.gif) |

- 相关接口：

```ts
//设置特效的颜色，其中Type.LinearColor各参数分别代表红、绿、蓝和透明度
eff.setColor("Color", new Type.LinearColor(1,0,0,1))
//设置特效的颜色，并在红色和绿色之间随机生成
eff.setColorRandom("Color",new Type.LinearColor(1,0,0,1)，new Type.LinearColor(0,1,0,1))
```

### 3.9 初始旋转角度（Rotion）

- 属性说明：特效粒子的初始旋转角度，支持范围随机，即每个粒子都是在设定范围内随机生成。

- 相关接口：

```ts
//设置特效初始旋转角度为0.5
eff.setFloat("Rotion",0.5)
//设置特效初始旋转角度在0到1之间随机取值
eff.setFloatRandom("Rotion",1,0)
```

### 3.10 旋转速度（RotationRate）

- 属性说明：特效粒子的旋转速度，支持范围随机，即每个粒子都是在设定范围内随机生成。

- 相关接口：

```ts
//设置特效旋转速度为0.5
eff.setFloat("RotationRate",0.5)
//设置特效旋转速度在0到1之间随机取值
eff.setFloatRandom("RotationRate",1,0)
```

### 3.11 阻力（Drag）

- 属性说明：特效粒子的受到的阻力效果，支持范围随机，即每个粒子都是在设定范围内随机生成。

- 相关接口：

```ts
//设置特效阻力为1
eff.setFloat("Drag",10)
//设置特效阻力在0到1之间随机取值
eff.setFloatRandom("Drag",1,0)
```

### 3.12 重力（Acceleration）

- 属性说明：特效粒子的受到的重力效果，支持范围随机，即每个粒子都是在设定范围内随机生成。

- 相关接口：

```ts
//设置特效在Z轴方向受到的重力为-50
eff.setVector("Acceleration",new Vector(0,0,-50))
//设置特效在Z轴方向受到的重力在0到-50之间随机取值
eff.setVectorRandom("Acceleration",new Vector(0,0,-50)，new Vector(0,0,0))
```

## 4. 属性显示问题

- 特效属性会根据特效的特点，暴露相关的属性，也就是说，以上特效属性在不同的特效中显示是不同的。有的会显示1个，有的会显示多个。并且我们不会翻新老特效的资源，只有新制作的特效才会显示这些属性。
