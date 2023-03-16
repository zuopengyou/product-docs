# 角色

**阅读本文大概需要 30 分钟**

本文概述了角色的所有基础属性，以及如何在编辑器中，修改角色的基础属性，制作出主角的各种能力。

#### 什么是角色？

- 角色是具有一套行为能力的模型。游戏世界中，角色分为非玩家角色和玩家角色。
- 【玩家角色】：由玩家控制的角色，大部分的玩家角色都是游戏剧情的关键或是主角。本篇主要讲解如何设置玩家角色的属性与功能。
- 【非玩家角色】：非玩家角色也被称为 NPC，指的是在游戏中不受真人玩家控制的游戏角色。NPC 一般由计算机人工智能控制，拥有一套行为模式的角色。NPC 通常分为剧情 NPC，战斗 NPC，服务 NPC 以及兼具多种功能的 NPC 等。

#### 如何设置角色属性？

##### 方式一 ：

在对象管理器中的【世界】对象中，找到并点击【角色】对象后，即可通过属性面板编辑角色的默认属性。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnTUQVq3iLdwfXTeRaoiD78f.png)

##### 方式二 ：

通过脚本挂在到对象管理器的对象中，实现动态修改角色属性。

下面我们会根据角色的各个属性，介绍其属性作用，以及如何动态修改角色属性。

#### 角色属性

##### 3.1  基础属性

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn0ZJaAS411W9eGhXqImABOe.png)

###### 3.1.1 是否可移动

属性说明：控制玩家移动的属性。

实际应用：角色进入陷阱（触发器）时，导致角色无法移动。

实现步骤：

首先我们将触发器对象放置在场景中，然后绑定以下脚本即可实现一个限制移动的陷阱。

```ts
@Core.Class
export default class NewScript extends Core.Script {

    //预加载动作资源
    @Core.Property()
    preloadAssets = "33569"

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let trigger = this.gameObject as Gameplay.Trigger;

        //角色进入陷阱触发器时，角色将会被静止，并播放跑步动画
        trigger.onEnter.add((chara: Gameplay.Character) => {

            chara.moveEnable = false;
            chara.playAnimation("33569")
            //1秒后，角色可以移动，并停止跑步动画
            setTimeout(() => {
                if (chara) {
                    chara.moveEnable = true;
                    // chara.stopAnimation("33569")
                }
            }, 1000);

        });

    }
}
```

效果图：

###### 3.1.2 地面最大速度

属性说明：角色在地面移动时，角色可达到的最大移动速度。

实际应用：当角色进入加速区（触发器）时，使角色获得 5 秒的超过自身速度上限的速度。

实现步骤：首先我们将触发器对象放置在场景中，然后绑定以下脚本即可实现一个加速区域。

```ts
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let trigger = this.gameObject as Gameplay.Trigger;

        //角色进入触发器时，角色的地面最大速度将变为1000
        trigger.onEnter.add((chara: Gameplay.Character) => {
            chara.maxWalkSpeed = 1000;
            //2秒后角色的地面最大速度恢复为600
            setTimeout(() => {
                if (chara) {
                    chara.switchToWalking();
                    chara.maxWalkSpeed = 600;
                }
            }, 2000);

        });

    }
}
```

效果图：

###### 3.1.3 最大加速度

属性说明：角色移动时，角色可以达到的最大加速度。

举例说明：在两个角色的地面最大速度相同时，最大加速度较快的角色会先达到最大速度。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            //角色最大加速度 = 1000；
            this.Character = player.character;
            this.Character.maxAcceleration = 1000;

        });

    }
}
```

###### 

###### 3.1.4 不可跨越高度

属性说明：角色跨越台阶时，台阶的最大高度 ，大于等于该高度角色均无法跨越。

举例说明：当角色上楼梯时，可以直接走上去，当角色上比较高的石墩时，无法直接走上去。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            //角色不可跨越高度 = 200；
            this.Character = player.character;
            this.Character.maxStepHeight = 200;

        });

    }
}
```

示意图：

###### 3.1.5 最大站稳角度

属性说明：角色站立在斜坡上时，斜坡的最大角度，超过该角度，角色将无法站立在这个斜坡上，角色会存在坠落的表现。

数值范围：0-90。

举例说明：当角色走上斜坡时，斜坡角度过大，角色将无法在斜坡上站稳，而滑落下来。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            //角色最大站稳角度 = 60；
            this.Character = player.character;
            this.Character.walkableFloorAngle = 60;

        });

    }
}
```

示意图：

###### 3.1.6 最大转向速度

属性说明：角色每秒旋转的最大速度

举例说明：当角色接到指令进行转向时，会根据转向速度进行旋转。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            //角色最大转向速度 = 100；
            this.Character = player.character;
            this.Character.rotateRate = 100;

        });

    }
}
```

示意图：

###### 3.1.7 运动面朝方向

属性说明：主角模型的面部朝向。

运动面朝方向包括：始终朝向移动方向、始终朝向目标方向、始终朝向控制器方向。

举例说明：

- 始终朝向移动方向

  - 主角模型面朝方向始终朝向移动方向，例如角色向后移动，角色模型会立马转身面朝后方进行移动，注意摄像机转向不会影响角色的面朝方向。
- 始终朝向目标方向

  - 主角模型面朝方向始终朝向目标方向，例如角色向后移动，但目标在前方，则角色模型会面朝前方倒退的方式进行移动。
- 始终朝向控制器

  - 主角模型面朝方向始终朝向控制器，例如用户滑动了摄像机，主角模型的朝向会跟随摄像机方向进行旋转，换而言之摄像机朝向与主角模型朝向保持一致

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            this.Character = player.character;

            //运动面朝方向为运动方向
            this.Character.moveFacingDirection = 0;

            //运动面朝方向为目标方向
            //this.Character.moveFacingDirection = 1;

            //运动面朝方向为控制器方向
            //this.Character.moveFacingDirection = 2;

        });

    }
}
```

###### 

###### 3.1.8 运动时依据的正方向

属性说明：角色模型移动时，依据的前进方向。

运动时依据的正方向包括：以定轴方向、以视线方向、以控制器方向。

举例说明：

- 以定轴方向

  - 以世界的 X 轴正方向为前进方向，例如角色向前移动，主角模型向 X 轴正方向移动了一段距离。
- 以视线方向

  - 以角色模型的视线方向为前进方向，例如角色向前移动，主角模型向他面朝的方向移动了一段距离。
- 以控制器方向

  - 以控制器方向为前进方向，例如角色向前移动，主角模型会跟随摄像机的方向移动了一段距离，换而言之摄像机面朝方向为正方向。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            this.Character = player.character;

            //以定轴方向作为移动时的正方向
            this.Character.movementDirection = 0;

            //以视线方向作为移动时的正方向
            //this.Character.movementDirection = 1;

            //以控制器方向作为移动时的正方向
            //this.Character.movementDirection = 2;

        });

    }
}
```

###### 3.1.9 地面摩擦力

属性说明：角色在地面移动时，会受到两种向后的摩擦力影响，一种是地面摩擦力，还有一个是制动摩擦力。地面摩擦力是制约人物运动时改变方向的能力效果。

实际应用：角色在向前跑的时候，突然转向向向后跑，角色会继续向前滑行一段时间后才能停下向前的速度，然后向后移动。

实现步骤：

首先我们将触发器对象放置在场景中，然后绑定以下脚本即可实现一个溜冰场的区域。

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let trigger = this.gameObject as Gameplay.Trigger;

        //角色进入触发器时，地面摩擦力=0
        trigger.onEnter.add((chara: Gameplay.Character) => {

            if (chara) {
                chara.groundFriction = 0;
            }

        });

    }
}
```

###### 3.1.10 行走制动速率

属性说明：角色在地面移动时，会受到两种向后的摩擦力影响，一种是地面摩擦力，还有一个是制动摩擦力。行走制动速率就是除地面摩擦力的另一种减速效果。

实际应用：当角色在向前跑的时候，突然不再施加操作，角色会继续向其滑行，并慢慢停下来。如果行走制动速率或地面摩擦力其中一个值较大，则会导致角色将直接停下来。

实现步骤：依旧以实现溜冰场的区域为例，因为角色受到两种摩擦力的影响才能停下来，所以在做溜冰场效果时，需要将两种摩擦力都减少至适当值，才能够实现溜冰效果。

```ts
@Core.Class
export default class NewScript extends Core.Script {

    //动作资源预加载
    @Core.Property()
    preloadAssets = "33566";

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let trigger = this.gameObject as Gameplay.Trigger;

        //角色进入触发器时，地面摩擦力=0，行走制动速率 =10，并且播放滑冰动作
        trigger.onEnter.add((chara: Gameplay.Character) => {
            if (chara) {
                chara.separateBrakingFrictionEnable = true;
                chara.groundFriction = 0;
                chara.brakingDecelerationWalking = 10;
                chara.playAnimation("33566", 2000);
            }

        });
        //角色离开触发器时，地面摩擦力=8，行走制动速率 =2048，并且停止滑冰动作
        trigger.onLeave.add((chara: Gameplay.Character) => {
            if (chara) {
                let anim = chara.loadAnimation("33566");
                chara.separateBrakingFrictionEnable = true;
                chara.groundFriction = 8;
                chara.brakingDecelerationWalking = 2048;
                anim.stop();
            }
        });

    }
}
```

示意图：

##### 3.2  飞行属性

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnSiHfmgIhxGkOh6owyzLRBh.png)

###### 3.2.1 最大飞行速度

属性说明：角色在飞行状态下进行移动时，角色可达到的最大移动速度。

实际应用：当角色进入飞行区域（触发器）时，角色会切换为飞行状态，且最大飞行速度为 1000。

实现步骤：

首先我们将触发器对象放置在场景中，然后绑定以下脚本即可实现一个飞行区域。

```ts
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let trigger = this.gameObject as Gameplay.Trigger;

        //角色进入方形触发时，角色状态切换为飞行状态
        trigger.onEnter.add((chara: Gameplay.Character) => {
            if (chara) {
                chara.switchToFlying();
                chara.maxFlySpeed = 1000;
            }
        });

        //角色离开方形触发时，角色状态切换为地面行走状态
        trigger.onLeave.add((chara: Gameplay.Character) => {
            if (chara) {
                chara.switchToWalking();
            }
        });

    }
}
```

示意图：

###### 3.2.2 飞行制动速率

属性说明：角色在空中移动时受到的减速度。

实际应用：当角色在向前飞行的时候，突然不再施加操作，角色会继续向其滑行，并慢慢停下来。如果飞行制动速率较大，角色将直接停下来。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            this.Character = player.character;

            //飞行制动速率 = 500
            this.Character.brakingDecelerationFlying = 500;

        }); 
        
    }
}
```

示意图：

##### 3.3  游泳属性

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnOhAuq5yp1CuMJJUZ86do8g.png)

###### 3.3.1 最大游泳速度

属性说明：角色在游泳状态下进行移动时，角色可达到的最大移动速度。

实际应用：当角色进入游泳区域时，角色会切换为游泳状态，且最大游泳速度为 1000。

实现步骤：首先我们将游泳区域对象放置在场景中

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnaB9vWXBTYTqPBbod610BJc.png)

然后绑定以下脚本即可实现一个游泳区域。

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            this.Character = player.character;

            //最大游泳速度 = 500
            this.Character.maxSwimSpeed = 500;

        });
        
    }
}
```

示意图：

###### 3.3.2 游泳制动速率

属性说明：角色在游泳状态下移动时受到的减速度。

实际应用：当角色在向前游泳的时候，突然不再施加操作，角色会继续向前游动，并慢慢停下来。如果游泳制动速率较大，角色将直接停下来。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            this.Character = player.character;

            //游泳制动速率 = 500
            this.Character.brakingDecelerationSwimming = 500;

        });
        
    }
}
```

示意图：

##### 3.4  下蹲属性

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnFAdeaWeuhYy7fCyR431hrf.png)

###### 3.4.1 是否可以下蹲

属性说明：角色是否可以下蹲。

实际应用：在特殊情况下，不允许角色下蹲。

###### 3.4.2 蹲伏行走最大移动速度

属性说明：角色在下蹲状态下移动时，角色可达到的最大移动速度。

实际应用：进入下蹲区域时，角色进入下蹲状态，移速在达到最大移动速度时恒定。

实现步骤：首先我们将触发器对象放置在场景中，然后绑定以下脚本即可实现一个下蹲区域。

```ts
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let trigger = this.gameObject as Gameplay.Trigger;

        //角色进入方形触发时，角色状态切换为下蹲状态，下蹲移速=500
        trigger.onEnter.add((chara: Gameplay.Character) => {
            if (chara) {
                chara.crouch(true);
                chara.maxWalkSpeedCrouched = 500;
            }
        });

        //角色离开方形触发时，角色状态切换为行走状态
        trigger.onLeave.add((chara: Gameplay.Character) => {
            if (chara) {
                chara.crouch(false);
            }
        });

    }
}
```

示意图：

###### 3.4.3 下蹲时的高度

属性说明：下蹲状态下，角色胶囊体的高度。

实际应用：根据实际角色模型的下蹲高度，调整角色的胶囊体高度，进行完美适配。

##### 3.5  下落属性

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnlYyFM7SLPgdJ9hkjPlNMge.png)

###### 3.5.1 最大下落速度

属性说明：角色在下落状态下移动时，角色可达到的最大移动速度。

实际应用：角色在从高空跳跃后，角色仅受到重力影响进行下落，下落速度会越来越快，直至移速达到最大下落速度。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            this.Character = player.character;

            //最大下落速度 = 5000
            this.Character.maxFallingSpeed = 5000;

        });

    }
}
```

###### 3.5.2 下落控制

属性说明：在角色跳跃到空中后，在下落的状态下，控制角色左右移动和转向，从而改变角色落地的位置，这个能力被称为下落控制，该参数就是控制他移动的难易程度。

数值范围：0-1。

举例说明：下落控制参数为 0 时，则无法在空中控制角色移动，落地地点始终不变。下落控制参数为 1 时，则可以在空中完全控制角色移动，在空中移动的速度与地面速度一致。

示意图：

###### 3.5.3 下落控制提升乘数

属性说明：角色向前跳跃时，会提供向前和向上的力。由于受到重力影响，所以速度会先减速再加速的过程。向前的速度小于规定的阈值速度（下落控制提升速度阈值）时，则下落控制=下落控制*乘数，会更容易使用户控制在空中的角色。

将此乘数设置为 0 时，则禁止用户控制在空中的角色。因为**v=gt，**角色的下落速度会越来越快，最终角色速度会超过规定的阈值速度（下落控制提升速度阈值）所以结果是该属性会最后等于 1。

举例说明：角色跳跃前期速度较慢（速度低于阈值），玩家更容易控制角色在空中的移动和转向等操作（下落控制=下落控制*乘数）。当速度很快时（速度高于阈值），玩家就很难控制角色在空中的移动和转向等操作（下落控制=下落控制*1）

示意图：

###### 3.5.4 下落控制提升速度阈值

属性说明：该值就是上面所说的阈值速度，如果横向速度量级小于此值, 下落控制将乘以下落控制提升乘数，将此设为 0 会禁止用户控制空中的角色

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            this.Character = player.character;

            //下落控制 = 0.5
            this.Character.airControl = 0.5;

            //下落控制提升乘数 = 2
            this.Character.airControlBoostMultiplier = 2;

            //下落控制提升速度阈值 = 1000
            this.Character.airControlBoostVelocityThreshold = 1000;

        });
        
    }
}
```

###### 3.5.5 重力倍率

属性说明：该值是调整角色下落速度时的重力效果的倍率。默认为 1 倍，数值越大，角色下落速度越快，数值越小，角色下落速度越慢。该值只影响角色重力倍率，世界场景中其他物体不受其影响。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            this.Character = player.character;

            //重力倍率 = 5
            this.Character.gravityScale = 5;

        });
        
    }
}
```

###### 3.5.6 下落制动速率

属性说明：角色在下落状态下移动时受到的减速度。

示例脚本：

```ts
@Core.Class
export default class TickScript extends Core.Script {

    Character: Gameplay.Character;
    
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected OnStart(): void {
        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            this.Character = player.character;

            //角色下落制动速率 = 2000
            this.Character.brakingDecelerationFalling = 2000;

        });
    }
}
```

##### 3.6  跳跃属性

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnmmD3SRy3F9PNGpY826knzh.png)

###### 3.6.1 是否可跳跃

属性说明：限制角色跳跃的属性。

实际应用：角色进入陷阱（触发器）时，导致角色无法跳跃。

实现步骤：首先我们将触发器对象放置在场景中，然后绑定以下脚本即可实现一个限制跳跃的陷阱。

```ts
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let trigger = this.gameObject as Gameplay.Trigger;

        //角色进入陷阱触发器时，角色将会禁止跳跃2s
        trigger.onEnter.add((chara: Gameplay.Character) => {

            setTimeout(() => {
                if (chara) {
                    chara.jumpEnable = false;
                }
            }, 2000);

        });

    }
}
```

###### 

###### 3.6.2 最大跳跃高度

属性说明：角色跳跃时，从起跳位置到最高位置的距离设定。

实际应用：角色踩到跳跃板（触发器）时，角色将会执行跳跃，且跳跃很高的高度。

实现步骤：首先我们将触发器对象放置在场景中，然后绑定以下脚本即可实现一个跳跃板的功能。或者也可以利用此功能做蹦蹦床等功能。

```ts
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let trigger = this.gameObject as Gameplay.Trigger;

        //角色进入跳跃板时，角色将会执行跳跃，且跳跃高度 = 1000
        trigger.onEnter.add((chara: Gameplay.Character) => {
            if (chara) {
                chara.jump();
                chara.maxJumpHeight = 1000;
            }
        });

        //角色离开跳跃板时，角色跳跃高度恢复到500
        trigger.onLeave.add((chara: Gameplay.Character) => {
            if (chara) {
                chara.maxJumpHeight = 500;
            }
        });
    }
}
```

示意图：

###### 3.6.3 最大跳跃次数

属性说明：角色能够执行的最大跳跃数量。

实际应用：实现角色多段跳的属性。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {

        let chara = (await Gameplay.asyncGetCurrentPlayer()).character;
        //当用户按住了'1'按键时，角色跳跃次数 = 5
        chara.onSkill1Triggered.add(() => {
            chara.jumpMaxCount = 5;

        })

    }
}
```

示意图：

##### 3.7  形象设置

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnvRI1GXzQkIdtbV43SnJByd.png)

###### 3.7.1 使用平台角色形象

属性说明：勾选使用平台角色形象，角色的形象会继承 233 的平台形象效果，不勾选的情况下，角色可以自主设置角色形象。

注意说明：勾选使用平台角色形象的情况下，在角色编辑器中修改角色形象是无法更改形象效果的。

###### 3.7.2 人形对象版本

属性说明：控制角色形象是使用樱花校园形象或二次元的形象。

##### 3.8  角色描边

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnJX1hLq8xQatQQdNjwBvylg.png)

###### 3.8.1 被遮挡时开启描边

属性说明：角色被物体遮挡时，会显示角色描边，标记角色位置。

注意说明：开启描边后，注意关闭摄像机碰撞，否则没办法看到角色在遮挡情况下的描边效果。

###### 3.8.2 描边颜色

属性说明：显示角色描边时，角色的描边颜色。

###### 3.8.3 描边宽度

属性说明：显示角色描边时，角色的描边宽度。

示意

##### 3.9 角色形象设置

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnkdef2G67K5G4mhw74DsIeh.png)

###### 3.9.1 外观类型

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn97XXV6SsF9tW9QPQDSuefe.png)

属性说明：外观类型根据角色外观形象进行得划分，分为【基础人形形象】/【高级人形形象】/【多足形象】。

【基础人形形象】：是人形的整体形象，只能更换整体外观形象。

【高级人形形象】：是更加完善得人形形象，可以更换角色的服装（上衣、裤子、手套、鞋子），以及脸部效果（前发、后发、瞳孔、眉毛、睫毛、肤色）等等效果。

【多足形象】：是非人形的整体形象，比如四足动物的猫/狗/猪等，只能更换整体外观形象。

###### 3.9.2 体型类型

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn8d3J2zZyQXoHplNBWzarse.png)

属性说明：体型类型是外观类型之下具有相同功能的不同外形的形象，也就是说体型类型是相同外观类型下得更加详细得类型划分。

###### 3.9.3 套装数据

属性说明：套装数据是高级人形形象的独有属性，用户可以将自己在角色编辑器中存储好的形象保存成相应文件，并直接拖入到属性面板中，这样用户可以将自己存储好的形象进行便捷设置。

操作示例：

###### 3.9.4 角色形象

属性说明：角色形象是具体的形象资源槽，根据不同的类型显示不同的资源槽，用户可以通过将资源拖拽相应属性资源槽内，快速实现设置想要的角色形象。因为基础人形形象和多足形象都是只能更换整体外观形象，所以只有一个形象资源槽，而高级人形形象可以更换多个部位的资源，所以有 6 个形象资源槽。

备注说明：

操作示例：

###### 3.9.5 使用代码更换形象

实际应用：游戏中常见的角色装扮系统、以及 RPG 类型的游戏中角色在穿戴装备后，可以更换外观等。

示例脚本：

```ts
@Core.Class
export default class TSa extends Core.Script {

    //预加载资源
    @Core.Property()
    preloadAssets = "127060,137226,59853,60993,59854,60384,62784,60383,76618,47959,48597,32096";
    Character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        console.log(`start++++++++++++++++++`);

        InputUtil.onKeyDown(Type.Keys.One, () => {
            console.log(`onedown++++++++++++++++++`);
            setTimeout(() => {
                Gameplay.asyncGetCurrentPlayer().then((player) => {
                    this.useUpdate = true;
                    this.Character = player.character;
                    //切换成四足 
                    console.log(`cat-----------------`);
                    this.Character.appearanceType = Gameplay.AppearanceType.FourFootStandard;
                    let Tappearance = this.Character.getAppearance<Gameplay.FourFootStandard>();
                    Tappearance.changeSomatotype(Gameplay.SomatotypeFourFootStandard.Cat, false);
                    this.Character.appearanceReady().then(() => {
                        if (Tappearance) {
                            Tappearance.setWholeBody("127060", false);
                        }
                    });
                });
            }, 1000);
        });

        InputUtil.onKeyDown(Type.Keys.Two, () => {
            setTimeout(() => {
                // 切换成基础人形
                this.Character.appearanceType = Gameplay.AppearanceType.HumanoidV1;
                let Tappearance = this.Character.setAppearance(Gameplay.HumanoidV1);
                Tappearance.changeSomatotype(Gameplay.SomatotypeV1.HumanoidV1, false);
                this.Character.appearanceReady().then(() => {
                    if (Tappearance) {
                        Tappearance.setWholeBody("137226", false);
                    }
                });
            }, 1000);
        });

        InputUtil.onKeyDown(Type.Keys.Three, () => {
            setTimeout(() => {
                //切换成高级人形
                this.Character.appearanceType = Gameplay.AppearanceType.HumanoidV2;
                let Tappearance = this.Character.setAppearance(Gameplay.HumanoidV2);
                Tappearance.changeSomatotype(Gameplay.SomatotypeV2.AnimeFemale, false);
                this.Character.appearanceReady().then(() => {
                    if (Tappearance) {
                        if (Tappearance) {
                            //更换角色上衣
                            Tappearance.upperCloth.setMesh("59853", false);
                            //更换角色上衣的部位颜色
                            Tappearance.upperCloth.setColor(0, new Type.LinearColor(0.938686, 0.913099, 0.871367), false)

                            //更换角色下衣
                            Tappearance.lowerCloth.setMesh("60993", false);
                            //更换角色下衣的部位颜色
                            Tappearance.lowerCloth.setColor(0, new Type.LinearColor(0.127438, 0.017642, 0.049707), false)

                            //更换角色鞋子
                            Tappearance.shoe.setMesh("59854", false);
                            //更换角色鞋子的部位颜色
                            Tappearance.shoe.setColor(0, new Type.LinearColor(0.496933, 0.337164, 0.637597), false)

                            //更换角色手套
                            Tappearance.gloves.setMesh("60384", false);
                            //更换角色手套的部位颜色
                            Tappearance.gloves.setColor(0, new Type.LinearColor(0.947307, 0.658375, 0.693872), false)

                            //更换角色前发
                            Tappearance.frontHair.setMesh("62784", false);
                            //更换角色前发的颜色
                            Tappearance.frontHair.setColor(new Type.LinearColor(0.686685, 0.768151, 0.814847), false)
                            //更换角色前发的渐变颜色
                            Tappearance.frontHair.setColor(new Type.LinearColor(0.913099, 0.686685, 0.287441), false)
                            //更换角色前发的渐变区域
                            Tappearance.frontHair.setGradientIntensity(5, false)

                            //更换角色后发
                            Tappearance.behindHair.setMesh("60383", false);
                            //更换角色后发的颜色
                            Tappearance.behindHair.setColor(new Type.LinearColor(0.177888, 0.291771, 0.473532), false)
                            //更换角色后发的渐变颜色
                            Tappearance.behindHair.setColor(new Type.LinearColor(0.577581, 0.242281, 0.177888), false)
                            //更换角色后发的渐变区域
                            Tappearance.behindHair.setGradientIntensity(5, false)

                            //更换角色瞳孔
                            Tappearance.head.setEyeTexture("47959", false);
                            //头部模型设置
                            Tappearance.head.setMesh("76618", false);

                            //更换角色眉毛
                            Tappearance.head.setBrowTexture("48597", false);

                            //更换角色睫毛
                            Tappearance.head.setEyelashTexture("32096", false);

                            //更换肤色
                            Tappearance.setSkinColor(new Type.LinearColor(0.991102, 0.822786, 0.752942), false)
                        }
                    }

                });
            }, 1000);
        });
    }
}
```

示例图：

##### 3.10  其他功能

###### 3.10.1 显隐功能

属性说明：显隐功能是将角色的模型进行显示和隐藏的处理，达到游戏玩法的设计目的。

实际应用：具有隐身技能时，可以调用角色显隐功能达到隐身效果。其次比如主角是个球或一些不同形状的物体时，可以将角色模型进行隐藏，将其他物体挂载到角色的插槽上，可以达到实现效果。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {

        let chara = (await Gameplay.asyncGetCurrentPlayer()).character;
        //当用户按住了'1'按键时，角色本地显示效果为隐藏
        chara.onSkill1Triggered.add(() => {
            chara.setLocallyVisibility(0, false);

        })
        //当用户按住了'2'按键时，角色本地显示效果为显示
        chara.onSkill2Triggered.add(() => {
            chara.setLocallyVisibility(0, true);

        })
        //当用户按住了'3'按键时，角色显示效果为隐藏
        chara.onSkill3Triggered.add(() => {
            chara.setVisibility(0, false);

        })
        //当用户按住了'4'按键时，角色显示效果为显示
        chara.onSkill4Triggered.add(() => {
            chara.setVisibility(0, true);

        })
    }
}
```

示意图：

###### 3.10.2 胶囊体高度/胶囊体半径

属性说明：胶囊体是判定角色与其他物体之间碰撞的依据，角色在变化形状和大小时，通过修改胶囊体高度和半径使之恰好包裹住模型对象。

注意说明：目前除了接口控制以外，角色编辑器的高度拉伸，也会改变胶囊体大小。

实际应用：角色变身后，模型变小了，胶囊体也需要变小，才能进入更狭小的区域。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    Character: Gameplay.Character;    

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.useUpdate = true;
        Gameplay.asyncGetCurrentPlayer().then((player) => {
            this.Character = player.character;

            //角色胶囊体高度 = 30
            this.Character.capsuleHalfHeight = 30;

            //角色胶囊体半径 = 20
            this.Character.capsuleRadius = 20;
        });
    }
}
```

示意图：

###### 3.10.3 布娃娃

属性说明：布娃娃是角色的一种不可控且具有物理效果的状态。

实际应用：角色死亡后，一般会进入布娃娃状态，反应真实物理效果，当角色复活时，将取消布娃娃状态。

示例脚本：

```ts
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {

        let chara = (await Gameplay.asyncGetCurrentPlayer()).character;
        //当用户按住了'1'按键时，进入布娃娃状态
        chara.onSkill1Triggered.add(() => {
            chara.ragdollEnable = true;
        })

        //当用户按住了'2'按键时，进入布娃娃状态
        chara.onSkill2Triggered.add(() => {
            chara.ragdollEnable = false;
        })

    }
}
```

示意图：

###### 3.10.4  姿态与动画

属性说明：姿态是角色可以一直维持的一种动作。动画是在角色处于某种姿态下，可执行的动作。

实际应用：待机是一种姿态，坐是一种姿态，持枪也是一种姿态。而持枪姿态下，角色可以播放换弹，开枪等动画。

功能说明：目前提供了动画转姿态的接口，我们可以将已有动画效果，根据部位（上半身/下半身/全身）将动画转化为相应的姿态。并和其他动画或姿态进行融合。举个例子，我们有个动画是坐着看书。我们可以将坐着变为姿态。让角色一直保持坐着的姿态，然后在播放其他动画，比如打招呼。这样角色就可以坐着跟你打招呼啦！

示例脚本：

```ts
@Core.Class
export default class stanceTest extends Core.Script {

    //动作资源预加载
    @Core.Property()
    preloadAssets = "29734,123718";

    character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Gameplay.asyncGetCurrentPlayer().then((player: Gameplay.Player) => {
            this.character = player.character;
            //当用户按住了'1'按键时，角色播放坐下读书的动画
            this.character.onSkill1Triggered.add(() => {
                this.character.playAnimation("29734",1,1)
            });
            //当用户按住了'2'按键时，将坐下读书的动画转为姿态，并播放坐下读书的姿态的下半身，也就是坐下姿态。
            this.character.onSkill2Triggered.add(() => {
                let stanceProxy = this.character.loadStance("29734", true);
                stanceProxy.blendMode = Gameplay.StanceBlendMode.BlendLower;
                stanceProxy.play();
            });
            //当用户按住了'3'按键时，播放打招呼的动画(可以与坐下姿态融合)
            this.character.onSkill3Triggered.add(() => {
                let anim = this.character.loadAnimation("123718", true);
                anim.play();
            })
            //当用户按住了'4'按键时，停止所有正在播放的姿态。
            this.character.onSkill4Triggered.add(() => {
                this.character.stopStance(true);
            })
        })
    }

}
```

示意图：

###### 3.10.6 角色插槽

属性说明：角色插槽是方便用户将某一物体挂载到角色身上，并可以随着角色姿态进行变化。

实际应用：角色持有的武器（刀/枪等），以及角色身上的装饰物（翅膀、吊坠等）均是将物体插到了角色的插槽上。

示例脚本：

```ts
@Core.Class

export default class SpawnGO extends Core.Script {

    //预加载资源
    @Core.Property()
    preloadAssets = "40732,20306"

    OnStart(): void {

        let trigger = this.gameObject as Gameplay.Trigger;

        //角色进入方形触发器时，手部插槽将装备武器
        trigger.onEnter.add((chara: Gameplay.Character) => {
            if (chara) {
                //角色切换姿态
                chara.animationStance = "20306";
                //获取该武器
                let personhandSocket = Core.GameObject.spawnGameObject("40732", true);
                //设置武器的碰撞
                personhandSocket.setCollision(Type.PropertyStatus.Off, false);
                //将武器插到角色的手部插槽处
                chara.attach(personhandSocket, Gameplay.SlotType.RightHand);

            }
        });

    }
}
```

示意图

###### 3.10.7 头顶名称

属性说明：角色模型头顶会显示名称等效果

实际应用：我们可以通过脚本和 UI 资源拼凑出称号等 UI 效果。

示例脚本：

```ts
@Core.Class
export default class stanceTest extends Core.Script {

    character: Gameplay.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Gameplay.asyncGetCurrentPlayer().then((player: Gameplay.Player) => {
            this.character = player.character;
            // 角色名称修改为哈哈哈
            // this.character.characterName = "哈哈哈";
            // 角色头顶UI是否显示 = 否
            // this.Character.headUIVisible = false;
            // 获取角色头顶UI，并重新绑定角色头顶UI文件（GUID）
            this.character.getHeadUIWidget().setUI("1AF8CE684AAD766097FD3E864CF6FB07")
            
        })
    }

}
```

示意图：
