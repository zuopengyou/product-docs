# 非玩家对象

**阅读本文大概需要 20 分钟**

本文概述了非玩家对象的概念，以及他的所有基础属性，以及如何在编辑器中，如何使用非玩家对象，并通过修改非玩家对象的基础属性，制作出 NPC 的各种能力。

#### 什么是非玩家对象？

- 在角色教程的文档中，我们学习到非玩家角色，即在游戏中不受真人玩家控制的游戏角色被称为 NPC，NPC 一般是有计算机控制且具有一套行为模式的角色。那么如何制作 NPC 呢？这篇教程将会指导你制作 NPC。
- 非玩家对象将角色逻辑和形象分离，它兼有基础人形形象，高级人形形象以及多足形象。

![](static/boxcn6hgi8mTpj4jg0pfFvmeaSd.png)

- **基础人形形象**：是人形的整体形象，只能更换整体外观形象。主要用于具有一定行为的人形 NPC，适合同屏人数较多时使用。
- **高级人形形象**：是完全模拟玩家主角的形象与功能，可以与主角一样更换身体部位和装饰等。但性能方面相对与基础人形形象消耗较多，为了有效降低游戏的性能消耗，建议在同屏情况下少量使用。
- **多足形象**：是非人形的整体形象，比如四足动物的猫/狗/猪等，与基础人形形象一样只能更换整体外观形象。

#### 创建非玩家对象

##### 方式一 ：实例化非玩家对象

1.在【游戏功能对象】中的【游戏对象】列表中，找到【非玩家对象】

2.然后通过将游戏对象拖拽到场景中进行生成

3.最后在非玩家对象的属性面板中进行编辑设置。

![](static/boxcnSj89XqyVOqmYEpYDcNwdU1.png)

##### 方式二 ：动态生成非玩家对象

通过脚本挂载到对象管理器的对象中，实现动态生成非玩家对象，并且可以修改非玩家对象的属性。

示例脚本：

首先我们将触发器对象放置在场景中，然后绑定以下脚本即可实现动态创建非玩家对象

```ts
@Core.Class
export default class NewScript extends Core.Script {

    //当脚本被实例后，会在第一帧更新前调用此函数
    protected onStart(): void {
        //声明该物体为触发器
        let trigger = this.gameObject as Gameplay.Trigger;

        //角色进入触发器时，生成非玩家对象。
        trigger.onEnter.add(() => {
            let NPC = Core.GameObject.spawnGameObject("NPC") as Gameplay.NPC
            //NPC数据准备好后执行相应逻辑
            NPC.ready().then(() => {
                //非玩家对象生成位置
                let hor = Math.random() * 500 - 500;
                let ver = Math.random() * 500 - 500;
                NPC.setWorldLocation(new Type.Vector(hor, ver, 100));
            });
        });

    }

}
```

示意图：

#### 基础属性

非玩家对象的属性与角色属性基本一致，具体属性内容请参考：[角色](https://meta.feishu.cn/wiki/wikcn58RHWpFEaZaHk168zivojd)

所以两者的调用方式也相同，我们仅需要把角色声明改成 NPC 即可。

以设置角色地面最大速度属性的脚本为例，我们先将声明角色的脚本注掉，然后重新声明一次 chara，将其修改为 Humanoid，就可以完成非玩家对象的地面最大速度的属性修改。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    //声明chara为角色
    //chara: GamePlay.Character;

    //声明chara为非玩家对象
    chara: Gameplay.NPC;

    //当脚本被实例后，会在第一帧更新前调用此函数
    protected onStart(): void {

        //非玩家对象的地面最大速度=1000；
        this.chara.switchToWalking();
        this.chara.maxWalkSpeed = 1000;
        
    }

}
```

#### 播放动画

既然我们从上述内容中学会了如何修改属性，我们也可以在对象列表下挂载脚本，通过 find()函数，找到对象列表中的非玩家对象，并通过我们提供的 API，修改非玩家对象的行为动画。

##### 人形形象播放动画

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    //预加载动作资源
    @Core.Property()
    preloadAssets = "8355";
    //声明NPC为非玩家对象
    NPC: Gameplay.NPC;

    //当脚本被实例后，会在第一帧更新前调用此函数
    protected onStart(): void {
        //通过GUID找到NPC对象
        this.NPC = Core.GameObject.find("296E51F9") as Gameplay.NPC;
        //NPC数据准备好后执行相应逻辑
        this.NPC.ready().then(() => {
                // 非玩家对象会在5s后自动播放循环的死亡动画
                setTimeout(() => {
                    this.NPC.playAnimation("8355",0,1);
                }, 5000);

        });

    }

}
```

示意图：

![](static/boxcnOZjCgv5gWKNcKePP1cSkGh.gif)

##### 多足形象播放动画

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    //预加载动作资源
    @Core.Property()
    preloadAssets = "123614";
    //声明NPC为非玩家对象
    NPC: Gameplay.NPC;

    //当脚本被实例后，会在第一帧更新前调用此函数
    protected onStart(): void {
        //通过GUID找到NPC对象
        this.NPC = Core.GameObject.find("296E51F9") as Gameplay.NPC;
        //NPC数据准备好后执行相应逻辑
        this.NPC.appearanceReady().then(() => {
            // 设置动画播放模式为自定义模式
            this.NPC.animationMode = Gameplay.AnimationMode.Custom;
            // 设置四足对象在5s后播放走路动画
            setTimeout(() => {
                this.NPC.playAnimation("123614", 0);
            }, 5000);
        });

    }

}
```

示意图：

![](static/boxcn0XvfyqOiWrqTeDJXwMzpCf.gif)

#### 动态修改形象

我们也可以通过代码，改变非玩家对象的形象外观。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    //预加载动作资源
    @Core.Property()
    preloadAssets = "127060,137226,60982,64554,60991,62540,62786,63297,76618";
    //声明NPC为非玩家对象
    NPC: Gameplay.NPC;

    //当脚本被实例后，会在第一帧更新前调用此函数
    protected onStart(): void {
        //通过GUID找到NPC对象
        this.NPC = Core.GameObject.find("296E51F9") as Gameplay.NPC;
        //NPC形象数据准备好后执行相应逻辑
        this.NPC.appearanceReady().then(() => {

            // 非玩家对象会在5s后自动切换为四足形象“猫”
            setTimeout(() => {
                // 设置NPC的形象类型为四足形象
                this.NPC.appearanceType = Gameplay.AppearanceType.FourFootStandard;
                // 声明Tappearance为NPC的形象
                let Tappearance = NPC.getAppearance<Gameplay.FourFootStandard>();
                // 设置Tappearance的四足体型为猫
               Tappearance.changeSomatotype(Gameplay.SomatotypeFourFootStandard.Cat, false);
                //设置猫的模型GUID
                if (Tappearance) {
                    Tappearance.setWholeBody("127060", false);
                }
            }, 5000);

            // 非玩家对象会在10s后自动切换为基础人形形象
            setTimeout(() => {
                // 设置NPC的形象类型为基础人形形象                
                this.NPC.appearanceType = Gameplay.AppearanceType.HumanoidV1;
                // 声明Tappearance为基础人形形象               
                let Tappearance = this.NPC.appearance as Gameplay.HumanoidV1;
                // 设置Tappearance的基础人形形象
                Tappearance.changeSomatotype(Gameplay.SomatotypeV1.H umanoidV1, false);
                // 设置基础人形形象的模型GUID
                if (Tappearance) {
                    Tappearance.setWholeBody("137226", false);
                }

            }, 10000);

            // 非玩家对象会在15s后自动切换为高级人形形象
            setTimeout(() => {
                // 设置NPC的形象类型为高级人形形象
                this.NPC.appearanceType = Gameplay.AppearanceType.HumanoidV2;
                // 声明Tappearance为高级人形形象
                let Tappearance = this.NPC.appearance as Gameplay.HumanoidV2;
                // 设置Tappearance的高级人形形象
                Tappearance.changeSomatotype(Gameplay.SomatotypeV2.AnimeFemale, false);
                // 设置高级人形形象的模型GUID
                if (Tappearance) {
                    if (Tappearance) {
                        Tappearance.upperCloth.setMesh("60982", false);
                        Tappearance.lowerCloth.setMesh("64554", false);
                        Tappearance.gloves.setMesh("60991", false);
                        Tappearance.frontHair.setMesh("62540", false);
                        Tappearance.behindHair.setMesh("62786", false);
                        Tappearance.shoe.setMesh("63297", false);
                        Tappearance.head.setMesh("76618", false);
                    }
                }

            }, 15000);

        });

    }

}
```

示意图：

#### 如何让 NPC 动起来？

NPC 通常分为剧情 NPC，战斗 NPC，服务 NPC 以及兼具多种功能的 NPC 等，比如说剧情 NPC 是与玩家进行对话和互动的角色，战斗 NPC 是供玩家打击的敌人，那么某些 NPC 就不会单纯的站立不动，怎么让人形对象移动呢？接下来我们就教大家实现初步效果。

##### NPC 移动指定位置

1.首先将人形对象的游戏对象拖入场景内，创建 AI 角色

![](static/boxcnd5OThPAM0ct0KQvkMLhD6d.png)

2.然后将寻路区域拖入场景内，并设定适当的寻路区域的范围，可以方便 NPC 移动。

![](static/boxcnL7Vocy6AALCN3PhkTCHBte.png)

3.最后新建脚本，编写寻路逻辑（记得挂载脚本哦！）

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    //当脚本被实例后，会在第一帧更新前调用此函数
    protected onStart(): void {

        //通过GUID找到NPC对象
        let NPC5 = Core.GameObject.find("3B1C1E8F") as Gameplay.NPC;

        //NPC数据准备好后执行相应逻辑
        NPC5.ready().then(() => {

            //非玩家对象会在5s后进行寻路
            setTimeout(() => {
                // 设置角色移动速度
                // NPC5.maxWalkSpeed = 200;
                //设定移动终点
                let locationA = new Type.Vector(-600, 0, 85);
                //执行moveto函数
                Gameplay.moveTo(NPC5, locationA)

            }, 5000);

        });

    }
}
```

示意图：

![](static/boxcnUlCxTJNAVvErhLdQZa9NYf.gif)

##### 宠物跟随

1.步骤一和步骤二与人形 NPC 寻路功能相同，这里不在赘述，记得更换成四足形象。

2.最后新建脚本，编写寻路逻辑（记得挂载脚本哦！）

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    //预加载动作资源
    @Core.Property()
    preloadAssets = "123614";

    //当脚本被实例后，会在第一帧更新前调用此函数
    protected onStart(): void {
        //通过GUID找到NPC对象
        let NPC = Core.GameObject.find("06A29ADD") as Gameplay.NPC;
        //获取当前玩家
        let player = Gameplay.getCurrentPlayer();
        //NPC数据准备好后执行相应逻辑
        NPC.appearanceReady().then(() => {
            // 设置动画播放模式为自定义模式
            NPC.animationMode = Gameplay.AnimationMode.Custom;

            //每100毫秒更新a
            setInterval(() => {
                // 设置终点位置为角色世界位置
                let locationA = player.character.worldLocation;
                // 设置NPC寻路到终点位置
                Gameplay.moveTo(NPC, locationA)
            }, 100);

            // 设置四足对象最大速度为100
            NPC.maxWalkSpeed = 100;
            // 设置四足对象播放行走动画
            NPC.playAnimation("123614", 0);

        });

    }

}
```

示意图：
