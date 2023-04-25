# UI 控件-摇杆

**阅读本文大概需要 10 分钟**

本文概述了 UI 控件—摇杆的各项属性以及使用方法。

## 什么是摇杆？

**摇杆**是通过虚拟摇杆控制角色的移动和转向的工具，可用于制作控制人物移动的摇杆、按住一边射击一边转动视角的开火键、需要瞄准的技能等。
 
- 变换/对齐/通用/渲染属性请见 [UI 控件的基础属性](https://docs.ark.online/UI/UIWidget-BaseProperties.html)

## 摇杆属性- 摇杆设置

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnMolQooNGMahQNolHMdMhlc.png)

#### 摇杆类型

- 自定义：开发者需要自行编写控制效果
- 角色移动：控制角色移动的摇杆
- 摄像机移动：控制摄像机移动的摇杆

#### 摇杆位置

- 功能说明：调整摇杆在控件中的位置
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn4W0hKGzOIPU0kXQdT9RrAc.gif)

- 如果【摇杆位置】设置的 X 或 Y 值 ≥0 且 ≤1，摇杆图形相对与摇杆控件左上角的相对位置/摇杆控件的大小=（X,Y），会根据这个（X,Y）的比例来决定其渲染在整个摇杆控件的哪个位置

  - 如果摇杆控件使用上下对齐/左右对齐/自适应，父级大小变化后，摇杆图形会跟随摇杆控件大小变化而调整位置
  - 占据较大范围的摇杆控件，为了适配不同比例的屏幕，推荐【摇杆位置】使用 X 和 Y 值 ≥0 且 ≤1

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnCBWvhRhOmoM9G8vwY42BOc.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn4jrLjEVbma8R7888xWXgmc.gif)

- 如果【摇杆位置】设置的 X/Y 值在大于 1，那么摇杆图形相对与摇杆控件左上角的相对位置=（X,Y），实际渲染出来的摇杆图形会与摇杆控件的左上角保持相对位置固定为（X,Y）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnQYhoHXlNdb68qsNbEYg0Hf.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn5Z2ty6EUmrlwyAEG0Ch3xe.gif)

#### 摇杆背景大小

- 功能说明：调整摇杆背景图片的大小
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn8g6is5VCikllVgSoI9bRsf.gif)

#### 摇杆中心大小

- 功能说明：调整摇杆中心图片的大小；需注意摇杆背景图片和摇杆中心图片的大小决定了屏幕可见的摇杆图片大小，而该控件的可操作范围大小是由参数变换-坐标-大小决定的
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnRvA1k822N96G1nvsFc3jcc.gif)

#### 灵敏度比例

- 功能说明：此属性数值越大，摇杆的灵敏度越高。

#### 激活不透明度

- 功能说明：使用摇杆时，摇杆在激活状态下的中心按钮和背景图片的整体不透明度。

#### 淡隐时间

- 功能说明：不使用摇杆后，摇杆变为淡隐状态所需时间。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnRCXcVpgC4X0AXKwXfMm63e.gif)

#### 淡隐不透明度

- 功能说明：摇杆进入淡隐后的不透明度，也就是上图中停止使用摇杆后淡隐状态的不透明度。

#### 复位时间

- 功能说明：不使用摇杆后，摇杆从使用位置回归初始位置时所需时间。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnUspEzqHDfSlSQB3poJbW7b.gif)

#### 固定摇杆位置

- 功能说明：当固定摇杆位置时，摇杆位置不会改变，如下图；当不固定摇杆位置时，摇杆位置会移动到玩家首次触摸摇杆控件的位置，如上图
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnYvKaOpJDQvExNBvsz5wuYd.gif)

#### 是否被鼠标控制

- 功能说明：设置此摇杆是否允许被鼠标控制，此属性只作用于 PC 端，不会影响移动端
- 在为 PC 游戏端玩家设计控制方案时，为了**避免按键绑定与****直接****点击 UI 产生冲突**，需要合理的运用此项属性，例如：

  - 许多游戏中会使用鼠标左键作为开火键
  - 而编辑器的默认逻辑是直接点击 UI 的优先级高于按键绑定，也就是说如果摇杆控件在屏幕中占据较大范围，鼠标左键点击在摇杆控件范围内都将优先操控摇杆，而不会触发开火
  - 因此推荐较大范围的摇杆控件不勾选是否被鼠标控制；如果希望 PC 端玩家也能使用鼠标操控此摇杆，则需要勾选是否被鼠标控制
- 更多关于键鼠按键绑定的介绍请见[按键绑定（针对 PC 端）及预设 UI](https://docs.ark.online/UI/KeybindsandPremadeUI.html)
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnl6Djl0iO85KMr8UhHvPjCb.gif)

## 摇杆属性-样式

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnoc8BWWLPGba0ah1DHIEO8g.png)

#### 摇杆背景图片

- 功能说明：配置摇杆的背景图片，图片相关属性介绍请见 [UI 控件-图片](https://meta.feishu.cn/wiki/wikcnFg4z5zLX0puYIncTBIJGtf)
- 按下时图片和禁用时图片相关属性的作用是：在摇杆处于按下状态/禁用状态时，使摇杆背景图片产生不同的效果，类似于按钮的过渡模式。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn7SEU5SPW7F55lA4YS8Zosb.gif)

#### 摇杆中心图片

- 功能说明：配置摇杆的中心图片，图片相关属性介绍请见 [UI 控件-图片](https://meta.feishu.cn/wiki/wikcnFg4z5zLX0puYIncTBIJGtf)
- 按下时图片和禁用时图片相关属性的作用是：在摇杆处于按下状态/禁用状态时，使摇杆中心图片产生不同的效果，类似于按钮的过渡模式。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnaBrJ171JOO9K33EfOpJqyf.gif)

## 如何使用摇杆？

- 摇杆不仅可以用来控制角色移动，还可以用来制作需要瞄准的攻击按钮，比如开枪射击/释放魔法都会需要用到摇杆制作的攻击按钮，比如长按并拖动摇杆时进行扫射，或者拖动摇杆进行瞄准，并在松开后发射

### 示例一：使用摇杆制作能扫射的射击按钮

- 这里我们想实现按住摇杆射击，同时拖动摇杆还能控制摄像机方向来进行扫射，松开摇杆停止射击：

  - 首先我们将摇杆模式设置为【摄像机控制】，然后编写脚本
  - 推荐灵敏度比例为（0.08,0.06），横向转动比纵向转动的灵敏度稍高一些

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn8X9tfyKwc7av8K3mFEilrc.png)

- 示例脚本：

```ts
export default class WeaponUI extends WeaponUI_Generate {
    protected onStart() {
        
        //按下摇杆，开始射击
        this.right_fire.onJoyStickDown.add(() => {
            console.error("right_fire onJoyStickDown");
            if(!this.curWeapon) return;
            this.curWeapon.startFire();
        });
        
        //释放摇杆，停止射击
        this.right_fire.onJoyStickUp.add(() => {
            console.error("right_fire onJoyStickUp");
            if(!this.curWeapon) return;
            this.curWeapon.stopFire();
        });
    }
    
    //startFire
    public startFire() {
        if (this.weaponObj == null || this.isCanFire != 0) return;
        //切换姿态
        this.chara.animationStance = this.weaponAction.aimStance;
        this.weaponObj.startFire();
        this.isFiring = true;
        if(!this.isAimming) {
            this.weaponObj.aimComponent.enableAiming(true);
        }
    }

    //stopFire
    public stopFire() {
        if (this.weaponObj == null) return;
        this.weaponObj.stopFire();
        this.isFiring = false;
        //切换姿态
        this.chara.animationStance = this.weaponAction.holdStance;
        if(!this.isAimming) {
            this.weaponObj.aimComponent.enableAiming(false);
        }
    }
}
```

- pc端效果：
![](https://cdn.233xyx.com/1681614349826_342.gif)
- 移动端效果：<video controls src="https://cdn.233xyx.com/1681614130168_428.mp4"></video>
- 工程文件：  [点击下载](https://cdn.233xyx.com/1681467995344_224.7z)

### 示例二：使用摇杆制作瞄准后发射的技能按钮

- 这里我们想实现用摇杆控制角色面朝方向来进行瞄准，松开摇杆后发射技能：

  - 首先我们将摇杆模式设置为【无】，然后自行编写拖动摇杆后的逻辑

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcng54JtH5zXfw2NiRXjCjNNo.png)

- 示例脚本：

```ts
export default class AbilityUIControl extends UI.UIBehavior {
    player: Gameplay.Player;
    _Joystick: UI.VirtualJoystickPanel;
    _rotation:Type.Rotation
    Construct() {
        this.InitEvents()
    }

    InitEvents() {
        //找到对应的摇杆
        let _Joystick = this.uiWidgetBase.findChildByPath('Canvas/VirtualJoystickPanel') as UI.VirtualJoystickPanel
        //按下摇杆后调整FOV和灵敏度
        _Joystick.onJoyStickDown.add(() => {
            Gameplay.getCurrentPlayer().character.cameraSystem.cameraFOV=70
            _Joystick.inputScale=(new Type.Vector2(0.2, 0.2))
        });
        //转动摇杆的时候记录方向，并修改角色面朝方向
        _Joystick.onInputDir.add((vec : Type.Vector2)=>{
            if(vec.length>0){
                this._rotation=new Type.Rotation(0,0,Gameplay.getCurrentPlayer().character.cameraSystem.cameraWorldTransform.rotation.z-Math.atan2(vec.normalized.y, vec.normalized.x)/Math.PI*180+90)
                Gameplay.getCurrentPlayer().character.relativeRotation =this._rotation
            }
        });
        //松开摇杆的时候，发送射击事件和方向，并把FOV和灵敏度调回去
        _Joystick.onJoyStickUp.add(() => {
            Events.dispatchToServer("_magicattacking",this._rotation);
            Gameplay.getCurrentPlayer().character.cameraSystem.cameraFOV=90
            this._Joystick.inputScale=(new Type.Vector2(0.5, 0.5))
        });
    }
}
```

- 示例效果：<video controls src="https://cdn.233xyx.com/1681467994749_891.mp4"></video>
