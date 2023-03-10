# 四轮载具

| 修改日期            | 修改内容     | 所属编辑器版本 |
| ------------------- | ------------ | -------------- |
| 2022 年 4 月 10 日  | 文档创建     | V015           |
| 2022 年 10 月 8 日  | 更新使用说明 | v0.15          |
| 2022 年 11 月 15 日 | 更新使用说明 | v0.18          |

<strong>阅读本文预计 15 分钟</strong>

<strong>本文概述了如何在编辑器中，通过使用四轮载具逻辑对象快速创建一个四轮载具。</strong>

# 什么是四轮载具

四轮载具是编辑器提供的逻辑对象功能，用于快速实现一个具有模拟物理特性的四轮载具。

# 四轮载具都包含什么

# 如何合理利用 / 使用 四轮载具

- <strong>step.1</strong> 选择一个载具骨骼模型对象，将其拖拽至主视口。

![](static/boxcnau77aBiuReFEZWY25151lb.png)

- <strong>step.2</strong> 在游戏功能对象 - 常用逻辑对象中选择“四轮载具”，将其拖拽至载具对象的子级。

![](static/boxcnnnTRULxe1TLVMNnhaI2IWb.png)

- <strong>step.3</strong> 设置四轮载具对象属性。

![](static/boxcneJNZc7PwoHMJ0ex4MUfmVg.png)

| 属性            | 说明                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 质量            | 设置载具的整体质量，质量影响载具的运行动力。<br/>质量越大，载具加速时需要的扭矩越大，停车时需要更大的制动力和制动距离。 |
| 摩擦力          | 设置载具的轮胎摩擦力，摩擦力影响载具的运行效果，摩擦力为 0 时，轮胎与地面摩擦力失效，会导致载具无法移动。               |
| 驱动方式        | 分为四轮驱动、前轮驱动、后轮驱动三种方式。                                                                              |
| 发动机转速(RPM) | 设置每分钟发动机的最大转速，转速越大，载具可达到的最大速度更大。                                                        |
| 档位级别        | 四轮载具默认为自动档变速箱，可以分别设置每个档位的齿比值。                                                              |
| 齿比            | 设置档位的扭矩，齿比值越大，扭矩越大；在每个档位上运行时，齿比值越大该档位可运行的最大速度越小。                        |
| 下齿比          | 每个档位自动降档时的百分比值。                                                                                          |
| 上齿比          | 每个档位自动升档时的百分比值。                                                                                          |
| 制动速度        | 设置主动刹车时的制动力。                                                                                                |
| 转向角度        | 设置轮胎的可转向角度                                                                                                    |
| 轮胎半径        | 设置轮胎的物理碰撞盒半径                                                                                                |

- <strong>step.4</strong> 创建触发器和交互物

触发器放置到角色上下车的位置，用于判断是否激活角色上车逻辑；

交互物放置在车座上，用来设置角色驾驶位置；

![](static/LTDsbLzsLovyVGxcU7qcISUWnUh.png)

- <strong>step.5</strong> 创建一个新的 UI

![](static/WSXxbkPxno8ovXxQ5Vlc0PjHn6c.png)

- <strong>step.6</strong> 创建控制载具的 UI 控件，对每个控件重新命名

![](static/boxcn3fsLB3KTTOHQpQdbwWagCb.png)

- <strong>step.7 </strong>打开 UI 控制器脚本

```ts
@UI.UICallOnly('')
export default class NewUIScript extends UI.UIBehavior {

    button_onCar: UI.Button;
    button_offCar: UI.Button;
    canvas_Control: UI.Canvas;
    button_Handbrake: UI.Button;
    button_Joystick: UI.VirtualJoystickPanel;
    carGUID: string;

    /** 
     * 构造UI文件成功后，在合适的时机最先初始化一次 
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.button_onCar = this.uiWidgetBase.findChildByPath("RootCanvas/Button_onCar") as UI.Button;

        this.canvas_Control = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Control") as UI.Canvas;
        this.button_Joystick = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Control/VirtualJoystickPanel_1") as UI.VirtualJoystickPanel; 
        this.button_Handbrake = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Control/Button_Handbrake") as UI.Button;
        this.button_offCar = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Control/Button_offCar") as UI.Button;

        //显示/隐藏上车按钮
        Events.addServerListener("showOnCarButton", (val: number, VehicleGuid: string) => {
            this.button_onCar.visibility = val;
            this.carGUID = VehicleGuid;
        });

        //上车后，激活载具控制UI
        Events.addLocalListener("showControlCanvas", () => {
            this.canvas_Control.visibility = UI.SlateVisibility.Visible;
            this.button_onCar.visibility = UI.SlateVisibility.Collapsed;
        });

        //下车后，隐藏载具控制UI
        Events.addLocalListener("HideControlCanvas", () => {
            this.canvas_Control.visibility = UI.SlateVisibility.Collapsed;
        });

        this.vehicleControl();

    }

    
    /** 控制载具逻辑*/
    public vehicleControl() {

        //上车事件
        this.button_onCar.onClicked.add(() => {
            Events.dispatchToServer("InVehicle_Server", this.carGUID);
        });

        //下车事件
        this.button_offCar.onClicked.add(() => {
            Events.dispatchToServer("OutVehicle_Server", this.carGUID);
        });

        //通过监听自定义摇杆获取X、Y值；
        this.button_Joystick.onInputDir.add((vec2) => {
            Events.dispatchLocal("moveVec", vec2);
        });

        //刹车按钮功能
        this.button_Handbrake.onPressed.add(() => {
            Events.dispatchLocal("HandbrakeInput", true);
        });
        this.button_Handbrake.onReleased.add(() => {
            Events.dispatchLocal("HandbrakeInput", false);
        });

    }
}
```

- <strong>step.8 </strong>创建四轮载具 TS 脚本

```ts
@Core.Class
export default class Vehicle4WServer extends Core.Script {

    //预加载角色驾驶姿动画资源
    @Core.Property()
    preloadAssets = "14015";

    private vehicle: Gameplay.WheeledVehicle4W;
    private interactiveObj: Gameplay.Interactor;
    private trigger: Gameplay.Trigger;
    private speedvalue: number;
    private gearvalue: number;
    private vehicleData: Array<number>;

    //声明双端同步变量
    @Core.Property({
        replicated: true,
        onChanged: "onChanged"
    })
    public _inOutState = true;

    onChanged(): void {
        console.log(`=======> _inOutState onChanged ${this._inOutState}`);
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.vehicle = this.gameObject as Gameplay.WheeledVehicle4W;
        
        //通过父子级关系获取载具的交互物和触发器
        if (Util.SystemUtil.isServer()) {
            let get_VehicleChildren = this.vehicle.getChildren();

            for (let index = 0; index < get_VehicleChildren.length; index++) {
                if (get_VehicleChildren[index] instanceof Gameplay.Interactor) {
                    this.interactiveObj = get_VehicleChildren[index] as Gameplay.Interactor;
                } else if (get_VehicleChildren[index] instanceof Gameplay.Trigger) {
                    this.trigger = get_VehicleChildren[index] as Gameplay.Trigger;
                }
            }
        }

        //通过触发器，激活/隐藏上车按钮
        if (Util.SystemUtil.isServer()) {
            this.trigger.onEnter.add((chara: Gameplay.Character) => {
                if (chara instanceof Gameplay.Character && this._inOutState == true) {
                    Events.dispatchToClient(chara.player, "showOnCarButton", 0, this.vehicle.guid);
                }
            });

            this.trigger.onLeave.add((chara: Gameplay.Character) => {
                if (chara instanceof Gameplay.Character) {
                    Events.dispatchToClient(chara.player, "showOnCarButton", 1, this.vehicle.guid);
                }
            });
        }

        //服务器接收上车事件
        Events.addClientListener("InVehicle_Server", (player: Gameplay.Player, CarID: string) => {
            if (this._inOutState == true && CarID == this.vehicle.guid) {
                player.character.collisionEnable = false;
                console.log(`角色碰撞关闭`);
                
                this.interactiveObj.enterInteractiveState(player.character);
                this._inOutState = false;
                this.InVehicleEvents(player, this.vehicle, this._inOutState);
            }
        });

        //服务器接收下车事件
        Events.addClientListener("OutVehicle_Server", (player: Gameplay.Player, CarID: string) => {
            if (CarID == this.vehicle.guid) {
                player.character.collisionEnable = true;
                this.interactiveObj.exitInteractiveState(new Type.Vector(this.trigger.worldLocation.x, this.trigger.worldLocation.y, this.trigger.worldLocation.z + 50));
                this._inOutState = true;
                this.InVehicleEvents(player, this.vehicle, this._inOutState);
            }
        });
    }

    /** 
      * 客户端执行上下车逻辑
      */
    @Core.Function(Core.Client)
    private InVehicleEvents(player: Gameplay.Player, Vechicle: Gameplay.WheeledVehicle4W, inOutState: boolean) {
        if (inOutState) {
            this.vehicle.switchCamera(false);
            Vechicle.setDriver(null);
            Events.dispatchLocal("HideControlCanvas");
        } else {
            player.character.cameraSystem.cameraCollisionEnable = false;
            this.vehicle.switchCamera(true);
            Vechicle.setDriver(player);
            Events.dispatchLocal("showControlCanvas");
            this.VehicleUIEvents();
        }
    }

    /** 
     * 通过UI按钮控制载具移动
     * 需要在预制体-UI预制件中下载[四轮载具控制UI]配合使用；
     */
    private VehicleUIEvents() {
        this.useUpdate = true;

        //接收客户端发来的摇杆事件，控制载具油门和方向
        Events.addLocalListener("moveVec", (val: Type.Vector2) => {
            this.vehicle.setThrottleInput(val.y);
            this.vehicle.setSteeringInput(val.x);
        });

        //接收客户端发来的按钮事件，控制载具刹车
        Events.addLocalListener("HandbrakeInput", (val: boolean) => {
            this.vehicle.handbrakeInputEnable =val;
        });

    }

    /** 
    * 每帧被执行,与上一帧的延迟 dt 秒
      * 此函数执行需要将this.bUseUpdate赋值为true
      */
    protected onUpdate(dt: number): void {
        this.speedvalue = Math.abs(Math.round(this.vehicle.velocity * 3.6));  //获取当前载具时速
        this.gearvalue = this.vehicle.currentGearLevel;      //获取当前载具档位
        this.vehicleData = [this.speedvalue, this.gearvalue]
        Events.dispatchLocal("showSpeed", this.vehicleData);

    }
}
```

- <strong>Step.9</strong>将脚本和 UI 拖拽至四轮载具逻辑对下子级

![](static/TNyibKEDoox48QxIqt8clq24n9c.png)

- <strong>Step.10 </strong>调整载具摄像机

选中载具摄像机，在主视口中可以调整摄像机位置，在使用四轮载具时，可以主动切换角色摄像机与四轮载具摄像机来使用。

![](static/RyZKbZ1GYomXPhx7u2DcTuTknSh.png)

- <strong>Step.11</strong> 运行四轮载具

# 使用四轮载具的注意事项与建议

载具对象必须一个骨骼模型，才能进行运动，推荐使用编辑器自带的载具对象。

四轮载具逻辑对象是基于模拟物理运行，因此不建议开发者在运行时动态改变四轮载具的属性，以免出现不可预知的物理运行效果。

四轮载具逻辑对象自带一个摄像功能，可以独立设置载具运行时的摄像机属性。

四轮载具在设定了实际控制角色后，才可以正常使用。

#
