# 预制体功能说明

<strong>阅读本文大概需要 20 分钟</strong>

为了开发者更好的了解与使用预制体，本文主要包含以下 3 个内容：

（1）预制体简介（2）预制体使用指南（3）使用注意事项

# 预制体简介

## 预制体是什么

- 预制体是开发者根据设计目的，在编辑器中使用模型、特效、UI、脚本等资源进行组合制作的高级类资源

## 预制体的应用场景

- 编辑状态下重复创建结构、功能相同的场景对象和游戏逻辑对象

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnJo57NKVQRUsC6TINYvzomk.png)

（场景搭建）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnDeRWHiGqJ9EyxmFkHAZ2gb.png)

（游戏逻辑对象搭建，图中为即拖即用的四轮车）

- 运行状态下动态创建场景对象和游戏逻辑对象

（运行状态下动态创建）

## 预制体基础规则

- <strong>预制体结构</strong>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnY362BcnTsQQcPL98Io67Hf.png)

- 预制体均包含一个自动创建的预制体头结点
- 预制体头结点下为预制体子对象，子对象间可以是平级、父子级结构关系
- <strong>预制体引用对象</strong>

  - 编辑状态下将预制体拖拽挂载至主视口、对象管理器中的操作称为<strong>预制体引用</strong>，生成的对象称为<strong>预制体引用对象</strong>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnhsN5M3zEUZUHeA2sVbh4ld.png)

- 编辑状态下可修改预制体引用对象的结构及属性（修改结构后将变成实例状态）

（修改整体结构）

（修改任意节点的属性）

- <strong>预制体引用状态</strong>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnjzK50c1xyOmm4c4JXvChRf.png)

- 普通状态

  - 预制体引用对象未进行过结构修改的情况下称为<strong>普通状态（对象树中紫色形式显示）</strong>
  - 对于同一个预制体文件而言，使用<strong>实例状态</strong>下的“<strong>以预制体引用对象更新预制体功能</strong>”，预制体本身结构修改可以向全部普通状态预制体引用对象进行<strong>同步</strong>（本质上修改了.prefab 文件）

（同步结构修改）

- 实例状态

  - 预制体引用对象进行过<strong>结构修改</strong>的情况称为实例状态（对象树中<strong>黄色</strong>形式显示）
  - 预制体本身的任何修改都<strong>不会</strong>自动向实例状态预制体引用对象进行同步

# 预制体使用指南

## 预制体的创建与存储

- <strong>新建预制体</strong>

  - 方法 1：点击工具栏中【新建】菜单下的【新建预制体】按钮

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn5qZq6A6dVB6eYHiFBwEQ5Q.png)

- 方法 2：点击工程内容-预制体分类中【新建预制体】按钮

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn9Bmp1nIqNhqZ3TSyFlqHxh.png)

- <strong>已有对象生成为预制体</strong>

  - 方法 1：选中对象管理器中对象，点击右键菜单中【生成为预制体】，将选中对象及其子对象生成为预制体

    - 仅同一父节点的对象支持创建

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnmLnQKbMBV7ecapGW82uiRd.png)

- 方法 2：选中对象管理器中某实例状态的预制体引用对象头结点，点击右键菜单中【另存为新预制体】，选中的实例状态预制体引用对象将与原预制体脱离引用关系，并生成为新预制体

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn6yzz1EH53MqttDoSZ2vXeg.png)

- 方法 3：从对象管理器中选中对象拖入至工程内容-预制体分类下

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnHLcsfzUejD8KT3bb87SL6b.png)

- 若选中的对象为同父节点且不包含预制体引用的对象，将选中对象及其子对象生成为新预制体，在工程内容-预制体根目录下创建预制体文件夹，在该文件夹中定位并选中预制体
- 对象管理器中该对象及其子对象变更为预制体引用对象
- <strong>预制体的存储</strong>

  - 工程内容-预制体分类中存储着当前工程下所有的预制体资源

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnUy0z6rBLtCAHgjL9165dvd.png)

- 每个预制体以单独的 prefab 文件存在，其所<strong>引用</strong>的脚本、UI、材质均分别存于对应的文件类型下，<strong>不会与 prefab 文件整合</strong>

  - 名为“示例”的预制体中引用了名为“DefaultUI”的 UI 文件和名为“test”的脚本文件，锥体 1 引用了名为“新建材质”的材质文件

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnvncZmzqCJQjlxlRcA9lYlb.png)

```ts
- 此时各文件存于各自的目录下
```

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnOkQ82fz9b99zOLluAU3qqd.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnl1nddNq834pobOofJfOjBf.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnXimx5brqoviqOXz4j9UQqf.png)

## 预制体的编辑

- <strong>预制体编辑视口中进行编辑</strong>

  - 入口 1：在工程内容中选中某预制体，点击右键菜单中【编辑】或双击预制体文件，可在预制体编辑视口中打开选中预制体进行编辑

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnZ0kpC3ztV9KViUdye5gEEd.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn4IQC5GJyWzW96Vg8iDBrMd.png)

（通过工程内容打开预制体进行编辑）

- 入口 2：在对象管理器中选中某预制体头结点，点击右键菜单中【编辑预制体】，可在预制体编辑视口中打开选中预制体进行编辑

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnTodZehIUXA8EphCrd60Nof.png)

（通过对象管理器打开预制体进行编辑）

- <strong>保存预制体修改</strong>

  - 预制体编辑视口中保存

    - 点击工程内容中【保存】按钮保存对预制体的修改

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnXLvo8qStJZCydWy9Mf3pme.png)

```ts
- 切换编辑状态及编辑对象时，点击保存提示弹窗中【保存】按钮
```

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnKnYwTaGciy7DZFYs3MxgCb.png)

- 主编辑器中保存

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnlCPbqkbyPVb1OFRKc3mbOg.png)

- 点击某预制体右键菜单中【以预制体引用对象更新预制体】，将当前在对象管理器中对预制体引用对象的修改保存
- 点击某预制体右键菜单中【另存为新预制体】，将当前在对象管理器中对预制体引用对象的修改另存为新预制体

## 预制体的使用

- <strong>编辑状态</strong>

  - 拖拽至对象管理器及主视口中创建预制体引用对象

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnjOIRlnQ8Nuj12afd0z6EQg.png)

- <strong>运行状态</strong>

  - 通过 API 动态生成预制体引用对象

```ts
/*动态生成预制体引用对象，GUID为本地资源库或工程内容中预制体GUID(需要预加载资源)*/
Core.GameObject.spawnGameObject("GUID")

/*异步生成预制体引用对象，GUID为本地资源库或工程内容中预制体GUID(无需预加载资源)*/
Core.GameObject.asyncSpawnGameObject("GUID")
```

## 预制体的删除

- 当工程内容中的预制体时，将校验场景中是否含有该预制体的引用对象

  - 若有引用对象，则弹出弹窗

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnGklAUKt00uFTyqWaUKztvg.png)

```ts
- 删除引用对象：删除此预制体的同时，删除此预制体在场景中的引用对象

- 解除引用关系：删除此预制体，但保留场景中的对象，使其变为普通对象，不再依赖于原预制体文件
```

- 若没有引用对象，则显示二次确认弹窗

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnJgOA8Raod912urXxpbKoNc.png)

- 删除预制体文件夹时，显示二次确认弹窗，点击确认后，将对文件夹中的所有预制体执行“<strong>删除引用对象</strong>”逻辑

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnhO189ai1LVtrybbD5shAwf.png)

## 预制体的导入、导出

- <strong>导出预制体</strong>

  - 在工程内容-预制体分类下选中某预制体，点击右键菜单中【导出】按钮，在资源管理器中选择导出路径后将该预制体打包导出
  - 将该<strong>预制体描述文件（.prefab 文件）</strong>以及<strong>所有其引用的文件</strong>全部导出，并保证文件之间的相对路径不变

    - 若脚本/UI 中引用了其他脚本，多次引用的脚本及路径信息一并导出，保证相对路径不变

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnmQqEtXaHNDMlVv80vX1fig.png)

- <strong>导入预制体</strong>

  - 点击工程内容-预制体分类下【导入预制体】按钮，在资源管理器中选择要导入的预制体后将预制体导入

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcne4rfPhEftcoqGBwjRZw7db.png)

- 导入时将解析预制体文件，并还原所有引用文件至工程中

  - 导入时将显示导入详情面板，给开发者提供 prefab 的结构信息

    - 若当前工程中的文件与导入的 prefab 有冲突，将给用户提供重命名或覆盖操作

      - 覆盖：选择覆盖，导入时将导入的文件覆盖导入；并在文件右侧显示覆盖图标

        - 当原工程中的文件与此文件发生冲突但路径不同时，显示提示如下图

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcna46w6Z9azlsXcbHTD4x5zh.png)

```ts
    - 重命名：选择重命名，导入时将导入的文件自动重命名导入

      - 对于脚本类型而言，若重命名修改的脚本正在被其他脚本引用，则树状结构中显示引用此脚本的脚本文件，并在此脚本后显示文本：“该脚本引用了xxx.ts，导入后请手动修改”
```

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnVons4asag0pOtEiDhkZ3Df.png)

```ts
  - 若与当前工程中的文件无冲突，则分两种情况

    - 新增：当前工程没有与该文件冲突的文件，显示<strong>绿色new标识</strong>

    - 忽略：当前工程存在一个完全相同的文件，此时不显示任何标识与操作
```

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnmaVXqJmPvRnRIU9UlEcOrS.png)

## 解除预制体

- 在对象管理器中，右键预制体头结点，提供解除预制体操作
- 该操作能够将预制体引用对象变为普通对象（紫色——白色）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnfC9Rw249yC5efo4RiCR6ab.png)

# 使用预制体功能的注意事项与建议

动态生成预制体时需注意预制体为非静态，满足动态生成的运行环境要求

使用 spawnGameObject 动态生成预制体时，需要 preload 预制体 GUID，或者将预制体拖入对象管理器中的优先加载区域

使用 asyncSpawnGameObject 异步生成预制体时，无需 preload 预制体 GUID
