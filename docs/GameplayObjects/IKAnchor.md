# IK锚点

**阅读本文大概需要 10 分钟**

本文概述了IK的定义，IK锚点都有哪些功能，表现效果以及使用方式。

## 什么是IK？

![](https://cdn.233xyx.com/online/rayEmyCCz3dm1712563560819.PNG)

功能说明：反向运动（Inverse Kinematics，简称IK）是一种在计算机动画中使用骨骼系统来模拟物体的动作的技术。这种技术可以让物体的部分（如手臂、腿等）随着根部的移动而自动调整位置，从而实现更加自然和逼真的动画效果。

![](https://cdn.233xyx.com/online/BDZE096yK54F1712563523201.PNG)

我们提供了【IK锚点】的逻辑对象，方便用户在使用涉及到手部或脚部的交互对象时，能够控制角色的手部位置或脚部位置，防止穿模现象。举例说明，比较典型的手部交互对象就是武器（弓箭/热武器等），脚部交互对象就是载具坐骑（车/马等）

## IK锚点的使用

### 1、如何找到IK锚点？

在【资源库】-【游戏功能对象】列表中找到【IK锚点】的对象。

![](https://cdn.233xyx.com/online/QV25NvHhjoEI1712563529856.PNG)

### 2、使用IK锚点

以角色可以驾驶的摩托车为例，如果我们在不使用IK锚点的情况下，效果如下：

![](https://cdn.233xyx.com/online/MmEgpgdJc4B81712563604835.png)

我们首先找到IK锚点对象后，可以手动拖入到摩托车对象下（或者某个交互物对象下），然后我们可以通过调整IK锚点的属性调整手部位置和脚部位置。

![](https://cdn.233xyx.com/online/PzSIgyf6oNRe1712563574800.png)

第一我们要调整IK锚点的世界坐标，尽量贴合我们想要让角色手部或脚部想要放置的位置。比如说我们想要让角色双手放置在摩托车的车把上，那么IK锚点的位置就需要设置到摩托车的车把位置。

其次我们将对应的IK锚点要修改他们的IK类型，将IK类型对应到想要应用的角色骨骼上，比如说摩托车的左把手的IK锚点，我们就需要将IK锚点的IK类型修改为左手。以此类推，摩托车的右把手的IK锚点的IK类型就应该修改为右手，摩托车左踏板处的IK锚点的IK类型就应该修改为左脚，摩托车右踏板处的IK锚点的IK类型就应该修改为右脚。同时我们也可以修改名称，方便辨别。

![](https://cdn.233xyx.com/online/hmYmuHdzkEll1712563590497.png)

然后我们需要写代码，在角色触发骑车时，启用角色IK功能，并应用到正在骑乘的角色身上。

```ts
@Component
export default class NewScript extends Script {
    //声明IK类型
    leftHandIk:IKAnchor;
    rightHandIk:IKAnchor;
    leftFootIk:IKAnchor;
    rightFootIk:IKAnchor;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        //通过GUID找到左手的IK锚点
        this.leftHandIk = GameObject.findGameObjectById("0EC27D11") as IKAnchor;
        //通过GUID找到右手的IK锚点
        this.rightHandIk = GameObject.findGameObjectById("22DBBDD4") as IKAnchor;
        //通过GUID找到左脚的IK锚点
        this.leftFootIk = GameObject.findGameObjectById("00BD0000") as IKAnchor;
        //通过GUID找到右脚的IK锚点
        this.rightFootIk = GameObject.findGameObjectById("0364CBB7") as IKAnchor;
        //按W键时执行下面的逻辑（这里需要说明一下，IK应用对象的逻辑理应放在开车按键触发的逻辑上或者执行骑行动作的逻辑上，由于摩托车范例的脚本过长，不易学习，所以简化为按键模拟）
        InputUtil.onKeyDown(Keys.W,()=>{
            //左手的IK锚点应用到当前角色上
            this.leftHandIk.active(Player.localPlayer.character);
            //右手的IK锚点应用到当前角色上
            this.rightHandIk.active(Player.localPlayer.character);
            //左脚的IK锚点应用到当前角色上
            this.leftFootIk.active(Player.localPlayer.character);
            //右脚的IK锚点应用到当前角色上
            this.rightFootIk.active(Player.localPlayer.character);
        }) 
    }
}
```

通过按键触发我们的角色IK功能后，我们再次运行项目将会看到角色会按照我们的IK锚点放置手部和脚部位置。

![](https://cdn.233xyx.com/online/PPie7E216K2o1712563597687.png)

我们在触发了脚本后，手部和脚部的位置明显好了一些，但是膝盖部分还是有穿模现象，这块我们就需要进行调整膝盖的轴向。

![](https://cdn.233xyx.com/online/Y2dixHpGTQSV1712563582406.png)

我们找到膝盖位置最接近的IK锚点对象上，这里我们找到左脚的IK锚点，然后点击修改它的【关节朝向】属性，重新修改为0,-90,0。就可以将膝盖部分关节朝外旋转90度。最后就能得到我们想要的效果：

![](https://cdn.233xyx.com/online/My2NfGziSNIJ1712563612630.png)

### 3、关闭IK锚点

上面我们描述了如何去使用IK锚点的功能，但是如果我们启用IK锚点后，角色无论是播放动画，还是做其他的事情，都会根据IK锚点进行移动，举例说明，比如我们已经下车了，本质上就不需要将手部IK和脚部IK的功能了，这个时候，就需要将IK功能关闭掉，防止影响我们角色的移动等其他的交互功能。
所以我们需要在下车的脚本中，添加关闭IK锚点的代码，如下

```ts
//按Q键时执行下面的逻辑（使用按键模拟下车条件）
InputUtil.onKeyDown(Keys.Q,()=>{
    //关闭左手的IK功能
    this.leftHandIk.deactivate();
    //关闭右手的IK功能  
    this.rightHandIk.deactivate();
    //关闭左脚的IK功能
    this.leftFootIk.deactivate();
    //关闭右脚的IK功能
    this.rightFootIk.deactivate();
}) 
```


### 4、动态生成IK锚点

![](https://cdn.233xyx.com/online/oYY9H0lnIsbc1712563567604.png)

我们可以通过将鼠标悬停在逻辑对象的上方，查看资源的GUID；也可以通过右键，复制对象的GUID。然后通过GUID动态创建相应的资源。

动态生成IK锚点的示例脚本：

```ts
// 异步spawn，没有找到资源时会下载后在生成
GameObject.asyncSpawn("12683").then((obj) => {
    let IKObject = obj as IKAnchor;
})
```

```ts
// 普通spawn生成，没有优先加载或预加载资源则无法生成
let IKObject = GameObject.spawn("IKAnchor") as IKAnchor;
```

## IK锚点属性介绍

### 1、IK类型

功能说明：IK类型主要是决定IK锚点影响角色的骨骼位置，目前我们提供的骨骼位置只有4个，分别是左手，右手，左脚，右脚。

演示效果：

<video controls src="https://cdn.233xyx.com/online/9ZOZIaVifpEn1712563516255.mp4"></video>

### 2、关节朝向

功能说明：修改关节朝向，会影响到IK类型所关联的骨骼空间朝向，比如说手部IK的相连骨骼就是肘部的关节，脚部IK的相连骨骼就是膝盖关节，关节朝向会直接影响到肘部关节和膝盖关节的朝向问题。

演示效果：

![](https://cdn.233xyx.com/online/O23vOEEgwvqq1712563479989.png)

相关接口：

```ts
//通过GUID找到对应的IK锚点对象
let IK = GameObject.findGameObjectById("3BAABEBE") as IKAnchor;
//将IK应用到当前角色上
IK.active(Player.localPlayer.character); 
// 设置IK的关节锚点为（90,0,0）
IK.jointTarget = new Vector(90,0,0)
```

### 3、权重

功能说明：在激活IK锚点功能时，角色动画和IK效果的混合权重，取值范围在0-1之间，值为0时，则全依据角色动画效果，值为1时，则全依据角色IK效果。

演示效果：

<video controls src="https://cdn.233xyx.com/online/bl0932WkyUdH1712563546489.mp4"></video>

![](https://cdn.233xyx.com/online/Mhn8cukNJjjW1712563537958.png)

相关接口：

```ts
// 将IK权重设置为1
IK.weight = 1
```

### 4、混入时间

功能说明：激活IK锚点后，当前动画混合到IK效果时需要的时间

演示效果：

<video controls src="https://cdn.233xyx.com/online/op7rshSWCEtU1712563497721.mp4"></video>

相关接口：

```ts
// 将IK混入时间 = 10
IK.blendInTime = 10;
```

### 5、混出时间

功能说明：停用IK锚点后，从IK混合效果恢复到角色正常动画需要的时间

演示效果：

<video controls src="https://cdn.233xyx.com/online/cnADxE9UzA6V1712563489586.mp4"></video>

相关接口：

```ts
// 将IK混出时间 = 10
IK.blendOutTime = 10;
```
