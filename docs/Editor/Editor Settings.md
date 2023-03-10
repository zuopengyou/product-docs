# 编辑器各设置

<strong>阅读本文预计 30 分钟</strong>

<strong>本文概述了编辑器顶部菜单栏 - 设置内的可设置项</strong>

# 什么是编辑器设置

编辑器设置板块主要是为了方便开发者制作游戏，满足开发者对编辑器操作的定制化需求，针对编辑器基础功能提供的可设定项

# 编辑器设置都包含什么

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn6VgmSEWaoMU2YCWIUuVqvc.png)

# 如何使用编辑器设置

- 点击编辑器右上角 “设置” 图标按钮，呼出设置窗口，进入<strong>设置</strong>界面
- 设置界面内所有可设定项 <strong>均为选择后即时生效</strong>

## 3.1 世界设置

### 3.1.1 环境设置 - 重力

重力设置是设定当前世界内场景空间的重力值

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnB6Hj8Nz93OWaYgSo9K1fsd.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn6y6O0BRK9neLGHGgoo6qxd.png)

- <strong>重力模式</strong>

  - 提供经典、现实、动作、默认四种模式可供选择

| 重力模式 | 经典 | 现实 | 动作 | 默认  |
| -------- | ---- | ---- | ---- | ----- |
| 预设值   | -700 | -980 | -500 | -1600 |

- <strong>重力大小</strong>

  - 可自定义设定当前场景空间重力值
  - 重力值大小不做限制

### 3.1.2 玩家设置

玩家设置是设置当前工程游戏一个游戏房间内的<strong>玩家数量上限</strong>与<strong>预留玩家数量</strong>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnJm3D9cOmWY9w5qI4GVnSsb.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcna4Pia7KqwXtj8RwpqQK5Dg.png)

- <strong>玩家数量上限</strong>

  - 什么是玩家数量上限？

    - 即一个房间内可支持的最大玩家数量
  - 玩家数量上限设置规则

    - 默认值：5
    - 可输入/拖拽值：5 - 50

      - 若开发者已经设定了最大玩家数量和预留玩家数量后，再次修改最大玩家数量参数时需执行以下输入限制规则：

        - 最小值：最小值需 ≥5，且需比预留玩家数量参数大 1，输入新参数 - 预留玩家参数 ＜1，则自动置为预留玩家参数 +1
        - 最大值：50
- <strong>预留玩家数量</strong>

  - 什么是预留玩家数量？

    - 即一个游戏房间内预留一定数量的位置，供游戏好友拉人，好友跟房，房间列表加入使用，确保玩家通过上述功能进入游戏时有位置
  - 预留玩家数量设置规则

    - 默认值：0
    - 可输入/拖拽值：0-10

      - 当填写超过最大玩家数量时，自动修正参数=最大玩家数量 - 1

        - 如：

          - 最大玩家数量为 30，则预留玩家数量最大可设置为 10
          - 最大玩家数量为 10，则预留玩家数量最大可设置为 9

## 3.2 编辑器设置

### 3.2.1 自动备份

自动备份是指工程文件开启自动备份功能后，每达到设置的备份时间间隔进行的自动备份操作。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcniy3Vif9tz6i55bp4Iqi1Ib.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnExp9Y8McIBIiS1IpoWHKUg.png)

- <strong>自动备份开关</strong>

  - 开启/关闭主编辑器与子编辑器的自动备份功能，默认为<strong>开启</strong>状态。
- <strong>备份频率（分钟）</strong>

  - 开启自动备份功能后开始计时，每达到设置的备份时间间隔后进行自动备份。
  - 默认值：5
  - 可输入/拖拽值：1 - 60
- <strong>文件保存路径</strong>

  - 用于查看和打开当前<strong>工程备份文件</strong>的存储位置。
  - 首次打开编辑器创建工程时，路径不存在，第一次自动备份工程成功后，自动生成路径。

本地磁盘/MetaWorldSaved/Saved/MetaWorld<strong>/</strong><strong>AutoBackup/【工程名称】_Backup</strong>

- 支持用户自定义更改文件保存路径

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn1r412aF9zRbEs92Xc2W4Wg.png)

### 3.2.2 快捷键

支持编辑器各个基本操作的快捷键设定

（Tips：快捷键仅在英文输入法状态下生效）

#### 3.2.2.1 操作模式

编辑器共有移动、缩放、旋转三种操作模式，支持修改三种操作模式的快捷键设置。

- <strong>移动模式</strong>：W
- <strong>缩放模式</strong>：E
- <strong>旋转模式</strong>：R
- <strong>工具模式切换</strong>（三种模式间的相互切换）：空格键

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn0qIfkm9tbAtjaKnQv8IuAk.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnjhZCe6YyZGvbzOOCqqkyHh.png)

#### 3.2.2.2 对象操作

针对编辑器对象的各个基本操作，支持修改各个操作模式的快捷键设置。

- <strong>复制</strong>（对象复制）：Ctrl+C
- <strong>粘贴</strong>（对象粘贴）：Ctrl+V
- <strong>剪切</strong>（对象剪切）：Ctrl+X
- <strong>保存</strong>（工程保存）：Ctrl+S
- <strong>对象聚焦</strong>（所选对象聚焦于主视口中央）：F
- <strong>删除</strong>（对象删除）：Delete
- <strong>撤销</strong>（操作撤销至上一步）：Ctrl+Z
- <strong>恢复</strong>（操作恢复至下一步）：Ctrl+Y
- <strong>重命名</strong>（对象重命名）：F2
- <strong>创建文件夹</strong>（在选中的全局对象最下方插入新文件夹）：Ctrl+N

  - 该快捷键仅在<strong>对象管理器内生效 </strong>
- <strong>解除</strong>（将选中的文件夹删除，修改收纳对象的父对象为原文件夹的父对象）：Ctrl+Delete

  - 该快捷键仅在<strong>对象管理器内生效 </strong>
- <strong>移动对象至摄像机所在位置</strong>：Ctrl+W
- <strong>旋转对象至摄像机所对朝向</strong>：Ctrl+E

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnjy9JDcFUNnZuWgwwEJTtvc.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnnfWdDlP4uJmhXay87dzeib.png)

#### 3.2.2.3 测试

针对编辑器快速运行模式的快捷键设定

- <strong>出生点运行</strong>（起始位置为出生点的运行模式）：F5
- <strong>摄像机运行</strong>（起始位置为摄像机位置的运行模式）：F6

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnbYV6zGqYDgJU6s5ozi4vCe.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn95AQjYING0DeeNBk578zEe.png)

#### 3.2.2.4 摄像机移动

针对编辑器主视口 - 摄像机移动的快捷键设定

- <strong>前进</strong>（摄像机视角向前）：RightMouse+W
- <strong>后退</strong>（摄像机视角向后）：RightMouse+S
- <strong>向左</strong>（摄像机视角向左）：RightMouse+A
- <strong>向右</strong>（摄像机视角向右）：RightMouse+D
- <strong>向上</strong>（摄像机视角向上）：RightMouse+E
- <strong>向下</strong>（摄像机视角向下）：RightMouse+Q
- <strong>FOV 放大</strong>（摄像机视角推进）：RightMouse+C
- <strong>FOV 缩小</strong>（摄像机视角推远）：RightMouse+Z

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn7VGDeGhQWZbjhptyzLEyef.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnIYOMNBLwBwrTjCcCv9XY9f.png)

#### 3.2.2.5 其他

针对编辑器其他版块的快捷键设定

- <strong>新建</strong>（退出当前工程编辑界面，返回工程选择界面，新建空工程）：Ctrl+Alt+N

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnfURZeUurZiQXq3l5Gu0fqg.png)

### 3.3.3 语言设置

支持用户切换编辑器语言

- 当前已支持可切换的语言：

  - 中文
  - 英文

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnv2k7LcUDfXf7UsNy6zwQff.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnV7q197ClcHbLyeZywxKtIb.png)

### 3.3.4 画质分级模拟

#### Editor 画质模式

开发者可以在开发游戏时，设置 Editor 画质模式，以模拟不同级别画质下资源及场景的显示效果。

- 什么是 Editor 画质模式？

  - 开发者可以在主视口、PIE 下模拟不同画质分级的显示效果。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnMG86zORxZHJDvOZcNhmpMb.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnyIFMyR8cr4SCGpVcvxLVbe.png)

Editor 画质分级模拟中分为<strong>GPU</strong>性能分级和<strong>CPU</strong>性能分级。

- <strong>GPU 性能分级</strong>

  - GPU 性能分级的下拉菜单包括<strong>1-9 级</strong>、<strong>电影画质</strong>以及<strong>每个分级匹配到的用户数占比</strong>

    - 1 级（匹配用户约 39%）
    - 2 级（匹配用户约 21%）
    - 3 级（匹配用户约 5%）
    - 4 级（匹配用户约 8%）
    - 5 级（匹配用户约 16%）
    - 6 级（匹配用户约 4%）
    - 7 级（匹配用户约 3%）
    - 8 级（匹配用户约 2%）
    - 9 级（匹配用户约 2%）
    - 电影画质

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcny3SRjS7s3KJykoXEMKZ7Ze.png)

- <strong>CPU 性能分级</strong>

  - CPU 性能分级的下拉菜单包括<strong>1-9 级</strong>、<strong>电影画质</strong>以及<strong>每个分级匹配到的用户数占比</strong>

    - 1 级（匹配用户约 31%）
    - 2 级（匹配用户约 10%）
    - 3 级（匹配用户约 15%）
    - 4 级（匹配用户约 3%）
    - 5 级（匹配用户约 2%）
    - 6 级（匹配用户约 13%）
    - 7 级（匹配用户约 5%）
    - 8 级（匹配用户约 14%）
    - 9 级（匹配用户约 7%）
    - 电影画质（匹配用户约 1%）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnIZYn5ZZVb7gobzaOpd56Lh.png)

- Editor 画质模拟中，GPU 性能分级和 CPU 性能分级<strong>默认为电影画质</strong>。

#### Mobile 备用画质

开发者可以在开发游戏时，设置 Editor 画质模式，以设置 Mobile 游戏启动时，根据机型自动匹配画质分级，未匹配到机型时将使用该备用画质。

- 什么是 Mobile 备用画质？

  - 新增 Mobile 备用画质，在玩家的机型没有匹配到画质时，启动开发者自定义的备用画质。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnnqqjOD2UDiU5GNmGoTnSCc.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnn8wc9KiL2tBMhLWPw17BlX.png)

- GPU 性能分级和 CPU 性能分级选项<strong>同上</strong>
- Mobile 备用画质中，GPU 性能分级和 CPU 性能分级<strong>默认为 1 级</strong>。
