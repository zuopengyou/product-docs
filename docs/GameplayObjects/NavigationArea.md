# 寻路系统
::: tip **阅读本文预计 10 分钟**
**本文概述了如何在编辑器中,使用寻路区域功能对象和寻路动态修饰区功能对象,实现角色自动寻路的效果.**
:::


## 什么是寻路系统

> 寻路系统包含了寻路区域功能对象和寻路动态修饰区功能对象，在关卡中通过寻路区域功能对象绘制出一个可供角色或人形对象按自定义要求进行移动行为的区域，并可以通过寻路动态修饰区功能对象在游戏运行时，动态修改可通行的区域范围。

## 寻路系统都包含什么

**寻路区域**

寻路区域功能对象作用是在场景中绘制一块供角色或人形对象进行自动导航的区域.


**寻路动态修饰区**

寻路动态修饰区功能对象作用是在可寻路区域内,创建一块可在运行时,通过脚本逻辑运态修改该区域是否可进行自动导航的区域.


## 如何使用寻路区域

- **step.1**

在编辑器左侧【游戏功能对象】选项中,找到【寻路区域】,拖拽到主视口,即可完成创建.

编辑器主视口中绿色区域部分为可自动导航区域,通过右上方显示菜单功能,可打开/关闭主视口寻路区域的显示与隐藏.

![](https://wstatic-a1.233leyuan.com/productdocs/static/PZgnbl4mzoWsHpxBWYicEYJNnbd.png)

- **step.2**

寻路区域被创建后，会自动分配到对象列表中的寻路区域分组内，通过属性面板可以修改寻路区域属性，使用相对缩放属性来改变寻路区域的大小。
::: warning **Precautions**
**建议每个场景中的寻路区域范围保持在2100*2100*100以内,防止因寻路区域过大会造成寻路区域失效的情况.**
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



## 如何使用寻路动态修饰区

在创建寻路区域后，图中可寻路的区域内有 AB 两个路口允许通行。

![](https://wstatic-a1.233leyuan.com/productdocs/static/D0D7bj8tFooxC0x6eHKct8Uknvh.png)

- **step.5**

在编辑器左侧【游戏功能对象】选项中，找到【寻路区域修饰】，拖拽到主视口，放置在 A 路口。

![](https://wstatic-a1.233leyuan.com/productdocs/static/H0twbFvexo8fF7xApFbcgE7Jn3e.png)

- **step.6**

通过修改寻路动态修改区域的类型属性，可以改变寻路区域是否允许通行。

![](https://wstatic-a1.233leyuan.com/productdocs/static/K494b51ABo7zwtxrolpc6u4Pnnd.png)

| 区域类型  | 说明 |
| --------- | ------------ |
| Null      | 无效区-会在此处绘制出一个不可通行的区域，AI 无法通过寻路功能经过该区域。<br/>![](https://wstatic-a1.233leyuan.com/productdocs/static/T933bFm9to1SYwxYukPcB8rSnRf.png) |
| Default   | 默认区-AI 可以在该区域内正常使用寻路功能。<br/>![](https://wstatic-a1.233leyuan.com/productdocs/static/HTtvbCzLooCYBmxnHPFcfckmn9d.png) |
| LowHeight | 低高度区-代表这是一个因不符合条件而无法通行的区域，可用于高度较低的区域，例如桥底、洞穴等场景，寻路区域不会在此空间内产生寻路数据。<br/><br/>![](https://wstatic-a1.233leyuan.com/productdocs/static/Fqa3bJFIvoh6wVxU4IlcJ5FGnt4.png) |
| Obstacle  | 障碍区-代表这是一个需要符合通过条件的区域，只有当前寻路区域内没有其他可行动的路线时，才会考虑经过这里。<br/><br/>当寻路区域内有多条可通往目标点的路径时，AI 会避开障碍区进行寻路。<br/>![](https://wstatic-a1.233leyuan.com/productdocs/static/NHE8bo5Ltoxxcpx08cncfmO1nob.png)<br/><br/>当寻路区域内仅有一条可通往目标点的路径时，AI 会穿过障碍区进行寻路。<br/>![](https://wstatic-a1.233leyuan.com/productdocs/static/Lp1Kb35SEoZRwdxCSBacxnoYnWd.png) |


## 如何让主角（Player）使用寻路功能向目标位置移动

- **step.7**

创建一个寻路区域【参见**如何使用寻路区域**】

- **step.8**

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

- **step.9**

创建一个寻路区域【参见**如何使用寻路区域**】

- **step.10**

在场景中创建一个NPC

![](https://wstatic-a1.233leyuan.com/productdocs/static/I4epbyRNToqjlYx9cpQcaE2vnDi.png)

- **step.11**

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

在编辑器菜单栏[设置]功能中增加了[寻路设置]属性,可以设置是否开启动态寻路功能,动态寻路开启后,可以通过脚本在游戏运行时动态设置寻路动态修饰区状态.

> 关闭动态寻路后,寻路区域数据在项目发布时即构建完成,不会在游戏启动时消耗性能.

> 开启动态寻路后,会在游戏启动时对场景中的寻路区域进行构建,场景地图越大、地形碰撞越复杂构建耗时越高.以OPPO A57 手机为例，构建 100*100 大小地形寻路数据，耗时约 0.3 秒；


## 动态修改寻路数据方法

- **step.12**
在[世界设置]-[寻路设置]中打开动态寻路

![](https://wstatic-a1.233leyuan.com/productdocs/static/Cly0bNOUuo8uWYxcEthcmhRGnpg.png)

- **step.13**
在场景中放置寻路动态修饰区对象做为路障

![](https://wstatic-a1.233leyuan.com/productdocs/static/Y836b9ftwoSFZqxQa64ccaLMn8b.png)

- **step.14**
将寻路动态修饰区属性设置为默认

![](https://wstatic-a1.233leyuan.com/productdocs/static/OxwGbuJVKoqRQDxmYCOc4fLqnSb.png)

- **step.15**
创建一个脚本，来动态控制寻路动态修饰区

```ts
@Core.Class
export default class Nav extends Core.Script {
    
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        let player = Gameplay.getCurrentPlayer();
        let targetLocation = new Type.Vector(1940, -3400, 0);

        //找到寻路动态修饰区
        let navModifierVolume = await Core.GameObject.asyncFind("3C7B1C36") as Gameplay.ModifierVolume;
        
        //找到路障装饰对象
        let og = await Core.GameObject.asyncFind("1D40B15D") as Gameplay.StaticMesh;
        //生成路障
        
        //通过UI按钮创建路障
        Events.addLocalListener("spawnNAV",()=>{
            og.setVisibility(Type.PropertyStatus.On); //显示路障外形
            og.setCollision(Type.PropertyStatus.On); //显示开启路障对象碰撞
            navModifierVolume.areaClass = Gameplay.AreaClass.Null; //将寻路动态修饰区类型设为禁用
        });

        //角色开始寻路
        Events.addLocalListener("movetoPlayer",()=>{
            Gameplay.moveTo(player.character,targetLocation)
        });
    }
}
```
<video controls src="https://cdn.233xyx.com/athena/online/b6255e7bf1374202b334dc5b97adbefd.mp4"></video>

<video controls src="https://cdn.233xyx.com/athena/online/f693e77888f64784bca31bf30a6c156a.mp4"></video>

