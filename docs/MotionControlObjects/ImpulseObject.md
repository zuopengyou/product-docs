# 冲量对象

::: tip **阅读本文预计 10 分钟**
**本文概述了编辑器中冲量对象的相关定义及使用方法。**
:::


## 什么是冲量对象
> 冲量对象是一种冲量力的集合,可以对角色或开启物理模拟的模型施加冲量力,使其发生物理模拟运动.



## 冲量对象属性

| 属性     | 说明                                                 |
| -------- | ---------------------------------------------------- |
| 启用 | 在运行时立即启用冲量对象功能,关闭后可以通过脚本来动态启用. |


### 冲量类型

| 属性     | 说明                                                 |
| -------- | ---------------------------------------------------- |
| 绝对冲量 | 触发冲量时不考虑对象当前的速度，仅以设置的冲量值为标准进行计算 |
| 相对冲量 | 触发冲量时会将对象当前的速度与设置的冲量值合并计算  |


### 冲量值

| 属性   | 说明                   |
| ------ | ---------------------- |
| 冲量值 | 设置各轴方向上的冲量力 |

::: danger 注意事项
冲量不受当前世界重力影响，直接产生物理模拟结果。
:::


### 冲量力类型

| 属性   | 说明                         |
| ------ | ---------------------------- |
| 矢量力 | 向某个方向施加一个冲量 |
| 径向力 | 以圆心向外施加一个冲量 |



## 如何使用冲量对象

在本地资源库中搜索[冲量对象],找到功能对象,拖入到场景中即可完成创建.
在属性面板中可以设置是否自动开启冲量效果及冲量值等参数.

| 中文示例   | 英文示例                         |
| ------ | ---------------------------- |
| ![](https://cdn.233xyx.com/online/BZ6vpSPq2nKl1713150793926.png) | ![](https://cdn.233xyx.com/online/xBu8u2NFhihW1713150778569.png) |




## 冲量对象高级使用方法

### 冲量对象回调

```ts
@Component
export default class NewScript extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let impulseMain = this.gameObject as mw.Impulse; //指定冲量对象

        //冲量对象提供了回调方法
        impulseMain.onImpulseEnter.add((chara: mw.Character) => {
            if(chara instanceof Character){
                console.log(`角色进入冲量范围`);
            }
        })
    }
}
```


### 冲量对象动态开关

```ts
@Component
export default class NewScript extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        let impulseMain = this.gameObject as mw.Impulse; //指定冲量对象

        //冲量对象提供了回调方法
        impulseMain.onImpulseEnter.add((chara: mw.Character) => {
            if(chara instanceof Character){
                console.log(`角色进入冲量范围`);
                impulseMain.enable = true; //动态开启冲量
            }
        })
    }
}
```
##
