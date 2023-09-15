# 布娃娃功能

**阅读本文大概需要 5 分钟**

本文概述了布娃娃的定义，以及如何使用布娃娃功能。

## 1. 布娃娃介绍

![](https://cdn.233xyx.com/online/5YTaooi8cgCQ1694604132461.PNG)       

布娃娃定义：布娃娃是角色的一种不可控且具有物理效果的状态。

使用场合：角色受到了致命伤害而失去知觉，于是身体部位就会由物理来模拟驱动效果。从而利用布娃娃模拟角色的死亡状态等行为。

## 2. 如何使用布娃娃功能

### 2.1 启用布娃娃

实际应用：角色启用布娃娃效果后，角色会被其他外力影响。

示例脚本：

```ts
@Component
export default class NewScript extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        //获取玩家角色
        let chara = Player.localPlayer.character
        //按下“1”键触发以下逻辑
        InputUtil.onKeyDown(Keys.One, () => {
            //角色布娃娃效果开启
            chara.ragdollEnabled = true;
        });

        //按下“2”键触发以下逻辑
        InputUtil.onKeyDown(Keys.Two, () => {
            //角色布娃娃效果关闭
            chara.ragdollEnabled = false;
        });
    }
}
```

效果图：

<video controls src="https://cdn.233xyx.com/online/75QDF8BBVcyq1694604132461.mp4"></video>
