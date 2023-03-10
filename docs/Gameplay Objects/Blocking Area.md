# 禁行区

| 修改日期           | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------ | ------ | -------- | -------------- |
| 2022 年 9 月 28 日 | 廖悦吾 | 文档创建 | 015            |
|                    |        |          |                |

<strong>阅读本文预计 10 分钟</strong>

本文概述了禁行区的工作机制，展示在编辑器创建并使用禁行区的过程和禁行区在游戏中的应用。教程内容包含禁行区功能对象的属性面板，类对象属性和接口以及一个示例工程。

# 什么是禁行区

禁行区是一个针对角色对象进行碰撞判定的区域。禁行区可以阻挡玩家角色进入，限制玩家角色的活动范围。例如 moba 游戏中开始时无法走出基地，或者某些地图场景需要对不同的玩家设置不同的进入权限。

禁行区在编辑器中以功能对象的形式存在，打开编辑器后在左侧资源栏中的“逻辑资源”中，选取“游戏功能对象”，红框中就是禁行区，资源 ID 为 117。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn6SQO23y9h8OiEwugoPZnaf.png)

# 禁行区 都包含什么

### 禁行区的工作流程图：

### 禁行区包含的属性：该对象无私有属性

### 禁行区包含的接口：

| 接口名                        | 描述                                                                             | 作用端 | 参数                                                             | 返回类型 |
| ----------------------------- | -------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------- | -------- |
| `setPlayerCanPass`            | 设置玩家通过该区域屏障权限                                                       | 调用端 | Target: number （玩家 ID）<br/>CanPass: boolean（是否通过）      | void     |
| `getPlayerCanPass`            | 获取玩家是否拥有通过该区域屏障权限,结果需要监听 getPlayerStateResponse()的返回值 | 调用端 | Target: number （玩家 ID）                                       | boolean  |
| `getPlayerStateResponse`      | 获取玩家是否拥有通过该区域屏障权限的响应回调,结果将赋值到传入的参数              | 调用端 | 无                                                               | unknown  |
| `blockAllPlayer`              | 让该禁行区阻挡所有玩家                                                           | 调用端 | 无                                                               | boolean  |
| `releaseAllPlayer`            | 让该禁行区可通过所有玩家                                                         | 调用端 | 无                                                               | boolean  |
| `setNonCharacterActorCanPass` | 设置非角色 Actor 的通过权限,是针对目标这一类 Actor 生效,而非单个对象             | 调用端 | targetActor: any （目标 Actor）<br/>canPass: boolean（是否通过） | void     |

# 如何合理利用 / 使用 禁行区

### 在编辑器工作区中直接使用：

1. <strong>将</strong><strong>禁行区</strong><strong>拖入场景并自定义它的位移、旋转、缩放。</strong>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnNE4bAcaxY0w5b88zKd4eDb.png)

1. <strong>创建控制禁行区的脚本，可以拖入对象栏。禁行区默认为静态，取消勾选静态状态后，脚本也可以挂在禁行区底下。</strong>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnqwDMZ5AjQfdFg4xYQa3Vdb.png)

1. 在脚本中给禁行区设置权限，操作它对角色的阻挡效果

```ts
// 通过GUID异步获取对象，保证对象获取到后对它进行操作
MWCore.GameObject.asyncFind("230F0F9745C50B66FDD9228466DB4FC3").then((obj) => {

        let block = obj as GamePlay.BlockingArea;
        
        // 监听本地事件，所有角色可通过
        Events.addLocalListener("releaseAll", () => {
                console.error("releaseAll");
                block.releaseAllPlayer();
        });

        // 监听本地事件，所有角色不可通过
        Events.addLocalListener("blockAll", () => {
                console.error("blockAll");
                block.blockAllPlayer();
        });

        // 监听本地事件，对某个角色可通过
        Events.addLocalListener("releaseOne", (charaName: string) => {
                console.error("releaseOne");
                this.releaseOne(block, charaName)
        });

        // 监听本地事件，对某个角色不可通过
        Events.addLocalListener("blockOne", (charaName: string) => {
                console.error("blockOne");
                this.blockOne(block, charaName)
                
        });
        
        // 循环获取角色通过信息
        setInterval(() => {
                this.status(block);
        }, 100);

});



// RPC函数
@MWCore.MWFunction(MWCore.MWServer)
private releaseOne(block: GamePlay.BlockingArea, charaName: string) {
    let playerArray = GamePlay.getAllPlayers();
    for(let player of playerArray) {
        if(player.character.characterName === charaName) {
            block.setPlayerCanPass(player.getPlayerID(), true);
            return;
        }
    }
}

@MWCore.MWFunction(MWCore.MWServer)
private blockOne(block: GamePlay.BlockingArea, charaName: string) {
    let playerArray = GamePlay.getAllPlayers();
    for(let player of playerArray) {
        if(player.character.characterName === charaName) {
            block.setPlayerCanPass(player.getPlayerID(), false);
            return;
        }
    }
}

@MWCore.MWFunction(MWCore.MWServer)
private status(block: GamePlay.BlockingArea) {
    block.getPlayerStateResponse();
    let playerArray = GamePlay.getAllPlayers();
    let s = "ReleaseAll不改变权限,只是不再检测\n";
    for(let player of playerArray) {
        let res = block.getPlayerCanPass(player.getPlayerID());
        if(res) {
            s += `${player.character.characterName} 可通过\n`;
        } else {
            s += `${player.character.characterName} 不可通过\n`;
        }
    }
    Events.dispatchToAllClient("status", s);
}
```

1. <strong>通过接口对禁行区进行其他操作：让投掷物也能通过（投掷物相关具体请查看投掷物文档说明）</strong>

```ts
MWCore.GameObject.asyncFind("230F0F9745C50B66FDD9228466DB4FC3").then((obj) => {
    // 监听本地事件，对投掷物可通过
    Events.addLocalListener("switchProjectileActorCanPass", () => {
    console.error("switchProjectileActorCanPass");
    this.releasePro(block, this.isPass);
    this.isPass = !this.isPass;
    });
});



MWCore.GameObject.asyncFind("D7F04A064DE1F9BB4D30839D27FDBEC1").then((obj) => {
    let pro = obj as GamePlay.Projectile;
    let loc = pro.location.clone();
    let rot = pro.rotation.clone();
    pro.onProjectileInterrupt.add(() => {
        pro.setLocationAndRotation(loc, rot);
    });

    // 监听本地事件，发射投掷物
    Events.addLocalListener("launch", () => {
        console.error("launch");
        this.launch(pro);
    });
});


//RPC函数
@MWCore.MWFunction(MWCore.MWServer)
private releasePro(block: GamePlay.BlockingArea, flag: boolean) {
    MWCore.GameObject.asyncFind("D7F04A064DE1F9BB4D30839D27FDBEC1").then((obj) => {
        let pro = obj as GamePlay.Projectile;
        block.setNonCharacterActorCanPass(pro, flag);
    });
    
}

@MWCore.MWFunction(MWCore.MWServer)
private launch(pro: GamePlay.Projectile) {
        pro.launch();
}
```

### 在代码中动态生成

1. 将禁行区功能对象拖入优先加载栏，或者在代码中预加载禁行区的资源 ID，不然需要使用异步 Spawn 才能使用对应资源

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnHv4zRfb3z9u40RvJMOhLWg.png)

```ts
@MWCore.MWProperty()
preloadAssets: string = "117";
```

1. 动态 spawn 禁行区后通过与上述代码一样对它进行操作

```ts
// 异步spawn，没有找到资源时会下载后在生成
MWCore.GameObject.asyncSpawnGameObject("117").then((obj) => {
    let block = obj as GamePlay.BlockingArea;
}
```

```ts
// 普通spawn生成，没有优先加载或预加载资源则无法生成
let block = MWCore.GameObject.spawnGameObject("117") as GamePlay.BlockingArea;
```

# 使用 禁行区 的注意事项与建议

1. 禁行区不支持单端使用，因为双端角色位置无法同步
2. getPlayerCanPass 接口暂时无法使用
3. 不要直接将对象坐标更新至禁行区内，会引发不可预料的问题

# 项目案例
