# UI 控件-按钮和文本按钮

**阅读本文大概需要 10 分钟**

本文概述了 UI 控件—按钮的各项属性以及使用方法。

## 什么是按钮？

**按钮**是任何游戏界面中最重要和最普遍的交互 UI 控件。按钮是图片 + 文本相结合的效果，并且与图片和文本有最明显差异是：可以进行点击交互，并发送事件等。

- 变换/对齐/通用/渲染属性请见 [UI 控件的基础属性](https://docs.ark.online/UI/UIWidget-BaseProperties.html)
- 文本属性请见 [UI 控件-文本](https://docs.ark.online/UI/UIComponent-Text.html) （仅文本按钮有此属性分组）
- 样式属性和过渡模式属性中的图片属性部分请见 [UI 控件-图片](https://docs.ark.online/UI/UIComponent-Image.html)

## 【按钮】和【文本按钮】的区别

- 目前 UI 编辑器提供了两种按钮控件，分别是【按钮】和【文本按钮】

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnuCCgxFyTP2SrbWkzWPZcOb.png)

- 【按钮】与【文本按钮】的区别在于配置按钮文字样式更加灵活，具体区别如下：

  - 【按钮】无【文本】对象属性分组，即无法直接配置文字；而【文本按钮】有【文本】对象属性分组，可以直接在一个控件内完成配置文字
  - 【按钮】可以成为【文本】的父级对象，并且不限制可挂载【文本】子级对象的个数；而【文本按钮】不可挂载任何子级对象
  - 除此之外，【按钮】的其他属性与【文本按钮】完全相同

**【文本按钮】的文字配置方法**
![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnbJR2DogUEktW2V89BCSDNb.png)

**【按钮】的文字配置方法**

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnOikAmAp2CTAfCmMAl5ga7e.png)

- 【按钮】的 API：UI.Button
- 【文本按钮】的 API：UI.StaleButton

## 按钮属性-过渡模式

### 是否有过渡模式

- 勾选后，将开启按钮的过渡模式，并展开按压图片和禁用图片的相关设置；在按压或者禁用按钮时，按钮可以显示不同的状态

  - 当过渡模式打开时：

    - 如果按钮可用时：按压时，按钮展示按压图片样式；不按压时，按钮展示普通图片样式
    - 如果按钮不可用：无论是否按压图片，都展示过渡模式中禁用图片样式
  - 当过渡模式关闭时：

    - 无论按钮是否可用，是否按压，按钮都固定展示普通图片样式

### 按压图片

- 点击按钮后，按钮的变化效果。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn0BRsIYKGSDXdk8qhLKKK1b.gif)

### 禁用图片

- 按钮不可用的情况下，按钮的变化效果。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnw5y8xtFgCJfQUo0qfepV62.gif)


## 如何使用按钮？

### 示例一：制作跳跃按钮

- 首先我们需要制作一个跳跃按钮的 UI，然后将 UI 与脚本进行绑定，随后编写脚本，脚本中要找到对应的 UI 控件，点击 UI 控件时实现跳跃。
- 示例脚本：

```ts
@UIBind('')
export default class DefaultUI extends UIScript {
    private character: Character;
    private anim1 = null;
    
    /** 仅在游戏时间对非模板实例调用一次 */
    protected  onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        
        //找到对应的跳跃按钮
        const jumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Jump') as Button
        const attackBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Attack') as Button
        
        //点击跳跃按钮,异步获取人物后执行跳跃
        jumpBtn.onPressed.add(()=>{
            if (this.character) {
                this.character.jump();
            } else {
                Player.asyncGetLocalPlayer().then((player) => {
                    this.character = player.character;
                    //角色执行跳跃功能
                    this.character.jump();
                });
            }
        })
  }
}
```

- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnw1gnt8Yj1oFn6Hz8qcsw6N.gif)

### 示例二：制作按钮选中态

- 当界面中存在多个同级按钮时，我们需要通过按钮的选中状态来区分我们选择了哪个按钮。接下来我们尝试制作性别选择菜单中按钮的选中态效果。
- 首先在 UI 编辑器中拼好以下 UI 控件：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnho3U7lYTpR0Jnhn1QtZVzb.png)

- 我们要明确按钮只有两种状态，分别是选中状态和未选中状态，所以我们可以利用三目运算符，判断按钮是否处于选中状态，来设置按钮的样式。
- 示例脚本：

```ts
    //性别选择的方法
    SexSelected(button_boy: Button,button_girl:Button) {
        //是否为男性？是的话，按钮图案为“120373”，不是的话，按钮图案为“120783”
        this.isMan ? button_boy.normalImageGuid="120373" : button_boy.normalImageGuid="120783";
        this.isMan ? button_girl.normalImageGuid="120783" : button_girl.normalImageGuid="120373";
    }
```

- 然后我们找到对应的 UI 按键，并通过点击事件，更改是否为男性的属性，然后执行性别的方法即可完成男女选中态的切换。（注意在点击之前也要执行一遍方法，初始化默认性别）
- 示例脚本：

```ts
export default class NewUIScript extends UIScript {
    character: Character;
    isMan:boolean = false;
    /** 仅在游戏时间对非模板实例调用一次 */
    protected  onStart() {
        const button_girl = this.uiWidgetBase.findChildByPath('Canvas/button_girl') as Button;
        const button_boy = this.uiWidgetBase.findChildByPath('Canvas/button_boy') as Button;
        // //默认执行一遍角色性别选择的方法
        // this.SexSelected(button_boy, button_girl);
        //点击性别女按钮时，是否为男的条件就为否，并且执行一遍角色性别选择的方法
        button_girl.onPressed.add(() => {
            this.isMan = false;
            this.SexSelected(button_boy, button_girl);
        });
    
        //点击性别男按钮时，是否为男的条件就为真，并且执行一遍角色性别选择的方法
        button_boy.onPressed.add(() => {
            this.isMan = true;
            this.SexSelected(button_boy, button_girl);
        });
    }
```

- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcncN6X8J7UwoM4XtWQUXFJ5g.gif)

- 以上两个示例的工程文件：[点击下载](https://cdn.233xyx.com/online/1qmlNL8GlSJ21694424668017.7z)

### **示例三：制作活动页签选择按钮**

- 我们依据上面的思路制作多页签的选中态，首先在 UI 编辑器中拼好以下 UI 控件：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnTSApe41sqG5a5djp40MKbe.png)

- 多页签与性别的区别就是具有更多的选择。这个时候我们可能需要使用 switch 语句进行判断，然后我们找到对应的 UI 按键，并通过点击事件，更改 switch 所判断的条件，即可完成多页签的选中态
- 关于如何制作使用容器制作页签面板，整理 UI 控件并使其方便管理，请参考 UI 控件-容器部分的思路
- 示例脚本：

```ts

/** 页签选择枚举 */
export enum PropSelect {
    Prop1,
    Prop2,
    Prop3,
    Prop4,
}

@UIBind('')
export default class activity extends UIScript {
	
    PlayerPropSelect: PropSelect = PropSelect.Prop1;

	protected onStart() { 
		const mBtn = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_Tab_Left/mCanvas_tab/mBtn') as StaleButton	
		const mBtn1 = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_Tab_Left/mCanvas_tab_1/mBtn1') as StaleButton	
		const mBtn2 = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_Tab_Left/mCanvas_tab_2/mBtn2') as StaleButton	
		const mBtn3 = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_Tab_Left/mCanvas_tab_3/mBtn3') as StaleButton	

		//点击页签按钮1时，页签选择为页签1，并且执行一遍页签选择的方法
		mBtn.onPressed.add(() => {
			this.PlayerPropSelect = PropSelect.Prop1;
			this.Prop_Select(mBtn, mBtn1, mBtn2, mBtn3)
		});

		//点击页签按钮2时，页签选择为页签2，并且执行一遍页签选择的方法
		mBtn1.onPressed.add(() => {
			this.PlayerPropSelect = PropSelect.Prop2;
			this.Prop_Select(mBtn, mBtn1, mBtn2, mBtn3)
		});
		//点击页签按钮3时，页签选择为页签3，并且执行一遍页签选择的方法
		mBtn2.onPressed.add(() => {
			this.PlayerPropSelect = PropSelect.Prop3;
			this.Prop_Select(mBtn, mBtn1, mBtn2, mBtn3)
		});

		//点击页签按钮4时，页签选择为页签4，并且执行一遍页签选择的方法
		mBtn3.onPressed.add(() => {
			this.PlayerPropSelect = PropSelect.Prop4;
			this.Prop_Select(mBtn, mBtn1, mBtn2, mBtn3)
		})
	}

	//创建一个页签选择的方法：判断条件为页签选择是哪个页签
	Prop_Select(Btn1: StaleButton, Btn2: StaleButton, Btn3: StaleButton, Btn4: StaleButton) {
		const mButton_Select = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_Tab_Left/mCanvas_tab/mButton_Select') as Image	
		const mButton_Select1 = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_Tab_Left/mCanvas_tab_1/mButton_Select1') as Image	
		const mButton_Select2 = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_Tab_Left/mCanvas_tab_2/mButton_Select2') as Image	
		const mButton_Select3 = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_Tab_Left/mCanvas_tab_3/mButton_Select3') as Image	
		const mCanvas = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas') as Canvas	
		const mCanvas_1 = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_1') as Canvas	
		const mCanvas_2 = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_2') as Canvas	
		const mCanvas_3 = this.uiWidgetBase.findChildByPath('mCanvas_Root/mCanvas_3') as Canvas	
		switch (this.PlayerPropSelect) {
			//页签选择为页签1时，按钮的颜色效果
			case PropSelect.Prop1:
				{
					mButton_Select.visibility=0
					mButton_Select1.visibility=1
					mButton_Select2.visibility=1
					mButton_Select3.visibility=1
					//使页签1可见，剩余隐藏
					mCanvas.visibility=0
					mCanvas_1.visibility=1
					mCanvas_2.visibility=1
					mCanvas_3.visibility=1
				}
				break;
			//页签选择为页签2时，按钮的颜色效果
			case PropSelect.Prop2:
				{
					mButton_Select.visibility=1
					mButton_Select1.visibility=0
					mButton_Select2.visibility=1
					mButton_Select3.visibility=1
					//使页签2可见，剩余隐藏
					mCanvas.visibility=1
					mCanvas_1.visibility=0
					mCanvas_2.visibility=1
					mCanvas_3.visibility=1
				}
				break;
			//页签选择为页签3时，按钮的颜色效果
			case PropSelect.Prop3:
				{
					mButton_Select.visibility=1
					mButton_Select1.visibility=1
					mButton_Select2.visibility=0
					mButton_Select3.visibility=1
					//使页签3可见，剩余隐藏
					mCanvas.visibility=1
					mCanvas_1.visibility=1
					mCanvas_2.visibility=0
					mCanvas_3.visibility=1
				}
				break;
			//页签选择为页签4时，按钮的颜色效果
			case PropSelect.Prop4:
				{
					mButton_Select.visibility=1
					mButton_Select1.visibility=1
					mButton_Select2.visibility=1
					mButton_Select3.visibility=0
					//使页签4可见，剩余隐藏
					mCanvas.visibility=1
					mCanvas_1.visibility=1
					mCanvas_2.visibility=1
					mCanvas_3.visibility=0
				}
				break;
		}
	}
}
```

- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnwQg1Pv8mqmSF3t3XJFkw8c.gif)

- 工程文件：  [点击下载](https://cdn.233xyx.com/online/sN6aAHihDL611694424668017.7z)
