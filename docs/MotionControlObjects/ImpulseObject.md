# 冲量对象

::: warning **阅读本文预计 10 分钟**
**本文概述了编辑器中冲量对象的相关定义及使用方法。**
:::


## 什么是冲量对象
> 冲量对象是一种冲量力的集合,可以对角色或开启物理模拟的静态模型施加冲量力,使其发生物理运动.



## 冲量对象属性

### 冲量类型

| 属性     | 说明                                                 |
| -------- | ---------------------------------------------------- |
| 绝对冲量 | 不受其他物理效果影响，以设置属性为标准执行冲量运动 |
| 相对冲量 | 受其他物理效果影响，通过计算后执行冲量运动        |

<video controls src="https://cdn.233xyx.com/athena/online/e5a1d2c91c884d70add3a084f489bd9b.mp4"></video>

### 冲量值

| 属性   | 说明                   |
| ------ | ---------------------- |
| 冲量值 | 设置各轴方向上的冲量力 |

::: warning
使用[相对冲量]时，需要考虑受力对象的施加力，比如角色在下落时受世界重力影响，会自带一个 800 的下向力，此时冲量对象 Z 轴参数设置小于 800 时，角色不会被弹起。
:::


### 冲量力类型

| 属性   | 说明                         |
| ------ | ---------------------------- |
| 矢量力 | 向某个方向施加一个瞬间的力 |
| 径向力 | 以圆心向外施加一个瞬间的力 |

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnf1UQc5D27sRsOuRYdYuesb.png)


## 如何使用冲量对象

在编辑器左侧【逻辑资源】选项中，找到【运动功能对象】，点击其中的【冲量对象】，拖拽到主视口中，即可完成创建。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnOfEfBpSelABVK28fK1LCXf.png)



## 冲量对象高级使用方法

### 冲量对象回调

```ts
let impulse = this.gameObject as Gameplay.Impulse;   //获取场景中的冲量对象

/*
  冲量对象提供了回调方法
*/
impulse.onImpulseEnter.add((chara:Gameplay.Character) => {
   chara.playAnimation("95751",1,1);
});
```
<video controls src="https://cdn.233xyx.com/athena/online/85157428cd8e46438b57df1abb2fd79f.mp4"></video>


### 冲量对象动态开关

```ts
/*
冲量对象提供了setImpulseEnabled()，可以动态设置冲量力开关，合理的使用这一接口，可以实现类如炸弹爆炸的效果；
*/
let im = this.gameObject as Gameplay.Impulse;
im.enable = false;  //将冲量对象设置为关闭状态

Events.addLocalListener("boom",()=>{
    im.enable = true;  //将冲量对象设置为开启状态
});
```
<video controls src="https://cdn.233xyx.com/athena/online/78dad341f96d4f1187c185c53e8699f9.mp4"></video>
##
