# 投掷物

| 修改日期           | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------ | ------ | -------- | -------------- |
| 2022 年 9 月 28 日 | 廖悦吾 | 文档创建 | 015            |
|                    |        |          |                |

<strong>阅读本文预计 10 分钟</strong>

本文概述了投掷物的工作机制，展示在编辑器创建并使用投掷物的过程和投掷物在游戏中的应用。教程内容包含投掷物功能对象的属性面板，类对象属性和接口以及一个示例工程。

# 什么是投掷物

投掷物是一个可以通过参数自行计算运动轨迹并更新位置的对象。通过自定义它需要的物理参数，我们可以得到按不同轨迹运动的对象。同时它还提供物理模拟例如反弹等来使运动轨迹更贴近现实。理论上按一定轨迹移动的物体都可以使用投掷物对象来实现，例如各类飞行道具弹药飞镖等，

投掷物在编辑器中以功能对象的形式存在，打开编辑器后在左侧资源栏中的“逻辑资源”中，选取“游戏功能对象”，红框中就是投掷物，资源 ID 为 14090。

![](static/boxcnIExYwDnwEfYUSypOPAMEId.png)

# 投掷物 都包含什么

### 投掷物的工作流程图：

### 投掷物包含的属性：

| 属性名                   | 描述                       | 类型                                                                                                                                 |
| ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| onProjectileHit          | 碰撞时执行绑定函数         | Common.MulticastDelegate<(HitActor: MWCore.GameObject, NormalImpulse: Type.Vector, HitResults: HitResult) => void>                   |
| onProjectileBounce       | 弹跳时执行绑定函数         | Common.MulticastDelegate<(ImpactResult: HitResult, ImpactVelocity: Type.Vector, BounceNum: number) => void>                          |
| onProjectileBeginOverlap | 开始接触重叠时执行绑定函数 | Common.MulticastDelegate<(HitActor: MWCore.GameObject, OtherBodyIndex: number, bFromSweep: boolean, SweepResult: HitResult) => void> |
| onProjectileEndOverlap   | 结束接触重叠时执行绑定函数 | Common.MulticastDelegate<(HitActor: MWCore.GameObject, OtherBodyIndex: number) => void>                                              |
| onProjectileInterrupt    | 自动终止时执行绑定函数     | Common.MulticastDelegate<() => void>                                                                                                 |
| initailSpeed             | 初始速度                   | number                                                                                                                               |
| collisionLength          | 包围盒高度                 | number                                                                                                                               |
| collisionRadius          | 包围盒半径                 | number                                                                                                                               |
| flyRange                 | 飞行距离                   | number                                                                                                                               |
| simulatePhysics          | 模拟物理                   | boolean                                                                                                                              |
| maxBounceCount           | 最大弹跳次数               | number                                                                                                                               |
| gravityScale             | 重力系数                   | number                                                                                                                               |

### 投掷物包含的接口：

| 接口名            | 描述                  | 作用端               | 参数                                  | 返回类型 |
| ----------------- | --------------------- | -------------------- | ------------------------------------- | -------- |
| launch            | 发射投掷物            | 调用端生效，自动广播 | 无                                    | void     |
| setDrawBoundsLine | 设置包围盒 Debug 绘制 | 客户端               | isDraw: boolean（是否绘制包围盒框线） | void     |
| resume            | 唤醒投掷物            | 调用端生效，自动广播 | 无                                    | void     |
| pause             | 暂停投掷物            | 调用端生效，自动广播 | 无                                    | void     |

# 如何合理利用 / 使用 投掷物

### 在投掷物工作区中直接使用：

1. <strong>将投掷物拖入场景，修改位置，旋转，并自定义投掷物的各种属性：</strong>

初始速度：投掷物的移动速度

飞行距离：投掷物的射程，在开启物理模拟后失效，超出停止运动

开启投掷物物理：勾选后投掷物模拟真实物理轨迹

受重力影响：重力系数

最大弹跳：最大弹跳次数，超出停止运动

碰撞宽度：胶囊体碰撞宽度

碰撞长度：胶囊体碰撞长度

![](static/boxcn5tHeGqGMreaKtTmE6Bj9Bd.png)

1. <strong>创建控制投掷物的脚本，可以拖入对象栏。投掷物默认是动态（对象机制强制同步，只有动态才能使用，关于动静态的更多含义请参照其他文档），所以可以也可以</strong><strong>直接</strong><strong>挂在投掷物底下。</strong>

![](static/boxcnQDXgmcPRfl32HmcDqIvvZd.png)

1. <strong>通过对象提供的接口对投掷物进行控制，无需 bindPlayer（接口暂未废弃）</strong>

```ts
if(GamePlay.isClient()) {
    let player = await GamePlay.asyncGetCurrentPlayer();
    let chara = player.character;

    // 通过GUID异步获取对象，保证对象获取到后对它进行操作
    MWCore.GameObject.asyncFind("F0FB76CB4974D083D6D2B4943EB2F153").then((obj) => {

        let pro = obj as GamePlay.Projectile;

        // 监听本地事件，发射投掷物
        Events.addLocalListener("launch", () => {
            console.error("launch");
            this.launch(pro); // RPC函数，在服务器执行发射
        });

        // 监听本地事件，暂停投掷物
        Events.addLocalListener("pause", () => {
            console.error("pause");
            this.pause(pro); // RPC函数，在服务器执行暂停
        });

        // 监听本地事件，重启投掷物
        Events.addLocalListener("resume", () => {
            console.error("resume");
            this.resume(pro); // RPC函数，在服务器执行重启
        });
        
    });
}
```

RPC 函数：

```ts
@MWCore.MWFunction(MWCore.MWServer)
private launch(project: GamePlay.Projectile) {
    project.launch();
}

@MWCore.MWFunction(MWCore.MWServer)
private resume(project: GamePlay.Projectile) {
    project.resume();
}

@MWCore.MWFunction(MWCore.MWServer)
private pause(project: GamePlay.Projectile) {
    project.pause();
}
```

1. <strong>通过接口对投掷物进行其他操作</strong>

```ts
// 添加开始重叠回调，控制台打印信息并通知客户端修改显示
project.onProjectileBeginOverlap.add(() => {
    console.error("BeginOverlap");
    Events.dispatchToAllClient("delegate", "BeginOverlap");
});

// 添加结束重叠回调，控制台打印信息并通知客户端修改显示
project.onProjectileEndOverlap.add(() => {
    console.error("EndOverlap");
    Events.dispatchToAllClient("delegate", "EndOverlap");

});

// 添加开始击中回调，控制台打印信息并通知客户端修改显示
project.onProjectileHit.add(() => {
    console.error("Hit");
    Events.dispatchToAllClient("delegate", "Hit");

});

// 添加开始反弹回调，控制台打印信息并通知客户端修改显示
project.onProjectileBounce.add(() => {
    console.error("Bounce");
    Events.dispatchToAllClient("delegate", "Bounce");

});

// 添加开始终止回调，控制台打印信息并通知客户端修改显示
project.onProjectileInterrupt.add(() => {
    console.error("Interrupt");
    Events.dispatchToAllClient("delegate", "Interrupt");

});
```

![](static/boxcnFq0jWnXWFGrOJRKUbh4p8d.png)

```ts
// 修改投掷物参数
project.initailSpeed = 1000;
project.collisionLength = 0.01;
project.collisionRadius = 0.01;
project.flyRange = 10000;
project.gravityScale = 0.4;
project.maxBounceCount = 3;
project.simulatePhysics = true;
```

### 在代码中动态生成

1. 将投掷物功能对象拖入优先加载栏，或者在代码中预加载投掷物的资源 ID，不然需要使用异步 Spawn 才能使用对应资源

![](static/boxcn4Aq9lpcPicJHYgG5mnA9md.png)

```ts
@MWCore.MWProperty()
preloadAssets: string = "14090";
```

1. 动态 spawn 投掷物后设置参数，添加回调，挂载对象，调用接口对它进行操作

```ts
// 动态spawn投掷物
let project = MWCore.GameObject.spawnGameObject("14090",true) as GamePlay.Projectile;

// 设置参数
project.setLocationAndRotation(new Type.Vector(200,0,10), new Type.Rotation(0, -45, 0)) 
project.setDrawBoundsLine(true); 
project.initailSpeed = 1000;
project.collisionLength = 0.01;
project.collisionRadius = 0.01;
project.flyRange = 10000;
project.gravityScale = 0.4;
project.maxBounceCount = 3;
project.simulatePhysics = this.isPhysic;
project.setCollision(Type.PropertyStatus.Off);

// 挂载对象
let mesh = MWCore.GameObject.spawnGameObject("7701",true) as GamePlay.StaticMesh;
mesh.attachToGameObject(project);
mesh.setRelativeLocation(Type.Vector.zero);
mesh.setRelativeRotation(Type.Rotation.zero);
mesh.setCollision(Type.PropertyStatus.Off);

// 添加回调
project.onProjectileBeginOverlap.add(() => {
    console.error("BeginOverlap");
    Events.dispatchToAllClient("delegate", "BeginOverlap");
});
project.onProjectileEndOverlap.add(() => {
    console.error("EndOverlap");
    Events.dispatchToAllClient("delegate", "EndOverlap");

});
project.onProjectileHit.add(() => {
    console.error("Hit");
    Events.dispatchToAllClient("delegate", "Hit");

});
project.onProjectileBounce.add(() => {
    console.error("Bounce");
    Events.dispatchToAllClient("delegate", "Bounce");

});
project.onProjectileInterrupt.add(() => {
    console.error("Interrupt");
    Events.dispatchToAllClient("delegate", "Interrupt");

});

// 调用接口
project.launch();
```

# 使用 投掷物 的注意事项与建议

1. 由于投掷物机制原因，所以不支持单端投掷物使用，挂载的对象则不做要求。推荐在服务器端进行使用，包括参数修改，回调添加和发射暂停继续操作。
2. 投掷物本身不带碰撞，挂载的子物体在发射后会重置为无碰撞。因为会与 Overlap 检测相互影响。
3. 可以重复发射一个投掷物，不过需要等它结束当前运动
4. 投掷物性能消耗较高，谨慎使用
5. 投掷物检测到有碰撞的物体都会进行反弹

# 项目案例
