# 游泳区域

::: tip **阅读本文预计 10 分钟**
**本文概述了游泳区域的工作机制,展示在编辑器创建并使用游泳区域的过程和游泳区域在游戏中的应用.教程内容包含游泳区域功能对象的属性面板,类对象属性和接口以及一个示例工程.**
:::


## 什么是游泳区域

> 游泳区域是一个具有一定形状的一块区域，它用于将进入该区域的角色切换为游泳状态。开发者使用该对象在自己想要的区域实现角色游泳效果。例如场景中的游泳池，河流湖泊和海洋都可以放置游泳区域。


## 游泳区域 都包含什么



#### 游泳区域属性：

| 属性名 | 描述 |
| ------ | ---- | 
| `流体摩擦力`| 角色在游泳区域内的摩擦力，影响角色移动的速度 |

#### 游泳区域相关接口：

| 接口名   | 描述                             | 作用端 | 参数                          | 返回类型 |
| -------- | -------------------------------- | ------ | -----------------------------| -------- |
| `inArea` | 判断当前 Player 是否在游泳区域内 | 调用端 | player: Player（Player 对象） | boolean  |

## 如何创建游泳区域

### 在编辑器工作区中直接使用：

**在本地资源库中搜索[游泳区域]，找到功能对象，拖入场景并自定义它的属性包括父类属性：位移旋转缩放**

![](https://cdn.233xyx.com/1681892585794_746.png)


### 通过脚本动态创建：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let pool = Core.GameObject.spawn({
            guid:"SwimmingVolume",
            replicates:true,
            transform:new Type.Transform(Type.Vector.zero,Type.Rotation.zero,new Type.Vector(50,50,10))  //设置游泳区域的位置和大小
        });
    }
}
```

## 如何通过脚本控制角色上浮下潜

**创建控制游泳区域的脚本,拖入到对象栏游泳区域下.**

如果是挂在**游泳区域**底下,可能会出现提示：挂载失败,脚本无法挂载到消静态对象上,将游泳区域状态修改为动态即可.

![](https://cdn.233xyx.com/1681893186983_026.png)

**控制角色上浮下沉，获取角色游泳状态**

```ts
@Core.Class
export default class NewScript extends Core.Script {

    upInterval: number
    downInterval: number

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (Util.SystemUtil.isServer()) return;
        let player = Gameplay.getCurrentPlayer();
        let pool = this.gameObject as Gameplay.SwimmingVolume;

        // 周期获取角色是否在游泳
        setInterval(() => {
            let s = "";
            s += `角色是否在游泳 ${pool.inArea(player)}\n`;
            Events.dispatchLocal("status", s);
        }, 100);

        // 通过键盘方向键控制角色上浮
        InputUtil.onKeyPress(Type.Keys.Up, () => {
            this.upInterval = setInterval(() => {
                player.character.swimmingUp(10);
            }, 50);
        });

        // 终止上浮
        InputUtil.onKeyUp(Type.Keys.Up, () => {
            clearInterval(this.upInterval);
        });

        // 过键盘方向键控制角色下潜
        InputUtil.onKeyPress(Type.Keys.Down, () => {
            this.upInterval = setInterval(() => {
                player.character.swimmingDown(10);
            }, 50);
        });

        // 终止下潜
        InputUtil.onKeyUp(Type.Keys.Down, () => {
            clearInterval(this.downInterval);
        });
    }
}
```

##
