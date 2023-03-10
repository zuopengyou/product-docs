# 音效

<strong>阅读本文预计 15 分钟</strong>

在项目中使用音效可以增加游戏沉浸感，增强游戏表现。在资源库中免费搜索并使用音效。通过音效对象控制来音效的播放，停止。此外可以修改音效对象的属性来控制音效播放的效果。

# 音效对象

【音效对象】是在项目中播放音频的对象。编辑器为资源库中的每个音频资源分配一个唯一的资源 ID，你可以将它指定给一个【音效对象】来播放。你可以自定义【音效对象】的相关属性使音频资源按照预想的方式进行播放，例如将它设置为在游戏开始后自动播放。你也可以通过脚本调用 API 去播放。在【资源库】中可以搜索并使用各种免费的音频资源，将音频资源拖入场景后会自带一个对应的【音效对象】。你也可以在【游戏功能对象】栏目中找到【音效对象】。

![](static/boxcnWNk5utylw9r12irv6Fx2sc.png)

![](static/boxcnBeROIotVZU6Dsd3VLFfJTe.png)

# 创建音效对象

## 通过拖拽资源创建：

【音效对象】本身作为一个游戏对象可以存在于游戏场景中。你可以从【资源库】中将音频资源拖入【场景】或者【对象管理器】后会自动生成一个包含对应音频资源的【音效对象】。

1. 在【资源库】中搜索你想要的音频资源或者在功能对象中找到【音效对象】

![](static/boxcnVOqSGY0Ro1xRTngreNfuxc.png)

![](static/boxcnSl3AnRtbypz3aR3oC1aRTg.png)

1. 将对象拖入到场景中或者【对象管理器】下

![](static/boxcn8C5yhiwnmoW7VUNHlILdpg.png)

1. 在右侧【对象管理器】中【对象】栏找到对应的【音效对象】并进行自定义

![](static/boxcnnfp1ZlH8S2LuSeJC2rotac.png)

![](static/boxcnEq9zgni1arVWe7MPoErYQg.png)

## 通过脚本创建：

此外通过脚本你也可以在游戏运行时通过【资源库】中的音频资源 ID 动态生成一个【音效对象】来使用。本例使用 ID 为“12721”的资源进行演示，你也可以在【资源库】中选取你喜欢的音频资源。在【工程内容】下的脚本目录中新建一个脚本文件，将下列示例代码添加到脚本的 onstart 方法中：示例代码在客户端往 `asyncSpawnGameObject` 接口（该接口生成的对象位置默认是在世界原点）中传入音频资源 ID“12721”异步生成了一个对应的【音效对象】。为判断对象生成是否成功我们可以通过 `console.log("")` 去打印生成对象的 guid 并在【输出窗口】中的【客户端】窗口查看打印的输出。动态生成的音效对象是不会自动启用的，所以代码将 `loop` 属性设置为 true，开启循环播放后调用 `play` 接口播放音效。将保存后的脚本拖入【对象管理器】中【对象】栏，运行游戏就能听到声音了。

```
if(SystemUtil.isClient()) {
    let audio = await Core.GameObject.asyncSpawnGameObject("12721") as Gameplay.Sound;
    console.log("audio 的guid是 " + audio.guid);
    audio.loop = true;
    audio.play();
}
```

此处我们也可以通过 `spawnGameObject` 接口生成，但是需要将对应音频资源拖入【优先加载栏】或者将音频资源进行【预加载】来保证生成后我们不需要等待音频资源下载超时而导致后续代码失效。

![](static/boxcnSLOMTOGU5hXf7OlUKIcuWg.png)

```
// 预加载资源，将下列代码粘贴到脚本中的onStart方法之前
@Core.Property()
preloadAssets: string = "12721"
```

需要注意的是【音效对象】只存在于客户端，是一个单客户端游戏对象。【对象管理器】中音效对象会标明自己的网络状态。由于服务端不存在【音效对象】，在脚本中你需要在客户端才能获取和生成【音效对象】。

# 自定义音效对象

【音效对象】的属性将共同决定用户享受游戏中声音的体验，例如：

- 用户听到特定音频时的音量（`volumeMultiplier`）。
- 音量维持不衰减的距离（`innerRadius`）。
- 用户感知音效衰减的最远范围（<em>outerRadius</em>）。
- 音频是否空间化（`spatialization`）。
- 音频完成时自动回放（`loop`）。

......

在【对象管理器】中【对象】栏找到对应的【音效对象】，选中后我们可以查看它的属性面板，通过属性面板我们可以修改【音效对象】的部分属性。如果不想在脚本中去操作【音效对象】，那么你可以在属性面板上勾选【自动启用】和【循环播放】并修改其他属性，那么当游戏运行时该【音效对象】就会自动循环播放。

![](static/boxcn1S05OlfWWdC47A7anD9xYf.png)

## 音效时长

音效时长 `duration` 指的是【音效对象】加载的音频资源的时长，单位是毫秒（ms），只读属性。一般用来获取音频资源的时长以便进行定时函数或者其他操作。需注意目前该属性不支持控制音频播放的速率。以下代码示例会在【输出窗口】打印音效时长：

```
console.log("audio 的时长是 " + audio.duration);
```

## 音效播放状态

音效播放状态 `playState` 指的是【音效对象】当前是否在播放，是一个布尔值。true 表示正在播放，false 表示不在播放，只读属性。一般用来判断【音效对象】的播放状态以便进行下一步操作。以下代码示例会在【输出窗口】打印音效播放状态：

```
console.log("audio 是否在播放 " + audio.playState);
```

## UI 音效

UI 音效 `uiSound` 决定音效对象是否是游戏 UI 的音效，是一个布尔值。true 表示是 UI 音效，false 表示不是 UI 音效，可读可写。UI 音效与空间音效的区别是 UI 音效是 2D 音效，不受空间（音效空间化，音效半径）和游戏进程限制例如暂停的限制。

## 音效的衰减方式

音效的衰减方式 `attenuationFunction` 主要指的是音量的衰减曲线。`attenuationFunction` 属性允许你决定音频如何随着用户和 Sound 对象之间的距离增加而衰减。将此属性设置 `attenuationFunction` 枚举的四个值之一。

| 衰减方式    | 说明                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| Linear      | 音量在音量内径 `innerRadius` 和音量外径 `outerRadius` 之间线性衰减。一旦用户超出音量外径 `outerRadius`，音频就会静音。   |
| Logarithmic | 音量在音量内径 `innerRadius` 和音量外径 `outerRadius` 之间指数衰减。一旦用户超出音量外径 `outerRadius`，音频就会静音。   |
| Inverse     | 音量在音量内径 `innerRadius` 和音量外径 `outerRadius` 之间倒数衰减。一旦用户超出音量外径 `outerRadius`，音频就会静音。   |
| LogReverse  | 音量在音量内径 `innerRadius` 和音量外径 `outerRadius` 之间反指数衰减。一旦用户超出音量外径 `outerRadius`，音频就会静音。 |

## 自动启用

`autoPlay` 属性决定音频是否会自动启用。是一个布尔值。true 表示【音效对象】会自动播放，false 表示不会自动播放，可读可写。当音效设置 `autoPlay` 属性为 true 后，【音效对象】会在下一帧自动播放。以下代码示例将生成的【音效对象】设置为自动启用，并于 1 秒后在【输出窗口】打印音效播放状态：

```
audio.autoPlay = true;
setTimeout(() => {
    console.log("audio 是否在播放 " + audio.playState);
}, 1000)
```

## 当前播放时长进度

当前播放时长进度 `currentProgress` 属性以毫秒（ms）为单位显示用户当前听到的音频资源中的位置。此属性可用于仅播放音频样本的一部分，或在音频到达特定位置时触发事件用于游戏逻辑。

## 循环播放

循环播放 `loop` 属性允许你在音频播放完毕后重复音频。是一个布尔值。true 表示【音效对象】的音频将再次播放，false 表示不循环，可读可写。该属性对于应用于背景音频 BGM 非常有用，可以确保游戏中不会突然静音。以下代码示例将【音效对象】设置为循环播放后调用播放接口进行即可循环播放：

```
audio.loop = true;
audio.play();
```

## 音效空间化

音效空间化 `spatialization` 属性控制 3D 音效是否受空间范围影响。`spatialization` 是一个布尔值。true 表示【音效对象】是一个空间音效，false 表示是一个全局音效，可读可写。该属性对 UI 音效无效，同时开启音效空间化是音效内径 `innerRadius` 和音效外径 `outerRadius` 两个属性生效的必要条件。

## 音效半径

注意：外径 `outerRadius` 属性的值并不包含内径 `innerRadius`，即外径 `outerRadius` 的值指的是从内径到外径之间的距离。

音效内径 `innerRadius` 和音效外径 `outerRadius` 确定用户从空间音效感知音量的范围。这两个属性需要开启音效空间化 `spatialization` 才能生效。对于空间音效，音效内径 `innerRadius` 是当客户端的收听者远离【音效对象】时，音频音量开始减小的最小距离。即在音效内径以内，音量不会发生衰减。音效外径 `outerRadius` 属性是客户端收听者可以从听到声音的最大距离。即在音效外径以外，用户听不见声音。在音量内径 `innerRadius` 和音量外径 `outerRadius` 之间，音频音量按照音效的音量衰减方式 `attenuationDistanceModel` 属性进行衰减。

![](static/boxcnNLj7pztQvgplUYAmABi3Nd.png)

## 音量比例

音量比例 `volumeMultiplier` 属性允许你将音频音量设置为 0（静音）到 1（音频音量）。

## 音频资源 ID

【音效对象】只是一个播放音频的对象，自然可以通过音频资源 ID `audioAsset` 属性去设置它播放的音频。该属性是一个 string 类型，对应资源库中的资源 ID。

```
audio.audioAsset = "13827";
```

<strong>更多属性请见：</strong>

# 操控音效对象

## 音效的工作流程图：

## 获取音效对象

在脚本中获取【音效对象】有两种方式。

### 【对象管理器】中【对象】栏下的【音效对象】：

<strong>使用</strong><strong>asyncFind</strong><strong>接口通过【音效对象】的 GUID 去获取：</strong>

1. 选中【音效对象】后右键点击【复制对象 ID】获取它的 GUID。此处注意区分音频资源的 GUID 和【音效对象】的 GUID，这两个指代的不是同一个对象。

![](static/boxcnFZ5H2P2F4ka5V3HjfY0CAe.png)

1. 在脚本的 onStart 方法中添加下列代码：代码将异步查找 ID 对应的对象并以【音效对象】进行接收。

```
if(SystemUtil.isClient()) {
    let audio = await Core.GameObject.asyncFind("上一步中获取的对象ID") as Gameplay.Sound;
}
```

<strong>使用脚本挂载的方式进行获取：</strong>

1. 选中【音效对象】，在属性面板中将静态状态取消

![](static/boxcnZeqpEyAQeTftWBvgKNiiHf.png)

1. 将脚本挂载到【音效对象】下方，此时会弹出脚本网络状态提示，点击确认即可

![](static/boxcnS7tNpbmrXbOwNrCapLqAYb.png)

![](static/boxcn8gvExoOHQthSHdplfu4cCe.png)

1. 在脚本的 onStart 方法中添加下列代码：代码获取脚本挂载的对象并以【音效对象】进行接收

```
if(SystemUtil.isClient()) {
    let audio = this.gameObject as Gameplay.Sound;
}
```

### 动态生成的【音效对象】

将下列示例代码添加到脚本的 onstart 方法中：示例代码在客户端往 `asyncSpawnGameObject` 接口（中传入音频资源 ID“12721”异步生成了一个对应的【音效对象】。

```
if(SystemUtil.isClient()) {
    let audio = await Core.GameObject.asyncSpawnGameObject("12721") as Gameplay.Sound;
}
```

## 播放音效对象

音效不能重复播放，如果音效处于播放状态，那么调用 `play` 接口是无效的。暂停或者停止后重新播放也是通过 `play` 接口。

获取到【音效对象】之后，你可以通过 `play` 接口去播放音效。此外【音效对象】中提供了一个声音开始事件，这个事件会在【音效对象】每次开始播放的时候触发。你可以将其他代码逻辑加入到声音开始事件中，每次随着【音效对象】的播放执行。将下列示例代码添加到上一段获取音效对象的示例代码中：示例中我们将一个打印逻辑加入到声音开始事件中，每次播放都会在客户端【输出窗口】打印一行输出。同时我们还添加了一个按键方法，每次按下键盘“1”键，就会调用 `play` 接口播放音效。

```
audio.loop = false; // 此处记得将循环播放关闭（属性面板勾选也可），以避免干扰。

audio.onSoundStarted.add(() => {
    console.log("audio " + audio.guid + " 开始播放");
});
InputUtil.onKeyDown(Type.Keys.One, () => {
    audio.play();
});
```

## 暂停音效对象

音效不能重复暂停，如果音效处于暂停状态，那么调用 `pause` 接口是无效的。只有在播放的时候 `pause` 接口才有作用。

获取到【音效对象】之后，你可以通过 `pause` 接口去暂停音效。此外【音效对象】中提供了一个声音暂停事件，这个事件会在【音效对象】每次暂停的时候触发。你可以将其他代码逻辑加入到声音暂停事件中，每次随着【音效对象】的暂停执行。将下列示例代码添加到上一段播放音效对象的示例代码中：示例中我们将一个打印逻辑加入到声音暂停事件中，每次暂停都会在客户端【输出窗口】打印一行输出。同时我们还添加了一个按键方法，每次按下键盘“2”键，就会调用 `pause` 接口暂停音效。

```
audio.onSoundPaused.add(() => {
    console.log("audio " + audio.guid + " 暂停");
});
InputUtil.onKeyDown(Type.Keys.Two, () => {
    audio.pause();
});
```

## <em>停止音效对象</em>

音效不能重复停止，如果音效处于停止状态，那么调用 `stop` 接口是无效的。在播放和暂停时调用 `stop` 接口都会停止。

获取到【音效对象】之后，你可以通过 `stop` 接口去停止音效。此外【音效对象】中提供了一个声音停止事件，这个事件会在【音效对象】每次停止的时候触发。你可以将其他代码逻辑加入到声音停止事件中，每次随着【音效对象】的停止执行。将下列示例代码添加到上一段暂停音效对象的示例代码中：示例中我们将一个打印逻辑加入到声音停止事件中，每次停止都会在客户端【输出窗口】打印一行输出。同时我们还添加了一个按键方法，每次按下键盘“3”键，就会调用 `stop` 接口停止音效。

```
audio.onSoundFinished.add(() => {
    console.log("audio " + audio.guid + " 结束");
});
InputUtil.onKeyDown(Type.Keys.Three, () => {
    audio.stop();
});
```

<strong>更多</strong><strong>API</strong><strong>详细信息请见：</strong>

# 项目案例
