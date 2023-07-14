# 高级轮式载具


::: tip **阅读本文预计 15 分钟**
**本文概述了如何在编辑器中，高级轮式载具逻辑对象的使用方法。**
:::



## 什么是高级轮式载具

> 高级轮式载具是编辑器提供的逻辑对象功能，用于快速实现一个具有模拟物理特性的物理载具，并可以通过模型或特效搭建载具外观。


## 高级轮式载具属性

| **属性**  | **说明**              | **类型** | **取值范围** | **默认值** |
| ----------| --------------------- | -------- | ------------ |---------- | 
| 载具模式  | 选择基础模式或高级模式，对载具属性进行设置。| enum| 基础模式| 基础模式|
| 质量      | 载具基础质量，会影响行驶速度与稳定性。在添加额外的物体拼装载具外形时，会将物体的质量计入载具总质量中，并重新分配载具的物理重心。| number| 0.01 - 100000(KG)| 1500(KG)|
| 摩擦力系数    | 设置载具的轮胎摩擦力，摩擦力影响载具的运行效果，摩擦力为0时，轮胎与地面摩擦力失效，会导致载具无法移动。| number| 0 - 8|3|
| 发动机转速(RPM) | 设置每分钟发动机的最大转速，转速越大，载具可达到的最大速度更大。(注意，此处为载具发动机转速，并不代表实际运行时的KM/H速度)| number| 0 - 1000000|6000|
| 加速系数  | 设置载具加速系数,加速效果基于物理模拟运算，直接修改加速系数并不会出现很大的效果差距，配合载具摩擦力、质量等其他参数可以进一步调整载具行驶速度| number| 0.1 - 100|1|
| 制动速度  | 设置主动刹车时的制动力。| number| 0 - 1000000(N * m)|1500(N * m)|


 > 高级轮式载具可以指定某个模型做为载具的轮胎，绑定后模型会具备轮胎转动的动画效果。高级轮式载具的轮胎碰撞需要通过属性中的轮胎半径进行设置，被绑定的模型没有碰撞效果。

| **动力轮组属性** | **说明**                                | **类型** | **取值范围** | **默认值** |
| --------------- | ---------------------------------------- | ------- | ------------ | ----------- | 
| 轮胎半径         | 设置物理轮胎的半径                        | number | 0 - 1000(cm)|40(cm)|
| 转向角度         | 设置轮胎最大转向角度，建议使用区间(0 - 40） | number | 0 - 90(°)|35(°)|
| 绑定车轮         | 指定一个物体做为载具的轮胎                 | GameObject | 模型或特效 |--|

> 选择高级模式后，可以通过自定义发动机参数，制作出不同动力的载具。发动机属性模拟现实中的物理特性，通过齿比值计算出对应的载具动力。

| **高级模式属性** | **说明**                                | **类型** | **取值范围** |
| --------------- | ---------------------------------------- | ------- | ------------ | 
| 驱动方式 | 分为四轮驱动、前轮驱动、后轮驱动三种方式。| enum | -- |
| 档位级别 | 四轮载具默认为自动档变速箱，可以分别设置每个档位的齿比值。| array | -- | 
| 齿比     | 设置档位的扭矩，齿比值越大，扭矩越大；在每个档位上运行时，齿比值越大该档位可运行的最大速度越小。 | number |  0 - 1000 |
| 下齿比   | 每个档位自动降档时的转速比值。| number | 0 - 1 |
| 上齿比   | 每个档位自动升档时的转速比值。| number | 0 - 1 |

## 如何创建高级轮式载具

- **step.1** **在编辑时通过本地资源库创建高级轮式载具**

在本地资源库搜索[高级轮式载具]，找到功能对象将其拖拽到场景中，完成创建。

![](https://cdn.233xyx.com/1682042705899_683.png)

- **step.2** **在运行时通过脚本动态创建高级轮式载具**

```TypeScript
@Core.Class
export default class SpawnVehicle extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let vehicle = Core.GameObject.spawn({
            guid:"Vehicle4W",
            replicates:true,
            transform:new Type.Transform(new Type.Vector(0,0,0),Type.Rotation.zero,Type.Vector.one)
        }) as Gameplay.AdvancedVehicle
    }
}
```


## 自动上车功能

- **step.3** **创建完成后，可以通过高级轮式载具的自动上车功能，运行PIE快速体验载具效果。**


::: danger **特别注意**
**在创建出高级轮式载具后，会看到在对象树中存在默认的触发器和交互物对象，删除后将无法使用高级轮式载具的“自动上车”功能及“隐藏驾驶员”功能，请谨慎删除。**
:::

| **属性** | **说明**|
| ------------ | ------- |
| 自动上车| 启用后，角色进入载具默认触发器范围时，自动执行驾驶逻辑。上车后可以通过W/A/S/D键控制载具移动，空格键控制载具制动，F键控制角色下车。**自动上车功能只在PC端生效，手机端请使用自定义脚本逻辑控制载具，使用自动上车功能时，无法执行自定义脚本逻辑。**|
| 隐藏驾驶员| 角色执行上车逻辑后，会自动隐藏自身形象。**隐藏驾驶员功能只在PC端生效，手机端请使用自定义脚本逻辑控制。。**|


- **step.4** **选中默认交互物，在属性面板中设置好交互姿态和交互插槽。**

![](https://cdn.233xyx.com/1689335446149_465.png)

- **step.5** **运行PIE，测试效果。

<video controls src="https://cdn.233xyx.com/1682043200257_144.mp4"></video>


## 如何拼装高级轮式载具外观

- **step.6** **可以使用任意模型或特效拼装你的高级轮式载具，模型会自动成为载具碰撞的一部分。**

![](https://cdn.233xyx.com/1689335446494_159.png)

- **step.7** **绑定车轮，可以绑定0~4个车轮，也可以调整车轮的位置，但要考虑车轮位置对车身整体的平衡性影响。**

![](https://cdn.233xyx.com/1689335446545_545.png)

<video controls src="https://cdn.233xyx.com/athena/online/a6a844a3424546f5b279a9ceaba2c761.mp4"></video>

::: tip **注意车质量**
**拼装车身时，会将模型对象的质量计入载具整体质量中，放置质量过大的模型时，需要考虑载具重心是否会影响平衡性，否则会出现翻车的情况。。**
:::


## 如何通过脚本控制载具

- **step.8**  **创建载具控制脚本

```TypeScript
@Core.Class
export default class Vehicle extends Core.Script {

    //预加载角色驾驶姿动画资源
    private vehicle: Gameplay.AdvancedVehicle;
    private interactiveObj: Gameplay.Interactor;
    private trigger: Gameplay.Trigger;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.vehicle = Core.GameObject.find("16B2A759") as Gameplay.AdvancedVehicle;
        this.interactiveObj = Core.GameObject.find("162FB19B") as Gameplay.Interactor;
        this.trigger = Core.GameObject.find("2CA4D2C4") as Gameplay.Trigger;

        //通过触发器，激活上车事件
        if (Util.SystemUtil.isServer()) {
            this.trigger.onEnter.add((chara: Gameplay.Character) => {
                if (chara instanceof Gameplay.Character) {
                    Events.dispatchToAllClient("InVehicle");
                }
            });
        }

        //客户端执行上车逻辑
        Events.addServerListener("InVehicle", () => {
            let player = Gameplay.getCurrentPlayer();
            player.character.collisionEnable = false; //关闭角色碰撞
            this.interactiveObj.startInteract(player.character, Gameplay.InteractiveSlot.Buns, "14015"); //激活交互物
            this.vehicle.setDriver(player);
            this.VehicleKeyEvents();
        });

        //客户端执行下车逻辑
        Events.addLocalListener("LeaveVehicle", () => {
            let player = Gameplay.getCurrentPlayer();
            let endLoc = this.trigger.worldLocation; //获取当前触发器位置，做为下车位置
            this.interactiveObj.endInteract(endLoc.add(new Type.Vector(0, 200, 50))); //激活交互物,并设置一个下车位置
            player.character.collisionEnable = true; //打开角色碰撞
            this.vehicle.setDriver(null); //清除载具控制权
        });
    }

    /** 
     * 通过按钮控制载具移动
     */
    private VehicleKeyEvents() {

        //按下UP键，载具加油前进；
        InputUtil.onKeyPress(Type.Keys.Up, () => {
            this.vehicle.setThrottleInput(1);
        });
        InputUtil.onKeyUp(Type.Keys.Up, () => {
            this.vehicle.setThrottleInput(0);
        });

        //按下Down键，载具减速后退；
        InputUtil.onKeyPress(Type.Keys.Down, () => {
            this.vehicle.setThrottleInput(-1);
        });
        InputUtil.onKeyUp(Type.Keys.Down, () => {
            this.vehicle.setThrottleInput(0);
        });

        //按下LEFT键，载具左键；
        InputUtil.onKeyDown(Type.Keys.Left, () => {
            this.vehicle.setSteeringInput(-1);
        });
        InputUtil.onKeyUp(Type.Keys.Left, () => {
            this.vehicle.setSteeringInput(0);
        });

        //按下RIGHT键，载具右键；
        InputUtil.onKeyDown(Type.Keys.Right, () => {
            this.vehicle.setSteeringInput(1);
        });
        InputUtil.onKeyUp(Type.Keys.Right, () => {
            this.vehicle.setSteeringInput(0);
        });

        //按下SpaceBar键，载具刹车；
        InputUtil.onKeyDown(Type.Keys.SpaceBar, () => {
            this.vehicle.handbrakeInputEnable = true;
        });
        InputUtil.onKeyUp(Type.Keys.SpaceBar, () => {
            this.vehicle.handbrakeInputEnable = false;
        });

        //按下F键，下车；
        InputUtil.onKeyDown(Type.Keys.F, () => {
            Events.dispatchLocal("LeaveVehicle");
        });
    }
}
```

## 高级载具工程示例

[高级轮式载具示例v0.24](https://cdn.233xyx.com/1682043519643_806.zip)

