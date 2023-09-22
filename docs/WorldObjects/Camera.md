# 摄像机

**阅读本文大概需要 20 分钟。**

本文概述了如何通过修改摄像机的各种属性，实现各种各样的镜头效果。

## 什么是摄像机？
::: tip
摄像机就像我们的眼睛， 决定了玩家在3D游戏世界中看到什么样的画面。
:::

- 新建项目的【对象管理器-世界对象】中会有一个自带的无法被删除的摄像机对象；游戏开始时，会默认展示这个摄像机所看到的画面；
- 也可以从【资源库-游戏功能对象】中拖出或者在脚本中动态创建任意个摄像机对象，这些摄像机对象可以被放置在场景中的任意位置，或者挂载到其他对象下作为子级对象；
- 世界对象-摄像机与游戏功能对象-摄像机都可以通过脚本中Camera类的属性/接口来调整效果。

![](https://cdn.233xyx.com/online/XnLugKTQJ9Ha1695279533730.png)

## 摄像机属性说明

### 2.1 摄像机设置
- 
#### 相对位置和相对旋转
- 即摄像机相对于弹簧臂的偏移和旋转，下文会具体介绍弹簧臂的定义，目前我们这里可以把主视口中的红色细线理解为弹簧臂
- 建议仅在摄像机朝向模式=固定/跟随朝向时调整摄像机相对旋转，如果当摄像机朝向模式=控制朝向时，务必将相对旋转清零，否则玩家会无法合理的操纵摄像机方向。
- 也请谨慎调整摄像机相对位置，当相对位置不在原点位置时，可能会导致弹簧臂触发摄像机碰撞后，摄像机的位置无法跟随弹簧臂伸缩至障碍物的同一侧；例如，如果希望让摄像机离角色远一些，建议调整弹簧臂长度，而不是调整摄像机相对位置
- 请注意区分摄像机相对位置/旋转与弹簧臂相对位置/旋转两者之间的区别，下文会具体介绍弹簧臂相对位置/旋转的作用。
![](https://cdn.233xyx.com/online/P1OKDAh0guwC1695279533730.gif)
![](https://cdn.233xyx.com/online/yLAvE1uxaRqV1695279533730.gif)

#### 摄像机预设
- 为了开发者能快捷选择需要的视角，编辑器提供了若干套预置的【摄像机模式】，开发者可以在属性面板或脚本中的currentCameraMode属性快捷选择想要使用的摄像机模式，而不需要手动调整众多参数；
- 使用某个摄像机模式后，各相关的摄像机属性会按照这一预置模式的预设值自动刷新。
::: tip
由于摄像机的各项参数较为复杂，强烈推荐新入门开发者使用这些预置摄像机模式；或者在这些预置摄像机模式的基础上微调。
:::

| **枚举名称** | **英文名称**   | **枚举值** | **说明**               |
| -------------------- | ---------------------- | ------------------ | ------------------------------ |
| 第一人称           | FirstPerson          | 0                | 第一人称视角的摄像机效果     |
| 第三人称           | ThirdPerson          | 1                | 第三人称视角的摄像机效果     |
| 俯视角             | TopDownAngle         | 2                | 俯视角45度的摄像机效果       |
| 默认               | Default              | 3                | 类似樱花校园模拟器的默认效果 |
| TPS过肩视角        | TPSOverShoulderAngle | 4                | 第三人称过肩视角的摄像机效果 |
| FPS射击视角        | FPSShootingAngle     | 5                | 第一人称射击视角的摄像机效果 |

* 推荐在射击类游戏中使用TPS过肩视角和FPS射击视角
  * FPS射击视角下，摄像机只能能看见玩家角色手持的武器，而看不到玩家角色
  * TPS过肩视角下，摄像机能看见玩家的上半身，且玩家在屏幕的左下区域，不会遮挡正前方视野

<video controls src="https://cdn.233xyx.com/1684475955075_215.mp4"></video>

#### 视场
- 视场（FOV），也就是透视模式下的水平视野角度，FOV越大，可见的视野角度越大。
- 
| **视场为60时** | ![](https://cdn.233xyx.com/1684475954533_734.png) |
| **视场为90时**  | ![](https://cdn.233xyx.com/1684475954609_668.png) |
| **视场为120时** | ![](https://cdn.233xyx.com/1684475954510_291.png) |
::: tip
如果需要使用正交视角（例如制作拥有3D效果的2D休闲游戏），推荐使用 **视场=35（或更小）** ，并同时调整**摄像机距离、位置、角度**等参数来模拟正交视角
:::

![](https://cdn.233xyx.com/1684475955081_332.png)

#### 摄像机位置模式
- 固定模式
  - 摄像机固定在某一位置，不可移动。
- 跟随模式
  - 摄像机跟随某个物体（默认是玩家角色）一直移动。

#### 摄像机朝向模式/使用控制器控制摄像机旋转
- 固定朝向：摄像机固定朝向某一个方向。
- 跟随朝向：摄像机跟随目标面朝方向。
- 控制朝向：由UI控件-摄像机滑动区控制此摄像机弹簧臂相对旋转，动态设置的弹簧臂相对旋转不会生效。
- 当开启使用控制器控制摄像机旋转时，与摄像机朝向模式=控制朝向在大多数情况下效果相同，并且调整这两个属性其中之一也会影响到另一条属性。

#### 固定摄像机高度
- 固定摄像机在Z轴上的坐标，比如角色在跳跃或者上楼梯时，摄像机不会跟随角色改变高度，用于制作俯视角游戏。
  * 示例：
    关闭固定摄像机Z轴方向
    ![](https://cdn.233xyx.com/1684475954245_027.gif)
    开启固定摄像机Z轴方向
    ![](https://cdn.233xyx.com/1684475954186_776.gif)



### 2.2 弹簧臂设置
- 首先，简单说明一下摄像机的弹簧臂有什么作用？
  - 弹簧臂能为摄像机提供根据场景情况进行扩展或回缩的功能，例如遇到障碍物时自动移动摄像机的位置，防止视线遮挡。
  - 弹簧臂的方向可以由UI控件-摄像机滑动区或者摇杆被玩家控制，便于在游戏中实现视角转动效果。
  - 目前我们这里可以把主视口中的红色细线理解为弹簧臂

#### 相对位置和相对旋转
- 相对位置，即弹簧臂挂点相对父节点的位置，父节点一般为玩家角色，摄像机通过弹簧臂挂点连接到角色。
  - 弹簧臂挂点的位置决定了玩家转动视角时，镜头围绕哪个点旋转，大多数第三人称游戏会把弹簧臂挂点放在角色的头部或者脖子，以保证角色的上半身始终位于屏幕正中央。
- 相对旋转，即弹簧臂相对于默认方向的角度，在游戏中拖动屏幕转动视角就相当于动态调整此属性，该属性可用于制作固定的俯视角或斜45°视角。请注意：
  - 当摄像机朝向模式=控制朝向（即使用控制器控制摄像机旋转开启时），由UI控件-摄像机滑动区控制此摄像机弹簧臂相对旋转，动态设置的弹簧臂相对旋转不会生效
  - 当摄像机朝向模式=固定朝向/跟随朝向（即使用控制器控制摄像机旋转不开启时），动态设置的弹簧臂相对旋转才会生效
    ![](https://cdn.233xyx.com/online/PL6bqcLnC4Mt1695279533730.gif)
    ![](https://cdn.233xyx.com/online/FZJgkk19xjaw1695279533730.gif)
::: tip
注意区分：摄像机的相对位置/相对旋转vs弹簧臂的相对位置/相对旋转
- 摄像机的相对位置/相对旋转仅改变摄像机，不影响弹簧臂；而调整弹簧臂的相对位置/相对旋转时，会连带摄像机的位置和方向一起变化。
  - 可以把弹簧臂理解成自拍杆，自拍杆的近端由自拍者手持，远端固定相机；摄像机的相对位置/相对旋转仅调整远端相机的位置和方向，不会影响自拍杆；而弹簧臂的相对位置/相对旋转调整自拍杆（会连带相机）的位置和方向。
:::
- 如果想要动态设置弹簧臂的方向，例如重置摄像机到角色正背后，但而后仍希望弹簧臂继续由玩家控制方向，可以使用如下方法：
```TypeScript
    //点击攻击按钮，把摄像机重置到角色的正背后
    attackBtn.onPressed.add(()=>{
        Camera.currentCamera.springArm.useControllerRotation = false;
        Camera.currentCamera.springArm.localTransform.rotation=new Rotation(0,0,0)
        Camera.currentCamera.springArm.useControllerRotation = true;
    })  
```
- 效果示例
![](https://cdn.233xyx.com/online/ghiaeSrCT73p1695279533730.gif)

#### 弹簧臂长度
- 可以把场景中这条红色细线视作摄像机弹簧臂，修改弹簧臂长度的同时也会修改红色细线长度。
  - 摄像机到角色之间的实际距离由摄像机相对位置、弹簧臂相对位置、弹簧臂长度这三个属性共同决定。
  - 如果摄像机相对位置和弹簧臂相对位置都为(0,0,0)，弹簧臂长度就是摄像机到角色之间的距离。
- 制作第一人称游戏时，建议将此属性大小调整为0。
- 弹簧臂长度（即距离调整）示意图如下：
![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnOUNH5RuhI6Fj9nbjzrIwHc.png)
![](https://cdn.233xyx.com/online/GwHaWgwltu481695279533730.gif)

#### 是否有摄像机碰撞
- 摄像机弹簧臂与其他物体存在碰撞效果，碰撞后会将摄像机位置前移，防止穿模或者玩家角色被遮挡。
- 可以理解为：如果有开启碰撞的物体挡在主视口的红色细线上，就会触发摄像机碰撞
- 关闭摄像机碰撞
![](https://cdn.233xyx.com/1684475955081_665.gif)

- 开启摄像机碰撞
![](https://cdn.233xyx.com/1684475954182_709.gif)

### 2.3 其他设置
- 
#### 开启摄像机位置延迟
- 摄像机延迟是对摄像机跟随人物的运动、视角的旋转进行延迟、滞后，使得运镜更顺滑、更有代入感。开启摄像机位置延迟后，在人物位移时，摄像机跟随人物的运动会有延迟效果。
#### 开启摄像机位置延迟
- 控制人物在位移时，摄像机抵达目标位置的速度。低数值较慢(延迟高)，高数值较快(延迟低)，零为即时(无延迟)。
- 此外，延迟效果还受位置延迟最大距离影响（脚本中用maxLagDistance属性进行调整），例如下面几幅动图中，位置延迟最大距离为100(厘米）。
| **位置延迟速度=8**       | ![](https://cdn.233xyx.com/1684475954511_620.gif) |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **位置延迟速度=2**       | ![](https://cdn.233xyx.com/1684475955080_298.gif) |
| **位置延迟速度=0 或关闭** | ![](https://cdn.233xyx.com/1684475954511_919.gif) |

#### 开启摄像机旋转延迟
- 开启摄像机旋转延迟后，在手指/鼠标控制摄像机滑动区进行视角旋转时，摄像机旋转会有延迟效果。
#### 开启摄像机旋转延迟
- 控制视角在旋转时，摄像机抵达目标位置的速度。低数值较慢(延迟高)，高数值较快(延迟低)，零为即时(无延迟)。

| **旋转延迟速度=8**        | ![](https://cdn.233xyx.com/1684475954189_668.gif) |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **旋转延迟速度=2**        | ![](https://cdn.233xyx.com/1684475954897_433.gif) |
| **旋转延迟速度=0或关闭** | ![](https://cdn.233xyx.com/1684475954321_282.gif) |

#### 向上限制角度
- 摄像机向上旋转时的最大角度，防止旋转至角色模型下方，导致穿模效果。
- 范围：0~90°  数值越大，可旋转的角度越大。
#### 向下限制角度
- 摄像机向下旋转时的最大角度，防止旋转至角色模型上方，导致穿模效果。
- 范围：0~90°  数值越大，可旋转的角度越大。
- 限制角度示意图：
![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnKh5HB410OoxfCelWMrDMth.png)

#### 是否开启物体透明
- 开启后，当摄像机与角色之间有其他障碍物体时，会让障碍物体变透明。
#### 物体不透明度
- 调整障碍物体变透明时的不透明度。
![](https://cdn.233xyx.com/online/ClrdpU2ddqOp1695279533731.gif)


## 如何通过API动态修改摄像机效果？


### 示例1：调整视场和摄像机位置以实现狙击枪瞄准效果

* 现在我们来制作一个FPS射击游戏中狙击枪的瞄准效果，在非瞄准状态下使用预置的FPS射击视角，摄像机能看到手持的狙击枪；进入瞄准状态后，摄像机显示瞄准镜中看到的画面，且不再能看到手持的狙击枪
* 因此，我们需要处理一下逻辑：
  * 将视场调小，来模拟瞄准镜中的画面
  * 将摄像机位置向前移动，使画面中不再出现狙击枪
  * 将射击摇杆的灵敏度调低，防止瞄准状态时调整瞄准方向过于灵敏
* 脚本示例：

```TypeScript
		//按下射击摇杆进入瞄准状态
		fireButton.onJoyStickDown.add(() => {
			//将视场调小，来模拟瞄准镜中的画面
			Camera.currentCamera.fov=70
			//将将摄像机位置向前移动，使画面中不再出现狙击枪
			let cameradata=Camera.currentCamera.localTransform
			cameradata.position.x+=100
			Camera.currentCamera.localTransform=cameradata
			//将射击摇杆的灵敏度调低，防止瞄准状态时调整瞄准方向过于灵敏
			fireButton.inputScale=(new Vector2(0.04, 0.03))
		});
		
		//松开射击摇杆发射子弹，并恢复到原有的TPS射击视角
		fireButton.onJoyStickUp.add(() => {
			Event.dispatchToLocal("FIRE_CLICK_Gun");
			//恢复预置的TPS射击视角，重置摄像机位置和视场
			Camera.currentCamera.preset=4
			//恢复原有的射击摇杆灵敏度
			fireButton.inputScale=(new Vector2(0.08, 0.06))
		});
```

* 实现效果示例：<video controls src="https://cdn.233xyx.com/1684475955078_130.mp4"></video>

### 示例2：调整摄像机距离实现双指放缩功能

* 现在我们来制作一个双指放缩效果，双指距离变大时，摄像机距离（也就是弹簧臂长度）变小，摄像机向前移动；双指距离变小时，摄像机距离变大，摄像机向后移动
* 脚本示例：

```TypeScript
@Component
export default class NewScript extends Script {
    touch: TouchInput;
    touchNum: number;
    oldPointSize: number;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.setFinger()
        
    }
    
    // 设置手指事件
    private setFinger() {

        // 找到UI对象DefaultUI，及其内部的UI控件
        let UI1 = UIObject.findGameObjectsByTag("DefaultUI")[0] as UIObject;
        const touchpad = UI1.uiWidgetBase.findChildByPath('Canvas/TouchPadDesigner') as TouchPad
        const canvas = UI1.uiWidgetBase.findChildByPath('Canvas') as Canvas

        
        // 双指缩放镜头视角
        this.touch = new TouchInput();
        // 使用touchNum记录当前屏幕的触摸点数量
        this.touchNum=0
        
        //开始触摸（包括第一个和第二个触摸点）
        this.touch.onTouchBegin.add(() => {

            this.touchNum++;
            if (this.touchNum < 2)return
            //当出现第二个触摸点时，移除UI对象中的摄像机滑动区
            touchpad.removeObject()
            //使用oldPointSize记录两个触摸点的初始距离
            let touchPoint = this.touch.getTouchVectorArray();
            this.oldPointSize = touchPoint[0].subtract(touchPoint[1]).length;
        });

        //触摸点移动（包括第一个和第二个触摸点）
        this.touch.onTouchMove.add(() => {

            if (this.touchNum < 2) return
            //计算两个触摸点移动过程中的最新距离
            let touchPoint = this.touch.getTouchVectorArray();
            let newPointSize = touchPoint[0].subtract(touchPoint[1]).length;
            //计算初始距离和最新距离之差
            let distance = newPointSize - this.oldPointSize;
            //使用length记录当前弹簧臂长度，也就是摄像机距离，加上或者减去两个触摸点初始距离和最新距离之差
            let length = Camera.currentCamera.springArm.length
            length += (distance > 0 ? -1 : distance < 0 ? 1 : 0) * 1 * Math.abs(distance);
            length = Math.max(length, 60);
            length = Math.min(length, 500);
            //应用length记录的弹簧臂长度，并且用oldPointSize再次记录两个触摸点的初始距离
            Camera.currentCamera.springArm.length = length;
            this.oldPointSize = newPointSize;
        });

        //结束触摸点离开（包括第一个和第二个触摸点）
        this.touch.onTouchEnd.add(() => {
            this.touchNum--;
            console.log(this.touchNum);
            //当最后一个触摸点离开屏幕时，重新挂载UI对象中的摄像机滑动区
            if (this.touchNum < 1) {
                canvas.addChild(touchpad)
            }
        })}
}
```

* 实现效果示例（请发布后在手机上测试）：<video controls src="https://cdn.233xyx.com/1684475954184_475.mp4"></video>

### 示例3：动态切换摄像机的位置模式和固定模式

* 脚本示例：

```TypeScript
import DefaultUI_generate from "./ui-generate/DefaultUI_generate";

@UIBind('')
export default class UIDefault extends DefaultUI_generate {

    /** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() { 
        //设置能否每帧触发onUpdate
        this.canUpdate = false;


        //LocationFixed
        this.mStaleButton.onClicked.add(() => {
			Camera.currentCamera.positionMode=0
        })
        //LocationFollow
		this.mStaleButton_1.onClicked.add(() => {
			Camera.currentCamera.positionMode=1
        })

        //RotationFixed
        this.mStaleButton_2.onClicked.add(() => {
			Camera.currentCamera.rotationMode=0
		})
        //RotationFollow
        this.mStaleButton_3.onClicked.add(() => {
			Camera.currentCamera.rotationMode=1
		})
        //RotationControl
        this.mStaleButton_4.onClicked.add(() => {
			Camera.currentCamera.rotationMode=2
		})
    }
}
```

* 实现效果示例：

<video controls src="https://cdn.233xyx.com/1684475954572_044.mp4"></video>

