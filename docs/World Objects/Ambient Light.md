# 环境光

# 什么是环境光？

在编辑器中，我们为世界对象中的环境光提供了简洁的属性选项，用户可根据需求调整环境光的强度和色调，制作出明朗或昏暗、白色或其他颜色的环境光效果。

![](static/boxcnr5oFqcseRIKaf1OqhGiiZg.png)

![](static/boxcnfSyvbtkg557F2phSGUqMXf.png)

# 如何编辑环境光？

1） 在编辑器右上角【世界】选项中，找到【环境光】，点击

2） 在编辑器右下角【属性面板】中找到【基础属性】

通过对环境光基础属性的修改，来自定义环境光

![](static/boxcneK5flKIoCdEejVcuWRRgsP.png)

![](static/boxcnqGGIBMaYODiCwFQRvzFRvh.png)

## 2.1. 环境光强度

环境光强度是照射在整个世界的环境光的强弱程度；数值越低环境光越弱，数值越高环境光越强

![](static/boxcnQd5oHe3ZVO2M2OiF4afsEb.png)

<div style="text-align: center">环境光强度为0.2时：整个世界的光线昏暗</div>

![](static/boxcnfCUxIGrFgD1q10xtp75v4e.png)

<div style="text-align: center">环境光强度为1.0时：整个世界的光线明亮</div>

<div style="text-align: center"></div>

![](static/boxcnTKgP9yaU8FXdpkYOHOdV5d.png)

<div style="text-align: center">环境光强度为6.0时：整个世界的光线过于耀眼</div>

## 2.2. 环境光色调

环境光色调是照射在整个世界的环境光的色调；可根据开发者的喜好进行调整。

![](static/boxcn0GnDJ5L2BzhRh4XuJ9M2if.png)

<div style="text-align: center">环境光色调为红 FF000000</div>

![](static/boxcn2J8VnxHGjMHKmIhcA6lnTe.png)

<div style="text-align: center">环境光色调为绿 00FF0000</div>

<div style="text-align: center"></div>

![](static/boxcn5qCeuMZ2z8ekhcq1Emoqnc.png)

<div style="text-align: center">环境光色调为蓝 0000FF00</div>

## 2.3. 源类型

- 源类型是值捕获远处场景并将其作为光源还是使用指定的立方体贴图。

  - 捕获场景：从捕获的场景构造天空光照；
  - 指定立方体贴图场景：从指定的立方体贴图构造天空光照。

捕获场景较为消耗性能，建议只能周期性的、触发性的使用捕获场景。

![](static/boxcnIGppjuTY3S6p85eV92Wbxd.png)
![](static/boxcn8wzwLBgydfNLRCD3lnHLCd.png)

```ts
                        捕获场景                                                       指定立方体贴图场景
```

# 如何通过 API 动态修改环境光？

# 使用环境光的注意事项

环境光的调整应尽量配合天空球和太阳光同时进行，单独调整环境光有时难以达到预期效果。
