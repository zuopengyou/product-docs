# 推进器

::: tip **阅读本文预计 10 分钟**
**本文概述了在编辑器中推进器的相关定义及使用方法。**
:::

## 什么是推进器

> 推进器是一个具有物理特性的功能对象，可以对开启物理模拟的物体添加一个持续推力，使其进行物理运动。

## 如何创建推进器

- **step.1** 为模型添加一个推进器
在本地资源库中搜索[推进器]，找到功能对象，将推进器拖拽到在需要被推动的对象子级，完成绑定。
被推动的对象需要开启物理模拟，静态模型的物理模拟参考[物理对象](https://docs.ark.online/Physics/PhysicalObject.html)。

![](https://cdn.233xyx.com/1681901694639_899.png)

- **step.2** 设置推进方向和推进力

通过推进器的属性来设置推进力方向和力的大小，注意：视口中蓝色箭头方向为作用力方向。

![](https://cdn.233xyx.com/1681901694576_204.png)


## 如何启用推进器功能

* **通过属性面板启用**

![](https://cdn.233xyx.com/1681901694520_126.png)

* **通过脚本控制**

```TypeScript
@Core.Class
export default class NewScript extends Core.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        //通过脚本调用推进器接口，在运行时动态启用推进器
        let ThrusterOG = this.gameObject as Gameplay.PhysicsThruster; //指定推进器功能对象
        ThrusterOG.strength = 165000;  //设置推进力
        ThrusterOG.enable = true;      //开启推进器
    }
}
```

## 使用推进器的注意事项与建议

推进器根据功能对象自身为中心向外释放推进，在进行物理模拟时，会根据被推进对象质量以及推进力大小模拟出最终的运动结果，被推动的对象质量越大，需要的推力进越大。
