# 音效
::: info
**阅读本文预计 15 分钟**

在项目中添加音乐可以增加游戏沉浸感，增强游戏表现。在资源库中免费搜索并使用音频资源。通过【音效】对象控制来音频的播放状态。此外可以修改【音效】对象的属性来控制音频播放的效果。
:::
# 音效对象

【音效】是在项目中播放音频的对象。编辑器为资源库中的每个音频资源分配一个唯一的资源ID，你可以将它指定给一个【音效】对象来播放。你可以自定义【音效】对象的相关属性使音频资源按照预想的方式进行播放，例如将它设置为在游戏开始后自动播放。你也可以通过脚本调用【音效】对象的API去播放。在【资源库】中可以搜索并使用各种免费的音频资源，将音频资源拖入场景后会自带一个对应的【音效】对象。你也可以在【游戏功能对象】栏目中找到【音效】。

![img](https://arkimg.ark.online/1684047744629-14.webp)![img](https://arkimg.ark.online/1684047744628-1.webp)

# 创建音效对象

## 通过放置资源创建：

【音效】本身作为一个游戏对象可以存在于游戏场景中。你可以从【资源库】中将音频资源拖入【场景】或者【对象管理器】后会自动生成一个包含对应音频资源的【音效】对象。

1. 在【本地资源库】中搜索你想要的音频资源或者在【游戏功能对象】栏中找到【音效】

![img](https://arkimg.ark.online/1684047744628-2.webp)![img](https://arkimg.ark.online/1684047744628-3.webp)

2. 将对象拖入到【场景】中或者【对象管理器】下

![img](https://arkimg.ark.online/1684047744628-4.webp)

3. 在右侧【对象管理器】中【对象】栏找到对应的【音效】对象并进行自定义

![img](https://arkimg.ark.online/1684047744628-5.webp)![img](https://arkimg.ark.online/1684047744628-6.webp)

## 通过脚本创建：

此外通过脚本你也可以在游戏运行时通过【资源库】中的音频资源ID动态生成一个对应【音效】对象来使用。本例使用ID为“12721”的资源进行演示，你也可以在【本地资源库】中选取你喜欢的音频资源。在【工程内容】下的脚本目录中新建一个脚本文件，将下列示例代码添加到脚本的`onStart`方法中：示例代码在客户端往`asyncSpawnGameObject`接口（该接口生成的对象位置默认是在世界原点）中传入音频资源ID“12721”异步生成了一个对应的【音效对象】。为判断对象生成是否成功我们可以通过`console.log("")`去打印生成对象的guid并在【输出窗口】中的【客户端】窗口查看打印的输出。动态生成的音效对象是不会自动启用的，所以代码将`loop`属性设置为true，开启循环播放后调用`play`接口播放音效。将保存后的脚本拖入【对象管理器】中【对象】栏，运行游戏就能听到声音了。

```TypeScript
if(SystemUtil.isClient()) {
    let audio = await Core.GameObject.asyncSpawnGameObject("12721") as Gameplay.Sound;
    console.log("audio 的guid是 " + audio.guid);
    audio.loop = true;
    audio.play();
}
```

<video src="C:/Users/admin/Downloads/%E8%84%9A%E6%9C%AC%E7%94%9F%E6%88%90%E9%9F%B3%E6%95%88.mp4"></video>

此处我们也可以通过`spawnGameObject`接口生成，但是需要将对应音频资源拖入【优先加载栏】或者将音频资源进行【预加载】来保证生成后我们不需要等待音频资源下载超时而导致后续代码失效。

![img](https://arkimg.ark.online/1684047744628-7.webp)

```TypeScript
// 预加载资源，将下列代码粘贴到脚本中的onStart方法之前
@Core.Property()
preloadAssets: string = "12721"
```

::: tip

需要注意的是【音效对象】只存在于客户端，是一个单客户端游戏对象。【对象管理器】中音效对象会标明自己的网络状态。由于服务端不存在【音效对象】，在脚本中你需要在客户端才能获取和生成【音效对象】。

:::

# 自定义音效对象

【音效对象】的属性将共同决定用户享受游戏中声音的体验，例如：

- 用户听到特定音频时的音量（`volumeMultiplier`）。
- 音量维持不衰减的距离（`innerRadius`）。
- 用户感知音效衰减的最远范围（*`outerRadius`*）。
- 音频是否空间化（`spatialization`）。
- 音频完成时自动回放（`loop`）。

......

在【对象管理器】中【对象】栏找到对应的【音效对象】，选中后我们可以查看它的属性面板，通过属性面板我们可以修改【音效对象】的部分属性。如果不想在脚本中去操作【音效对象】，那么你可以在属性面板上勾选【自动启用】和【循环播放】并修改其他属性，那么当游戏运行时该【音效对象】就会自动循环播放。

![img](https://arkimg.ark.online/1684047744629-8.webp)

## 音效时长

音效时长`duration`指的是【音效对象】加载的音频资源的时长，单位是毫秒（ms），只读属性。一般用来获取音频资源的时长以便进行定时函数或者其他操作。需注意目前该属性不支持控制音频播放的速率。以下代码示例会在【输出窗口】打印音效时长：

```TypeScript
console.log("audio 的时长是 " + audio.duration);
```

## 音效播放状态

音效播放状态`playState`指的是【音效对象】当前是否在播放，是一个布尔值。true表示正在播放，false表示不在播放，只读属性。一般用来判断【音效对象】的播放状态以便进行下一步操作。以下代码示例会在【输出窗口】打印音效播放状态：

```TypeScript
console.log("audio 是否在播放 " + audio.playState);
```

## UI音效

UI音效`uiSound`决定音效对象是否是游戏UI的音效，是一个布尔值。true表示是UI音效，false表示不是UI音效，可读可写。UI音效与空间音效的区别是UI音效是2D音效，不受空间（音效空间化，音效半径）和游戏进程限制例如暂停的限制。

## 音效的衰减方式

音效的衰减方式`attenuationFunction`主要指的是音量的衰减曲线。`attenuationFunction`属性允许你决定音频如何随着用户和Sound对象之间的距离增加而衰减。将此属性设置`attenuationFunction`枚举的四个值之一。

| 衰减方式    | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| Linear      | 音量在音量内径`innerRadius`和音量外径`outerRadius`之间线性衰减。一旦用户超出音量外径`outerRadius`，音频就会静音。 |
| Logarithmic | 音量在音量内径`innerRadius`和音量外径`outerRadius`之间指数衰减。一旦用户超出音量外径`outerRadius`，音频就会静音。 |
| Inverse     | 音量在音量内径`innerRadius`和音量外径`outerRadius`之间倒数衰减。一旦用户超出音量外径`outerRadius`，音频就会静音。 |
| LogReverse  | 音量在音量内径`innerRadius`和音量外径`outerRadius`之间反指数衰减。一旦用户超出音量外径`outerRadius`，音频就会静音。 |

## 自动启用

`autoPlay`属性决定音频是否会自动启用。是一个布尔值。true表示【音效对象】会自动播放，false表示不会自动播放，可读可写。当音效设置`autoPlay`属性为true后，【音效对象】会在下一帧自动播放。以下代码示例将生成的【音效对象】设置为自动启用，并于1秒后在【输出窗口】打印音效播放状态：

```TypeScript
audio.autoPlay = true;
setTimeout(() => {
    console.log("audio 是否在播放 " + audio.playState);
}, 1000)
```

## 当前播放时长进度

当前播放时长进度`currentProgress`属性以毫秒（ms）为单位显示用户当前听到的音频资源中的位置。此属性可用于仅播放音频样本的一部分，或在音频到达特定位置时触发事件用于游戏逻辑。

## 循环播放

循环播放`loop`属性允许你在音频播放完毕后重复音频。是一个布尔值。true表示【音效对象】的音频将再次播放，false表示不循环，可读可写。该属性对于应用于背景音频BGM非常有用，可以确保游戏中不会突然静音。以下代码示例将【音效对象】设置为循环播放后调用播放接口进行即可循环播放：

```TypeScript
audio.loop = true;
audio.play();
```

## 音效空间化

音效空间化`spatialization`属性控制3D音效是否受空间范围影响。`spatialization`是一个布尔值。true表示【音效对象】是一个空间音效，false表示是一个全局音效，可读可写。该属性对UI音效无效，同时开启音效空间化是音效内径`innerRadius`和音效外径`outerRadius`两个属性生效的必要条件。

## 音效半径

::: tip

注意：外径`outerRadius`属性的值并不包含内径`innerRadius`，即外径`outerRadius`的值指的是从内径到外径之间的距离。

:::

音效内径`innerRadius`和音效外径`outerRadius`确定用户从空间音效感知音量的范围。这两个属性需要开启音效空间化`spatialization`才能生效。对于空间音效，音效内径`innerRadius`是当客户端的收听者远离【音效对象】时，音频音量开始减小的最小距离。即在音效内径以内，音量不会发生衰减。音效外径`outerRadius`属性是客户端收听者可以从听到声音的最大距离。即在音效外径以外，用户听不见声音。在音量内径`innerRadius`和音量外径`outerRadius`之间，音频音量按照音效的音量衰减方式`attenuationDistanceModel`属性进行衰减。

![img](https://arkimg.ark.online/1684047744629-9.webp)

## 音量比例

音量比例`volumeMultiplier`属性允许你将音频音量设置为0（静音）到1（音频音量）。

## 音频资源ID

【音效对象】只是一个播放音频的对象，自然可以通过音频资源ID`audioAsset`属性去设置它播放的音频。该属性是一个string类型，对应资源库中的资源ID。

```TypeScript
audio.audioAsset = "13827";
```



# 使用音效对象

## 音效的工作流程图：

![soundflow](https://arkimg.ark.online/soundflow.webp)

## 获取音效对象

在脚本中获取【音效对象】有两种方式。

### 【对象管理器】中【对象】栏下的【音效对象】：

**使用`asyncFind`接口通过【音效对象】的GUID去获取：**

1. 选中【音效对象】后右键点击【复制对象ID】获取它的GUID。此处注意区分音频资源的GUID和【音效对象】的GUID，这两个指代的不是同一个对象。

![img](https://arkimg.ark.online/1684047744629-10.webp)

1. 在脚本的`onStart`方法中添加下列代码：代码将异步查找ID对应的对象并以【音效对象】进行接收。

```TypeScript
if(SystemUtil.isClient()) {
    let audio = await Core.GameObject.asyncFind("上一步中获取的对象ID") as Gameplay.Sound;
}
```

**使用脚本挂载的方式进行获取：**


1. 将脚本挂载到【音效对象】下方，此时会弹出脚本网络状态提示，点击确认即可

![img](https://arkimg.ark.online/1684047744629-12.webp)![img](https://arkimg.ark.online/1684047744629-13.webp)

2. 在脚本的`onStart`方法中添加下列代码：代码获取脚本挂载的对象并以【音效对象】进行接收

```TypeScript
if(SystemUtil.isClient()) {
    let audio = this.gameObject as Gameplay.Sound;
}
```

### 动态生成的【音效对象】

将下列示例代码添加到脚本的`onstart`方法中：示例代码在客户端往`asyncSpawnGameObject`接口（中传入音频资源ID“12721”异步生成了一个对应的【音效对象】。

```TypeScript
if(SystemUtil.isClient()) {
    let audio = await Core.GameObject.asyncSpawnGameObject("12721") as Gameplay.Sound;
}
```

## 播放音效对象

::: tip

音效不能重复播放，如果音效处于播放状态，那么调用`play`接口是无效的。暂停或者停止后重新播放也是通过`play`接口。

:::

获取到【音效对象】之后，你可以通过`play`接口去播放音效。此外【音效对象】中提供了一个声音开始事件，这个事件会在【音效对象】每次开始播放的时候触发。你可以将其他代码逻辑加入到声音开始事件中，每次随着【音效对象】的播放执行。将下列示例代码添加到上一段获取音效对象的示例代码中：示例中我们将一个打印逻辑加入到声音开始事件中，每次播放都会在客户端【输出窗口】打印一行输出。同时我们还添加了一个按键方法，每次按下键盘“1”键，就会调用`play`接口播放音效。

```TypeScript
audio.loop = false; // 此处记得将循环播放关闭（属性面板勾选也可），以避免干扰。

audio.onSoundStarted.add(() => {
    console.log("audio " + audio.guid + " 开始播放");
});
InputUtil.onKeyDown(Type.Keys.One, () => {
    audio.play();
});
```

## 暂停音效对象

::: tip

音效不能重复暂停，如果音效处于暂停状态，那么调用`pause`接口是无效的。只有在播放的时候`pause`接口才有作用。

:::

获取到【音效对象】之后，你可以通过`pause`接口去暂停音效。此外【音效对象】中提供了一个声音暂停事件，这个事件会在【音效对象】每次暂停的时候触发。你可以将其他代码逻辑加入到声音暂停事件中，每次随着【音效对象】的暂停执行。将下列示例代码添加到上一段播放音效对象的示例代码中：示例中我们将一个打印逻辑加入到声音暂停事件中，每次暂停都会在客户端【输出窗口】打印一行输出。同时我们还添加了一个按键方法，每次按下键盘“2”键，就会调用`pause`接口暂停音效。

```TypeScript
audio.onSoundPaused.add(() => {
    console.log("audio " + audio.guid + " 暂停");
});
InputUtil.onKeyDown(Type.Keys.Two, () => {
    audio.pause();
});
```
## 停止音效对象


::: tip

音效不能重复停止，如果音效处于停止状态，那么调用`stop`接口是无效的。在播放和暂停时调用`stop`接口都会停止。

:::

获取到【音效对象】之后，你可以通过`stop`接口去停止音效。此外【音效对象】中提供了一个声音停止事件，这个事件会在【音效对象】每次停止的时候触发。你可以将其他代码逻辑加入到声音停止事件中，每次随着【音效对象】的停止执行。将下列示例代码添加到上一段暂停音效对象的示例代码中：示例中我们将一个打印逻辑加入到声音停止事件中，每次停止都会在客户端【输出窗口】打印一行输出。同时我们还添加了一个按键方法，每次按下键盘“3”键，就会调用`stop`接口停止音效。

```TypeScript
 audio.onSoundFinished.add(() => {
    console.log("audio " + audio.guid + " 结束");
});
InputUtil.onKeyDown(Type.Keys.Three, () => {
    audio.stop();
});
```

