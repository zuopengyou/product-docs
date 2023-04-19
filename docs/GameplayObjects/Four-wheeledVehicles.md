# 四轮载具


::: tip **阅读本文预计 15 分钟**
**本文概述了如何在编辑器中，通过使用四轮载具逻辑对象快速创建一个四轮载具。**
:::


## 什么是四轮载具

四轮载具是编辑器提供的逻辑对象功能，用于快速实现一个具有模拟物理特性的四轮载具。


## 如何创建四轮载具

- **step.1** 在本地资源库搜索[载具]，选择一个载具骨骼模型对象，将其拖拽至主视口。

![](https://cdn.233xyx.com/1681896453798_083.png)

- **step.2** 在本地资源库搜索[四轮载具]，找到四轮载具功能对象将其拖拽到载具骨骼模型的子级。

![](https://cdn.233xyx.com/1681896453838_888.png)

- **step.3** 在对象管理器中选中四轮载具功能对象，设置四轮载具对象属性。

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


- **step.4** 调整载具摄像机到合适的位置
选中载具摄像机，在主视口中可以调整摄像机位置，四轮载具可以独立设置载具运行时的摄像机属性，可以通过脚本切换角色摄像机与四轮载具摄像机来使用。
![](https://cdn.233xyx.com/1681898616975_146.png)


- **step.5** 创建触发器和交互物

在本地资源库搜索[触发器](https://docs.ark.online/GameplayObjects/Trigger.html)，将触发器功能对象放置到角色上下车的位置，用于判断是否激活角色上车逻辑；

在本地资源库搜索[交互物](https://docs.ark.online/GameplayObjects/Interactors.html)，将交互物功能对象放置在车座上，用来设置角色驾驶位置；

![](https://cdn.233xyx.com/1681896453740_747.png)

- **step.6** 打开默认的UI文件

![](https://cdn.233xyx.com/1681897114535_041.png)

- **step.7** 打开UI脚本

![](https://cdn.233xyx.com/1681897114480_763.png)

- **step.8** 在onStart()中添加新的脚本内容**

```ts
    ......
    
    protected onStart() {
	//初始化动画资源 
	this.initAssets("95777,61245")
	//设置能否每帧触发onUpdate
	this.canUpdate = false;
		
	//找到对应的跳跃按钮
    const JumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Jump') as UI.Button
	const AttackBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Attack') as UI.Button
	const InteractBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Interact') as UI.Button

	/**
	* 找到默认的摇杆
	* 添加一个摇杆事件，在使用摇杆时向载具发送方向数据
	*/
	const JoystickPanel = this.uiWidgetBase.findChildByPath('RootCanvas/VirtualJoystickPanel') as UI.VirtualJoystickPanel

	JoystickPanel.onInputDir.add((vec:Type.Vector2)=>{
		Events.dispatchLocal("Controlvehicle",vec);
	});
        
    ......
```

- **step.9** 创建四轮载具脚本
![](https://cdn.233xyx.com/1681897759063_412.png)

```ts
@Core.Class
export default class Vehicle4WServer extends Core.Script {

    //预加载角色驾驶姿动画资源
    @Core.Property()
    preloadAssets = "14015";

    private vehicle: Gameplay.WheeledVehicle4W;
    private interactiveObj: Gameplay.Interactor;
    private trigger: Gameplay.Trigger;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        //找到四轮载具对象
        this.vehicle = this.gameObject as Gameplay.WheeledVehicle4W;
        
        //通过父子级关系获取四轮载具子节点的交互物和触发器
        let get_VehicleChildren = this.vehicle.getChildren();
        for (let index = 0; index < get_VehicleChildren.length; index++) {
            if (get_VehicleChildren[index] instanceof Gameplay.Interactor) {
                this.interactiveObj = get_VehicleChildren[index] as Gameplay.Interactor;
            } else if (get_VehicleChildren[index] instanceof Gameplay.Trigger) {
                this.trigger = get_VehicleChildren[index] as Gameplay.Trigger;
            }
        }

        //通过触发器，激活交互物逻辑，实现角色上车效果
        this.trigger.onEnter.add((chara: Gameplay.Character) => {
            if (chara instanceof Gameplay.Character) {
                //关闭角色碰撞
                chara.collisionEnable = false;
                //将角色绑定到交互物                    
                this.interactiveObj.startInteract(chara, Gameplay.InteractiveSlot.Buns, "14015");
                //赋予角色的载具控制权，四轮载具在设定了实际控制角色后，才可以正常使用。
                this.vehicle.setDriver(chara.player);
                //切换到载具摄像机
                this.vehicle.switchCamera(true);
                
                this.VehicleUIEvents();
            }
        });
    }

    /** 
     * 通过UI按钮控制载具移动
     */
    private VehicleUIEvents() {
        //接收客户端发来的摇杆事件，控制载具油门和方向
        Events.addLocalListener("Controlvehicle", (val: Type.Vector2) => {
            this.vehicle.setThrottleInput(val.y);
            this.vehicle.setSteeringInput(val.x);
        });
    }
}
```

- **Step.10**将脚本和 UI 拖拽至四轮载具逻辑对下子级

![](https://cdn.233xyx.com/1681899188975_768.png)


- **Step.11** 运行四轮载具

<video controls src="https://cdn.233xyx.com/1681899844250_056.mp4"></video>


::: warning **注意事项与建议**
**四轮载具使用的载具对象必须是一个骨骼模型才能进行运动，推荐使用编辑器资源库的载具骨骼模型。**

**四轮载具逻辑对象是基于模拟物理运行，因此不建议开发者在运行时动态改变四轮载具的属性，以免出现不可预知的物理运行效果。**
:::


##
