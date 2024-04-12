# 推进器

::: tip **阅读本文预计 10 分钟**
**本文概述了在编辑器中推进器的相关定义及使用方法。**
:::

## 什么是推进器

> 推进器是一个具有物理特性的功能对象，可以对开启物理模拟的物体添加一个持续力，推动其进行物理运动。

## 如何创建推进器

- **step.1** 为模型添加一个推进器
在本地资源库中搜索[推进器]，找到功能对象，将推进器拖拽到在需要被推动的对象子级，完成绑定。
被推动的对象需要开启物理模拟，模型的物理模拟参考[物理对象](https://docs.ark.online/Physics/PhysicalObject.html)。

|中文示例|英文示例|
|-------|---------|
| ![](https://cdn.233xyx.com/online/9Pqxh8t6yBIG1712907026650.png) | ![](https://cdn.233xyx.com/online/ojq6IMfEDrnJ1712907046032.png) |



- **step.2** 设置推进方向和推进力

通过推进器的属性来设置推进力方向和力的大小，注意：视口中蓝色箭头方向为作用力方向。

|中文示例|英文示例|
|-------|---------|
| ![](https://cdn.233xyx.com/online/ivaXjElbXVor1712907057714.png) | ![](https://cdn.233xyx.com/online/dsaJwyyLWj9o1712907074613.png) |



## 如何启用推进器功能

* **通过属性面板启用**

在属性面板中选中[启用]，运行游戏时推进器会立即施加推力，开始物理模拟计算。

* **通过脚本控制**

```TypeScript
@Component
export default class NewScript extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let ThrusterMain = this.gameObject as mw.PhysicsThruster; //指定推进器功能对象
        
        //设置推力值，推力值需要参考被推动对象以及当前世界重力，如当前世界重力-1600，被推动对象质量1000，则推力需要大于(1600*1000)才可将其推离地面；
        ThrusterMain.strength = 165000; 
        
        //可以通过API，在指定时机启用推进器；
        ThrusterMain.enable = true; 
    }
}
```

## 使用推进器的注意事项与建议

推进器根据功能对象自身为中心向外释放推进，在进行物理模拟时，会根据被推进对象质量以及推进力大小模拟出最终的运动结果，被推动的对象质量越大，需要的推力进越大。
