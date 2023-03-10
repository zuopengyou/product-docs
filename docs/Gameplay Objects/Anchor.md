# 空锚点

| 修改日期           | 修改内容 | 所属编辑器版本 |
| ------------------ | -------- | -------------- |
| 2022 年 9 月 28 日 | 文档创建 | 015            |

<strong>阅读本文预计 10 分钟</strong>

本文概述了空锚点的工作机制，展示在编辑器创建并使用空锚点的过程和空锚点在游戏中的应用。教程内容包含空锚点功能对象的属性面板，类对象属性和接口以及一个示例工程。

# 什么是空锚点

空锚点是一个提供无内容根节点的对象，给开发者可以自定义对象锚点位置的功能。空锚点可以帮助开发者解决由于各类资源对象中锚点不统一而导致操作它们交互或者修改 Transform 时表现不正确的问题。例如某些枪械模型锚点在枪口，导致角色拾取枪械时枪口插入角色手部插槽而不是枪把。

空锚点在编辑器中以功能对象的形式存在，打开编辑器后在左侧资源栏中的“逻辑资源”中，选取“游戏功能对象”，红框中就是空锚点，资源 ID 为 25782。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnAWNoJO2dqmcKP1FTqMOlof.png)

# 空锚点 都包含什么

空锚点作为一个无内容对象没有自己的属性和接口，它只是单纯继承父类 GameObject。关于父类 GameObject 见”游戏对象“文档。

# 如何合理利用 / 使用 空锚点

### <strong>在编辑器工作区中</strong><strong>直接</strong><strong>使用：</strong>

1. <strong>将空锚点拖入场景</strong>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnR7KREpOcGve18dIyhvQH3c.png)

1. <strong>将希望修改锚点的对象挂载到空锚点下方，选中空锚点，工作区内显示所有子物体整体包围盒</strong>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn3MJx7FUKeDlmlEwCDFbakd.png)

1. <strong>修改子对象的 Transform 使空锚点与期望锚点位置重合</strong>

空锚点提供两个快捷选项来获取自身相对子对象的偏移值：自动居中和顶点吸附。中点和顶点都是以空锚点底下挂载的所有对象的整体来计算的。此外还提供锚点偏移输入使用户自定义锚点位置并可视化于工作区中。该值对修改子对象相对位置有参考意义（取反后赋值到子对象）。同时该功能方便在工作区以新锚点位置对挂载子对象进行统一操作。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnuZwZH9ddnSu5RUygrasYRb.png)

配置过程如下所示：

1. <strong>空锚点作为挂载对象的根节点提供交互的起点</strong>

修改锚点前：模型插入插槽后表现不正确

修改锚点后：模型插入插槽后表现正确

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnWIXUrlhudio3ioBvKkz1Rb.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnjHFPIvmtolYi0ZqEZEXPwb.png)

### 在代码中动态生成空锚点

1. 将空锚点功能对象拖入优先加载栏，或者在代码中预加载空锚点的资源 ID，不然需要使用异步 Spawn 才能使用对应资源

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnrg0UvniZk28hfpIcsuAV6b.png)

```ts
@MWCore.MWProperty()
preloadAssets: string = "25782";
```

1. 动态 spawn 空锚点，调用接口将对象 attach 到空锚点上

```ts
// 普通spawn生成，没有优先加载或预加载资源则无法生成
let anchor= MWCore.GameObject.spawnGameObject("25782") as GamePlay.Anchor;

// 异步spawn生成
let anchor= await MWCore.GameObject.asyncSpawnGameObject("25782") as GamePlay.Anchor;


let mesh = MWCore.GameObject.spawnGameObject("20809") as GamePlay.StaticMesh;
mesh.attachToGameObject(anchor);
mesh.setRelativeLocation(Type.Vector.zero); // 新锚点的相对位置
mesh.setRelativeRotation(Type.Rotation.zero); // 新锚点的相对旋转
```

# 

# 使用 空锚点 的注意事项与建议

1. 空锚点默认拖出来是静态但一般都会需要修改它，所以建议修改为动态。
2. 锚点偏移设置的功能有歧义，后续对齐后再更新
