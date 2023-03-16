# 横竖屏、分辨率模拟功能说明

| 修改日期            | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------- | ------ | -------- | -------------- |
| 2022 年 10 月 10 日 | 高健   | 文档创建 | V0.15          |
| 2022 年 12 月 14 日 | 董佳维 | 文档更新 | V0.18          |

**阅读本文预计 10 分钟**

为了让开发者了解如何制作、调试和发布横屏/竖屏游戏，本文主要介绍了以下内容：

1. 分辨率模拟功能
2. 横竖屏功能

## 分辨率模拟功能

开发者可以通过分辨率模拟功能在编辑状态和 PIE 状态下调试不同分辨率下的游戏效果。

### **功能入口**

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnzZq8iFKn0yAl9GEj6spozg.png)

### **面板说明**

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnhNGdoW0SOuvGHoo1ceMkCe.png)

- **添加分辨率**
- Step.1 点击添加分辨率按钮打开自定义分辨率弹窗。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnkM1zALksjUDlRtAoHqkHQg.png)

- Step.2 在自定义分辨率弹窗内填写名称、尺寸。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnw0P6IVYEOaMGOcnoeIrMTb.png)

- Step.3 点击确认，即可添加分辨率。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnCJ12h44ihmebVRUovQ6lMb.png)

- **分辨率列表**

  - 分辨率列表中包含默认的**主视口平铺**及开发者添加的**自定义分辨率**，点击某个分辨率进行切换。
  - 开发者添加的自定义分辨率可删除。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnag1agTgdCXdOg2HG6wa30f.png)

### **使用效果**

- **主视口**

主视口会根据视口大小和选择的分辨率，在视口内划分可操作区域和无效操作区域。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnGqrhL1ABVgs1MjO1G63Ybe.png)

- **PIE**

PIE 窗口会根据选择分辨率的长宽比例，自适应调整窗口大小。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnWqNLaw6dJDEbLwfwx7Db4D.png)

（16:9）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnaw7gWOoo6Dmwwh3bGG0BKd.png)

（4:3）

## 横竖屏功能

游戏在手机平台上区分为横屏模式与竖屏模式。

开发者可以通过横竖屏功能在编辑状态、PIE 状态下调试制作的游戏，游戏发布后也将以此为标识，设置其在手机平台的横竖屏模式。

### **功能入口**

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcno5RL6f6sUv41PwicO2ksWg.png)

### **面板说明**

点击左侧选项，切换为竖屏模式；点击右侧选项，切换为横屏模式。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnK83MrDT8z1VEMOS0fqNCid.png)

### **使用效果**

- **主视口**

主视口会根据横竖屏和分辨率设置，在视口内划分可操作区域和无效操作区域。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnkQ7hiAdGDmMtNFvOTxFL1q.png)

（横屏）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnqRKiTBt7u5ZlkRWvTYMBAf.png)

（竖屏）

- **PIE**

PIE 窗口会根据横竖屏和分辨率设置，自适应调整窗口大小。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnhys18zFlPgyQtbQzjga1gg.png)

（横屏）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn6KnQ3D91AJu7Tc4TJ8wWSg.png)

（竖屏）

- **Mobile**

Mobile 会根据设置的横屏模式/竖屏模式展现发布的游戏。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnK17DEEE0fnY4GY2ImnhA5b.png)

（横屏）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcncaxaMBitpVqWk2pbU2v5kc.png)

（竖屏）

## 注意事项与建议

编辑器默认为横屏模式，提供了横屏模式下的角色控制 UI、角色摄像机参数。

当开发者由横屏切换至竖屏模式后，需要根据游戏玩法、内容调整对应角色控制 UI、角色摄像机参数。

当分辨率为主视口平铺时，不支持切换横竖屏。

## 项目案例

- 横屏 demo
- 竖屏 demo
