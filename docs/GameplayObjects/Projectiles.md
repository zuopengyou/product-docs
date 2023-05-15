# 投掷物
::: info
**阅读本文预计 10 分钟**

在项目中我们经常需要让对象在空中进行轨迹运动（抛物线或直线）并撞击其他对象。在诸如子弹，飞镖，高尔夫球等应用场景中，拟真的运动轨迹和撞击效果可以增强游戏的表现力。【投掷物】可以帮助你实现上述功能。通过【投掷物】来控制运动的状态。此外可以修改【投掷物】的属性来实现不同的运动轨迹。
:::

# 投掷物对象

【投掷物】投掷物是一种功能对象，它以抛物线或直线轨迹在空中移动并撞击其他物体。玩家可以自定义【投掷物】的参数来自定义运动的轨迹。在撞击到其它物体之后，【投掷物】会触发对应的事件，通过该事件可以获取投掷物击中对象以及击中结果，例如撞击点和该点的表面法线等。此外你还可以控制【投掷物】运动的生命周期。你可以在【本地资源库】中的【游戏功能对象】栏中找到【投掷物】。

![img](https://arkimg.ark.online/1684047067240-14.webp)

# 创建投掷物

## 通过放置资源创建：

【投掷物】本身作为一个游戏对象可以放置于游戏场景中。你可以从【本地资源库】中的【游戏功能对象】栏将【投掷物】拖入【场景】或者【对象管理器】来创建对象。

1. 在【本地资源库】的【游戏功能对象】栏中找到【投掷物】

![img](https://arkimg.ark.online/1684047067238-1.webp)

2. 将对象拖入到场景中或者【对象管理器】

![img](https://arkimg.ark.online/1684047067238-2.webp)

3. 在右侧【对象管理器】中【对象】栏找到对应的【投掷物】对象并自定义它的属性

![img](https://arkimg.ark.online/1684047067238-3.webp)![img](https://arkimg.ark.online/1684047067238-4.webp)

## 通过脚本创建：

通过脚本你也可以在游戏运行时通过【本地资源库】中的【投掷物】资源ID："Projectile" 动态生成一个【投掷物】对象来使用。在【工程内容】下的脚本目录中新建一个脚本文件，将脚本拖入【对象管理器】中【对象】栏。选中脚本进行编辑，将下列示例代码替换脚本中的`onStart`方法：异步生成一个【投掷物】对象，开启双端同步，位置为（300，0，50），旋转为（0，0，0），缩放倍数为（1，1，1）。打印生成【投掷物】对象的guid。

```TypeScript
protected async onStart(): Promise<void> {
    if(SystemUtil.isServer()) {
        let trigger = await Core.GameObject.asyncSpawn({guid: "Projectile", replicates: true, transform: new Transform(new Type.Vector(300, 0, 50), Type.Rotation.zero, Type.Vector.one)}) as Gameplay.Trigger;
        console.log("trigger guid: " + trigger.guid);
    }
}
```

此处我们也可以通过`spawn`接口生成，但是需要将【投掷物】资源拖入【优先加载栏】或者将【投掷物】资源进行【预加载】来保证生成后我们不需要等待资源下载而导致后续代码失效。

![img](https://arkimg.ark.online/1684047067238-5.webp)

```TypeScript
// 预加载资源，将下列代码粘贴到脚本中的onStart方法之前
@Core.Property()
preloadAssets: string = "Projectile"
```
::: tip
【投掷物】根据是否开启物理来决定它能不能撞击其他物体，两种情况触发的事件也不一样。
:::
# 自定义投掷物

【投掷物】的属性和API将决定运动轨迹的形状，长度，碰撞范围，而委托事件能方便用户在具体的时间点执行对应的操作，例如：

【投掷物】碰撞后触发事件：`onProjectileHit`

【投掷物】开始重叠后触发事件：`onProjectileBeginOverlap`

【投掷物】形状：`collisionLength`和`collisionRadius`

【投掷物】初始速度：`initialSpeed`

......

在【对象管理器】中【对象】栏找到对应的【投掷物】对象，选中后我们可以查看它的属性面板，通过属性面板我们可以修改它的部分属性。需要注意的是发射【投掷物】需要调用它提供的函数，编辑器修改属性主要是提前配置好它的轨迹参数，方便在脚本中直接使用。

![img](https://arkimg.ark.online/1684047067239-6.webp)

::: tip
【投掷物】在游戏中实际上是不可见的。编辑状态下【投掷物】会有辅助线进行标识，我们可以动态看到它的形状大小位置旋转发生的变化。运行状态下，可以按下键盘 "~" 键输入 "show Collision"命令来查看带有碰撞的对象，包括【投掷物】。
:::

## 投掷物发射方向

在编辑模式下【投掷物】的黄色箭头标明它发射的方向。【投掷物】对象的朝向由继承自父类`GameObject`的`worldRotation`世界旋转属性和`relativeRotation`相对旋转属性控制，可读可写。而【投掷物】对象的朝向就是它的发射方向，即【投掷物】永远朝向正前方发射。

![img](https://arkimg.ark.online/1684047067239-7.webp)![img](https://arkimg.ark.online/1684047067239-8.webp)

```TypeScript
if(SystemUtil.isServer()) {
    let projectile = await Core.GameObject.asyncSpawn({guid: "Projectile", replicates: true, transform: new Transform(new Type.Vector(300, 0, 50), Type.Rotation.zero, Type.Vector.one)}) as Gameplay.Trigger;
    projectile.worldRotation = new Type.Rotation(0, -40, 0);
    console.log("projectile worldRotation: " + projectile.worldRotation);
}
```

## 投掷物发射速度

【投掷物】的初始发射速度决定了它每帧运动的距离，单位是cm，非负。该属性可以通过属性面板去修改，或者在脚本中通过`initialSpeed`属性去修改。当投掷物开始运动后修改该值对本次运动周期无效。

```TypeScript
projectile.initialSpeed = 10000;
```

## 投掷物飞行距离

【投掷物】的飞行距离决定了它的最大运动距离（直线），单位是cm，非负。超过该距离投掷物会停止运动。该属性可以通过属性面板去修改，或者在脚本中通过`flyRange`属性去修改。当投掷物开始运动后修改该值对本次运动周期无效。此外当【投掷物】开启物理后该值不再生效。

```TypeScript
projectile.flyRange= 10000;
```

## 投掷物轨迹物理参数

【投掷物】默认状态下是关闭物理的。如果需要以抛物线轨迹运动并产生真实的碰撞效果，那么需要开启物理。在编辑器中勾选【开启投掷物物理】或者在脚本中修改`simulatePhysics`属性为true都可以开启物理。开启物理后投掷物会受重力影响，同时撞击对象后会自身会产生物理碰撞。

开启物理后与物理相关的参数都会开始生效。受重力影响`gravityScale`决定【投掷物】在运动过程中收到重力的倍数，可正可负，重力的基础值可以在【世界设置】中修改。最大弹跳`maxBounceCount`决定了【投掷物】在运动过程中最大碰撞次数，非负值。当次数到达时或者速度小于阈值时【投掷物】会停止运动。

```TypeScript
projectile.simulatePhysics = true; // 开启物理
projectile.gravityScale = 1; // 重力倍数为1
projectile.maxBounceCount = 10 // 最大弹跳10次
```

<!-- <video src="C:/Users/admin/Downloads/20230508-181739.mp4"></video> -->

## 投掷物碰撞物理参数

要想实现真实的碰撞还需要指定【投掷物】的碰撞形状大小。挂在【投掷物】下的子对象在发射后都会关闭自身的碰撞，使用【投掷物】的碰撞形状大小去检测轨迹中的其他对象。【投掷物】形状默认是一个胶囊体，当长宽相等时则是球体。碰撞包围盒长度`collisionLength`与包围盒半径`collisionRadius`决定了【投掷物】的范围。在编辑器状态下，修改属性面板可以通过辅助线看到碰撞盒的形状大小。

![img](https://arkimg.ark.online/1684047067239-9.webp)![img](https://arkimg.ark.online/1684047067239-10.webp)

# 使用投掷物

## 获取投掷物对象

### 【对象管理器】中【对象】栏下的【投掷物】对象：

**使用****`asyncFind`****接口通过【投掷物】对象的GUID去获取：**

1. 选中【投掷物】对象后右键点击【复制对象ID】获取它的GUID。此处注意区分【投掷物】资源的GUID和【投掷物】对象的GUID。

![img](https://arkimg.ark.online/1684047067239-11.webp)

2. 将脚本拖入对象管理器下，用下列代码替换脚本中的`onStart`方法：代码将异步查找ID对应的对象以【投掷物】对象进行接收。

```TypeScript
protected async onStart(): Promise<void> {
    if(SystemUtil.isServer()) {
        let projectile = await Core.GameObject.asyncFind("021739E8") as Gameplay.Projectile;
        console.log("projectile guid " + projectile.guid);
    }
}
```

**使用脚本挂载的方式进行获取：**

1. 将脚本挂载到【投掷物】对象下方

![img](https://arkimg.ark.online/1684047067239-12.webp)

2. 在脚本的onStart方法中添加下列代码：代码获取脚本挂载的对象并以【投掷物】对象进行接收

```TypeScript
let projectile = this.gameObject as Gameplay.Projectile;
```

### 动态生成的【投掷物】对象：

将下列示例代码替换脚本中的`onStart`方法：示例代码在客户端往`asyncSpawn`接口（中传入【投掷物】的资源ID“Trigger”异步生成了一个对应的【投掷物】对象。

```TypeScript
protected async onStart(): Promise<void> {
    if(SystemUtil.isServer()) {
        let projectile = await Core.GameObject.asyncSpawn({guid: "Projectile", replicates: true, transform: new Transform(new Type.Vector(300, 0, 50), Type.Rotation.zero, Type.Vector.one)}) as Gameplay.Projectile;
        console.log("projectile guid: " + projectile.guid);
    }
}
```

## 投掷物绑定玩家

使用【投掷物】前需要绑定对应的控制玩家，否则投掷物调用接口无效。绑定玩家有两种方式：`bindPlayer`函数直接绑定（双端调用）；`init`函数在客户端调用时会自动绑定当前角色；

```TypeScript
let projectile = this.gameObject as Gameplay.Projectile;
 if(SystemUtil.isClient()) {
    Gameplay.asyncGetCurrentPlayer().then((player) => {
        projectile.bindPlayer(player)
    });
}
```

## 控制投掷物

【投掷物】不能重复发射，如果【投掷物】处于运动状态，那么调用`launch`接口是无效的。暂停后可以通过`launch`接口重新发射或者通过resume接口继续运动。接口调用端会自动广播，即可以在客户端操作owner为本地玩家的投掷物。

获取到【投掷物】之后，你可以通过`launch`接口去发射。通过`pause`接口去暂停【投掷物】的运动。通过`resume`接口去继续【投掷物】的运动。将下列示例代码增加到“投掷物绑定玩家”的示例中，并添加了3个按键方法，每次按下键盘“1”键，就会调用`launch`接口发射【投掷物】。每次按下键盘“2”键，就会调用`pause`接口暂停【投掷物】运动。每次按下键盘“3”键，就会调用`resume`接口继续【投掷物】运动。

```TypeScript
let projectile = this.gameObject as Gameplay.Projectile;
 if(SystemUtil.isClient()) {
    Gameplay.asyncGetCurrentPlayer().then((player) => {
        projectile.bindPlayer(player)
    });
    
    InputUtil.onKeyDown(Type.Keys.One, () => {
        this.projectile.launch()  
    });
    
    InputUtil.onKeyDown(Type.Keys.Two, () => {
        this.projectile.pause()
    });

    InputUtil.onKeyDown(Type.Keys.Three, () => {
        this.projectile.resume()
    });
}
```

<!-- <video src="C:/Users/admin/Downloads/20230509-155425.mp4"></video> -->

## 投掷物的委托事件

【投掷物】有5个事件：击中事件、弹跳事件、开始重叠事件、结束重叠事件、终止事件。获取到【投掷物】对象后。我们可以通过这5个事件添加委托执行的逻辑。需注意的是这5个委托事件并不同时生效。当【投掷物】没有开启物理时，由于此时【投掷物】没有碰撞能力，你可以通过开始重叠事件、结束重叠事件来判断【投掷物】是否撞到了其他对象（但不会有碰撞效果，除非你自己实现）。当【投掷物】开启物理时开始重叠事件、结束重叠事件就失效了，转而应用击中事件、弹跳事件。终止事件是共用的，当【投掷物】自动终止时触发。

- 击中事件传出参数：击中的物体、击中平面的法向量和碰撞详细信息。
- 弹跳事件传出参数：碰撞详细信息、碰撞速度和当前弹跳次数。
- 开始重叠事件传出参数：击中的物体、物理场景信息的下标、是否通过 Sweep 扫描和碰撞详细信息。
- 结束重叠事件传出参数：击中的物体和物理场景信息的下标。
- 终止事件传出参数：无。

用户通过往委托事件中添加对应函数可以在【投掷物】运动的时间点执行游戏逻辑。将下列示例代码替换脚本中的`onStart`方法：示例代码获取脚本挂载的【投掷物】对象。在该【投掷物】对象的击中事件、弹跳事件、开始重叠事件、结束重叠事件和终止事件中各添加一个函数：打印一行信息。

```TypeScript
protected onStart(): void {
    this.projectile = this.gameObject as Gameplay.Projectile;
    this.projectile.onProjectileBeginOverlap.add(() => {
        console.log("onProjectileBeginOverlap");
    });
    this.projectile.onProjectileBounce.add(() => {
        console.log("onProjectileBounce");
    });
    this.projectile.onProjectileEndOverlap.add(() => {
        console.log("onProjectileEndOverlap");
    });
    this.projectile.onProjectileHit.add(() => {
        console.log("onProjectileHit");
    });
    this.projectile.onProjectileInterrupt.add(() => {
        console.log("onProjectileInterrupt");
    });
}
```

![img](https://arkimg.ark.online/1684047067239-13.webp)

::: tip

委托事件不会同步，所以服务端添加的函数只会在服务端执行，客户端添加的函数只会在客户端执行。击中事件早于弹跳事件，开始重叠事件早于结束重叠事件。

:::
