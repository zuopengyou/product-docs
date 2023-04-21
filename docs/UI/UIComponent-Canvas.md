# UI 控件-容器

**阅读本文大概需要 15 分钟**

本文概述了UI控件—容器的各项属性以及使用方法。

## 什么是容器?

**容器**是承载其他 UI 控件的背景板，UI 控件也必须依托于容器才能显示和产生作用。

- 变换/对齐/通用/渲染属性请见 [UI 控件的基础属性](https://docs.ark.online/UI/UIWidget-BaseProperties.html)

## 容器属性-布局

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcndWr09C5ra5oh6gdkKCkR2g.png)

- 布局是容器的独有属性，主要作用是将容器内的所有子项进行有规则的排序，方便用户进行使用。
- 举例说明：背包功能就是典型利用容器布局所制作的 UI 效果。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn4V8N1j9wLi8gqGJweYl2qg.png)

#### 自动布局

- 开启自动布局功能，将容器内所有子项的 UI 控件有序的排列成一排。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnmTJ2mNKZI4Go3UkLxrqAFe.png)

#### 网格布局

- 根据容器大小将其子项的 UI 控件进行自动换行。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnHIxN8R3rEltxMBxNyTsXvh.png)

#### 容器类型

- 水平布局

  - 水平方向进行有序排列
  - 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnkdyeGpGYysxiJpJzzTpV1e.png)

- 垂直布局

  - 垂直方向进行有序排列
  - 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcndTrAYxQqsQ8LDeMJUYwvNc.png)

#### 排列规则

- 左上对齐

  - 以左上位置进行对齐
- 左中对齐

  - 以左中位置进行对齐
- 左下对齐

  - 以左下位置进行对齐
- 右上对齐

  - 以右上位置进行对齐
- 右中对齐

  - 以右中位置进行对齐
- 右下对齐

  - 以右下位置进行对齐
- 中上对齐

  - 以中上位置进行对齐
- 居中对齐

  - 以居中位置进行对齐
- 中下对齐

  - 以中下位置进行对齐
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnBEYyIEEq2vlbZ77zbhwCQc.gif)

#### 间隔

- 容器中 UI 控件的相距间隔
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnmMXoiVC5secAajnMCXogFh.gif)

#### 子项排列规则

- 启用自动布局后，容器内所有子对象默认会根据从上到下，从左到右的顺序进行排序；如果希望修改这些子对象的排序规则，可以修改子项排列规则的水平排序和垂直排序属性。
- 水平排序

  - 从左到右
  - 从右到左
- 垂直排序

  - 从上到下
  - 从下到上
- 再加上上文的容器类型和排列规则，共能实现 9X2X2X2=72 种容器的布局方式。

  - 可以理解为：

    - 第一步：排列规则是决定被排列对象的整体位置在容器的哪个角落，用容器九个锚点中的哪一个来对齐；
    - 第二步：子项排列规则的水平排序和垂直排序决定这些被排列对象整体内部是如何排列的，具体来说就是层级在最上的对象会在被排列对象整体位置的哪个角落；
    - 第三步：按照容器类型（水平分布/垂直分布）来决定排列方向，层级在最上的对象被放置在第二步中确定的角落，剩余对象根据这个排列方向进行分布
  - 举例说明：开启网格布局的默认情况下，容器类型默认值为水平布局，排列规则默认值为左上对齐。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnyqW1DABhRMqnmhZlZPIYzb.png)

- 将从左到右属性修改为从右到左，从上到下属性改为从下到上。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnmBozgbdPuJisxurjrikync.png)

- 再举例说明：开启网格布局的默认情况下，将容器类型设置为垂直布局，排列规则设置为右上对齐。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnfNbVkYbvrARQ0NByokpqYd.png)

- 将从左到右属性修改为从右到左，从上到下属性改为从下到上。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn6lenGSS6jci4DuzdnJlupb.png)

##### 自适应规则

- 水平适应

  - 固定宽度

    - 根据变换大小，显示水平的宽度
  - 自适应宽度

    - 根据容器内的内容大小，显示水平的宽度
- 垂直适应

  - 固定高度

    - 根据变换大小，显示垂直的高度
  - 自适应高度

    - 根据容器内的内容大小，显示垂直的高度
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcncA6nH9CpQgflWEkT4XT8Qh.gif)

##### 边缘间距

- 左边距

  - 容器内的子项内容距离容器左边框的距离间距
- 上边距

  - 容器内的子项内容距离容器上边框的距离间距
- 右边距

  - 容器内的子项内容距离容器右边框的距离间距
- 下边距

  - 容器内的子项内容距离容器下边框的距离间距
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnjJSMrtjfu5HR29qyaRvPgc.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnlHQpKpDRl69wymJ0x5g0Dd.png)

## 如何使用容器？

### 示例一：通过容器的自动布局，使 UI 控件有规律排序

- 举例说明：很多情况下我们需要创建整齐的 UI 控件，下面左图中活动页签按钮就需要进行竖向的垂直排列，而下面右图的活动奖励内容需要水平排列；
- 想实现这样的效果，我们可以把底部的容器设置开启自动布局，并且把 UI 控件挂在在这个容器下，就可以实现快捷的自动布局了
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnDYLaS6iCo7eE1CIzov4uNh.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnqUt10qT1KN6jsThwMqXhRc.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnIcbGxhE4k66RF7UCzY5Usc.gif)

### 示例二：制作活动页签的面板，用于整理 UI 控件并使其方便管理

- 举例说明：下面我们制作简单的活动面板，该面板有 4 种活动。点击每个活动页签的按钮点击后，右边的活动详情就会切换到不同的内容；

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnWrpj2O6RL09cahEz1vwFjh.png)

- 为了方便控制我们将同一个活动的所有 UI 控件放到同一个容器内，并在点击活动页签按钮时，将该容器设置为显示，其他为隐藏，即可实现效果（关于如何制作页签按钮的选中态，请参考 UI 控件-按钮部分的思路）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnfEFge52FO7U6ARQDR0yI5f.png)

- 示例脚本：

```ts
import activity_generate from "./ui-generate/activity_generate";

/** 页签选择枚举 */
export enum PropSelect {
    Prop1,
    Prop2,
    Prop3,
    Prop4,
}

@UI.UICallOnly('')
export default class activity extends activity_generate {
    
    PlayerPropSelect: PropSelect = PropSelect.Prop1;

    protected onStart() { 
        //点击页签按钮1时，页签选择为页签1，并且执行一遍页签选择的方法
        this.mBtn.onPressed.add(() => {
            this.PlayerPropSelect = PropSelect.Prop1;
            this.Prop_Select(this.mBtn, this.mBtn1, this.mBtn2, this.mBtn3)
        });

        //点击页签按钮2时，页签选择为页签2，并且执行一遍页签选择的方法
        this.mBtn1.onPressed.add(() => {
            this.PlayerPropSelect = PropSelect.Prop2;
            this.Prop_Select(this.mBtn, this.mBtn1, this.mBtn2, this.mBtn3)
        });
        //点击页签按钮3时，页签选择为页签3，并且执行一遍页签选择的方法
        this.mBtn2.onPressed.add(() => {
            this.PlayerPropSelect = PropSelect.Prop3;
            this.Prop_Select(this.mBtn, this.mBtn1, this.mBtn2, this.mBtn3)
        });

        //点击页签按钮4时，页签选择为页签4，并且执行一遍页签选择的方法
        this.mBtn3.onPressed.add(() => {
            this.PlayerPropSelect = PropSelect.Prop4;
            this.Prop_Select(this.mBtn, this.mBtn1, this.mBtn2, this.mBtn3)
        })
    }

    //创建一个页签选择的方法：判断条件为页签选择是哪个页签
    Prop_Select(Btn1: UI.StaleButton, Btn2: UI.StaleButton, Btn3: UI.StaleButton, Btn4: UI.StaleButton) {
        switch (this.PlayerPropSelect) {
            //页签选择为页签1时，按钮的颜色效果
            case PropSelect.Prop1:
                {
                    this.mButton_Select.visibility=0
                    this.mButton_Select1.visibility=1
                    this.mButton_Select2.visibility=1
                    this.mButton_Select3.visibility=1
                    //使页签1可见，剩余隐藏
                    this.mCanvas.visibility=0
                    this.mCanvas_1.visibility=1
                    this.mCanvas_2.visibility=1
                    this.mCanvas_3.visibility=1
                }
                break;
            //页签选择为页签2时，按钮的颜色效果
            case PropSelect.Prop2:
                {
                    this.mButton_Select.visibility=1
                    this.mButton_Select1.visibility=0
                    this.mButton_Select2.visibility=1
                    this.mButton_Select3.visibility=1
                    //使页签2可见，剩余隐藏
                    this.mCanvas.visibility=1
                    this.mCanvas_1.visibility=0
                    this.mCanvas_2.visibility=1
                    this.mCanvas_3.visibility=1
                }
                break;
            //页签选择为页签3时，按钮的颜色效果
            case PropSelect.Prop3:
                {
                    this.mButton_Select.visibility=1
                    this.mButton_Select1.visibility=1
                    this.mButton_Select2.visibility=0
                    this.mButton_Select3.visibility=1
                    //使页签3可见，剩余隐藏
                    this.mCanvas.visibility=1
                    this.mCanvas_1.visibility=1
                    this.mCanvas_2.visibility=0
                    this.mCanvas_3.visibility=1
                }
                break;
            //页签选择为页签4时，按钮的颜色效果
            case PropSelect.Prop4:
                {
                    this.mButton_Select.visibility=1
                    this.mButton_Select1.visibility=1
                    this.mButton_Select2.visibility=1
                    this.mButton_Select3.visibility=0
                    //使页签4可见，剩余隐藏
                    this.mCanvas.visibility=1
                    this.mCanvas_1.visibility=1
                    this.mCanvas_2.visibility=1
                    this.mCanvas_3.visibility=0
                }
                break;
        }
    }
}
```

- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnWCPp8wXO1mVZ86z3Wc53cb.gif)

- 工程项目：
  [点击下载](https://cdn.233xyx.com/1681462157665_532.7z)

### 示例三：制作动态增加/移除自定义UI控件的自动布局面板

* 实际制作游戏时，背包/商店等菜单中的每个格子通常不是简单的一个UI控件，而是图片、文本、按钮等多个UI控件复合而成的，建议把一个格子放在一个单独的UI文件内
* 需要注意：务必将自定义UI文件-Root对齐方式设为靠左+靠上对齐（如果Root是左右+上下对齐或者自适应对齐，会与容器的自动布局冲突），把可见性修改为【可见】，并把设计尺寸调整为所需要的大小

![](https://cdn.233xyx.com/1681462157262_307.png)![](https://cdn.233xyx.com/1681462156860_422.png)

* 然后制作面板，在底图上摆放一个开启自动布局的容器，【自适应规则】-【垂直适应】选择【自适应高度】；
  ![](https://meta.feishu.cn/space/api/box/stream/download/asynccode/?code=NmQ3MDU2ZjcwNTRlODJlZWUxOTEzNDg3YmIyNDAwM2FfSkVWTXhiT2diR3VLZE1Da2cyemtaVmtVSjBZaE1zT3ZfVG9rZW46QWNzcWJ2VmhDb1VGUnB4MldmaGN3U00zbmtjXzE2ODE0NjIwOTE6MTY4MTQ2NTY5MV9WNA)
* 最后，我们编写脚本将作为格子的自定义UI控件动态生成并挂载到这个容器里面；每次点击按钮，都会将作为格子的UI文件实例化一次，并生成一个格子
  
  * 示例脚本：
  
  ```TypeScript
  export default class UIDefault extends UI.UIBehavior {
  
      /** 仅在游戏时间对非模板实例调用一次 */
      protected onStart() { 
          //设置能否每帧触发onUpdate
          this.canUpdate = false;
  
          //找到对应的按钮和容器
          const newBtn = this.uiWidgetBase.findChildByPath('Canvas/StaleButton') as UI.StaleButton
          const canvas = this.uiWidgetBase.findChildByPath('Canvas/Canvas') as UI.Canvas
  
          //点击按钮,创建UI
          newBtn.onPressed.add(()=>{
              //创建自定义UI控件并挂载到容器下
              let item= UI.createUIByName('/BagItem.ui') as UI.UserWidget
              canvas.addChild(item)
          })  
      }
  }
  ```
* 此外，我们还可以给每个作为格子的自定义UI控件加个可拖拽移除的功能：
  
  * 当格子被拖拽并在面板内部释放时，不会发生任何变化
  * 当格子被拖拽并在面板之外释放时，销毁这个格子，模拟从背包中丢弃物品的效果，由于所有格子都挂载在自动布局的容器下，所以当某个格子被销毁时，剩余格子会自动重新调整布局，补上被销毁格子的位置
  * 想了解更多有关拖拽事件的信息，请查看产品手册【UI拖拽事件】
  * 示例脚本：
  
  ```TypeScript
  //写在格子的UI脚本中
  import BagItem_generate from "./ui-generate/BagItem_generate";
  
  export default class BagItem extends BagItem_generate {
      // payLoad:TestDragDropPayLoad
      /** 
       * 构造UI文件成功后，在合适的时机最先初始化一次 
       */
      protected onStart() {
          this.icon.imageColor= new Type.LinearColor(Math.random(),Math.random(),Math.random(),1.0)
      }
  
      onTouchStarted(InGeometry :UI.Geometry,InPointerEvent:UI.PointerEvent) :UI.EventReply{
          console.log("OnTouch"+InPointerEvent.screenSpacePosition)
          return this.detectDragIfPressed(InPointerEvent, Type.Keys.AnyKey)
      }
  
      onTouchEnded(InGemotry: UI.Geometry, InPointEvent: UI.PointerEvent): UI.EventReply {
          return UI.EventReply.handled;
      }
  
      onDragDetected(InGeometry :UI.Geometry,InPointerEvent:UI.PointerEvent):UI.DragDropOperation {
          console.log("OnDrag"+InPointerEvent.screenSpacePosition)
  
          //如果想要拖动时，手指/鼠标保持与UI的相对位置不变
          return this.newDragDrop(this.rootCanvas,"DragDropTag",null,UI.DragPivot.TopLeft,(InPointerEvent.screenSpacePosition.clone().subtract(InGeometry.getAbsolutePosition().clone())).clone().divide(InGeometry.getAbsoluteSize().clone()).clone().multiply(-1));
          //如果想要拖动时，手指/鼠标移动到在UI中心
          // return this.newDragDrop(this.rootCanvas,"DragDropTag",null,UI.DragPivot.CenterCenter,Type.Vector2.zero);
      }
  
      //当释放格子的位置在面板外时，拖拽事件不会结束而是被取消，就会执行这里的逻辑，将此格子销毁
      onDragCancelled(InGemotry :UI.Geometry,InDragDropEvent:UI.PointerEvent) {
          this.uiWidgetBase.destroyObject()
          console.log("onDragCancelled"+InDragDropEvent.screenSpacePosition)
      }
  }
  ```
  
  ```TypeScript
  //写在面板的UI脚本中，当释放格子的位置在面板内时，执行结束拖拽事件
      //在这个示例中，onDrop不执行任何逻辑，只和onDragCancelled用来区分释放点在面板之内还是之外
      onDrop(InGemotry: UI.Geometry, InDragDropEvent: UI.PointerEvent, InOperation: UI.DragDropOperation) {
          console.log("OnDrop"+InDragDropEvent.screenSpacePosition)
          return true
      }
  ```
* 效果图：

![](https://cdn.233xyx.com/1681462157060_878.gif)

* 工程项目：
  [点击下载](https://cdn.233xyx.com/1681462156074_057.7z)
