# 装备

| 修改日期           | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------ | ------ | -------- | -------------- |
| 2022 年 9 月 28 日 | 廖悦吾 | 文档创建 | 015            |
|                    |        |          |                |

<strong>阅读本文预计 10 分钟</strong>

本文概述了装备的工作机制，展示在编辑器创建并使用装备的过程和装备在游戏中的应用。教程内容包含装备功能对象的属性面板，类对象属性和接口以及一个示例工程。

# 什么是装备

装备是一个提供具有 <strong>拾取-持有-收回-丢弃 </strong>行为功能的逻辑对象。它是一个集成的行为框架，用于控制拥有装备的角色在进行上述行为时播放对应的动画，将装备放置到正确的位置。玩家可以自定义上述行为发生时角色的动作动画和放置在角色身上的位置。例如大逃杀类游戏可以将各类武器视作装备，进行拾取-持有-收回-丢弃行为。

装备在编辑器中以功能对象的形式存在，打开编辑器后在左侧资源栏中的“逻辑资源”中，选取“游戏功能对象”，红框中就是装备，资源 ID 为 2696。

![](static/boxcnQzwXIfmrjrBoja6JkfZUuc.png)

# 装备 都包含什么

### 装备的工作流程图：

### 装备包含的属性：

| 属性名                  | 描述                                               | 类型            |
| ----------------------- | -------------------------------------------------- | --------------- |
| `相对持有插槽位移`      | 后续暴露，装备对象插入持有插槽后的位置偏移         | Type.Vector     |
| `相对持有插槽旋转`      | 后续暴露，装备对象插入持有插槽后的旋转偏移         | Type.Rotation   |
| `相对收起插槽位移`      | 后续暴露，装备对象插入收起插槽后的位置偏移         | Type.Vector     |
| `相对收起插槽旋转`      | 后续暴露，装备对象插入收起插槽后的旋转偏移         | Type.Rotation   |
| autoPickup              | 如果开启，角色进入拾取触发器内时将自动拾取装备对象 | boolean         |
| autoPlayPickupAnimation | 如果开启，将自动播放拾取动画                       | boolean         |
| autoHoldEquipment       | 如果开启，当拾取动画播放完毕自动持有装备           | boolean         |
| pickupAnimation         | 拾取装备时播放的玩家角色动作                       | string          |
| unHoldAnimation         | 收起装备时玩家播放的动画                           | string          |
| holdAnimation           | 拿出装备时玩家播放的动画                           | string          |
| discardAnimation        | 丢弃装备时玩家播放的动画                           | string          |
| holdEquipmentPose       | 持有装备时玩家的角色动作姿态                       | string          |
| equipmentSocket         | 持有装备时玩家角色穿戴装备的插槽                   | string          |
| unHoldSocket            | 装备收起后玩家角色携带装备的插槽                   | string          |
| pickupTrigger           | 绑定拾取触发器                                     | string          |
| equipmentStatus         | 装备当前的状态                                     | EquipmentStatus |

### 装备包含的接口：

| 接口名           | 描述           | 作用端           | 参数                                                   | 返回类型      |
| ---------------- | -------------- | ---------------- | ------------------------------------------------------ | ------------- |
| pickupEquipment  | 拾取装备       | 调用端，自动广播 | character: CharacterBase（）<br/>autoHold: boolean（） | void          |
| holdEquipment    | 持有装备       | 调用端，自动广播 | 无                                                     | void          |
| unHoldEquipment  | 收起装备       | 调用端，自动广播 | 无                                                     | void          |
| discardEquipment | 丢弃装备       | 调用端，自动广播 | 无                                                     | void          |
| getCurrentOwner  | 获取装备所有人 | 调用端，自动广播 | 无                                                     | CharacterBase |

### 装备包含的枚举：

| 枚举            | 元素                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| EquipmentStatus | NotPickUp = 0 （未装备）<br/> PickUp = 1 （装备）<br/> Hold = 2 （持有） |

# 如何合理利用 / 使用 装备

### 在编辑器工作区中直接使用：

1. <strong>将装备拖入场景，设置它的功能属性和资源 ID。</strong>

装备对象下自带一个拾取触发器，用于自动拾取。装备对象默认静态，记住取消静态状态才能使用。取消后所有挂载的对象自动都会取消静态。

![](static/boxcn4ajIHQtvU0N4jz13G3K3Bf.png)

在装备对象下挂载想要的模型和其他对象

![](static/boxcnx5hFEFphCGaSvgGDfZ2hQc.png)

修改模型的相对位置，旋转和大小使模型表现正确。<strong>注意模型关闭碰撞</strong>

![](static/boxcnbJFtvq0uT4C8B3IHzQKvWe.png)

![](static/boxcnccyszf7a0Wf7aCw1wT0cKg.png)

设置装备的设置它的功能属性和资源 ID

![](static/boxcntkmBUlZvD5M8OulfKTa1Mf.png)

1. <strong>创建控制装备对象的脚本，可以拖入对象栏，或在取消默认静态后挂载在装备对象下</strong>

![](static/boxcn3lGtyvHUpeysFMfOuBlm9g.png)

1. <strong>在脚本中通过装备对象提供的接口对它进行控制，做出各种行为。</strong>

```
// 通过GUID异步获取对象，保证能力对象获取到后对它进行操作
MWCore.GameObject.asyncFind("84B13A57478850313C476BA894B7750B").then((obj) => {

        let equipment = obj as GamePlay.Equipment;

        Events.addLocalListener("equip", () => {
                equipment.pickupEquipment(chara, false);
        });

        Events.addLocalListener("unequip", () => {
                equipment.discardEquipment();

        });

        Events.addLocalListener("hold", () => {
                equipment.holdEquipment();

        });

        Events.addLocalListener("unhold", () => {
                equipment.unHoldEquipment();

        });
        
});
```

1. <strong>通过接口对装备进行其他操作，例如添加行为</strong><strong>回调</strong><strong>函数，当行为发生时执行相应的逻辑。修改装备属性，获取装备持有人等等；</strong>

```
// 装备拾取回调，通知本地UI打印信息
equipment.onPickupEquipmentDelegate.add(() => {
    let s = "";
    s += `当前执行的行为是拾取\n`;
    Events.dispatchLocal("delegate", s);
});

// 装备丢弃回调，通知本地UI打印信息
equipment.onDiscardEquipmentDelegate.add(() => {
    let s = "";
    s += `当前执行的行为是丢弃\n`;
    Events.dispatchLocal("delegate", s);
});

// 装备持有回调，通知本地UI打印信息
equipment.onHoldEquipmentDelegate.add(() => {
    let s = "";
    s += `当前执行的行为是拿出\n`;
    Events.dispatchLocal("delegate", s);
});

// 装备收回回调，通知本地UI打印信息
equipment.onUnHoldEquipmentDelegate.add(() => {
    let s = "";
    s += `当前执行的行为是收起\n`;
    Events.dispatchLocal("delegate", s);
});

// 修改装备属性，通知本地UI打印信息
Events.addLocalListener("change", () => {
    equipment.pickupAnimation = "14574";
    equipment.discardAnimation = "14617";
    equipment.holdAnimation = "81692";
    equipment.unHoldAnimation = "81689";
    equipment.holdEquipmentPose = "94269";
    equipment.equipmentSocket = "Left_Hand";
    equipment.unHoldSocket = "Left_Thigh";
    setTimeout(() => {
        s = "";
        s += `自动拾取${equipment.autoPickup}\n`;
        s += `自动播放拾取动画${equipment.autoPlayPickupAnimation}\n`;
        s += `自动持有${equipment.autoHoldEquipment}\n`;
        s += `拾取动画${equipment.pickupAnimation}\n`;
        s += `持有姿态${equipment.holdEquipmentPose}\n`;
        s += `收起动画${equipment.unHoldAnimation}\n`;
        s += `持有动画${equipment.holdAnimation}\n`;
        s += `丢弃动画${equipment.discardAnimation}\n`;
        s += `持有插槽${equipment.equipmentSocket}\n`;
        s += `收起插槽${equipment.unHoldSocket}\n`;
        Events.dispatchLocal("attribute", s);
    }, 500);
});

// 周期查看装备状态和持有人(getCurrentOwner()接口暂时有bug无法使用)
setInterval(() => {
    let s = "";
    s += `${equipment.equipmentStatus}\n`;
    if(equipment.getCurrentOwner()) {
        s += `${equipment.getCurrentOwner().guid}\n`
    }
    Events.dispatchLocal("status", `${equipment.equipmentStatus}`);
}, 100);
```

### 在代码中动态生成

插槽偏移的四个属性暂时未暴露，无法进行偏移设置，会导致表现不对，暂不推荐动态生成。

1. 将“能力对象”功能对象拖入优先加载栏，或者在代码中预加载能力对象的资源 ID，不然需要使用异步 Spawn 才能使用对应资源

![](static/boxcnIG0zM6GvyD8dWFeKIw1fYc.png)

```
@MWCore.MWProperty()
preloadAssets: string = "2696";
```

1. 动态 spawn 装备

```
if(GamePlay.isClient()) {
    let player = await GamePlay.asyncGetCurrentPlayer();
    let chara = player.character;

    // 通过GUID异步获取对象，保证对象获取到后对它进行操作
    MWCore.GameObject.asyncFind("2696").then((obj) => {

        let equipment = obj as GamePlay.Equipment;

        let s = "";
        s += `自动拾取${equipment.autoPickup}\n`;
        s += `自动播放拾取动画${equipment.autoPlayPickupAnimation}\n`;
        s += `自动持有${equipment.autoHoldEquipment}\n`;
        s += `拾取动画${equipment.pickupAnimation}\n`;
        s += `持有姿态${equipment.holdEquipmentPose}\n`;
        s += `收起动画${equipment.unHoldAnimation}\n`;
        s += `持有动画${equipment.holdAnimation}\n`;
        s += `丢弃动画${equipment.discardAnimation}\n`;
        s += `持有插槽${equipment.equipmentSocket}\n`;
        s += `收起插槽${equipment.unHoldSocket}\n`;
        Events.dispatchLocal("attribute", s);

        // 监听本地事件，拾取装备
        Events.addLocalListener("equip", () => {
            equipment.pickupEquipment(chara, false);
        });

        // 监听本地事件，丢弃装备
        Events.addLocalListener("unequip", () => {
            equipment.discardEquipment();

        });

        // 监听本地事件，拿出装备
        Events.addLocalListener("hold", () => {
            equipment.holdEquipment();

        });

        // 监听本地事件，收起装备
        Events.addLocalListener("unhold", () => {
            equipment.unHoldEquipment();
        });

                        
        // 装备拾取回调
        equipment.onPickupEquipmentDelegate.add(() => {
            let s = "";
            s += `当前执行的行为是拾取\n`;
            Events.dispatchLocal("delegate", s);
        });

        // 装备丢弃回调
        equipment.onDiscardEquipmentDelegate.add(() => {
            let s = "";
            s += `当前执行的行为是丢弃\n`;
            Events.dispatchLocal("delegate", s);
        });

        // 装备持有回调
        equipment.onHoldEquipmentDelegate.add(() => {
            let s = "";
            s += `当前执行的行为是拿出\n`;
            Events.dispatchLocal("delegate", s);
        });

        // 装备收回回调
        equipment.onUnHoldEquipmentDelegate.add(() => {
            let s = "";
            s += `当前执行的行为是收起\n`;
            Events.dispatchLocal("delegate", s);
        });

        // 修改装备属性
        Events.addLocalListener("change", () => {
            equipment.pickupAnimation = "14574";
            equipment.discardAnimation = "14617";
            equipment.holdAnimation = "81692";
            equipment.unHoldAnimation = "81689";
            equipment.holdEquipmentPose = "94269";
            equipment.equipmentSocket = "Left_Hand";
            equipment.unHoldSocket = "Left_Thigh";
            setTimeout(() => {
                s = "";
                s += `自动拾取${equipment.autoPickup}\n`;
                s += `自动播放拾取动画${equipment.autoPlayPickupAnimation}\n`;
                s += `自动持有${equipment.autoHoldEquipment}\n`;
                s += `拾取动画${equipment.pickupAnimation}\n`;
                s += `持有姿态${equipment.holdEquipmentPose}\n`;
                s += `收起动画${equipment.unHoldAnimation}\n`;
                s += `持有动画${equipment.holdAnimation}\n`;
                s += `丢弃动画${equipment.discardAnimation}\n`;
                s += `持有插槽${equipment.equipmentSocket}\n`;
                s += `收起插槽${equipment.unHoldSocket}\n`;
                Events.dispatchLocal("attribute", s);
            }, 500);
        });

        // 周期查看装备状态和持有人(getCurrentOwner()接口暂时有bug无法使用)
        setInterval(() => {
            let s = "";
            s += `${equipment.equipmentStatus}\n`;
            if(equipment.getCurrentOwner()) {
                s += `${equipment.getCurrentOwner().guid}\n`
            }
            Events.dispatchLocal("status", `${equipment.equipmentStatus}`);
        }, 100);

    });
}
```

```
// 普通spawn生成，没有优先加载或预加载资源则无法生成
let equipment = MWCore.GameObject.spawnGameObject("2696") as GamePlay.Equipment;
```

# 使用 装备 的注意事项与建议

1. 016 自动拾取有 bug 无法触发
2. getCurrentOwner()接口暂时有 bug 无法使用
3. 双端对象修改参数需要给延时等待同步
4. 支持单端使用，开发者可使用单端对象来避免同步延迟，自行维护同步效果

# 项目案例
