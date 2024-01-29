# Transform工具

工具栏中的移动（W）、旋转（E）、缩放（R）按钮用于切换Transform工具的模式

<img src="https://cdn.233xyx.com/athena/online/3d1f8185421c490292af17d99bf64852_127073286.webp" width="90%">

以移动工具为例：

<img src="https://cdn.233xyx.com/athena/online/93cb91a626cd4ac2b9c8583ea84bfc1a_127348483.webp" width="90%">
<br>

## 移动工具

拖动红色/绿色/蓝色枢轴，选中对象沿对应轴向（X/Y/Z轴）移动

<img src="https://cdn.233xyx.com/online/BhqIM3BOYHmv1706506503383.gif" width="80%">

<br>拖动红色/绿色/蓝色控制面，选中对象沿对应平面（YZ/XZ/XY平面）移动

<img src="https://cdn.233xyx.com/online/juW9eBLVcx3m1706506631327.gif" width="80%">
<br>

## 旋转工具

拖动红色/绿色/蓝色枢轴，选中对象沿对应轴向（X/Y/Z轴）旋转

<img src="https://cdn.233xyx.com/online/WSt2UPNOcuKs1706506885957.gif" width="80%">

<br>拖动外围的白色枢轴，选中对象沿当前视图进行平面旋转

<img src="https://cdn.233xyx.com/online/Sa5wVO6ChDJf1706506903029.gif" width="80%">

<br>拖动球状区域，选中对象进行轨迹球式旋转

<img src="https://cdn.233xyx.com/online/gNuBtZZlsF7n1706506916855.gif" width="80%">
<br>

## 缩放工具

点击控件右侧展开下拉面板，选择缩放模式：轴式缩放/盒式缩放

<img src="https://cdn.233xyx.com/athena/online/8c292ce1d925476593468e993497e2b8_127513245.webp" width="80%">
<img src="https://cdn.233xyx.com/online/61GD061a19rs1706513181011.png" width="80%">

### 盒式缩放

拖动红色/绿色/蓝色控制点，选中对象沿对应轴向（X/Y/Z轴）与控制点方向进行缩放

<img src="https://cdn.233xyx.com/online/3OtR3tg4cAw41706513426665.gif" width="80%">

- 按住Shift键，选中对象沿控制点方向进行三轴等比缩放

  <img src="https://cdn.233xyx.com/online/lWikOW77CQeg1706513576771.gif" width="80%">

- 多选时，选中对象沿控制点方向进行三轴等比缩放

  <img src="https://cdn.233xyx.com/online/FHk65YMs0Xhh1706513694303.gif" width="80%">

### 轴式缩放

- 拖动红色/绿色/蓝色枢轴，选中对象沿对应轴向（X/Y/Z轴）进行缩放

  <img src="https://cdn.233xyx.com/online/FZ41HJAmWdL21706514049542.gif" width="80%">

- 拖动红色/绿色/蓝色三角面，选中对象沿对应平面（YZ/XZ/XY平面）进行缩放

  <img src="https://cdn.233xyx.com/online/tPCFDYphnLqn1706514071687.gif" width="80%">

- 拖动轴式缩放工具的中心点，选中对象进行三轴等比缩放

  <img src="https://cdn.233xyx.com/online/WGE8HAyCKYW61706514105207.gif" width="80%">
<br>

## “中心/锚点”模式

切换“中心/锚点”模式，可以改变Transform工具中心点的位置，以及选中对象旋转/缩放的方式

<img src="https://cdn.233xyx.com/athena/online/178e7e7dc9d2417ebb678b6fb32f1f4e_127878079.webp" width="80%">

选择中心模式时，Transform工具的中心点位于选中对象的几何中心处；选择锚点模式时，Transform工具的中心点位于选中对象的锚点处（多选时，位于最后选中对象的锚点处）

<img src="https://cdn.233xyx.com/athena/online/7e00368065a147bf8a6e868713940283_127885293.webp" width="80%">

选择中心模式时，选中对象将相对于其几何中心进行旋转/缩放（多选时，相对于全部选中对象的几何中心进行旋转/缩放）；选择锚点模式时，选中对象将相对于其锚点进行旋转/缩放（多选时，相对于各自锚点进行旋转/缩放）

<img src="https://cdn.233xyx.com/online/DUujDnK8eBTp1706525345831.gif" width="60%">
<img src="https://cdn.233xyx.com/online/EYHwCR7X8OyM1706525345831.gif" width="60%">
<br>

## 网格

开启网格功能后，对象将按照设定的单位移动、旋转或缩放

<img src="https://cdn.233xyx.com/online/LJ8lFwwbn5Pr1706493164033.png" width="80%">

可以点击下拉按钮，从预设值中选择网格数值，也可以直接输入数值（移动工具支持1-1000的整数，旋转工具支持1-360的整数，缩放工具支持0.0625-10.0的小数）

<img src="https://cdn.233xyx.com/online/Pcv6exwFtDK01706492495662.png" width="80%">
<br>

## “世界/本地”轴向

切换“世界/本地”轴向，可以改变Transform工具的坐标系

<img src="https://cdn.233xyx.com/online/9bKV1W2bGPKv1706525646745.png" width="80%">

选择世界轴向时，Transform工具使用世界坐标系（选中对象将在世界坐标系下进行变化）

<img src="https://cdn.233xyx.com/online/kAg8LcoVA0yx1706525711975.png" width="60%">

选择本地轴向时，Transform工具使用选中对象的本地坐标系（选中对象将在本地坐标系下进行变化）

<img src="https://cdn.233xyx.com/online/6VChEPFHGuBd1706525711975.png" width="60%">
<br>

## 召唤Transform工具

如果模型过大，Transform工具不在主视口镜头之内，可以按住Tab键，在光标位置召唤Transform工具（松开Tab键，Transform工具恢复到默认位置）

<img src="https://cdn.233xyx.com/online/LrXGYJWP05PK1706514582536.gif" width="80%">
