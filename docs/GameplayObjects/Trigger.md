# 触发器

| 修改日期            | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------- | ------ | -------- | -------------- |
| 2022 年 9 月 28 日  | 廖悦吾 | 文档创建 | 015            |
| 2022 年 10 月 28 日 | 廖悦吾 | 文档更新 | 016            |

**阅读本文预计 10 分钟**

本文概述了触发器的工作机制，展示在编辑器创建并使用触发器的过程和触发器在游戏中的应用。教程内容包含触发器功能对象的属性面板，类对象属性和接口以及一个示例工程。

## 什么是触发器

触发器是一个具有一定形状的一块区域，它用于侦测是否有对象进入或者离开该区域，并发送事件。用户在接收到该类事件后可以进行自定义操作。例如设置一个道具触发器，玩家就可以进入该区域获取道具；设置一个沼泽区域，玩家进入后会降低移动速度；设置一个陷阱区域，玩家进入后就会持续掉血等。

触发器在编辑器中以功能对象的形式存在，打开编辑器后在左侧资源栏中的“逻辑资源”中，选取“游戏功能对象”，红框中就是触发器，资源 ID 为 113。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn98U2h8T6lwVPeEm9MD3OJf.png)

## 触发器 都包含什么

#### **触发器的工作流程图：**

#### **触发器包含的属性：**

| 属性名    | 描述           | 类型                        |
| --------- | -------------- | --------------------------- |
| `onEnter` | 进入触发器事件 | MulticastGameObjectDelegate |
| `onLeave` | 离开触发器事件 | MulticastGameObjectDelegate |

#### **触发器包含的接口****：**

| 接口名                | 描述                         | 生效端 | 参数                                                                                      | 返回类型 |
| --------------------- | ---------------------------- | ------ | ----------------------------------------------------------------------------------------- | -------- |
| `setBoxExtent`        | 设置立方体触发器大小         | 调用端 | InBoxExent: Type.Vector（盒体长宽高）<br/><br/>bUpdateOverlaps?: boolean（是否刷新 true） | void     |
| `setSphereRadius`     | 设置球形触发器大小           | 调用端 | InSphereRadius: number（球体半径）<br/><br/>bUpdateOverlaps?: boolean（是否刷新 true）    | void     |
| `inArea`              | 判断指定对象是否在触发器区域 | 调用端 | gameObject: MWCore.GameObject（需判断的对象）                                             | boolean  |
| `setCollisionEnabled` | 设置触发器是否激活           | 调用端 | bEnable: boolean（是否激活）                                                              | void     |
| `isBoxShape`          | 判断当前触发器区域是否为盒体 | 调用端 | 无                                                                                        | boolean  |
| `isSphereShape`       | 判断当前触发器区域是否为球体 | 调用端 | 无                                                                                        | boolean  |
| `toggleTriggerShape`  | 切换触发器形状               | 调用端 | 无                                                                                        | void     |

## 如何合理利用 / 使用 触发器

#### **使用场景中存在的触发器：**

1. **将触发器拖入场景并自定义它的各种属性包括父类属性：位移旋转缩放，和私有属性：形状。**

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnMtNNcbMLrPutzVqXd0QPgc.png)

1. **创建控制触发器的脚本，可以拖入对象栏，也可以挂在触发器底下。**

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnY7WoKJy706QTZ6uy0JQRRd.png)

**如果是挂在触发器底下，可能会出现提示：挂载失败，脚本无法挂载到消静态对象上，将状态修改为动态即可。关于动静态的更多含义请参照其他文档。**

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnhm5XKv85ANxZoEBU32VGRt.png)

1. **在脚本中给触发器添加 进入 & 离去 事件，当对象进入时就会执行事件中的代码。此处我执行的是在控制台打印进去离去消息，同时通知本地 UI 进行展示。**

```ts
// 如果是挂载在触发器下的脚本可以通过这个方法获取触发器
let tri = this.gameObject as GamePlay.Trigger;

tri.onEnter.add(() => {
    console.error("you enter the trigger");
    Events.dispatchLocal("message", "you enter the trigger");
});

tri.onLeave.add(() => {
    console.error("you leave the trigger");
    Events.dispatchLocal("message", "you leave the trigger");
});
```

```ts
// GUID可通过在对象栏中右键点击触发器进行复制
// 通过GUID异步获取触发器，保证触发器获取到后给触发器添加进去事件和离去事件
MWCore.GameObject.asyncFind("652787664C5BDFAE90982EB020D86EA3").then((obj) => {
    let tri = obj as GamePlay.Trigger;
    tri.onEnter.add(() => {
            console.error("you enter the trigger");
            Events.dispatchLocal("message", "you enter the trigger");
    });

    tri.onLeave.add(() => {
            console.error("you leave the trigger");
            Events.dispatchLocal("message", "you leave the trigger");
    });
}
```

1. **通过接口对触发器进行其他操作**

```ts
// 收到本地消息，重新设置触发器大小并切换触发器形状
Events.addLocalListener("ChangeShape", () => {

        tri.setBoxExtent(new Type.Vector(100, 1000, 100));

        tri.setSphereRadius(500);
        
        tri.toggleTriggerShape();

        if(tri.isBoxShape()) {
                Events.dispatchLocal("Shape", "BOX");
        }

        if(tri.isSphereShape()) {
                Events.dispatchLocal("Shape", "SPHERE");
        }

});

// 收到本地消息，切换触发器激活状态，触发器失活会使进入和离去事件不执行，但检测依然有效
Events.addLocalListener("Switch", () => {

        tri.setCollisionEnabled(flag);
        flag = !flag;

});

// 周期判断角色是否在触发器中
setInterval(() => {
        if(tri.inArea(chara)){
                Events.dispatchLocal("InArea", "在");
        } else {
                Events.dispatchLocal("InArea", "不在");
        }

}, 100);
```

#### 在代码中动态生成触发器

1. 将触发器功能对象拖入优先加载栏，或者在代码中预加载触发器的资源 ID，不然需要使用异步 Spawn 才能使用对应资源

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn3FRkXhUavdfieicZUteVKh.png)

```ts
@MWCore.MWProperty()
preloadAssets: string = "113";
```

1. 动态 spawn 触发器

```ts
// 异步spawn，没有找到资源时会下载后在生成
MWCore.GameObject.asyncSpawnGameObject("113").then((obj) => {
    let tri = obj as GamePlay.Trigger;
}
```

```ts
// 普通spawn生成，没有优先加载或预加载资源则无法生成
let tri = MWCore.GameObject.spawnGameObject("113") as GamePlay.Trigger;
```

## 使用 触发器 的注意事项与建议

1. 触发器默认拖入场景是静态
2. 触发器不可见
3. 可以按下键盘 ~ 键，输入 show Collision 命令显示碰撞来查看触发器
4. 触发器只能检测开启碰撞且开启检测的物体
5. 触发器作为对象会被射线检测等检测 api 检测到
6. 单端触发器只针对单端生效

## 项目案例
