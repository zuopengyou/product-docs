# 交互物

| 修改日期            | 修改人 | 修改内容     | 所属编辑器版本 |
| ------------------- | ------ | ------------ | -------------- |
| 2022 年 4 月 10 日  | 胡光齐 | 文档创建     | v0.8           |
| 2022 年 10 月 10 日 | 由作鹏 | 更新使用说明 | v0.15          |

<strong>阅读本文预计 15 分钟</strong>

<strong>本文概述了编辑器中交互物的相关定义及使用方法。</strong>

# 什么是交互物

交互物可以将角色或人形对象约束到自身位置，并执行一个新的角色姿态，通常用于坐椅、驾驶位等需要固定角色位置和姿态的情况中。

# 如何使用交互物

- <strong>step.1</strong>

在编辑器右侧【逻辑资源】选项中，找到【游戏功能对象】，点击其中的【交互物】，拖拽到主视口，即可完成创建

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnxUwwu3JMjInvCM0osPkt2d.png)

- <strong>step.2</strong>

在属性面板中设置交互物参数。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnF5gL6MmOuhdycRDR0kec6d.png)

| 区域类型     | 说明                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------- |
| 交互姿态绑定 | 当角色或人形对象，与交互物发生交互行为时，所播放的角色动作姿态 GUID；                          |
| 交互插槽绑定 | 当角色或人形对象，与交互物发生交互行为时，所连接的角色插槽位置，默认与角色根骨骼插槽进行连接； |

- <strong>step.3</strong>

创建新的脚本，编写交互物逻辑。

```ts
@MWCore.MWClass
export default class NewScript extends MWCore.MWScript {

    //预加载角色动作资源，填入“坐下”的动画资态GUID
    @MWCore.MWProperty()
    preloadAssets = "4175";

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise`<void>` {
        //获取当前角色
        let player = GamePlay.getCurrentPlayer();

        //获取当前交互物，在对象列表中右键选中交互物对象，复制对象ID填入asyncFind()；
        let InteractiveObj = await MWCore.GameObject.asyncFind("D2C5DF804896132600510A8607EA15AC") as GamePlay.InteractiveObj;

        //创建一个键盘事件，按“1”执行交互逻辑
        Events.onKeyDown(Type.Keys.One, () => {
            //激活交互，将角色连接到交互物上；
            InteractiveObj.activeInteractiveObj(player.character);
        });

        //创建一个键盘事件，按“2”执行退出交互逻辑
        Events.onKeyDown(Type.Keys.Two, () => {
            //退出交互,将角色传送至0，0，0点；
            InteractiveObj.exitInteractiveState(new Type.Vector(0,0,150));
        });
    }
}
```

- <strong>step.4</strong>

使用不同的静态模型和角色动作姿态，可以制作出各种交互行为。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnGFBgyPLuSVXqY9ZrrcEz6f.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcncDmSsOU9IGvcwhr2Sz7FOc.png)

# 使用交互物的注意事项与建议

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnQ5rHwRglX4CQgCeuxOv2Nb.png)

交互物对象的红色箭头代表角色的正面朝向，蓝色箭头代表角色头顶朝向。可根据配合使用的静态模型样式，通过调整交互物相对旋转来契合动作姿态的表现。

交互物对象自身不带触发逻辑，所以通常情况下需要一个触发条件以激活交互逻辑，例如通过键盘事件、或者使用触发器对象来满足这个条件。

# 项目案例
