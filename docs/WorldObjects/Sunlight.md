# 太阳光

### 什么是太阳光？

太阳光是阳光/阴影/光束以及太阳本身的设定需求。

### 如何编辑太阳光？

鼠标左键点击对象管理器(默认右上角)中的DirectionalLight对象，即可在属性面板(默认右下角)中编辑太阳光。

![](https://cdn.233xyx.com/1682496565838_390.PNG)

太阳光有若干定制化属性，以下展开介绍：

![](https://cdn.233xyx.com/1682496653985_801.PNG)

#### 1、朝向角度

- 属性说明：决定太阳在天空中的横向位置（XY轴）
- 数值范围：【-180,180】
- 演示效果：

<video controls src="(https://cdn.233xyx.com/1682496673529_626.mp4)"></video>

- 相关接口：

```ts
//设置太阳朝向角度为30
this.Light.yawAngle = 30;
```

#### 2、俯仰角度

- 属性说明：决定太阳在天空中的纵向位置（Z轴）
- 数值范围：【-90,90】
- 演示效果：

<video controls src="(https://cdn.233xyx.com/1682496689797_482.mp4)"></video>

- 相关接口：

```ts
//设置太阳俯仰角度为-30
this.Light.pitchAngle = -30;
```

#### 3、强度

- 属性说明：开发者可通过滑动滚轮调整光照强度。
- 数值范围：0-100。
<div style="text-align: center">强度为0时候的地面</div>

![](https://cdn.233xyx.com/1682496758313_708.PNG)

<div style="text-align: center">强度为50时候的地面</div>

![](https://cdn.233xyx.com/1682496924716_543.PNG)

<div style="text-align: center">强度为100时候的地面</div>

![](https://cdn.233xyx.com/1682496937447_114.PNG)

- 相关接口：

```ts
//设置太阳强度为10
this.Light.intensity= 10;
```

#### 4、光颜色

- 属性说明：开发者可选择太阳光的颜色。最终生成的地面颜色由材质、贴图与光照共同决定。

![](https://cdn.233xyx.com/1682496951113_980.PNG)

<div style="text-align: center">颜色选择</div>

- 下面以水贴图作为地面图片演示效果。

光照强度为 0。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnvopE5Qg0JsznULpKqmg8Ef.png)

<div style="text-align: center">光照强度为0时的地面</div>

色调使用纯红色（R=1.0,G=0,B=0），光照强度 100。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcndjrMltYS0rNkDueZvs42rc.png)

色调使用纯绿色（R=0.0,G=1.0,B=0），光照强度 100。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnuIhJiz8w3rvyGUxwtYI8tb.png)

色调使用纯蓝色（R=0.0,G=0.0,B=1.0），光照强度 100。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn3brnUChnTSb3wJuGrnCqeg.png)

- 相关接口：

```ts
//设置太阳光颜色为淡黄色
this.Light.lightColor = new Type.LinearColor(255,240,200);
```

#### 5、阴影

- 投射阴影：是否启动阴影效果。

<div style="text-align: center">有阴影</div>

![](https://cdn.233xyx.com/1682496962624_098.PNG)

<div style="text-align: center">无阴影</div>

![](https://cdn.233xyx.com/1682496976042_699.PNG)

- 阴影距离：影响阴影的视觉表现。

  - 此值越大，图越模糊，阴影像素越大。

<div style="text-align: center">阴影距离为5000</div>

![](https://cdn.233xyx.com/1682496995125_331.PNG)

- 此值越小，图越清晰，阴影像素越小。

<div style="text-align: center">阴影距离为1000</div>

![](https://cdn.233xyx.com/1682497007917_744.PNG)

- 相关接口：

```ts
//关闭投射阴影
this.Light.castShadowsEnable = false;

//开启投射阴影
this.Light.castShadowsEnable = true;
```

#### 6、色温

- 是否启用色温：勾选后启用色温效果
- 色温：太阳温度的大小，范围【1000，14000】

![](https://cdn.233xyx.com/1682497045786_681.PNG)

<div style="text-align: center">温度1000</div>

![](https://cdn.233xyx.com/1682497065043_327.PNG)

<div style="text-align: center">温度4000</div>

![](https://cdn.233xyx.com/1682497091239_037.PNG)

<div style="text-align: center">温度14000</div>

- 相关接口：

```ts
//关闭太阳光色温
this.Light.temperatureEnable = false;

//开启太阳光色温
this.Light.temperatureEnable = true;

//设置太阳光色温为4000
this.Light.temperature = 4000;
```

### 如何通过 API 动态修改太阳光的属性？

- 最后我们就可以通过相关接口和代码动态调整太阳光的效果。
- 示例工程：

[太阳光示例](https://cdn.233xyx.com/1682499048999_316.rar)

- 示意图：

<video controls src="(https://cdn.233xyx.com/1682497111605_636.mp4)"></video>
