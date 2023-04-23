# 画质级别模拟与设置

::: tip **阅读本文预计 10 分钟。**

**本文概述了在编辑器中如何设置画面质量。**

:::

## 为什么要设置画面质量？

- 客户端启动游戏时，系统将根据玩家使用的机型**自动匹配**不同级别的画面质量。
- 开发者可以在开发游戏时，设置主视口和运行视口的画质，**模拟**不同级别画质下资源及场景的显示效果。

## 如何在编辑器中设置画面质量？

- **Step.1**

点击编辑器工具栏最右侧的设置按钮，点击后出现设置窗口。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn2RQHM6BuV8sWNV98ZLoTNc.png)

- **Step.2**

点击窗口中的编辑器设置，选择画质分级模拟。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnpi9tITBoxRgMcPwfE9NbEg.png)

- **Step.3**

画质分级模拟中分为**Editor 画质模拟**和**Mobile 备用画质**。设置的级别越高画质越好。其中，一级为最低级别，电影画质为最高级别。

- Editor 画质模拟：画质分级仅供开发者在主视口和 PIE 下预览客户端的画质效果。
- Mobile 备用画质：启动 Mobile 游戏时，系统会根据机型自动匹配画质分级，未匹配到机型时将使用该备用画质。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnkr35T1Hq6AVuc32c5rQwDe.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnm7XuG0o5F8SQostxFqZAFf.png)

- **Step.4**

编辑器设置中的所有设置为即时生效，选择完成即设置完成。

## 不同级别画质的效果如何？

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnjksQRPxfe26bxWjbB0QAMg.png)

<em>最低级别</em>**1 级**

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcneZ8GYmJMRh98F8FLT2fnXc.png)

<em>最高级别</em>**电影画质**

## 注意事项与建议

该分级仅供开发者在主视口和 PIE 下预览客户端的画质效果，仅影响主视口和运行视口的画面质量，不会实际影响客户端的画质分级。
