# 天空球

**阅读本文大概需要 15 分钟。**

本文概述了如何修改天空球的基础属性，制作出各式各样、五彩缤纷的天空。

![](https://cdn.233xyx.com/1682503374812_699.png)

## 什么是天空球？

编辑器中的天空球采用传统的天空球原理，将天空球分为顶层、上层、下层三部分，分别对应天空球图片的不同部分。天空盒位于编辑器三维世界的最外层，包裹编辑器区域内所有对象。

<div style="text-align: center">天空球原理图</div>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnjrsN9inh5eV5qKLykMQIrd.png)


## 如何编辑天空球？

鼠标左键点击对象管理器(默认右上角)中的SkyBox对象，即可在属性面板(默认右下角)中编辑天空球。

![](https://cdn.233xyx.com/1682503386813_929.png)

天空球主要构件有：天空球贴图、渐变效果、星星、太阳、月亮、云。以下展开介绍：

### 天空球预设

- 编辑器提供了8种常用的天空球预设效果，当选择其中一个预设效果时，下面其他的天空球基础属性将会自动刷新，并将其属性设置为预设的默认值。
- 演示效果：

<video controls src="https://cdn.233xyx.com/1682503398592_256.mp4"></video>

- 实际应用：我们可以根据不同的环境切换不同的天空球预设，便捷的完成天空球的切换，而不需要每个参数都设置一遍。也可以通过预设功能，进行快速的还原。
- 实现步骤：
- 首先我们添加几个UI按钮，方便我们切换天空球预设，当然可以通过其他的机制进行切换。然后编写UI脚本。

```ts
@UI.UICallOnly('')
export default class UIDefault extends UI.UIBehavior {
    Character: Gameplay.Character;
    /* 解析资源ID列表 */
    private resolveString(assetIds: string): string[] {
        let assetIdArray: string[] = new Array<string>();
        let assetId: string = "";
        let s = assetIds.split("");
        for (let a of s) {
            if (a == ",") {
                assetIdArray.push(assetId);
                assetId = "";
            } else {
                assetId += a;
            }
        }
        if (assetId) {
            assetIdArray.push(assetId);
        }
        return assetIdArray;
    }

    /* 初始化资源 */
    private initAssets(assetIds: string): void {
        let assetIdArray = this.resolveString(assetIds);
        for (let element of assetIdArray) {
            Util.AssetUtil.asyncDownloadAsset(element)
        }
    }

    //声明天空球对象
    sky:Gameplay.SkyBox;

    /** 仅在游戏时间对非模板实例调用一次 */
    protected async onStart() {
        //初始化动画资源 
        this.initAssets("95777,61245")
        //设置能否每帧触发onUpdate
        this.canUpdate = false;

        //找到对应的跳跃按钮
        const JumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Jump') as UI.Button
        const AttackBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Attack') as UI.Button
        const InteractBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Interact') as UI.Button

        //找到对应的预设1按钮
        const Preset1Btn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_1') as UI.Button
        //找到对应的预设2按钮
        const Preset2Btn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_2') as UI.Button
        //找到对应的预设3按钮
        const Preset3Btn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_3') as UI.Button
        //找到对应的预设4按钮
        const Preset4Btn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_4') as UI.Button
        //找到对应的预设5按钮
        const Preset5Btn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_5') as UI.Button
        //找到对应的预设6按钮
        const Preset6Btn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_6') as UI.Button
        //找到对应的预设7按钮
        const Preset7Btn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_7') as UI.Button
        //找到对应的预设8按钮
        const Preset8Btn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_8') as UI.Button

        this.sky = await Core.GameObject.asyncFind("4B3D5D4C44CEB3DB0432A3BAD536C315") as Gameplay.SkyBox

        //点击跳跃按钮,异步获取人物后执行跳跃
        JumpBtn.onPressed.add(() => {
            if (this.Character) {
                this.Character.jump();
            } else {
                Gameplay.asyncGetCurrentPlayer().then((player) => {
                    this.Character = player.character;
                    //角色执行跳跃功能
                    this.Character.jump();
                });
            }
        })

        //点击攻击按钮,异步获取人物后执行攻击动作
        AttackBtn.onPressed.add(() => {
            Gameplay.asyncGetCurrentPlayer().then((player) => {
                this.Character = player.character;
                //让动画只在上半身播放
                let anim1 = player.character.loadAnimation("61245");
                anim1.slot = Gameplay.AnimSlot.Upper;
                //角色执行攻击动作
                if (anim1.isPlaying) {
                    return
                } else {
                    anim1.play();
                }
            });
        })

        //点击交互按钮,异步获取人物后执行交互动作
        InteractBtn.onPressed.add(() => {
            Gameplay.asyncGetCurrentPlayer().then((player) => {
                this.Character = player.character;
                //让动画只在上半身播放
                let anim2 = player.character.loadAnimation("95777");
                anim2.slot = Gameplay.AnimSlot.Upper;
                //角色执行交互动作
                if (anim2.isPlaying) {
                    return
                } else {
                    anim2.play();
                }
            });

        })

        //点击按钮，切换天空球预设1
        Preset1Btn.onPressed.add(() => {
            this.sky.skyPreset = 0;
        })
        //点击按钮，切换天空球预设2
        Preset2Btn.onPressed.add(() => {
            this.sky.skyPreset = 1;
        })
        //点击按钮，切换天空球预设3
        Preset3Btn.onPressed.add(() => {
            this.sky.skyPreset = 2;
        })
        //点击按钮，切换天空球预设4
        Preset4Btn.onPressed.add(() => {
            this.sky.skyPreset = 3;
        })
        //点击按钮，切换天空球预设5
        Preset5Btn.onPressed.add(() => {
            this.sky.skyPreset = 4;
        })
        //点击按钮，切换天空球预设6
        Preset6Btn.onPressed.add(() => {
            this.sky.skyPreset = 5;
        })
        //点击按钮，切换天空球预设7
        Preset7Btn.onPressed.add(() => {
            this.sky.skyPreset = 6;
        })
        //点击按钮，切换天空球预设8
        Preset8Btn.onPressed.add(() => {
            this.sky.skyPreset = 7;
        })
    }

}
```

- 效果图：

<video controls src="https://cdn.233xyx.com/1682503424227_593.mp4"></video>

### 天空球贴图

- 更改天空球贴图：从左侧资源管理器拖出要更换的天空球贴图，拖拽到右侧属性面板→天空球贴图处松开。
- 效果图：

<video controls src="https://cdn.233xyx.com/1682503451594_188.mp4"></video>

- 相关接口：

```ts
//设置天空球贴图
this.sky.skyDomeTextureAssetByID = "32676"
```

### 天空球亮度

- **天空球亮度：**可以改变天空自身发出的颜色亮度，数值为 0-100 之间。
- 效果图：

<video controls src="https://cdn.233xyx.com/1682503478216_081.mp4"></video>

- 相关接口：

```ts
//设置天空球亮度
this.sky.skyDomeIntensity = 1;
```

### 天空球整体颜色

- **天空球整体颜色：**可以改变天空球整体颜色，相当于在天空球上叠加了一层颜色滤镜。
- 效果图：

<video controls src="https://cdn.233xyx.com/1682503497664_231.mp4"></video>

- 相关接口：

```ts
//设置天空球整体为红色
this.sky.skyDomeTint = new Type.LinearColor(255,0,0)
```

### 渐变功能
#### 是否开启渐变效果

![](https://cdn.233xyx.com/1682503517307_065.png)

开启渐变效果时，开发者可对天空球顶层、上层和下层进行编辑。顶层、上层、下层的颜色将会与天空球整体颜色进行乘法。
- 是否开启渐变效果：勾选后，渐变效果生效；若不勾选，开发者所选的天空球顶层/上层/下层颜色均不会生效。
- 相关接口：

```ts
//开启天空球渐变效果
this.sky.skyDomeGradientEnable = true;
//关闭天空球渐变效果
this.sky.skyDomeGradientEnable = false;
```

#### 天空球顶层颜色

- 天空球顶层颜色：天空球的65-100%部分，若开启渐变效果，将与天空球整体色调进行乘法。
- 相关接口：

```ts
//设置天空球顶层颜色
this.sky.skyDomeTopTint = new Type.LinearColor(255,0,0);
```

#### 天空球上层颜色

- 天空球上层颜色：天空球的50-64%部分，若开启渐变效果，将与天空球整体色调进行乘法。
- 相关接口：

```ts
//设置天空球上层颜色
this.sky.skyDomeHorizontalTint = new Type.LinearColor(255,0,0);
```

#### 天空球下层颜色

- 天空球下层颜色：天空球的0-49%部分，若开启渐变效果，将与天空球整体色调进行乘法。
- 相关接口：

```ts
//设置天空球下层颜色
this.sky.skyDomeBotTint = new Type.LinearColor(255,0,0);
```

#### 地平线渐出

- 地平线渐出：影响地平线的渐变宽度，范围为1-20。此值越小，两相邻部分之间的颜色交替部分越宽；此值越大，两相邻部分之间的颜色交替部分越窄。
- 效果图：

地平线渐出值为 1 时，上层（红）和下层（黄）的交替效果

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnpJJbwok3KVMs2RwP5Hs3sf.png)

地平线渐出值为 20 时，上层（红）和下层（黄）的交替效果

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn0txNcUVwMR1vwos89lgqde.png)

- 实际应用：在用户选择了天空球贴图时，天空效果已经达到了预期效果，就不需要调整渐变效果，可以选择关闭渐变效果。如果不满足预期，则需要开启渐变效果，对天空球的效果进行微调。天空球贴图和渐变颜色会进行叠加。
- 相关接口：

```ts
//设置地平线渐出效果
this.sky.skyDomeHorizontalFallOff = 10;
```

### 星星功能
#### 是否开启星星

![](https://cdn.233xyx.com/1682503535583_495.png)

- 是否开启星星：开启时，可以修改星星的属性，并且天空球中将会添加星星效果；关闭时，星星不会出现在天空中。

<div style="text-align: center">开启星星</div>

![](https://cdn.233xyx.com/1682503547892_253.png)

<div style="text-align: center">关闭星星</div>

![](https://cdn.233xyx.com/1682503558853_822.png)

- 相关接口：

```ts
//设置地平线渐出效果
this.sky.skyDomeHorizontalFallOff = 10;
```

#### 星星贴图

- 星星贴图：改变星星贴图，可以改变星星的效果。
- 相关接口：

```ts
//设置天空球的星星贴图
this.sky.starTextureAssetByID = "";
```

**注意**目前我们仅有一种星星贴图，后续会添加更多贴图资源。

#### 星星亮度

- 星星亮度：用以控制天空中所有星星的亮度，范围为0-1。亮度越大，星星越明亮；亮度越小，星星越暗淡。

<div style="text-align: center">亮度 0.6</div>

![](https://cdn.233xyx.com/1682503571421_018.png)

<div style="text-align: center">亮度 0.9</div>

![](https://cdn.233xyx.com/1682503583457_187.png)

- 相关接口：

```ts
//设置天空球的星星亮度
this.sky.starIntensity = 1;
```


#### 星星密度

- 星星密度：用以控制天空中星星的数量，范围为0-100。密度越大，星星越多并且越小；密度越小，星星越小并且越大。

<div style="text-align: center">密度10</div>

![](https://cdn.233xyx.com/1682503595741_340.png)

<div style="text-align: center">密度20</div>

![](https://cdn.233xyx.com/1682503608986_950.png)

- 相关接口：

```ts
//设置天空球的星星密度
this.sky.starTiling = 10;
```

### 太阳
#### 是否开启太阳

![](https://cdn.233xyx.com/1682503622187_817.png)

- 是否开启太阳：开启时，可以修改太阳的属性，并且天空球中将会添加太阳效果；关闭时，太阳不会出现在天空中，取而代之，天空中会显示为月亮，如果月亮也为关闭状态，则都不会显示。

**＃注意＃** 当太阳和月亮同时开启的时，无论大小，永远只显示太阳。

<video controls src="https://cdn.233xyx.com/1682503634129_159.mp4"></video>

- 相关接口：

```ts
//开启太阳功能
this.sky.sunEnable = true;
//关闭太阳功能
this.sky.sunEnable = false;
```

#### 太阳贴图

- 太阳贴图：改变太阳贴图，可以改变太阳的效果。

<video controls src="https://cdn.233xyx.com/1682503647447_200.mp4"></video>

- 相关接口：

```ts
//设置太阳的贴图
this.sky.sunTextureAssetByID = "";
```

#### 太阳亮度

- 太阳亮度：用以控制天空中太阳的亮度，范围为0-2000。亮度越大，太阳越明亮；亮度越小，太阳越暗淡。下图分别为亮度0、200、2000的太阳表现效果。

<div style="text-align: center">太阳亮度为0</div>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnnjyBXgmaGTUk9CzEpZUIPh.png)

<div style="text-align: center">太阳亮度为200</div>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnnWLUBVwdV6yJVLid9ugwyb.png)

<div style="text-align: center">太阳亮度为2000</div>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnurpCXk4brlNWJbbEgupnbb.png)

- 相关接口：

```ts
//设置太阳光的强度
this.sky.sunIntensity = 1;
```


#### 太阳颜色

- 太阳颜色：太阳的颜色。

<video controls src="https://cdn.233xyx.com/1682503668242_777.mp4"></video>

- 相关接口：

```ts
//设置太阳光的颜色
this.sky.sunTint = new Type.LinearColor(255, 0, 0);
```

#### 太阳大小

- 太阳大小：太阳的大小，范围为0-100。

<video controls src="https://cdn.233xyx.com/1682503697707_583.mp4"></video>

- 相关接口：

```ts
//设置太阳光大小
this.sky.sunSize = 20;
```
### 月亮
#### 是否开启月亮

![](https://cdn.233xyx.com/1682503711191_434.png)

- 是否开启月亮：开启时，可以修改月亮的属性，并且天空球中将会添加月亮效果；关闭时，月亮不会出现在天空中。

**＃注意＃** 当太阳和月亮同时开启的时，无论大小，永远只显示太阳。

- 相关接口：

```ts
//开启月亮功能
this.sky.moonEnable = true;
//关闭月亮功能
this.sky.moonEnable = false;
```

#### 月亮贴图

- 月亮贴图：改变月亮贴图，可以改变月亮的效果。

<video controls src="https://cdn.233xyx.com/1682503723627_205.mp4"></video>

- 相关接口：

```ts
//月亮的贴图
this.sky.moonTextureAssetByID = "";
```

#### 月亮亮度

- 月亮亮度：用以控制天空中月亮的亮度，范围为0-2000。亮度越大，月亮越明亮；亮度越小，月亮越暗淡。下图分别为亮度0、200、2000的月亮表现效果

<div style="text-align: center">月亮亮度为0</div>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnnjyBXgmaGTUk9CzEpZUIPh.png)

<div style="text-align: center">月亮亮度为200</div>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnnWLUBVwdV6yJVLid9ugwyb.png)

<div style="text-align: center">月亮亮度为2000</div>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnurpCXk4brlNWJbbEgupnbb.png)

- 相关接口：

```ts
//设置月亮光的强度
this.sky.moonIntensity = 1;
```


#### 月亮颜色

- 月亮颜色：月亮的颜色。

<video controls src="https://cdn.233xyx.com/1682503749052_967.mp4"></video>

- 相关接口：

```ts
//设置月亮的颜色
this.sky.moonTint = new Type.LinearColor(255, 0, 0);
```

#### 月亮大小

- 月亮大小：月亮的大小，范围为0-100。

<video controls src="https://cdn.233xyx.com/1682503763470_450.mp4"></video>

- 相关接口：

```ts
//设置月亮大小
this.sky.moonSize = 20;
```

### 云
#### 是否开启云

![](https://cdn.233xyx.com/1682503780829_589.png)

- 是否开启云：开启时，可以修改云的属性，并且天空球中将会添加云效果；关闭时，云不会出现在天空中。

- 相关接口：

```ts
//开启云功能
this.sky.cloudEnable = true;
//关闭云功能
this.sky.cloudEnable = false;
```

#### 云贴图

- 云贴图：改变云贴图，可以改变云的效果。

<video controls src="https://cdn.233xyx.com/1682503793529_983.mp4"></video>

- 相关接口：

```ts
//设置云贴图
this.sky.cloudTextureAssetByID = "";
```

#### 云透明度

- 云透明度：云的透明效果，范围为0-1。透明度越小，云越透明；透明度越大，云越明显。

<div style="text-align: center">透明度0.2的云</div>

![](https://cdn.233xyx.com/1682503812487_646.png)

<div style="text-align: center">透明度0.8的云</div>

![](https://cdn.233xyx.com/1682503823763_547.png)

- 相关接口：

```ts
//设置云透明度
this.sky.cloudOpacity = 1;
```

#### 云颜色

- 云颜色：云的颜色。

<video controls src="https://cdn.233xyx.com/1682503833922_480.mp4"></video>

- 相关接口：

```ts
//设置云的颜色
this.sky.cloudTint = new Type.LinearColor(255, 0, 0);
```
#### 云密度

- 云密度：云在天空中显示的密度范围，范围为0-1。密度越大，云的样式就越”稀疏“；密度越小，云的样式就越“紧凑”。

<div style="text-align: center">密度0.3的云</div>

![](https://cdn.233xyx.com/1682503849986_851.png)

<div style="text-align: center">密度0.8的云</div>

![](https://cdn.233xyx.com/1682503862536_463.png)

- 相关接口：

```ts
//设置云密度
this.sky.cloudDensity = 1;
```

#### 云速度

- 云速度：云在天空中的移动速度，范围为0-10。速度越大，云的移动速度就越快；速度越小，云的移动速度就越慢。

<div style="text-align: center">云速度为1</div>

<video controls src="https://cdn.233xyx.com/1682503876717_865.mp4"></video>

<div style="text-align: center">云速度为10</div>

<video controls src="https://cdn.233xyx.com/1682503893006_980.mp4"></video>

- 相关接口：

```ts
//设置云速度
this.sky.cloudSpeed = 1;
```

## 如何制作生成天空球贴图？
