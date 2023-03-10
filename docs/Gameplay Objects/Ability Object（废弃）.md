# 能力对象

| 修改日期           | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------ | ------ | -------- | -------------- |
| 2022 年 9 月 28 日 | 廖悦吾 | 文档创建 | 015            |
|                    |        |          |                |

<strong>阅读本文预计 10 分钟</strong>

本文概述了能力对象的工作机制，展示在编辑器创建并使用能力对象的过程和能力对象在游戏中的应用。教程内容包含能力对象功能对象的属性面板，类对象属性和接口以及一个示例工程。

# 什么是能力对象

能力对象是一个状态的序列，它用于控制角色按照设定的能力状态播放对应的动作动画。用户可以自定义每个状态的动作动画，以及每个状态下这些动作动画时的细节属性。例如游戏中角色释放一套技能可以通过能力对象进行动作序列的执行，同时精准的控制每个动作的状态以及状态中角色的移动限制。

能力对象在编辑器中以功能对象的形式存在，打开编辑器后在左侧资源栏中的“逻辑资源”中，选取“游戏功能对象”，红框中就是能力对象，资源 ID 为 21378。

![](static/boxcnyo0szQhyhr0ZFli22RQOUd.png)

# 能力对象 都包含什么

### <strong>能力对象的工作流程图：</strong>

### <strong>能力对象包含的属性：</strong>

| 属性名                  | 描述                   | 类型                                                                      |
| ----------------------- | ---------------------- | ------------------------------------------------------------------------- |
| `onAbilityStateEnter`   | 进入能力状态时发送事件 | Common.Delegate<(StateIndex: number, AbilityState: AbilityState) => void> |
| `onAbilityStateExit`    | 退出能力状态时发送事件 | Common.Delegate<(StateIndex: number, AbilityState: AbilityState) => void> |
| `onAbilityStatePause`   | 能力状态暂停时发送事件 | Common.Delegate<(StateIndex: number, AbilityState: AbilityState) => void> |
| `onAbilityStateResume`  | 能力状态继续时发送事件 | Common.Delegate<(StateIndex: number, AbilityState: AbilityState) => void> |
| `onAbilityStateChanged` | 能力状态改变时发送事件 | Common.Delegate<(AbilityState: AbilityState) => void>                     |

### <strong>能力对象包含的</strong><strong>接口</strong><strong>：</strong>

| 接口名                   | 描述                                     | 生效端                     | 参数                                   | 返回类型     |
| ------------------------ | ---------------------------------------- | -------------------------- | -------------------------------------- | ------------ |
| `bindPlayer`             | 绑定 Player，特指使用该能力对象的 Player | 客户端调用自动同步至服务端 | Player: Player（需要使用能力的角色）   | void         |
| `activate`               | 激活能力                                 | 客户端调用自动同步至服务端 | 无                                     | void         |
| `deactivate`             | 失活能力                                 | 客户端调用自动同步至服务端 | 无                                     | boolean      |
| `pause`                  | 暂停能力                                 | 客户端调用自动同步至服务端 | 无                                     | void         |
| `resume`                 | 唤醒能力                                 | 客户端调用自动同步至服务端 | 无                                     | void         |
| `switchTo`               | 跳转能力释放阶段                         | 客户端调用自动同步至服务端 | StateIndex: number（能力释放阶段序号） | void         |
| `getDuration`            | 获取能力对象执行时间                     | 调用端                     | 无                                     | number       |
| `getCurAbilityState`     | 获取能力状态                             | 调用端                     | 无                                     | AbilityState |
| `getAbilityStateByIndex` | 根据索引获取能力状态                     | 调用端                     | Index: number（能力状态序号）          | AbilityState |
| `whetherReady`           | 是否进入 Ready 状态                      | 服务器端                   | 无                                     | boolean      |

### <strong>能力对象包含的相关类：</strong>

<strong>AbilityState</strong>

AbilityState 属性

| 属性名 | 描述 | 类型 |
| ------ | ---- | ---- |

AbilityState 接口

| 接口名                  | 描述                     | 生效端     | 参数                                                           | 返回类型 |
| ----------------------- | ------------------------ | ---------- | -------------------------------------------------------------- | -------- |
| `getDuration`           | 获取释放状态当前执行时间 | 调用端生效 | 无                                                             | number   |
| `getExecuteTime`        | 获取释放状态可执行时间   | 调用端生效 | 无                                                             | number   |
| `setExecuteTime`        | 设置释放状态可执行时间   | 调用端生效 | Time: number（释放状态可执行时间）                             | void     |
| `isLoop`                | 获取释放状态是否可循环   | 调用端生效 | 无                                                             | boolean  |
| `setLoop`               | 设置动画资源是否循环     | 调用端生效 | Loop: boolean（true 或 false）                                 | void     |
| `getAnimation`          | 获取动画资源             | 调用端生效 | 无                                                             | string   |
| `setAnimation`          | 设置动画资源             | 调用端生效 | AnimGuid: string（动画资源 GUID）                              | void     |
| `addControllability`    | 添加释放状态的控制性     | 调用端生效 | ControlType: EMWSysAbilityStateControlType（技能状态控制枚举） | void     |
| `cancelControllability` | 取消释放状态的控制性     | 调用端生效 | ControlType: EMWSysAbilityStateControlType（技能状态控制枚举） | void     |
| `canMove`               | 返回是否可移动           | 调用端生效 | 无                                                             | boolean  |
| `canTurn`               | 返回是否可转向           | 调用端生效 | 无                                                             | boolean  |
| `canJump`               | 返回是否可跳跃           | 调用端生效 | 无                                                             | boolean  |

### AbilityState 枚举

| 枚举                          | 元素                                                                                                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| EMWSysAbilityStateControlType | /** 默认值 */<br/> None = 0,<br/> /** 可移动 */<br/> CanMove = 1,<br/> /** 可跳跃 */<br/> CanJump = 2,<br/> /** 可转向 */<br/> CanTurn = 4,<br/> /** Max */<br/> EMWSysAbilityStateControlType_MAX = 8 |

# 如何合理利用 / 使用 能力对象

### 在编辑器工作区中直接使用：

1. <strong>将能力对象拖入场景，增删它的状态，并自定义状态的各种属性：</strong>

释放动作： 拖入一个动画资源，表明该状态角色播放的动作动画

持续时间： 该状态的持续时间

是否循环：该状态的动作动画是否是循环播放

可移动：该状态下角色是否可以移动

可跳跃：该状态下角色是否可以跳跃

可转向：该状态下角色是否可以改变朝向

![](static/boxcnyXHHbBfEzVW7yEhGAxvsCd.png)

1. <strong>创建控制能力对象的脚本，可以拖入对象栏。能力对象默认是动态（对象机制强制同步，只有动态才能使用，关于动静态的更多含义请参照其他文档），</strong><strong>所以也可以</strong><strong>直接</strong><strong>挂在能力对象底下。</strong>

![](static/boxcnC0a5nC0RmLi5v4hzqEnppf.png)

1. <strong>在脚本中给能力对象绑定 Player 后，通过对象提供的接口对能力对象进行控制，改变它的状态。</strong>

![](static/boxcn6ZzW6WAqfCNXMz5xJ8ftZf.png)

![](static/boxcnA6ORIsfqRJ75PJqzPM3CIg.png)

```ts
// 通过GUID异步获取能力对象，保证能力对象获取到后对它进行操作
MWCore.GameObject.asyncFind("3E410E6B43BBF0DA711BEDB8257E01B0").then((obj) => {

    let ability = obj as GamePlay.AbilityObj;

    // 为该能力对象绑定Player
    this.bind(ability, player);

    // 绑定Player需要走RPC，所以需要进行延时等待
    setTimeout(() => {
        console.error("guid " + ability.whetherReady());

        // 如果能力对象准备好后派送本地消息：能力对象已准备好
        if(ability.whetherReady()) {
            Events.dispatchLocal("State", "能力对象已准备好");
        }
        
        // 收到本地消息，激活能力
        Events.addLocalListener("Activate", () => {
            
            ability.activate();
        
        });

        // 收到本地消息，失活能力
        Events.addLocalListener("Deactivate", () => {

            ability.deactivate();
            
        });

        // 收到本地消息，暂停能力
        Events.addLocalListener("Pause", () => {

            ability.pause();

        });

        // 收到本地消息，唤醒能力
        Events.addLocalListener("Resume", () => {

            ability.resume();
            
        });

        // 收到本地消息，切换能力状态
        Events.addLocalListener("SwitchTo", (index: number) => {

            ability.switchTo(index);

        });

        // 周期打印StateDetails
        setInterval(() => {
            
            let state = ability.getCurAbilityState();
            if(state != undefined) {
                let s = "";
                s += `能力状态执行时间 ${state.getDuration()}\n`;
                s += `能力状态可执行时间 ${state.getExecuteTime()}\n`;
                s += `能力状态是否可循环 ${state.isLoop()}\n`;
                s += `能力状态动画资源 ${state.getAnimation()}\n`;
                s += `能力状态可转向 ${state.canMove()}\n`;
                s += `能力状态可跳跃 ${state.canJump()}\n`;
                s += `能力状态移动控制模式 ${state.moveControlMode()}\n`;
                Events.dispatchLocal("StateDetails", s);
            }
        
        }, 100);

    }, 1000)
    
});
```

1. <strong>通过接口对</strong><strong>能力对象</strong><strong>进行其他操作</strong>

```ts
// 如果能力对象准备好后派送本地消息：能力对象已准备好, 并打印能力对象的状态数组长度

console.error("guid " + ability.whetherReady());

if(ability.whetherReady()) {
        Events.dispatchLocal("State", "能力对象已准备好");

        console.error("all ability state " + ability.getAllAbilityState().length);

}
```

![](static/boxcnLQTU189dsW6EWoEj9nig8e.png)

```ts
// 给能力对象提供的回调中绑定执行函数


// 进入触发能力状态进入时发送事件：派送本地消息：能力状态开始
ability.onAbilityStateEnter.bind((StateIndex: number, AbilityState: GamePlay.AbilityState) => {
    console.error("能力状态开始");
    let s = "";
    s += '能力状态开始\n';
    s += `能力状态序号 ${StateIndex}\n`;
    s += `能力状态执行时间 ${AbilityState.getDuration()}\n`;
    s += `能力状态可执行时间 ${AbilityState.getExecuteTime()}\n`;
    s += `能力状态是否可循环 ${AbilityState.isLoop()}\n`;
    s += `能力状态动画资源 ${AbilityState.getAnimation()}\n`;
    s += `能力状态可转向 ${AbilityState.canMove()}\n`;
    s += `能力状态可跳跃 ${AbilityState.canJump()}\n`;
    s += `能力状态移动控制模式 ${AbilityState.moveControlMode()}\n`;
    Events.dispatchLocal("State", s);
});

// 进入触发能力状态退出时发送事件：派送本地消息：能力状态退出
ability.onAbilityStateExit.bind((StateIndex: number, AbilityState: GamePlay.AbilityState) => {
    console.error("能力状态退出");
    let s = "";
    s += '能力状态退出\n';
    s += `能力状态序号 ${StateIndex}\n`;
    s += `能力状态执行时间 ${AbilityState.getDuration()}\n`;
    s += `能力状态可执行时间 ${AbilityState.getExecuteTime()}\n`;
    s += `能力状态是否可循环 ${AbilityState.isLoop()}\n`;
    s += `能力状态动画资源 ${AbilityState.getAnimation()}\n`;
    s += `能力状态可转向 ${AbilityState.canMove()}\n`;
    s += `能力状态可跳跃 ${AbilityState.canJump()}\n`;
    s += `能力状态移动控制模式 ${AbilityState.moveControlMode()}\n`;
    Events.dispatchLocal("State", s);

});

// 能力状态暂停时发送事件时：派送本地消息：能力状态暂停
ability.onAbilityStatePause.bind((StateIndex: number, AbilityState: GamePlay.AbilityState) => {
    console.error("能力状态暂停");
    let s = "";
    s += '能力状态暂停\n';
    s += `能力状态序号 ${StateIndex}\n`;
    s += `能力状态执行时间 ${AbilityState.getDuration()}\n`;
    s += `能力状态可执行时间 ${AbilityState.getExecuteTime()}\n`;
    s += `能力状态是否可循环 ${AbilityState.isLoop()}\n`;
    s += `能力状态动画资源 ${AbilityState.getAnimation()}\n`;
    s += `能力状态可转向 ${AbilityState.canMove()}\n`;
    s += `能力状态可跳跃 ${AbilityState.canJump()}\n`;
    s += `能力状态移动控制模式 ${AbilityState.moveControlMode()}\n`;

    Events.dispatchLocal("State", s);

});

// 能力状态继续时发送事件：派送本地消息：能力状态继续
ability.onAbilityStateResume.bind((StateIndex: number, AbilityState: GamePlay.AbilityState) => {
    console.error("能力状态继续");
    let s = "";
    s += '能力状态继续\n';
    s += `能力状态序号 ${StateIndex}\n`;
    s += `能力状态执行时间 ${AbilityState.getDuration()}\n`;
    s += `能力状态可执行时间 ${AbilityState.getExecuteTime()}\n`;
    s += `能力状态是否可循环 ${AbilityState.isLoop()}\n`;
    s += `能力状态动画资源 ${AbilityState.getAnimation()}\n`;
    s += `能力状态可转向 ${AbilityState.canMove()}\n`;
    s += `能力状态可跳跃 ${AbilityState.canJump()}\n`;
    s += `能力状态移动控制模式 ${AbilityState.moveControlMode()}\n`;

    Events.dispatchLocal("State", s);

});

// 能力状态改变时发送事件：派送本地消息：能力状态改变
ability.onAbilityStateChanged.bind(() => {
    console.error("能力状态改变");
    Events.dispatchLocal("State", "能力状态改变");
});
```

![](static/boxcnCR3pUKNiS4WzhLJ7JxtDHb.png)

![](static/boxcnjGIMcqLnVvBlZPKSwYMbT2.png)

```ts
// 收到本地消息，切换能力状态, 并获取状态信息打印
Events.addLocalListener("SwitchTo", (index: number) => {
    let state = ability.getAbilityStateByIndex(index);
    if(state != undefined) {
        let s = "当前SwitchTo状态为 " + index;
        s += `能力状态执行时间 ${state.getDuration()}\n`;
        s += `能力状态可执行时间 ${state.getExecuteTime()}\n`;
        s += `能力状态是否可循环 ${state.isLoop()}\n`;
        s += `能力状态动画资源 ${state.getAnimation()}\n`;
        s += `能力状态可转向 ${state.canMove()}\n`;
        s += `能力状态可跳跃 ${state.canJump()}\n`;
        s += `能力状态移动控制模式 ${state.moveControlMode()}\n`;
        Events.dispatchLocal("StateDetails", s);
    }
    ability.switchTo(index);

});

// 收到本地消息，添加能力状态， 因为资源需要提前加载，项目内支持33569（跑），33567（走），14538（爬），47765（蹲），14613（爬）
Events.addLocalListener("add", (id: string) => {

    let index = ability.addAbilityState(id, 2, true, false, false, GamePlay.MoveControlMode.null);
    

});

// 收到本地消息，移除能力状态
Events.addLocalListener("remove", (id: number) => {

    ability.removeAbilityState(id);

});
```

```ts
// 周期打印StateDetails
setInterval(() => {
    
    let state = ability.getCurAbilityState();
    if(state != undefined) {
        let s = "";
        s += `能力状态执行时间 ${state.getDuration()}\n`;
        s += `能力状态可执行时间 ${state.getExecuteTime()}\n`;
        s += `能力状态是否可循环 ${state.isLoop()}\n`;
        s += `能力状态动画资源 ${state.getAnimation()}\n`;
        s += `能力状态可转向 ${state.canMove()}\n`;
        s += `能力状态可跳跃 ${state.canJump()}\n`;
        s += `能力状态移动控制模式 ${state.moveControlMode()}\n`;
        Events.dispatchLocal("StateDetails", s);
    }

}, 100);
```

![](static/boxcn2OuAwDEFHvHcdVvwhjXQqc.png)

### 在代码中动态生成

1. 将“能力对象”功能对象拖入优先加载栏，或者在代码中预加载能力对象的资源 ID，不然需要使用异步 Spawn 才能使用对应资源

![](static/boxcnD5aiXfJSvoej7ucmqf3yRg.png)

```ts
@MWCore.MWProperty()
preloadAssets: string = "21378";
```

1. 动态 spawn 能力对象

```ts
// 异步spawn，没有找到资源时会下载后在生成
MWCore.GameObject.asyncSpawnGameObject("21378").then((obj) => {
    let ability= obj as GamePlay.AbilityObj;
    // 通过接口动态增加或移除状态，设置状态的属性

    // 收到本地消息，添加能力状态， 因为资源需要提前加载，项目内支持33569（跑），33567（走），14538（爬），47765（蹲），14613（爬）
    Events.addLocalListener("add", (id: string) => {
    
        let index = ability.addAbilityState(id, 2, true, false, false, GamePlay.MoveControlMode.null);
        
    
    });
    
    // 收到本地消息，移除能力状态
    Events.addLocalListener("remove", (id: number) => {
    
        ability.removeAbilityState(id);
    
    });
    
}
```

```ts
// 普通spawn生成，没有优先加载或预加载资源则无法生成
let ability = MWCore.GameObject.spawnGameObject("21378") as GamePlay.AbilityObj;
```

# 使用 能力对象 的注意事项与建议

1. 目前暂停，继续和状态改变 三个回调暂时无法执行
2. 能力对象需要播放角色动画，使用前需要 bindPlayer
3. bindPlayer 后需要等待时间能力对象才能进入 ready 状态，使用前需要判断是否准备好
4. 能力对象状态中的移动控制模式目前已失效
5. 状态执行时间单位是秒
6. 使用能力对象时需要提前加载动画资源或者异步使用

# 项目案例
