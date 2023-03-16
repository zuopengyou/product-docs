# 太阳光

### 什么是太阳光？

太阳光是阳光/阴影/光束以及太阳本身的设定需求。

### 如何编辑太阳光？

鼠标左键点击对象管理器(默认右上角)中的 BP_DirectionalLight 对象，即可在属性面板(默认右下角)中编辑太阳光。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnqZxHHfM5Q1iieAQNnXpFtd.png)

太阳光有若干定制化属性，以下展开介绍：

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnqW6G6Q6jRVXj43tXVo57Ud.png)

#### 1、朝向角度

- 决定太阳在天空中的横向位置（XY 轴），范围为【-180,180】

#### 2、俯仰角度

- 决定太阳在天空中的纵向位置（Z 轴），范围为【-90,90】

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnasFn9SHNIKLHNfxH6MGWwf.gif)

#### 3、强度

- 开发者可通过滑动滚轮调整光照强度。
- 数值范围：0-100。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnJoQZ7J3o8udxebq0GRhIld.png)

<div style="text-align: center">强度为0时候的地面</div>

![](https://wstatic-a1.233leyuan.com/productdocs/boxcn407lZYB3AhjbBpWDsRciMg.png)

<div style="text-align: center">强度为50时候的地面</div>

![](https://wstatic-a1.233leyuan.com/productdocs/boxcn7nidrtAEHwgYN7zYe2q8Mh.png)

<div style="text-align: center">强度为100时候的地面</div>

#### 4、光颜色

开发者可选择太阳光的颜色。最终生成的地面颜色由材质、贴图与光照共同决定。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnpbjBsa24DFuiBWAEin7Crc.png)

<div style="text-align: center">颜色选择</div>

下面以水贴图作为地面图片演示效果。

光照强度为 0。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnvopE5Qg0JsznULpKqmg8Ef.png)

<div style="text-align: center">光照强度为0时的地面</div>

色调使用纯红色（R=1.0,G=0,B=0），光照强度 100。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcndjrMltYS0rNkDueZvs42rc.png)

色调使用纯绿色（R=0.0,G=1.0,B=0），光照强度 100。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnuIhJiz8w3rvyGUxwtYI8tb.png)

色调使用纯蓝色（R=0.0,G=0.0,B=1.0），光照强度 100。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcn3brnUChnTSb3wJuGrnCqeg.png)

#### 5、阴影

- 投射阴影：是否启动阴影效果。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnc7hjt9Mx8kBbqh4dJH9ebh.png)

<div style="text-align: center">有阴影</div>

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnGoweFGo4TeB6rWlXwt4cZc.png)

<div style="text-align: center">无阴影</div>

- 阴影距离：影响阴影的视觉表现。

  - 此值越大，图越模糊，阴影像素越大。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnIpKgS7xIGxpQipKu205uKd.png)

<div style="text-align: center">阴影距离为5000</div>

- 此值越小，图越清晰，阴影像素越小。

![](https://wstatic-a1.233leyuan.com/productdocs/boxcn6kl9lPBKex01p4V5NMb5eb.png)

<div style="text-align: center">阴影距离为1000</div>

#### 6、色温

- 是否启用色温：勾选后启用色温效果
- 色温：太阳温度的大小，范围【1000，14000】

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnjQ5sRKhG5ZpoLOXiXdG0Ab.png)

<div style="text-align: center">温度1000</div>

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnckOnkxShmlIIkOuT6mWNHd.png)

<div style="text-align: center">温度4000</div>

![](https://wstatic-a1.233leyuan.com/productdocs/boxcnMdjHoYGP7gL8aRzyuPPdjf.png)

<div style="text-align: center">温度14000</div>

### 如何通过 API 动态修改太阳光的属性？
