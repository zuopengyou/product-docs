# UI 编辑器设计功能

<strong>阅读本文大概需要 10 分钟</strong>

本文概述了如何使用分布/对齐/居置、设计器顶部工具等其他 UI 编辑器内的常用功能。

# 分布/对齐/居置功能

![](static/boxcnFKS3vKAnigQFdYaUYFc2td.png)

![](static/boxcnw75HafyNQQjv2DbrwG1lgf.png)

#### 分布

<strong>分布</strong>是将已选的所有对象在水平/垂直方向上均匀排布

- 横向分布

  - 在不改变对象与对象之间相对次序、不改变最左右两个对象的位置的前提下，改变其他对象的 x 轴位置，以达到横向均匀分布

![](static/boxcn8fKvnvUBbUtDFwwfHkk88d.gif)

- 纵向分布

  - 在不改变对象与对象之间相对次序、不改变最上下两个对象的位置的前提下，改变其他对象的 y 轴位置，以达到纵向均匀分布

![](static/boxcnsblqwIES7qiysQjKgV0idb.gif)

#### 对齐

<strong>对齐</strong>是将已选的多个对象的边界点/中心点，对齐到第一个选择的对象的某边缘线/中心线，不受各自的父级容器的影响

- 上/下/左/右对齐

  - 以左对齐为例：水平移动对象，使所有对象选框的左边缘对准第一个选中图形的选框左边缘

![](static/boxcnxKmlg88cEbyyJxt4xCDoId.gif)

- 水平线/垂直线对齐

  - 以水平线对齐为例：垂直移动对象，使所有对象选框的中心点对准第一个选中图形选框的水平中线

![](static/boxcn1P8ettM6iemWjizcsH5JLh.gif)

#### 居置

<strong>居置</strong>是将已选的多个对象的边界点/中心点，对齐到各自直属父级的某边缘线/中心线，与选取顺序无关

- 居上/下/左/右

  - 以居下为例：垂直移动对象，使其选框的底边缘对准其直属父级选框的底边缘

![](static/boxcnsgaa7T0ymZWKOCPALB6iif.gif)

- 水平线/垂直线居中

  - 以垂直线居中为例：水平移动对象，使其选框的中心点对准其直属父级选框的垂直中线

![](static/boxcnnE3bOho3jn6KYxqPgeN3Uc.gif)

### 

# 设计器顶部工具

![](static/boxcntdLzd6m4tERkCs3HblEdYd.png)

- 调整 UIRoot 的尺寸大小
- 调整 UIRoot 为横向/纵向
- 是否启用对齐到整数网格
- 使用键盘方向键微调的单位大小

  - 直接使用方向键移动的单位大小
  - Shift+ 方向键移动的单位大小
  - Ctrl+ 方向键移动的单位大小

# 右键菜单

![](static/boxcntrK5rpjc6o4Op6PxIKDnge.png)

![](static/boxcnM1h5VetC1lKkBnvYvCbP4b.png)

![](static/boxcnh9iwYKJ00AjykYRXpePDCc.png)

![](static/boxcnwVeFUcNFqXEBhOvI5KacWg.png)

- 设计器或者对象列表内单击右键可以打开右键菜单，右键菜单的功能包括：

  - 选择 UI 对象
  - 复制
  - 粘贴
  - 剪切
  - 删除
  - 虚线边框显隐
  - 复制完整节点路径
