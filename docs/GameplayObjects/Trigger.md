# 触发器
::: info
**阅读本文预计 15 分钟**
使用【触发器】来检测某个区域范围内与其他（具备碰撞能力）游戏对象产生的交互行为（开始重叠和结束重叠），但又不会阻挡对象穿过它。当对象进出触发器产生交互行为时，会触发对应事件。用户通过使用触发器事件可以用来改变游戏逻辑。
:::
# 触发器

【触发器】对象在项目中用来检测与其他对象产生的交互行为。你可以自定义【触发器】的属性来控制检测区域的位置，大小和形状。在检测到交互行为后，触发器会触发对应交互行为的事件，通过该事件可以将对象与触发器的交互行为与游戏逻辑关联起来。此外你还可以控制触发器的开关来决定触发器是否进行检测，或者查找某个对象是否处于触发器范围内。你可以在【本地资源库】中的【游戏功能对象】栏中找到【触发器】。

![img](https://arkimg.ark.online/1684035976890-19.webp)

# 创建触发器

## 通过放置资源创建：

【触发器】本身作为一个游戏对象可以放置于游戏场景中。你可以从【本地资源库】中的【游戏功能对象】栏将【触发器】拖入【场景】或者【对象管理器】来创建对象。

1. 在【本地资源库】的【游戏功能对象】栏中找到【触发器】

![img](https://arkimg.ark.online/1684035976886-1.webp)

2. 将对象拖入到场景中或者【对象管理器】

![img](https://arkimg.ark.online/1684035976886-2.webp)

3. 在右侧【对象管理器】中【对象】栏找到对应的【触发器】对象并自定义它的属性

![img](https://arkimg.ark.online/1684035976886-3.webp)![img](https://arkimg.ark.online/1684035976886-4.webp)

## 通过脚本创建：

通过脚本你也可以在游戏运行时通过【本地资源库】中的【触发器】资源ID："Trigger" 动态生成一个【触发器】对象来使用。在【工程内容】下的脚本目录中新建一个脚本文件，将脚本拖入【对象管理器】中【对象】栏。选中脚本进行编辑，将下列示例代码替换脚本中的`onStart`方法：异步生成一个【触发器】对象，开启双端同步，位置为（300，0，50），旋转为（0，0，0），缩放倍数为（1，1，1）。打印生成【触发器】对象的guid。

```TypeScript
protected async onStart(): Promise<void> {
    if(SystemUtil.isServer()) {
        let trigger = await Core.GameObject.asyncSpawn({guid: "Trigger", replicates: true, transform: new Transform(new Type.Vector(300, 0, 50), Type.Rotation.zero, Type.Vector.one)}) as Gameplay.Trigger;
        console.log("trigger guid: " + trigger.guid);
    }
}
```

此处我们也可以通过`spawn`接口生成，但是需要将【触发器】资源拖入【优先加载栏】或者将【触发器】资源进行【预加载】来保证生成后我们不需要等待资源下载而导致后续代码失效。

![img](https://arkimg.ark.online/1684035976886-5.webp)

```TypeScript
// 预加载资源，将下列代码粘贴到脚本中的onStart方法之前
@Core.Property()
preloadAssets: string = "Trigger"
```

::: tip

【触发器】通常作为一个双端同步对象使用，即同一个触发器在所有端都存在。但是触发器检测交互行为并触发事件却是依照各自端的情况进行。所以使用【触发器】时需要注意避免事件中的委托函数重复执行。

:::

# 自定义触发器

【触发器】的属性和函数将决定检测区域的位置，旋转，大小，形状，是否生效，而委托事件将决定检测到交互行为后游戏逻辑的改变，例如：

角色进入【触发器】后触发事件：`onEnter`

角色离开【触发器】后触发：`onLeave`

【触发器】形状：`isBoxShape`和`isSphereShape`

【触发器】是否检测对象的交互行为：`setCollisionEnabled`

......

在【对象管理器】中【对象】栏找到对应的【触发器】对象，选中后我们可以查看它的属性面板，通过属性面板我们可以修改【触发器】对象的部分属性：位置，旋转，大小和形状。一般来说触发器的检测结果是为了游戏逻辑的修改而服务的，所以通常需要在脚本中去进一步使用。

![img](https://arkimg.ark.online/1684035976887-6.webp)

:::tip

【触发器】在游戏中实际上是不可见的。编辑状态下【触发器】会有辅助线和颜色填充框进行标识，我们可以动态看到【触发器】形状大小位置旋转发生的变化。运行状态下，可以按下键盘 "~" 键输入 "show Collision"命令来查看带有碰撞盒的对象，包括【触发器】。

:::

![img](https://arkimg.ark.online/1684035976887-7.webp)![img](https://arkimg.ark.online/1684035976887-8.webp)

## 触发器位置

【触发器】的位置由继承自父类`GameObject`的`worldLocation`世界位置属性和`relativeLocation`相对位置属性控制，可读可写。你可以在属性面板中修改场景中【触发器】对象的位置，也可以在代码中动态读写【触发器】对象的属性来控制它的位置。

![img](https://arkimg.ark.online/1684035976887-9.webp)

```TypeScript
if(SystemUtil.isServer()) {
    let trigger = await Core.GameObject.asyncSpawn({guid: "Trigger", replicates: true, transform: new Transform(new Type.Vector(300, 0, 50), Type.Rotation.zero, Type.Vector.one)}) as Gameplay.Trigger;
    trigger.worldLocation = new Type.Vector(300, 0, 50);
    console.log("trigger worldLocation: " + trigger.worldLocation);
}
```

## 触发器旋转

【触发器】的旋转由继承自父类`GameObject`的`worldRotation`世界旋转属性和`relativeRotation`相对旋转属性控制，可读可写。你可以在属性面板中修改场景中【触发器】对象的旋转，也可以在代码中动态读写【触发器】对象的属性来控制它的位置。

![img](https://arkimg.ark.online/1684035976887-10.webp)

```TypeScript
if(SystemUtil.isServer()) {
    let trigger = await Core.GameObject.asyncSpawn({guid: "Trigger", replicates: true, transform: new Transform(new Type.Vector(300, 0, 50), Type.Rotation.zero, Type.Vector.one)}) as Gameplay.Trigger;
    trigger.worldRotation = new Type.Rotation(45, 0, 0);
    console.log("trigger worldRotation: " + trigger.worldRotation);
}
```

## 触发器大小

【触发器】的大小可以由继承自父类`GameObject`的`worldScale`世界缩放属性和`relativeScale`相对缩放属性控制，可读可写。当【触发器】形状为盒体时，XYZ值分别表示盒体的长宽高。当【触发器】形状为球体时，XY值无效，Z值表示球体半径。此外在代码中，为了突出修改的属性对应的形状，可以使用`setBoxExtent`接口去设置盒体【触发器】的长宽高，或者使用`setSphereRadius`接口去设置球体【触发器】的半径。

![img](https://arkimg.ark.online/1684035976887-11.webp)

```TypeScript
// 通过scale属性设置触发器大小
if(SystemUtil.isServer()) {
    let trigger = await Core.GameObject.asyncSpawn({guid: "Trigger", replicates: true, transform: new Transform(new Type.Vector(300, 0, 50), Type.Rotation.zero, Type.Vector.one)}) as Gameplay.Trigger;
    trigger.worldScale = new Type.Vector(2, 2, 2);
    trigger.worldScale = new Type.Vector(300, 0, 50);
    console.log("trigger worldScale: " + trigger.worldScale);
}




// 通过接口设置触发器大小
if(SystemUtil.isServer()) {
    let trigger = await Core.GameObject.asyncSpawn({guid: "Trigger", replicates: true, transform: new Transform(new Type.Vector(300, 0, 50), Type.Rotation.zero, Type.Vector.one)}) as Gameplay.Trigger;
    if(trigger.isBoxShape) {
        trigger.setBoxExtent(new Type.Vector(300, 0, 50));
    }
    if(trigger.isSphereShape) {
        trigger.setSphereRadius(100);
    }
}
```

## 触发器形状

【触发器】有两种形状：盒体和球体。【触发器】形状可以在属性面板中进行切换。此外在代码中，你可以使用`toggleTriggerShape`接口去修改触发器的形状。`isBoxShape`接口判断【触发器】是不是盒体：true：是盒体，false：不是盒体。`isSphereShape`接口判断【触发器】是不是球体：true：是球体，false：不是球体。你可以使用不同的接口去设置触发器不同形状下的大小：`setBoxExtent`接口去设置盒体【触发器】的长宽高；`setSphereRadius`接口去设置球体【触发器】的半径。

![img](https://arkimg.ark.online/1684035976887-12.webp)

```TypeScript
if(SystemUtil.isServer()) {
    let trigger = await Core.GameObject.asyncSpawn({guid: "Trigger", replicates: true, transform: new Transform(new Type.Vector(300, 0, 50), Type.Rotation.zero, Type.Vector.one)}) as Gameplay.Trigger;
    if(trigger.isBoxShape) {
        console.log("trigger shape: Box");
    }
    if(trigger.isSphereShape) {
        console.log("trigger shape: Sphere");
    }
    
    // 切换触发器的形状
    trigger.toggleTriggerShape();
    
    if(trigger.isBoxShape) {
        console.log("trigger shape: Box");
    }
    if(trigger.isSphereShape) {
        console.log("trigger shape: Sphere");
    }
}
```

# 使用触发器

## **触发器的工作流程图：**

![image-20230514115323651](https://arkimg.ark.online/image-20230514115323651.webp)

## 获取触发器对象

### 【对象管理器】中【对象】栏下的【触发器】对象：

**使用`asyncFind`接口通过【触发器】对象的GUID去获取：**

1. 选中【触发器】对象后右键点击【复制对象ID】获取它的GUID。此处注意区分【触发器】资源的GUID和【触发器】对象的GUID。

![img](https://arkimg.ark.online/1684035976887-13.webp)

2. 将脚本拖入对象管理器下，用下列代码替换脚本中的`onStart`方法：代码将异步查找ID对应的对象以【触发器】对象进行接收。

```TypeScript
protected async onStart(): Promise<void> {
    if(SystemUtil.isServer()) {
        let trigger = await Core.GameObject.asyncFind("1619FDC3") as Gameplay.Trigger;
        console.log("trigger guid " + trigger.guid);
    }
}
```

**使用脚本挂载的方式进行获取：**


1. 将脚本挂载到【触发器】对象下方

![img](https://arkimg.ark.online/1684035976887-16.webp)

2. 在脚本的onStart方法中添加下列代码：代码获取脚本挂载的对象并以【触发器】对象进行接收

```TypeScript
let trigger = this.gameObject as Gameplay.Trigger;
```

### 动态生成的【触发器】对象：

将下列示例代码替换脚本中的`onStart`方法：示例代码在客户端往`asyncSpawn`接口（中传入【触发器】的资源ID“Trigger”异步生成了一个对应的【触发器】对象。

```TypeScript
protected async onStart(): Promise<void> {
    if(SystemUtil.isServer()) {
        let trigger = await Core.GameObject.asyncSpawn({guid: "Trigger", replicates: true, transform: new Transform(new Type.Vector(300, 0, 50), Type.Rotation.zero, Type.Vector.one)}) as Gameplay.Trigger;
        console.log("trigger guid: " + trigger.guid);
    }
}
```

## 触发器：开/关

【触发器】可以通过`setCollisionEnabled`接口控制它的开关状态。当【触发器】打开时，它会持续检测区域范围内其他（带碰撞）对象与它的交互行为。当【触发器】关闭时，触发器停止检测。在切换【触发器】开关状态时，触发器会主动检测一次交互行为：假设触发器中存在某一个对象，关闭触发器会触发一次该对象的离开事件，再次打开触发器又会触发一次该对象的进入事件。

```TypeScript
// 开启触发器
trigger.setCollisionEnabled(true);

// 关闭触发器
trigger.setCollisionEnabled(false);
```

## 触发器的事件

【触发器】有两个事件：进入事件和离去事件。获取到【触发器】对象后。我们可以通过两个事件添加委托执行的逻辑。每当一个（带碰撞）对象与触发器发生交互行为时（开始重叠和结束重叠），就会触发对应的事件并执行委托的逻辑。事件中会传出产生交互行为的对象供用户在执行的逻辑中使用。

将下列示例代码替换脚本中的`onStart`方法：示例代码在服务端往`asyncFind`接口（中传入【触发器】对象的guid异步获取了一个对应的【触发器】对象。在该【触发器】对象的进入事件中添加一个函数：如果进入的对象是角色，那么打印一行信息并将角色切换为飞行状态。在该【触发器】对象的离开事件中添加一个函数：如果离开的对象是角色，那么打印一行信息并将角色切换为行走状态。

```TypeScript
protected async onStart(): Promise<void> {
    if(SystemUtil.isServer()) {
        let trigger = await Core.GameObject.asyncFind("11E8575A") as Gameplay.Trigger;
        console.log("trigger guid: " + trigger.guid);
        trigger.onEnter.add((gameObject: Core.GameObject) => {
            if(gameObject instanceof Gameplay.Character) {
                let chara = gameObject as Gameplay.Character;
                console.log("enter chara name " + chara.characterName);
                chara.switchToFlying();
            }
        });

        trigger.onLeave.add((gameObject: Core.GameObject) => {
            if(gameObject instanceof Gameplay.Character) {
                let chara = gameObject as Gameplay.Character;
                console.log("leave chara name " + chara.characterName);
                chara.switchToWalking();
            }
        });
    }
}
```

![img](https://arkimg.ark.online/1684035976887-17.gif)

由于是在服务端触发器添加的事件，所以委托的函数逻辑执行在服务端，我们在【输出窗口】的【服务端】中可以看到打印信息的结果：

![img](https://arkimg.ark.online/1684035976887-18.webp)
