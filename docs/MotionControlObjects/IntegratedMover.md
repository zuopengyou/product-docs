# 运动器

::: tip **阅读本文预计 10 分钟**
**本文概述了编辑器中运动器的相关定义及使用方法。**
:::


## 什么是运动器

> 运动器可以做为一个对象的子级，为父级提供平移、旋转、缩放、单摆基础运动能力。运动器自带的平滑属性，可以自动的处理运动时曲线效果及同步问题。
> 运动器会以父对象的轴心点为中心进行运动。
> 运动器无法为角色、NPC提供运动能力。

## 运动器属性

### 约束设置

| 名称     | 属性   | 说明                 |
| -------- | ------ | -------------------- |
| 自动启用 | enable | 是否自动运行运动效果 |
| 平滑运动 | smooth | 是否开启自动平滑计算 |


### 平移设置
**设置后，为父级对象提供平移运动效果**
| 名称     | 属性   | 说明                 |
| ---------------------------------- | -------------------- | ----------------------------------------------------------------------------- |
| 速度                               | linearSpeed          | 设置各轴方向上的运动速度                                                      |
| 延时启动时间                       | linearDelayStartTime | 设置首次运行时的延迟启动时间                                                  |
| 重复执行                           | linearRepeat         | 是否开启往返运动效果                                                          |
| 单程运动时间                       | linearRepeatTime     | [重复执行]二级属性，填入时间(秒)后，对象运动到达指定时间，自动执行反向运动    |
| 到达后停顿时间                     | linearRepeatDelay    | [重复执行]二级属性，填入时间(秒)后，对象达到终点后，停顿 N 秒开始执行反向运动 |
| 返程后停顿时间                     | linearReturnDelay    | [重复执行]二级属性，填入时间(秒)后，对象返回起点后，停顿 N 秒开始执行反向运动 |

<video controls src="https://cdn.233xyx.com/athena/online/5cef83d287ae4cfb8789d101ef3b406b.mp4"></video>

### 旋转设置
**设置后，为父级对象提供旋转运动效果**
| 名称     | 属性   | 说明                 |
| ---------------------------------- | ---------------------- | ----------------------------------------------------------------------------- |
| 速度                               | rotationSpeed          | 设置各轴方向上的运动速度                                                      |
| 延时启动时间                       | rotationDelayStartTime | 设置首次运行时的延迟启动时间                                                  |
| 重复执行                           | rotationRepeat         | 是否开启往返运动效果                                                          |
| 单程运动时间                       | rotationRepeatTime     | [重复执行]二级属性，填入时间(秒)后，对象运动到达指定时间，自动执行反向运动    |
| 到达后停顿时间                     | rotationRepeatDelay    | [重复执行]二级属性，填入时间(秒)后，对象达到终点后，停顿 N 秒开始执行反向运动 |
| 返程后停顿时间                     | rotationReturnDelay    | [重复执行]二级属性，填入时间(秒)后，对象返回起点后，停顿 N 秒开始执行反向运动 |

<video controls src="https://cdn.233xyx.com/athena/online/b29e8921f2244fa1b346a5aec46c2a32.mp4"></video>

### 缩放设置
**设置后，为父级对象提供缩放运动效果**
| 名称     | 属性   | 说明                 |
| ---------------------------------- | ------------------- | ----------------------------------------------------------------------------- |
| 速度                               | scaleSpeed          | 设置各轴方向上的运动速度                                                      |
| 延时启动时间                       | scaleDelayStartTime | 设置首次运行时的延迟启动时间                                                  |
| 重复执行                           | scaleRepeat         | 是否开启往返运动效果                                                          |
| 单程运动时间                       | scaleRepeatTime     | [重复执行]二级属性，填入时间(秒)后，对象运动到达指定时间，自动执行反向运动    |
| 到达后停顿时间                     | scaleRepeatDelay    | [重复执行]二级属性，填入时间(秒)后，对象达到终点后，停顿 N 秒开始执行反向运动 |
| 返程后停顿时间                     | scaleReturnDelay    | [重复执行]二级属性，填入时间(秒)后，对象返回起点后，停顿 N 秒开始执行反向运动 |

<video controls src="https://cdn.233xyx.com/athena/online/eafa9da98cff4542b6f18ab27014a2ca.mp4"></video>

### 单摆设置
**设置后，为父级对象提供单摆运动效果，单摆运动以父级对象锚点为轴心进行运动**
| 名称        | 属性                 |        说明                 | 
| ------------| ---------------------| --------------------- |
| 速度        | swingSpeed           |设置各轴方向上的运动速度|
| 延时启动时间 | swingDelayStartTime  | 设置首次运行时的延迟启动时间                                                                                               |
| 摆动角度     | swingAngle           | 设置摆动一侧的最大角度，需要注意在同时设置了多个轴方向的摆动时，会出现摆动幅度异常的情况，推荐只使用一个轴方向上进行摆动。 |

<video controls src="https://cdn.233xyx.com/athena/online/310492b3b66e409bbcc87808bb924f1d.mp4"></video>

## 如何创建运动器
### 在编辑器内创建
在编辑器左侧【游戏功能对象】选项中，找到【运动功能对象】，点击其中的【运动器】，拖拽到主视口中想要实现运动效果的对象子级，即可完成创建。
![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnIfVMD8DhAuFXv26FiRaqhb.png)

### 动态创建运动器
```ts
/*
端通过spawnGameObject()动态创建运动器，需要注意被绑定的对象是双端状态时，需要在服务端创建运动器；被绑定的对象是客端户时，需要在对应的客户端进行创建运动器；
运动器创建后，要绑定到需要运动的对象子级，来驱使父级对象进行运动。
*/
let og = Core.GameObject.find("3B158A4E") as Gameplay.StaticMesh;  //获取场景中需要运动的静态模型，需要确认该模型属性中已设置为非静态状态；
let IntegratedMoverOg = Core.GameObject.spawnGameObject("PhysicsSports") as Gameplay.IntegratedMover;  //动态创建一个运动器功能对象

IntegratedMoverOg.attachToGameObject(og);   //将运动器绑定到需要运动的对象子级。
IntegratedMoverOg.rotationSpeed = new Type.Vector(0,0,20);  //设置运动器的旋转运动效果，同样可以设置其他运动方式，详情可查看运动器API文档。
IntegratedMoverOg.enable = true;            //启动运动器，运行工程查看运动效果。
```

## 运动器高级使用方法

### 组合运动效果

通过设置运动器的[延迟启动时]、[停顿时间]属性，可以制作出复杂的组合运动效果。
<video controls src="https://cdn.233xyx.com/athena/online/b91753572ec24831a04df3cde4ffb018.mp4"></video>

::: warning **注意事项**
**使用时只要将运动器放置在需要运动的对象子级即可，将运动对象开启物理模拟时，会优先计算物理模拟，出现运动效果异常情况。
:::


### 运动器回调事件使用方法

```ts
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise`<void>` {
        let IntegratedMover = this.gameObject as Gameplay.PhysicsIntegratedMover;

        //运动器首次启动时回调事件，只执行一次。
        IntegratedMover.onRotationEnable.add(() => {
            console.log(`onRotationEnable`);
        });

        //运动器单程运动达到终点时的回调事件。
        IntegratedMover.onRotationReturn.add(() => {
            console.log(`onRotationReturn`);
        });

        //运动器单程运动返回起点时的回调事件。
        IntegratedMover.onRotationStart.add(() => {
            console.log(`onRotationStart`);
        });
    }
}
```

### 运动器重置接口使用方法

```ts
/**
运动器重置接口moverReset()可以将正在运行的运动器重置回初始状态，并可以通过执行回调重新设置运动器参数
*/
let moverOG = this.gameObject as Gameplay.IntegratedMover;  // 指向场景中的运动器
moverOG1.enable = true;  //启用运动器
setTimeout(() => {
    //5秒后将运动器重置，并关闭运动器
    moverOG.moverReset(()=>{
    moverOG.enable = false;
    });
}, 5000);
```

## 机关预制体

在[本地资源库]-[预制体]-[机关]分类资源中，提供了部分运动器机关资源，可以直接拖拽到场景中使用。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn0ehbljCTDTyZ9xtueRiFzb.png)



