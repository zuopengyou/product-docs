# UI 拖拽事件

**阅读本文大概需要 15 分钟**

本文档介绍了如何制作可进行拖放操作的UI，这常用于实现背包内物品拖拽的效果

## UI拖拽事件及相关函数

### onDragDetected(InGemotry :UI.Geometry,InPointerEvent:UI.PointerEvent) : UI.DragDropOperation
- 当触发拖拽时返回一次生成的拖拽事件
- InGeometry :UI.Geometry可以用来获取UI的坐标信息
- InPointerEvent:UI.PointerEvent可以用来获取鼠标点击或者滑动的信息
- 注意需要先在onTouch事件中调用detectDrag(dragKey: Type.Keys): EventReply或者detectDragIfPressed(inPointEvent: PointerEvent, dragKey: Type.Keys): EventReply，这代表开始进行检测是否有拖拽操作，这之后才能触发onDragDetected事件
- 在onDragDetected事件里使用newDragDrop(inVisualWidget: Widget, inTag?: string, inPayLoad?: any, inPivot?: DragPivot, inOffset?: Type.Vector2): DragDropOperation来返回新的拖拽事件
  - inVisualWidget: Widget 传入所生成的拖拽事件在拖拽时展示的UI，注意拖拽用于展示的UI内容会在之后销毁，因此这里最好使用新建的临时UI
  - inTag?: string 传入所生成的拖拽事件的标签文本
  - inPayLoad?: any 传入拖拽事件数据信息
  - inPivot?: DragPivot 传入拖拽显示UI的锚点
  - inOffset?: Type.Vector2 传入拖拽显示UI相对于锚点的偏移的百分比，inPivot和inOffset共同决定了鼠标点击或滑动处与此展示UI的相对位置

**示例：**

```ts
     /**
     * 当这个UI界面是可以接收事件的时候
     * 手指或则鼠标触发一次Touch时触发
     * 返回事件是否处理了
     * 如果处理了，那么这个UI界面可以接收这次Touch后续的Move和End事件
     * 如果没有处理，那么这个UI界面就无法接收这次Touch后续的Move和End事件
     */
    onTouchStarted(InGeometry :UI.Geometry,InPointerEvent:UI.PointerEvent) :UI.EventReply{
        return this.detectDragIfPressed(InPointerEvent, Type.Keys.AnyKey)
    }
      /**
     * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
     * 可以触发一次拖拽事件的开始生成
     * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
     */
    protected onDragDetected(InGemotry :UI.Geometry,InPointerEvent:UI.PointerEvent):UI.DragDropOperation {
        let ui=UI.createUIByName("NewUI")
        return this.newDragDrop(ui,"DragDropTag",null,UI.DragPivot.CenterCenter,Type.Vector2.zero);
    }
```

### onDrop(InGemotry :UI.Geometry,InDragDropEvent:UI.PointerEvent,InDragDropOperation:UI.DragDropOperation) : boolean
- 拖拽事件在这个UI完成释放时触发，返回true表示处理完成这次事件；这里可以编写释放UI时想要触发的逻辑
- 拖拽事件所展示的UI会自动销毁，如果仍想要展示此UI需要重新创建

**示例：**

```ts
    /**
     * 拖拽操作生成事件触发后在这个UI释放完成时
     * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
     */
    protected onDrop(InGemotry :UI.Geometry,InDragDropEvent:UI.PointerEvent,InDragDropOperation:UI.DragDropOperation):boolean {
        let UI1=UI.createUIByName("NewUI")
        this.uiWidgetBase.rootContent.addChild(UI1)
        UI1.position=(new Type.Vector2(UI.absoluteToLocal(InGemotry,InDragDropEvent.screenSpacePosition).x-UI1.size.x*0.5,UI.absoluteToLocal(InGemotry,InDragDropEvent.screenSpacePosition).y-UI1.size.y*0.5))
        return true;
    }
```

### onDragEnter(InGemotry :UI.Geometry,InDragDropEvent:UI.PointerEvent,InDragDropOperation:UI.DragDropOperation) : void
- 当有正在拖拽的UI进入这个UI的范围内时触发

**示例：**

```ts
    /**
     * 拖拽操作生成事件触发后进入这个UI时触发
     */
    protected onDragEnter(InGemotry :UI.Geometry,InDragDropEvent:UI.PointerEvent,InDragDropOperation:UI.DragDropOperation) {
        console.warn("onDragEnter"+InDragDropEvent.screenSpacePosition)
    }
```


### onDragLeave(InDragDropEvent:UI.PointerEvent,InDragDropOperation : UI.DragDropOperation) : void
- 当有正在拖拽的UI离开这个UI的范围内时触发

**示例：**

```ts
    /**
     * 拖拽操作生成事件触发后离开这个UI时触发
     */
    protected onDragLeave(InDragDropEvent:UI.PointerEvent,InDragDropOperation : UI.DragDropOperation) {
        console.warn("onDragLeave"+InDragDropEvent.screenSpacePosition)
    }
```


### onDragCancelled(InDragDropEvent:UI.PointerEvent,InDragDropOperation : UI.DragDropOperation) : void
- 拖拽事件没有被完成而是取消时触发
- 如果释放的时候没有触发onDrop事件就结束了，则会触发onDragCancelled；也可以通过函数cancelDragDrop/endDragDrop来取消拖拽事件

**示例：**

```ts
    /**
     * 拖拽操作生成事件触发后，拖拽事件没有完成而是取消时触发
     */
    protected onDragCancelled(InDragDropEvent:UI.PointerEvent,InDragDropOperation : UI.DragDropOperation) {
        console.warn("onDragCancelled"+InDragDropEvent.screenSpacePosition)
    }
```

### onDragOver(InGeometry :UI.Geometry,InDragDropEvent:UI.PointerEvent,InDragDropOperation:UI.DragDropOperation):boolean
- 当有正在拖拽的UI经过这个UI的范围内时触发，返回true表示处理完成这次事件

**示例：**

```ts
    /**
     * 拖拽操作生成事件触发后经过这个UI时触发
     * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
     */
    protected onDragOver(InGeometry :UI.Geometry,InDragDropEvent:UI.PointerEvent,InDragDropOperation:UI.DragDropOperation):boolean {
        console.warn("onDragOver"+InDragDropEvent.screenSpacePosition)
        return true;
    }
```

### 其他相关函数
- UIBehavior类下的detectDrag/detectDragIfPressed函数，用于开始检测是否有拖拽操作
- UIBehavior类下的newDragDrop函数，用于创建新的拖拽事件
  - 这三个函数在前文onDragDetected的部分已经介绍过了

**示例：**

```ts
    class UIBehavior {
        /**
         * @description 触发DragDrop事件的检测
         * @effect  只在客户端调用生效
         * @param dragKey usage:触发按键 default:Type.Keys
         * @returns 返回触发的事件回复
         */
        detectDrag(dragKey: Type.Keys): EventReply;
        /**
         * @description 如果事件检测通过就触发DragDrop事件的回复
         * @effect  只在客户端调用生效
         * @param inPointEvent usage:传递触发的事件信息
         * @param dragKey usage:触发按键
         * @returns 返回触发的事件回复
         */
        detectDragIfPressed(inPointEvent: PointerEvent, dragKey: Type.Keys): EventReply;
        /**
         * @description 创建DragDrop事件
         * @effect  只在客户端调用生效
         * @param inVisualWidget usage:拖拽显示的UI控件
         * @param inTag usage:标签文本 default:""
         * @param inPayLoad usage:拖拽事件数据信息 default:null
         * @param inPivot usage:拖拽显示UI的锚点 default:UIType.DragPivot.TopLeft
         * @param inOffset usage:拖拽显示UI相对于锚点的偏移的百分比 default:vector2(0,0)
         * @returns 返回触发的事件回复
         */
        newDragDrop(inVisualWidget: Widget, inTag?: string, inPayLoad?: any, inPivot?: DragPivot, inOffset?: Type.Vector2): DragDropOperation;
    }
```
- 还有一些拖拽事件相关的函数，可以用来中断/获取/判断当前的拖拽事件

```ts
declare namespace UI {
        /**
         * @description 中断一个拖拽事件, 传入一个操作的事件
         * @effect 只在客户端调用生效
         * @param InReply usage:事件
         */
        function endDragDrop(InReply: EventReply): void;
        /**
         * @description 中断所有的DragDrop
         * @effect 只在客户端调用生效
         */
        function cancelDragDrop(): void;
        /**
         * @description 判断当前是否有一个DragDrop事件
         * @effect 只在客户端调用生效
         * @returns boolean
         */
        function isDragDropping(): boolean;
        /**
         * @description 获取当前的DragDrop事件
         * @effect 只在客户端调用生效
         * @returns 返回当前的DragDrop事件
         */
        function getDragDroppingContent(): DragDropOperation;
    }
```
- DragDropOperation类函数，可用于获取指定UI拖拽事件的信息
  - 详见 [DragDropOperation类API文档](https://api-docs.ark.online/classes/UI.DragDropOperation.html)

```ts
    class DragDropOperation {
        /**
         * @description 判断是否相同
         * @effect 只在客户端调用生效
         * @param other usage:另一个UI拖拽事件
         * @returns boolean
         */
        equal(other: DragDropOperation): boolean;
        /**
         * @description 获取Tag 标签
         * @effect 只在客户端调用生效
         * @returns 返回tag
         */
        getTag(): string;
        /**
         * @description 获取拖拽显示的UI
         * @effect 只在客户端调用生效
         * @returns 拖拽显示的UI
         */
        getDragVisualWidget(): Widget;
        /**
         * @description 获取拖拽锚点
         * @effect 只在客户端调用生效
         * @returns 拖拽锚点
         */
        getDragPivot(): DragPivot;
        /**
         * @description 获取拖拽UI的百分比偏移
         * @effect 只在客户端调用生效
         * @returns 百分比偏移
         */
        getOffset(): Type.Vector2;
        /**
         * @description 获取传递的数据信息
         * @effect 只在客户端调用生效
         * @returns 数据信息
         */
        tryGetDragDropPayLoad(): DragDropPayLoad;
        /**
         * @description 获取传递的数据信息
         * @effect 只在客户端调用生效
         * @returns 数据信息
         */
        tryGetDragDropPayLoadAs<T extends DragDropPayLoad>(): T;
    }
```
## UI拖拽事件及相关函数
### 示例一：制作一张最简单的可拖拽图片
* **step.1** 新建一个NewUI文件，并把允许拖动的UI内容单独放在这个UI文件里面作为一个自定义UI控件，然后编写脚本
* 在这个例子中，我们想要拖拽的是一张空白图片
* **注意应将Root的对齐方式设置为左上对齐**

![](https://cdn.233xyx.com/1684047509352_708.png)

```TypeScript
import DefaultUI_generate from "./ui-generate/NewUI_generate";

//创建一个继承UI.DragDropPayLoad的TestDragDropPayLoad类，传入newDragDrop函数作为参数payLoad，跟随拖拽事件传递一些信息
export class TestDragDropPayLoad extends UI.DragDropPayLoad {

    private test1 : UI.UserWidget ;

    public get Test1() {
        return this.test1;
    }
    public set Test1(v :UI.UserWidget) {
         this.test1 = v;
    }
}

export default class NewUIScript extends NewUI_generate {

    protected onStart() {
    }
    
    //当玩家触摸到此UI时，开始检测是否发生拖拽操作
    onTouchStarted(InGeometry :UI.Geometry,InPointerEvent:UI.PointerEvent) :UI.EventReply{
        console.log("OnTouch"+InPointerEvent.screenSpacePosition)
        return this.detectDragIfPressed(InPointerEvent, Type.Keys.AnyKey)
    }
        //当检测到发生拖拽操作时，创建一个新的拖拽事件，同时设置此拖拽事件的展示UI、tag、数据信息、锚点及偏移
    protected onDragDetected(InGeometry :UI.Geometry,InPointerEvent:UI.PointerEvent):UI.DragDropOperation {
        console.log("OnDrag"+InPointerEvent.screenSpacePosition)
        let ui=UI.createUIByName("NewUI")

        //这里我们用payLoad参数传递的信息是这个UI对象，以便于在onDrop时创建一个新的UI对象并销毁旧的
        const payLoad = new TestDragDropPayLoad();
        payLoad.Test1=this.uiWidgetBase
        return this.newDragDrop(ui, "DragDropTag", payLoad, UI.DragPivot.CenterCenter, Type.Vector2.zero);  
    }
}
```

* **step.2** 然后在监听释放的另一个UI文件（这个例子中直接使用了DefaultUI文件）的UI脚本内编写释放的逻辑；
* 在这个例子中，我们不需要指定释放在某个UI上触发的逻辑，而是希望在整个屏幕中监听这张空白图片的释放，在释放的位置重新创建一个新的空白图片，并销毁旧的空白图片，因此可以就在新建项目的DefaultUI文件的UI脚本中编写onDrop事件

```TypeScript
import {TestDragDropPayLoad} from "./NewUIScript";
import DefaultUI_generate from "./ui-generate/DefaultUI_generate";

export default class UIDefault extends DefaultUI_generate {

    /** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() {
    }

    /**
     * 拖拽事件完成
     */
    onDrop(InGemotry: UI.Geometry, InDragDropEvent: UI.PointerEvent, InOperation: UI.DragDropOperation) {
        console.warn("OnDrop"+InDragDropEvent.screenSpacePosition)
        //重新创建一个空白图片的自定义UI并设置位置
        let ui1=UI.createUIByName("NewUI")
        this.uiWidgetBase.rootContent.addChild(ui1)
        ui1.position=(new Type.Vector2(UI.absoluteToLocal(InGemotry,InDragDropEvent.screenSpacePosition).x-ui1.size.x*0.5,UI.absoluteToLocal(InGemotry,InDragDropEvent.screenSpacePosition).y-ui1.size.y*0.5))
        console.log(ui1.position);
        //把旧的空白图片UI销毁
        const payLoad = InOperation.tryGetDragDropPayLoadAs<TestDragDropPayLoad>();
        const test1 = payLoad.Test1;
        test1.destroyObject()
    }

     /**
     * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
     */
    protected onDragCancelled(InGemotry :UI.Geometry,InDragDropEvent:UI.PointerEvent) {
        console.warn("onDragCancelled"+InDragDropEvent.screenSpacePosition)
}
```

* **step.3** 最后我们把空白图片的自定义UI控件（也就是NewUI文件）拖入到DefaultUI文件中；也可以使用动态创建的方法，然后运行游戏，我们就得到了一张可以自由拖拽改变位置的空白图片

![](https://cdn.233xyx.com/1684047509197_980.png)

![](https://cdn.233xyx.com/1684047509420_956.gif)

- 工程文件：  [点击下载](https://cdn.233xyx.com/1684119406149_228.7z)

### 示例二：制作一个有拖拽功能的背包面板

* **step.1** 新建一个BagItem文件，并把允许拖动的UI内容单独放在这个UI文件里面作为一个自定义UI控件
* 这里我们把所有UI内容挂在一个自建的容器下，便于拖拽两个格子交换位置时直接交换整个容器
* 每个格子都要允许被拖拽，和前面的例子一样，使用onDragDetected事件来新建UI拖拽事件
* 需要有在有其他格子被拖拽到这个格子上时，实现两个格子交换位置的功能，这部分逻辑写在onDrop事件里
* 还需要制作一个拖出背包面板并释放就丢弃物品的效果，这部分逻辑写在onDropCancelled事件里
* **注意应将Root的对齐方式设置为左上对齐**

![](https://cdn.233xyx.com/1684047509108_232.png)

```TypeScript
import BagItem_generate from "./ui-generate/BagItem_generate";
//创建一个继承UI.DragDropPayLoad的TestDragDropPayLoad类，传入newDragDrop函数作为参数payLoad，跟随拖拽事件传递一些信息
export class TestDragDropPayLoad extends UI.DragDropPayLoad {

    private test1 : UI.UserWidget ;

    public get Test1() {
        return this.test1;
    }
    public set Test1(v :UI.UserWidget) {
         this.test1 = v;
    }
}

export default class BagItem extends BagItem_generate {
    /** 
     * 构造UI文件成功后，在合适的时机最先初始化一次 
     */
    protected onStart() {
        //给每个格子创建时随机改变图片的颜色，这里我们是模拟每个格子都是不同的物品
        this.icon.imageColor= new Type.LinearColor(Math.random(),Math.random(),Math.random(),1.0)
    }

    //当玩家触摸到此UI时，开始检测是否发生拖拽操作
    onTouchStarted(InGeometry :UI.Geometry,InPointerEvent:UI.PointerEvent) :UI.EventReply{
        console.log("onTouchStarted"+InPointerEvent.screenSpacePosition)
        return this.detectDragIfPressed(InPointerEvent, Type.Keys.AnyKey)
    }
    
    //触发DragDrop检测事件，准备创建一个DraDrop事件
    onDragDetected(InGeometry :UI.Geometry,InPointerEvent:UI.PointerEvent):UI.DragDropOperation {
        console.log("onDragDetected"+InPointerEvent.screenSpacePosition)
        let ui=UI.createUIByName("BagItem")
        const payLoad = new TestDragDropPayLoad();
        payLoad.Test1=this.uiWidgetBase
        return this.newDragDrop(this.rootCanvas, "DragDropTag", payLoad, UI.DragPivot.CenterCenter, Type.Vector2.zero); 
    }
    
    //拖出背包面板并释放就丢弃物品的效果
    onDragCancelled(InGemotry :UI.Geometry,InDragDropEvent:UI.PointerEvent) {
        this.uiWidgetBase.destroyObject()
        console.log("onDragCancelled"+InDragDropEvent.screenSpacePosition)
    }
    
    //在有其他格子被拖拽到这个格子上时，实现两个格子交换位置的功能
    onDrop(InGemotry: UI.Geometry, InDragDropEvent: UI.PointerEvent, InOperation: UI.DragDropOperation) {
        console.log("OnDrop"+InDragDropEvent.screenSpacePosition)
        const payLoad = InOperation.tryGetDragDropPayLoadAs<TestDragDropPayLoad>();
        const test1 = payLoad.Test1;
        let uiExchange=test1.rootContent.getChildAt(0) as UI.Widget
        test1.rootContent.addChild(this.rootCanvas.getChildAt(0))
        this.rootCanvas.addChild(uiexchange)
        console.log(test1.parent);
        return true
    }
}
```

* **step.2** 制作一个简单的背包面板，并且编写手动添加物品格子的逻辑
* 背包面板里的容器需要打开自动布局和网格布局功能，这样动态添加的格子会自动排布；更多关于容器的功能请查看产品手册[UI 控件-容器](https://docs.ark.online/UI/UIComponent-Canvas.html)

```TypeScript
@UI.UICallOnly('')
export default class UIDefault extends UI.UIBehavior {
    Character: Gameplay.Character;

    /** 仅在游戏时间对非模板实例调用一次 */
    protected onStart() { 
        //设置能否每帧触发onUpdate
        this.canUpdate = false;

        //找到对应的按钮和容器
        const newBtn = this.uiWidgetBase.findChildByPath('RootCanvas/StaleButton') as UI.StaleButton
        const canvas = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas') as UI.Canvas
        canvas.autoLayoutHugContent.hugContentH=UI.UIHugContentVertically.FixHeight

        //点击按钮,创建UI
        newBtn.onPressed.add(()=>{
            //创建自定义UI组件并挂载到容器下
            let item= UI.createUIByName('/BagItem.ui') as UI.UserWidget
            canvas.addChild(item)
        })
 }
```

![](https://cdn.233xyx.com/1684047509505_024.png)

* 最终实现的效果：

![](https://cdn.233xyx.com/1684047509238_392.gif)

* 请注意：这里只是为了演示拖拽事件的用法，实际上如果想要制作一个有完整功能的背包，不仅背包内每个格子的样式要传递过去，对应的物品功能也要作为信息传递过去，大家可以自行尝试。

- 工程文件：  [点击下载](https://cdn.233xyx.com/1684119406303_693.7z)

# 注意事项

* 按钮、文本按钮、遮罩按钮等按钮类控件不支持使用UI拖拽事件（如果按到按钮类组件会直接触发click事件，而无法触发拖拽事件），因此请使用图片控件作为可拖拽UI，如果想要监听图片作为可拖拽UI是否被点击可以使用touch事件

![](https://cdn.233xyx.com/1684047509403_952.png)![](https://cdn.233xyx.com/1684047509280_290.gif)

* 注意应将被拖拽UI的Root节点的对齐方式设置为左上对齐
* 目前在摄像机滑动区边缘会无法触发onDrop事件，请尽量避免这种情况
