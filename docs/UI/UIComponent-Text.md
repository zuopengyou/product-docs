# UI 控件-文本

**阅读本文大概需要 10 分钟**

本文概述了 UI 控件—文本的各项属性以及使用方法。

## 什么是文本?

**文本**是最基础的 UI 控件，即 2D 平面模式下，用于显示文字的控件，文字内容可以替换。

- 变换/对齐/通用/渲染属性请见 [UI 控件的基础属性](https://docs.ark.online/UI/UIWidget-BaseProperties.html)

## 文本属性-文本

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnszRhmLcMi1xEspl71LjyVh.png)

### 文本

- 修改文字内容

### 字体大小

- 修改文字的字体大小
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnY3ZzYncURlLNcROLqLw6df.gif)

### 字体间距

- 修改文字之间的间隔距离
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnJ28CsjgGjYeW39YydkQuLf.gif)

### 行距系数

- 修改每一行之间的间隔距离
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnk3sYbYlPTAh3wvDj4koadd.gif)

### 水平显示

- 此属性用于修改要使用的换行策略

  - 自动换行

    - 根据文本框大小以及内容字符自动计算，将溢出控件边界的内容进行换行
  - 剪裁

    - 不会自动换行，并且溢出控件边界的内容会被剪裁
  - 不剪裁

    - 不会自动换行，并且溢出控件边界的内容不会被剪裁

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnQQeZ7r6NNQJsBuQkqD4tre.gif)

### 自适应文本框

- 开启后会根据当前文本内容和文本控件大小，自动计算当前文本控件最适合的【字体大小】，尽可能大的充满整个文本框，而文本框大小不会变化

  - 当开启【自适应文本框】时，无法手动调整【字体大小】，也不能使用【变换-自动大小】
  - 【自适应文本框】的计算不考虑【字体描边宽度】、【阴影偏移】、【字体间距】和【行距系数】

    - 非默认值的【字体间距】、【行距系数】与【自适应文本框】同时使用时有可能会使文本超出文本框，因此请勿同时使用
    - 【字体描边宽度】描边宽度较小或【阴影偏移】偏移值较小的情况下不会超出文本框，可同时使用
  - 关闭【自适应文本框】功能后会退回开启自适应之前的【字体大小】

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnHCXXuNLqTTbmiWRDPh9bhh.gif)

- 使用场景：将游戏内中文批量翻译成英文，为了避免翻译后的英文会比中文长，导致超出文本框，可以开启【自适应文本框】，自动计算合适的文本大小；例如下图中，将字号大小为 58 号的汉字内容更换成英文后，英文的字号大小自动调整为 48 号

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnYFXa0nT4Bz237DFXBtMQPN.gif)

## 文本属性-样式

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnM0ugvMv54RGWJFWl21Tf1e.png)

### 字形

- 修改文字的字形（请注意，目前编辑器仅支持修改英文字形，汉字等其他语言暂不支持修改字形）
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnCpOCRjLoU3K0Cnt9Ro0oLc.gif)

### 删除线

- 修改文字是否添加删除线
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnSszoYp9ahGpe8CC6HXJlFh.png)

### 下划线

- 修改文字是否添加下划线
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnIMnw7EL2D8quIXjvGQcWFd.png)

### 字体颜色

- 修改文字的字体颜色
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnGNYTD3NnwPHhPI0DiQPZb8.gif)

### 阴影颜色

- 修改文字的阴影颜色，凸显文字的立体感
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnwMLeQzP8XeFS9Q7G0SaOPh.gif)

### 阴影偏移

- 修改文字的阴影的相对位置
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcno9jQBkFBnL4xx2mtF1u1Mh.gif)

### 水平对齐

- 左对齐

  - 文本内容以文本框水平方向的左侧靠齐的对齐方式
- 居中对齐

  - 文本内容以文本框水平方向的中间靠齐的对齐方式
- 右对齐

  - 文本内容以文本框水平方向的右侧靠齐的对齐方式

### 垂直对齐

- 上对齐

  - 文本内容以文本框垂直方向的上侧靠齐的对齐方式
- 居中对齐

  - 文本内容以文本框垂直方向的中间靠齐的对齐方式
- 下对齐

  - 文本内容以文本框垂直方向的下侧靠齐的对齐方式
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnFLDlG3pel88Gc2Oxt1gVUe.gif)

### 字体描边颜色

- 修改字体描边的颜色。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnqCquMTysKNUqQysZS72UGf.gif)

### 字体描边宽度

- 修改字体描边的宽度。
- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnZuS9q7PczOtpDOYCEYx4ZH.gif)

## 如何使用文本？

- 文本控件是比较基础的 UI 控件之一，与按钮不同，没有点击等交互功能，文本主要用于说明介绍。
- 举例说明：界面标题，公告说明，飘血数字等等。

### 示例一：制作显示角色速度

- 首先我们先创建一个 UI，并拖入文本控件。保存后，拖入主编辑器的对象列表中，生成 UI。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnj00PR4jM0IeVWzTzfGAAKf.png)

- 然后我们开始编写脚本的逻辑，找到当前角色并获取到角色的速度。
- 我们再创建一个脚本，找到咱们的 UI 文本控件，并且接受上面的速度事件，将获取到的角色速度显示在文本控件上。最后将这个脚本拖入 Root 目录下，完成与 UI 的绑定。
- 示例脚本：

```ts
@UI.UICallOnly('')
export default class UIDefault extends UI.UIBehavior{
    character: Gameplay.Character;
    speed:number
    /** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() { 
        //设置能否每帧触发onUpdate
        this.canUpdate = true;
        //找到对应的跳跃按钮
        const jumpBtn = this.uiWidgetBase.findChildByPath('Canvas/Button_Jump') as UI.StaleButton
        //点击跳跃按钮,异步获取人物后执行跳跃
        jumpBtn.onPressed.add(()=>{
            if (this.character) {
                this.character.jump();
            } else {
                Gameplay.asyncGetCurrentPlayer().then((player) => {
                    this.character = player.character;
                    //角色执行跳跃功能
                    this.character.jump();
                });
            }
        })
    }   
    /**
    * 每一帧调用
    * 通过canUpdate可以开启关闭调用
    * dt 两帧调用的时间差，毫秒
    */
    protected onUpdate(dt :number) {
        const textBlock = this.uiWidgetBase.findChildByPath('Canvas/TextBlock_2') as UI.TextBlock
    // 找到当前玩家角色
    Gameplay.asyncGetCurrentPlayer().then((player) => {
        this.character = player.character;
        textBlock.text= this.Character.velocity.x+""
    });
    }   
}
```

- 示意图：

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn5HapDZ4FTzKt0PvM8jxXjf.gif)

- 工程文件：  [点击下载](https://cdn.233xyx.com/1682231334747_525.7z)
