# 寻路系统
::: tip **阅读本文预计 10 分钟**
**本文概述了如何在编辑器中,使用寻路区域功能对象实现角色自动寻路的效果.**
:::


## 什么是寻路系统

> 寻路系统包含了寻路区域功能对象和动态寻路功能，在关卡中通过寻路区域功能对象绘制出一个可供角色或人形对象按自定义要求进行移动行为的区域，并可以通过动态寻路在游戏运行时修改可通行的区域范围。



## 如何使用寻路区域

- **step.1**

在编辑器左侧【游戏功能对象】选项中,找到【寻路区域】,拖拽到主视口,即可完成创建.

编辑器主视口中绿色区域部分为可自动导航区域,通过右上方显示菜单功能,可打开/关闭主视口寻路区域的显示与隐藏.

![](https://wstatic-a1.233leyuan.com/productdocs/static/PZgnbl4mzoWsHpxBWYicEYJNnbd.png)

- **step.2**

寻路区域被创建后，会自动分配到对象列表中的寻路区域分组内，通过属性面板可以修改寻路区域属性，使用相对缩放属性来改变寻路区域的大小。
::: warning **Precautions**
**建议每个场景中的寻路区域范围保持在2100 * 2100 * 100以内,防止因寻路区域过大会造成寻路区域失效的情况.**
:::

::: danger **Deprecated**
**请勿修改寻路区域的相关旋转属性,以免出现寻路计算异常情况.**
:::
![](https://wstatic-a1.233leyuan.com/productdocs/static/In9abyKeuoWuwjx9DpOcDBApnKe.png)

- **step.3**

寻路区域可以进行高度判断，需要向高处寻路时，请调整 Z 轴缩放属性。
![](https://wstatic-a1.233leyuan.com/productdocs/static/MrwjbXr7toOajQxaeV1cp0ewnJd.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/Me8bbtk4BotxKixyR8CcA2tCnQc.png)


- **step.4**

寻路区域对象在属性面板中新增寻路设置参数，可以通过调节参数来改变寻路区域计算结果。

设置参数以需要使用寻路功能的对象为参照，比如默认大小的角色或 NPC 使用寻路时，寻路参数可以直接使用默认值，以保证角色或 NPC 对象导航时不会被阻挡。如果是体形较大或较小的对象使用寻路，可以适当调整胶囊半径、高度等参数，使寻路区域计算更加精准。

![](https://wstatic-a1.233leyuan.com/productdocs/static/GC9EbbWEWosIKexg5CYc8NOYnkc.png)

- **使用技巧**
根据场景的实际使用环境,寻路区域参数,可以让寻路效果更加平滑.例如适当增大胶囊体半径参数，可以让角色在转角导航时更新平滑,避免贴紧墙壁移动的现象.


## 如何让主角（Player）使用寻路功能向目标位置移动

- **step.5**

创建一个寻路区域【参见**如何使用寻路区域**】

- **step.6**

创建一个脚本，使用 moveTo()方法控制角色进行自动寻路

```ts
@Core.Class
export default class PlayerMoveTo extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {

        let player = await Gameplay.asyncGetCurrentPlayer();
        let loc = new Type.Vector(0, 2020, 350);  //设定一个目标点
        
        //moveTo()可以让角色、NPC、载具或者普通对象向一个指定的目标位置进行自动寻路
        InputUtil.onKeyDown(Type.Keys.One, () => {
            Gameplay.moveTo(player.character, loc, 0, () => {
                console.log(`寻路成功`);
            }, () => {
                console.log(`寻路失败`);
            });
        });

        //使用clearMoveTo()函数，可以将指定的对象停止寻路
        InputUtil.onKeyDown(Type.Keys.Two, () => {
            console.log(`停止角色寻路}`);
            Gameplay.clearMoveTo(player.character);
        });
    }
}
```
<video controls src="https://cdn.233xyx.com/athena/online/91b057aac6904312b4fbd3e6ab1540ce.mp4"></video>


## 如何让人形对象（NPC）使用寻路持续跟随目标移动

- **step.7**

创建一个寻路区域【参见**如何使用寻路区域**】

- **step.8**

在场景中创建一个NPC

![](https://wstatic-a1.233leyuan.com/productdocs/static/I4epbyRNToqjlYx9cpQcaE2vnDi.png)

- **step.9**

创建一个脚本，使用follow()方法控制NPC跟随主角进行自动寻路

```ts
@Core.Class
export default class NAV extends Core.Script {

    player:Gameplay.Player
    
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {

        let NPC =this.gameObject as Gameplay.NPC;

        if(Util.SystemUtil.isClient()){
            this.player= Gameplay.getCurrentPlayer();
        }

        //follow()可以让角色、NPC、载具或者普通对象向一个指定目标进行持续的跟随
        InputUtil.onKeyDown(Type.Keys.One,()=>{
            Gameplay.follow(NPC, this.player.character, 10, () => {
                console.log(`寻路成功`);
            }, () => {
                console.log(`寻路失败`);
            });
        })

        //开始执行跟随后，需要使用clearFollow()函数，将对象停止寻路功能
        InputUtil.onKeyDown(Type.Keys.Two, () => {
            console.log(`停止NPC跟随}`);
            Gameplay.clearFollow(NPC);
        });
    }
}
```
<video controls src="https://cdn.233xyx.com/athena/online/f77582cdade543159194004d74600a17.mp4"></video>



## 动态修改寻路数据方法

在编辑器菜单栏[设置]功能中增加了[寻路设置]属性,可以设置是否开启动态寻路功能,动态寻路开启后,可以通过游戏运行时动态修改寻路导航数据.

> 关闭动态寻路后,寻路区域数据在项目发布时即构建完成,不会在游戏启动时消耗性能.

> 开启动态寻路后,会在游戏启动时对场景中的寻路区域进行构建,场景地图越大、地形碰撞越复杂构建耗时越高.以OPPO A57 手机为例，构建 100 * 100 大小地形寻路数据，耗时约 0.3 秒；


## 动态修改寻路数据方法

- **step.10**
在[世界设置]-[寻路设置]中打开动态寻路

![](https://wstatic-a1.233leyuan.com/productdocs/static/Cly0bNOUuo8uWYxcEthcmhRGnpg.png)

- **step.11**
在场景中设置两条寻路路径，并设置目标点

![](https://cdn.233xyx.com/1683598687787_662.png)


- **step.12**
创建一个脚本，动态生成一个模型来阻挡移动路线。

```ts
@Core.Class
export default class Nav extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {

        //设置寻路目标点
        let targetLocation = new Type.Vector(1700, -650, 0);


        //接收事件，动态创建一个模型做为路障
        Events.addClientListener("Spawnroadblocks", () => {
            let roadblocks = Core.GameObject.spawn<Gameplay.Mesh>({
                guid:"7669",
                replicates:true,
                transform:new Type.Transform(new Type.Vector(400,-620,0),Type.Rotation.zero,new Type.Vector(1,5,1))
            })
        });

        //接收事件，角色开始寻路
        Events.addLocalListener("StartNavigation", () => {
            let player = Gameplay.getCurrentPlayer();
            Gameplay.moveTo(player.character, targetLocation)
        });
    }
}
```
<video controls src="https://cdn.233xyx.com/athena/online/a9c9062e89244abf8eec2d0144754231.mp4"></video>

