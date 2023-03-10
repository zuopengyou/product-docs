# 画质级别模拟与设置

| 修改日期            | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------- | ------ | -------- | -------------- |
| 2022 年 10 月 13 日 | 董佳维 | 文档创建 | V0.15          |
| 2023 年 2 月 14 日  | 董佳维 | 文档更新 | V0.21          |

<strong>阅读本文预计 10 分钟。</strong>

<strong>本文概述了在编辑器中如何设置画面质量。</strong>

# 为什么要设置画面质量？

- 客户端启动游戏时，系统将根据玩家使用的机型<strong>自动匹配</strong>不同级别的画面质量。
- 开发者可以在开发游戏时，设置主视口和运行视口的画质，<strong>模拟</strong>不同级别画质下资源及场景的显示效果。

# 如何在编辑器中设置画面质量？

- <strong>Step.1</strong>

点击编辑器工具栏最右侧的设置按钮，点击后出现设置窗口。

![](static/boxcn2RQHM6BuV8sWNV98ZLoTNc.png)

- <strong>Step.2</strong>

点击窗口中的编辑器设置，选择画质分级模拟。

![](static/boxcnpi9tITBoxRgMcPwfE9NbEg.png)

- <strong>Step.3</strong>

画质分级模拟中分为<strong>Editor 画质模拟</strong>和<strong>Mobile 备用画质</strong>。设置的级别越高画质越好。其中，一级为最低级别，电影画质为最高级别。

- Editor 画质模拟：画质分级仅供开发者在主视口和 PIE 下预览客户端的画质效果。
- Mobile 备用画质：启动 Mobile 游戏时，系统会根据机型自动匹配画质分级，未匹配到机型时将使用该备用画质。

![](static/boxcnkr35T1Hq6AVuc32c5rQwDe.png)

![](static/boxcnm7XuG0o5F8SQostxFqZAFf.png)

- <strong>Step.4</strong>

编辑器设置中的所有设置为即时生效，选择完成即设置完成。

# 不同级别画质的效果如何？

![](static/boxcnjksQRPxfe26bxWjbB0QAMg.png)

<em>最低级别</em><strong>1 级</strong>

![](static/boxcneZ8GYmJMRh98F8FLT2fnXc.png)

<em>最高级别</em><strong>电影画质</strong>

# 注意事项与建议

该分级仅供开发者在主视口和 PIE 下预览客户端的画质效果，仅影响主视口和运行视口的画面质量，不会实际影响客户端的画质分级。
