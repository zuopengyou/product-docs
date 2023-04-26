# 事件系统（EventSystem）

::: tip **阅读本文预计 20 分钟**

**本文概述了编辑器中，脚本之间的事件传递规则及注意事项**
::: 

## 什么是事件系统
::: tip 事件系统由派发器（Dispatcher）和监听器（Listener）构成。

主要处理**用户输入状态传递、客户端与服务器的数据传递、**以及**本地脚本之间的数据传递。**
:::

## 事件系统都包含什么
![](https://cdn.233xyx.com/athena/online/2fec4e497f7645cf9dc48fd8b17d0490_11843146.webp)
### 客户端监听器

#### 系统事件

##### 用户键盘按下事件（onKeyDown）

当用户在终端有按下操作时，系统会通知客户端事件触发

**此事件只在客户端触发**

例如当用户按下了'K'按键：

```ts
Util.InputUtil.onKeyDown(Type.Keys.K,()=>{

    console.log(`The user presses the K key`);
            
});
```

##### 用户键盘抬起事件（onKeyUp）

当用户在终端有按键抬起操作时，系统会通知客户端事件触发

**此事件只在客户端触发**

例如当用户抬起了'K'按键：

```ts
Util.InputUtil.onKeyUp(Type.Keys.K,()=>{

    console.log(`The user lifted the K key`);
            
});
```

##### 用户键盘按住事件（onKeyPress）

当用户在终端按住某个按键时，系统会通知客户端事件触发

**此事件只在客户端触发**

例如当用户按住了'K'按键：

```ts
Util.InputUtil.onKeyPress(Type.Keys.K,()=>{

    console.log(`The user holds down the K key`);
    console.log(`Current time ${Global.ElapsedTime()`);
            
});
```

#### 自定义事件

##### 来自本地事件（LocalListener）
::: tip **此事件只在本地触发**，适用于脚本间的数据传递

客户端 ---> 客户端

服务端 ---> 服务端
:::

例如当用户按下了某个按钮，在其他脚本中需要监听其事件

```ts
Events.addLocalListener("onXXXButtonClick",()=>{

    console.log(`The user pressed the XXX button`);
            
});
```

##### 来自服务端事件（ServerListener）

当服务端向客户端传递数据时，客户端可以通过此函数来监听事件

**此事件只在客户端触发**

例如当服务端通知客户端玩家升级

```ts
Events.addServerListener("LevelUp",(lv:number)=>{

    console.log(`User upgraded to level ===> ${lv}`);      

});
```

### 服务端监听器

#### 来自客户端事件（ClientListener）

当客户端向服务端传递数据时，服务器可以通过此函数来监听事件

**此事件只在服务端触发**

例如当玩家发动攻击

```ts
Events.addClientListener("Attack",(player:Gameplay.Player,skills:number)=>{

    console.log(`The player(${player.guid}) uses skill ${skills} to launch an attack.`);

});
```

#### 房间事件

##### 玩家进入房间事件（PlayerJoinedListener）

当玩家进入房间时，服务器会通知该服务端脚本

**此事件只在服务端触发**

例如服务端需要广播玩家进入房间的信息时

```ts
Events.addPlayerJoinedListener((player:Gameplay.Player)=>{

    console.log(`The player(${player.guid}) enters the room`);

});
```

##### 玩家离开房间事件（PlayerLeftListener）

当玩家离开房间时，服务器会通知该服务端脚本

**此事件只在服务端触发**

例如服务端需要广播玩家离开房间的信息时

```ts
Events.addPlayerLeftListener((player:Gameplay.Player)=>{

    console.log(`Players(${player.guid}) leave the room`);

});
```

### 客户端派发器

#### 派发事件到本地（dispatchLocal）

对应 [2.1.2 - 1](https://meta.feishu.cn/wiki/wikcnVCCqmlaOhhI3tpeuy42Hvh#EQIial)，当用户按下了某个按钮，在其他脚本中需要监听此事件

此脚本可编写如下，**此事件只能在本地派发**

```ts
Events.dispatchLocal("onXXXButtonClick");
```

#### 派发事件到服务端（dispatchToServer）

对应 [2.2.1](https://meta.feishu.cn/wiki/wikcnVCCqmlaOhhI3tpeuy42Hvh#h5CbRe)，当用户使用某技能发动了攻击，需要通知服务端进行同步

此脚本可编写如下，**此事件只能在客户端派发**

```ts
let skills:number = 6; 
Events.dispatchToServer("Attack",skills);
```

### 服务端派发器

#### 派发事件到指定客户端（dispatchToClient）

对应 [2.1.2 - 2](https://meta.feishu.cn/wiki/wikcnVCCqmlaOhhI3tpeuy42Hvh#hrruWG)，结合 [2.2.1](https://meta.feishu.cn/wiki/wikcnVCCqmlaOhhI3tpeuy42Hvh#h5CbRe)

当玩家发动攻击，服务器收到消息后需要通知玩家升级的时候

此脚本可编写如下，**此事件只能在服务端派发**

```ts
Events.addClientListener("Attack",(player:Gameplay.Player,skills:number)=>{

    console.log(`The player(${player.guid}) uses skill ${skills} to launch an attack.`);

    let level:number = 66;

    //通知player接收LevelUp事件，事件数据为level
    Events.dispatchToClient(player,"LevelUp",level);
    
});
```

#### 派发事件到房间内所有客户端（dispatchToAllRoomClient）

同上情形，若想将该玩家的升级消息同步至房间内所有客户端

此脚本可编写如下，**此事件只能在服务端派发**

```ts
Events.addClientListener("Attack",(player:Gameplay.Player,skills:number)=>{

    console.log(`The player(${player.guid}) uses skill ${skills} to launch an attack.`);

    let level:number = 66;

    //通知房间内所有玩家接收LevelUp事件，事件数据为player升级到level
    Events.dispatchToAllRoomClient("LevelUp",player,level);
    
});
```

#### 派发事件到所有客户端（dispatchToAllClient）

同上情形，若想将该玩家的升级消息同步至所有客户端

此脚本可编写如下，**此事件只能在服务端派发**

```ts
Events.addClientListener("Attack",(player:Gameplay.Player,skills:number)=>{

    console.log(`The player(${player.guid}) uses skill ${skills} to launch an attack.`);

    let level:number = 66;
    
    //通知所有玩家接收LevelUp事件，扩散范围以player为中心，事件数据为player升级到level
    Events.dispatchToAllClient(player,"LevelUp",player,level);
    
});
```

#### 派发事件到本地（dispatchLocal）

对应 [2.1.2 - 1](https://meta.feishu.cn/wiki/wikcnVCCqmlaOhhI3tpeuy42Hvh#EQIial)，**此事件只能在本地派发**

```ts
Events.dispatchLocal("eventName");
```

## 使用事件系统的注意事项与建议

### 区分脚本的运行环境（客户端 or 服务端）
::: tip 派发器与监听器有严格的运行环境要求

在相对应的运行环境执行代码才可生效

建议在使用事件系统时可在外层做脚本运行环境的判断

**this.isRunningClient()        --->        是否为客户端**

**SystemUtil.isClient()         --->        是否为客户端**

**SystemUtil.isServer()          --->        是否为服务端**
:::

### 服务端相关代码写在单独脚本中
::: tip 由于编辑器的独特性，服务端与客户端可写在同一工程文件中

为防止在同一脚本中，属性的访问会因为客户端与服务端的环境不同导致逻辑冲突

建议将服务端的代码单独写在一个脚本中，便于快速定位问题
:::
### 对象销毁后关闭监听器与派发器
::: tip 事件系统中的派发器与监听器不会根据脚本的生命周期一起销毁

建议在脚本生命周期的**onDestroy**中关闭派发器与监听器的连接
:::
示例如下：

```ts
@Core.Class
export default class TestEvents extends Core.Script {

    //声明事件数组
    myEvents = new Array<Events.EventListener>();

    //声明一个计数变量
    public temp:number;

    protected async onStart(): Promise`<void>` {

        //初始化计数变量为0
        this.temp = 0;

        //根据GUID持有cube对象
        let cube = await Core.GameObject.Find(`48A8055A40BBA143D723B19BDB2D21ED`);


        //添加本地事件监听，并将监听器对象保存到事件数组
        this.myEvents.push(Util.InputUtil.addLocalListener("TestEvent1",()=>{
            console.log("========================>");
            console.log(`this.temp ===> ${this.temp}`);
        }));

        this.myEvents.push(Util.InputUtil.onKeyDown(Type.Keys.one,()=>{
            this.temp ++;
            Events.dispatchLocal("TestEvent1");
        }));

        this.myEvents.push(Util.InputUtil.onKeyDown(Type.Keys.Two,()=>{
            cube.Destroy();
            Events.dispatchLocal("TestEvent1");
        }));
    }


    protected onDestroy(): void {

        console.log(`Into onDestroy()`);

        //在对象被销毁时，遍历所有事件对象，关闭所有事件监听
        this.myEvents.forEach(element => {
            element.disconnect();
        });
    }
}
```
