# 环境光

## 什么是环境光？

在编辑器中，我们为世界对象中的环境光提供了简洁的属性选项，用户可根据需求调整环境光的强度和色调，制作出明朗或昏暗、白色或其他颜色的环境光效果。

![](https://cdn.233xyx.com/1682487535051_427.PNG)

![](https://cdn.233xyx.com/1682487557457_444.PNG)

## 如何编辑环境光？

1） 在编辑器右上角【世界】选项中，找到【环境光】，并点击对象

2） 在编辑器右下角【属性面板】中找到【基础属性】

通过对环境光基础属性的修改，来自定义环境光

![](https://cdn.233xyx.com/1682487570660_104.PNG)

![](https://cdn.233xyx.com/1682487592755_417.PNG)

### 2.1. 环境光强度

环境光强度是照射在整个世界的环境光的强弱程度；数值越低环境光越弱，数值越高环境光越强

![](https://cdn.233xyx.com/1682487606481_474.PNG)

<div style="text-align: center">环境光强度为0.2时：整个世界的光线昏暗</div>

![](https://cdn.233xyx.com/1682487622388_418.PNG)

<div style="text-align: center">环境光强度为1.0时：整个世界的光线明亮</div>

<div style="text-align: center"></div>

![](https://cdn.233xyx.com/1682487634605_222.PNG)

<div style="text-align: center">环境光强度为6.0时：整个世界的光线过于耀眼</div>
- 相关接口：

```ts
//设置环境光强度为2
this.Light.intensity = 2;
```

### 2.2. 环境光色调

环境光色调是照射在整个世界的环境光的色调；可根据开发者的喜好进行调整。

![](https://cdn.233xyx.com/1682487650922_535.PNG)

<div style="text-align: center">环境光色调为红 FF000000</div>

![](https://cdn.233xyx.com/1682487665645_794.PNG)

<div style="text-align: center">环境光色调为绿 00FF0000</div>

<div style="text-align: center"></div>

![](https://cdn.233xyx.com/1682487679156_154.PNG)

<div style="text-align: center">环境光色调为蓝 0000FF00</div>
- 相关接口：

```ts
//设置环境光颜色为绿色
this.Light.lightColor = new Type.LinearColor(255, 0, 0);
```

### 2.3. 源类型
立方体贴图场景：从指定的立方体贴图构造天空光照的反射效果。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnIGppjuTY3S6p85eV92Wbxd.png)
<div style="text-align: center">正常效果</div>
![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn8wzwLBgydfNLRCD3lnHLCd.png)
<div style="text-align: center">指定立方体贴图场景</div>
** 注意**目前我们仅默认一种天空盒贴图，并且无法更换，后续会添加更多贴图资源。

## 使用环境光的注意事项

环境光的调整应尽量配合天空球和太阳光同时进行，单独调整环境光有时难以达到预期效果。
