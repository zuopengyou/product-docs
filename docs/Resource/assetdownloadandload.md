# 资源加载与资源下载

**阅读本文预计10分钟**

在游戏中资源在使用前都需要进行下载和加载过程。学习资源下载和加载的相关知识可以辅助用户优化资源加载的顺序和时机，提升游戏性能。

# 概述

资源下载指的是通过网络从云端资源库将资源下载到本地进行使用。而资源加载是将本地资源加载到游戏的缓存中，方便游戏运行后能随时使用。资源下载和资源加载都需要时间，如何处理好这段时间是游戏开发者需要关注的重点。编辑器中关于资源下载用户不用太过关注，而资源加载对内存，游戏拉起时间以及CPU性能的影响都需要开发者去选择合适的方式去兼顾。

# 资源下载

在编辑器的【资源库】中，提供了很多给用户使用的模型、材质、贴图、特效、动作、声音等相关资源。要想在项目开发过程中使用这些资源，你首先需要将它们下载到本地。未下载的资源在右上角会有一个"下载"符号，点击符号会开始下载资源。而下载完成的资源右上角会出现一个"放大镜"符号，点击符号可以进入资源的详情页面去预览资源内容。

![img](https://arkimg.ark.online/1684057929318-6.webp)![img](https://arkimg.ark.online/1684057929318-1.webp)

下载完成的资源可以放置到【场景】中或者【对象管理器】下，并且可以自定义对象的属性。

![img](https://arkimg.ark.online/1684057929318-2.webp)

# 资源加载

资源加载指的是游戏运行过程中将已经使用或者即将使用到的资源加载进缓存的行为，这样每次使用资源时就不会陷入需要等待资源加载的情况。下方示例展示了将项目中【默认UI】的 "Jump" 按钮图片更改为一个未加载的UI贴图资源造成切换延迟的情况。在【工程内容】视图中的【脚本】栏中找到 "UIDefault" 脚本，将将下列代码替换脚本中的`onStart`方法：在按下 "Jump" 按钮时会将按钮贴图切换为 "14126";

```TypeScript
protected onStart() { 
    this.canUpdate = false;
    const JumpBtn = this.uiWidgetBase.findChildByPath('MWCanvas/MWButton_Jump') as UI.StaleButton
    JumpBtn.onPressed.add(()=>{
        if (this.Character) {
            this.Character.jump();
        } else {
            Gameplay.asyncGetCurrentPlayer().then((player) => {
                this.Character = player.character;
                this.Character.jump();
            });
        }
        JumpBtn.pressedImageGuid = "14126";
        JumpBtn.disableImageGuid = "14126";
        JumpBtn.normalImageGuid = "14126";
    });
}
```

![img](https://arkimg.ark.online/1684057929318-3.gif)

为了使资源不要等到使用的时候再加载，编辑器提供了两种静态的方式帮助用户去提前加载会使用到的资源。第一种方法是将使用到的资源拖入【对象管理器】下的【优先加载】栏。第二种是在脚本中将资源ID添加到特殊属性字段 "preloadAssets" 中。

【对象管理器】中的对象使用的资源在游戏运行后都会默认进行加载，与拖入【优先加载】栏的效果一样。需要注意的是，无论使用什么方式去进行预加载，预加载的资源越多，进入游戏的时间越慢。在编辑状态测试游戏时主要是资源加载进缓存的时间，而发布的线上游戏还需要增加资源下载的时间。

## 优先加载栏

【优先加载】栏中的资源在游戏运行后都会默认进行加载，将资源拖入后资源即被标记为"需要预加载"。【对象管理器】中已经被对象使用的资源无需再次拖入优先加载栏。资源拖入完成后**保存工程**。

![img](https://arkimg.ark.online/1684057929318-4.webp)

## 预加载字段

在游戏开发初期，游戏体量较小，如果游戏场景需要优先加载资源，你可能会通过拖动的方式，将其添加到游戏场景中或者【优先加载】栏。而到了复杂项目中，会发现再这样做就会使得各种拖动的资源非常复杂，难以查找与维护。因此编辑器也提供了一种填写资源ID的方式来帮助用户进行资源的预加载。在【工程内容】视图中的【脚本】栏中新建一个脚本文件，在脚本类中将下列代码粘贴至onStart方法上方：

```TypeScript
@Core.Property()
preloadAssets = "14126";
```

保存代码后将脚本挂载到【对象管理器】中的【对象】栏下，选中脚本查看属性面板，此时属性面板多了一个字段 "preloadAssets" 。输入框中正式代码中填写的资源ID："14126"。保存项目工程，此时该资源已经被标注预加载完成。如果想继续预加载其他资源，那么只需要在属性面板中"preloadAssets" 输入框内添加对应的资源ID（ID之间使用英文逗号分隔），再重新**保存工程**即可。

![img](https://arkimg.ark.online/1684057929318-5.webp)

如果希望在代码里继续添加，那么添加完成并保存脚本后，需要将脚本先从【对象管理器】中删除然后**重新挂载并保存工程**，此时预加载的资源才会被重新标识。

在脚本已挂载后，往脚本代码中"preloadAssets"中添加资源ID，需要重新执行挂载脚本并保存工程。

# 代码中动态下载与加载

由于预加载资源越多进入游戏的时间就越长，因此为了解决这个问题并且为了满足动态的加载和表现不同的资源而产生的需求，编辑器还提供两种动态进行资源加载的方式去辅助开发者以更灵活更主动的方式去进行资源的下载/加载操作。

## 使用资源下载/加载接口

编辑器提供了资源下载/加载接口，以便用户自己决定在游戏过程中适当的时机去执行资源下载/加载操作。用户只需要传入资源ID即可。`assetLoaded`接口可以检查某个资源是否加载，而`asyncDownloadAsset`会去下载并加载对应的资源。使用示例如下：

```TypeScript
/**
 * @groups UTILITY
 * @description 资源是否加载
 * @effect 调用端生效
 * @param InAssetId usage:资源GUID
 * @returns 未加载将返回false
 */
function assetLoaded(InAssetId: string): boolean;

/**
 * @description 资源下载
 * @groups UTILITY
 * @effect 调用端生效
 * @param InAssetId usage:资源GUID
 * @returns 下载失败将返回false
 */
function asyncDownloadAsset(InAssetId: string): Promise<boolean>;
```
```TypeScript
protected async onStart(): Promise<void> {
    AssetUtil.asyncDownloadAsset("14126").then((result: boolean) => {
        console.log("Resoure 14126 " + result);
    });

    // 作用同上
    // let result = await AssetUtil.asyncDownloadAsset("14126");
    // console.log("Resoure 14126 " + result);
    
    console.log("Resoure 14144 " + AssetUtil.assetLoaded("14144"));
}
```

资源下载过程是异步的，但是资源加载过程不是异步的。所以动态加载资源会挤占游戏主线程，对CPU性能影响比较大，请谨慎使用。

## 通过异步接口使用资源

如果资源因加载导致的延迟不重要或者不影响游戏进程，那么可以使用支持的异步接口去直接使用对应的资源。通常用于异步生成某些资源对象例如特效，音效或者静态模型。异步接口可以保证在资源下载加载完成后去获取到对应的对象，而不会因为延迟原因拿不到对象导致代码报错。

```TypeScript
let newSound = await Core.GameObject.asyncSpawn({guid: "12721"}) as Gameplay.Sound;
```

# 动态加载与静态加载的优缺点

|      | 静态加载                                                     | 动态加载                                                     |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 优点 | 可以在场景加载过程中完成自身的加载过程，所以在场景运行期间该资源没有任何性能隐患；另外在使用资源时无需担心延迟问题。 | 根据游戏设计要求，有些资源在场景开始时无法确定哪些会使用，必须动态加载；动态资源可以在场景运行的任何时间加载，开发者具有很强的灵活性和主动性。 |
| 缺点 | 只支持不变的静态资源，无法根据游戏的实际需要灵活更换不同资源；此外场景进入加载时间会显著增加。 | 动态资源加载需要开发者更高的技巧；而一旦缺乏对其合理的控制，游戏的性能问题和内存泄漏将无法避免。 |