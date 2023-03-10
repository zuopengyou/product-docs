# 后处理

| 修改日期           | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------ | ------ | -------- | -------------- |
| 2022 年 9 月 28 日 | 廖悦吾 | 文档创建 | 015            |
|                    |        |          |                |

<strong>阅读本文预计 10 分钟</strong>

本文概述了后处理的工作机制，展示在编辑器创建并使用后处理的过程和后处理在游戏中的应用。教程内容包含后处理功能对象的属性面板，类对象属性和接口以及一个示例工程。

# 什么是后处理

后处理是一个提供游戏滤镜的对象，通过自定义各类显示参数将画面调整为理想的效果。

后处理在编辑器中以功能对象的形式存在，打开编辑器后在左侧资源栏中的“逻辑资源”中，选取“游戏功能对象”，红框中就是后处理，资源 ID 为 21151。

![](static/boxcn1sNsEnFpOmt8LnwfQI43Sh.png)

# 后处理 都包含什么

### 后处理包含的属性：

| 属性名 | 描述 | 类型 |
| ------ | ---- | ---- |

### 后处理包含的接口：

| 接口名                       | 描述                                   | 参数                              | 返回类型 |
| ---------------------------- | -------------------------------------- | --------------------------------- | -------- |
| setToneCurveAmount           | 设置色调映射 （0 ~ 100）               | value: number                     | void     |
| getToneCurveAmount           | 获取当前色调映射                       | 无                                | number   |
| setBloomIntensity            | 设置泛光（0 ~ 8）                      | value: number                     | void     |
| getBloomIntensity            | 获取泛光                               | 无                                | number   |
| setGlobalSaturation          | 设置全局饱和度 （0 ~ 2）               | value: number                     | void     |
| getGlobalSaturation          | 获取全局饱和度                         | 无                                | number   |
| setGlobalContrast            | 设置全局对比度 （0.2 ~ 5.0）           | value: number                     | void     |
| getGlobalContrast            | 获取全局对比度                         | 无                                | number   |
| setGlobalGamma               | 设置全局伽马值（0 ~ 5）                | value: number                     | void     |
| getGlobalGamma               | 获取全局伽马值                         | 无                                | number   |
| setLDRSaturation             | 设置 LDR 饱和度（0 ~ 2）               | value: number                     | void     |
| getLDRSaturation             | 获取 LDR 饱和度                        | 无                                | number   |
| setLDRContrast               | 设置 LDR 对比度 Contrast （0.2 ~ 5.0） | value: number                     | void     |
| getLDRContrast               | 获取 LDR 对比度 Contrast               | 无                                | number   |
| setLDRGamma                  | 设置 LDR 伽马值 （0 ~ 5）              | value: number                     | void     |
| getLDRGamma                  | 获取 LDR 伽马值                        | 无                                | number   |
| setHDRSaturation             | 设置 HDR 饱和度 （0 ~ 2）              | value: number                     | void     |
| getHDRSaturation             | 获取 HDR 饱和度                        | 无                                | number   |
| setHDRContrast               | 设置 HDR 对比度 （0 ~ 5）              | value: number                     | void     |
| getHDRContrast               | 获取 HDR 对比度                        | 无                                | number   |
| setHDRGamma                  | 设置 HDR 伽马值 （0 ~ 5）              | value: number                     | void     |
| getHDRGamma                  | 获取 HDR 伽马值                        | 无                                | number   |
| setLUTBlend                  | 设置 LUT 百分比 （0 ~ 100）            | value: number                     | void     |
| getLUTBlend                  | 获取 LUT 百分比                        | 无                                | number   |
| setAmbientOcclusionIntensity | 设置环境光遮蔽强度（0 ~ 1）            | value: number                     | void     |
| getAmbientOcclusionIntensity | 获取环境光遮蔽强度                     | 无                                | number   |
| setAmbientOcclusionRadius    | 设置环境光遮蔽半径（0.1 ~ 500.0）      | value: number                     | void     |
| getAmbientOcclusionRadius    | 获取环境光遮蔽半径                     | 无                                | number   |
| setLUTTextureAssetByGuid     | 设置 LUT 贴图资源通过 Guid             | value: number                     | void     |
| getLUTTextureAssetByGuid     | 获取 LUT 贴图资源通过 Guid             | 无                                | number   |
| setMotionBlur                | 设置动态模糊 （0 ~ 1）                 | value: number                     | void     |
| getMotionBlur                | 获取动态模糊                           | 无                                | number   |
| setLDR2HDRThreshold          | 设置 LDR 与 HDR 阈值 （-1 ~ 1）        | value: number                     | void     |
| getLDR2HDRThreshold          | 获取 LDR 与 HDR 阈值                   | 无                                | number   |
| setToneSlope                 | 设置色调映射斜率 （0 ~ 1）             | value: number                     | void     |
| getToneSlope                 | 获取色调映射斜率                       | 无                                | number   |
| setToneToe                   | 设置色调映射低位阈值（0 ~ 1）          | value: number                     | void     |
| getToneToe                   | 获取色调映射低位阈值                   | 无                                | number   |
| setToneShoulder              | 设置色调映射高位阈值（0 ~ 1）          | value: number                     | void     |
| getToneShoulder              | 获取色调映射高位阈值                   | 无                                | number   |
| setToneBlackClip             | 设置色调映射暗部裁剪（0 ~ 1）          | value: number                     | void     |
| getToneBlackClip             | 获取色调映射暗部裁剪                   | 无                                | number   |
| setToneWhiteClip             | 设置色调映射亮部裁剪（0 ~ 1）          | value: number                     | void     |
| getToneWhiteClip             | 获取色调映射亮部裁剪                   | 无                                | number   |
| setAutoExposureBias          | 设置曝光补偿（-15 ~ 15）               | value: number                     | void     |
| getAutoExposureBias          | 获取曝光补偿                           | 无                                | number   |
| setAutoExposureMinBrightness | 设置曝光最小亮度（-10 ~ 20）           | value: number                     | void     |
| getAutoExposureMinBrightness | 获取曝光最小亮度                       | 无                                | number   |
| setAutoExposureMaxBrightness | 设置曝光最大亮度（-10 ~ 20）           | value: number                     | void     |
| getAutoExposureMaxBrightness | 获取曝光最大亮度                       | 无                                | number   |
| setOutlineWidth              | 设置描边宽度 （0 ~ 4）                 | value: number                     | void     |
| getOutlineWidth              | 获取描边宽度                           | 无                                | number   |
| setOccluderBlend             | 设置被遮挡融合比例（0 ~ 1）            | value: number                     | void     |
| getOccluderBlend             | 获取被遮挡融合比例                     | 无                                | number   |
| addOutLineColor              | 添加一个描边颜色并返回对应的索引       | newOutLineColor: Type.LinearColor | number   |

# 如何合理利用 / 使用 后处理

### 在编辑器工作区中直接使用：

1. <strong>将</strong><strong>后处理</strong><strong>拖入场景并自定义它的各种属性。</strong>

![](static/boxcnXXC3a5d0ZO4XJTDy26R8hd.png)

- 后处理-色调映射

色调映射功能的目的是将广泛的高动态范围（HDR）颜色映射到显示器能够输出的低动态范围（LDR）。这是后期处理的最后一个阶段，经过法线渲染后，这个过程在后期处理期间执行。你可以将色调映射的过程想象成一种模拟胶片对光线的反应的方法(属性范围 0~100)：

![](static/boxcn2qiown5SLGCK3t7LJU4Heb.png)

![](static/boxcni1fbpwiy21ce38TRoDUPub.png)

- 后处理-泛光

设置物体的泛光效果，光晕能使光源等明亮物体产生辉光效果（属性范围 0~8）

![](static/boxcnUTkP0BXXBLGxQCfarSBYVh.png)

![](static/boxcnOtFWPOHAQyIxmhyovk2Jrd.png)

- 后处理-全局饱和度

该属性调整所表现的颜色（色调）的强度（纯度）。饱和度越高，颜色看起来越接近原色（红色、绿色、蓝色），饱和度降低时，颜色的灰色或褪色效果变得明显。（属性范围 0~2）

![](static/boxcn0b3Qdh90NkZyfyMPMYhf4c.png)

![](static/boxcnm3dnGOowNOkvFScfVLoIhc.png)

- 后处理-全局对比度

该属性将调节场景中光线和深色值的色调范围。降低强度会去除高亮，让图像显得更亮，营造出一种褪色效果，而强度提升会加强高亮，让整体图像变暗。（属性范围 0.2~5）

![](static/boxcnHSyAUUcqQkzqXRElAr9Xzc.png)

![](static/boxcn5IjbFVbnmpjsFkD8liQo3f.png)

- 后处理-全局伽马值

该属性将调节图像中间色调的亮度以准确重现颜色。降低或增大该值会让图像呈现出褪色或过暗的效果。（属性范围 0~5）

![](static/boxcnLmkd9D5SXbeKhdcGkrsGmh.png)

![](static/boxcn1Z3rENq07Ip0f1EL5dPbTf.png)

- 后处理-LDR 饱和度

设置低动态范围图片的饱和度（属性范围 0~2）

![](static/boxcn0O5zngXnyX8NWxdEvYKowd.png)

![](static/boxcnVmlPCBqRgozggytQXyZm3f.png)

- 后处理-LDR 对比度

设置低动态范围图片的对比度（属性范围 0.2~5）

![](static/boxcnoW1aC0rjNUGc5D6sUf6Vbd.png)

![](static/boxcnDj7nBQ1urpmGBZwTyn6Suh.png)

- 后处理-LDR 伽马值

设置低动态范围图片的伽马值（属性范围 0~5）

![](static/boxcn0mCpIwrnvOt9zpeWw9vXzd.png)

![](static/boxcngmzX1WE1hFg2ht6MyFLgMe.png)

- 后处理-HDR 饱和度

设置高动态范围图片的饱和度（属性范围 0~2）

![](static/boxcnooKA9stufPpNmJ3Jz8tTae.png)

![](static/boxcnpUUZzWxIiYiog6bqJ7w8Ue.png)

- 后处理-HDR 对比度

设置高动态范围图片的对比度 （属性范围 0.2~5）

![](static/boxcnfZngIayA7el1WcWjMtduSd.png)

![](static/boxcnMVzbm7SApLkHWJjLfSidna.png)

- 后处理-HDR 伽马值

设置高动态范围图片的伽马值（属性范围 0~5）

![](static/boxcnCa1U4pJo4Ej1MB3ymkIdJd.png)

![](static/boxcnvmnbABs7DuDgqK8f6PID5d.png)

- 后处理-LUT 颜色查找表百分比

LUT 颜色值查找表百分比是一种控制颜色校正效果的比例因子(属性范围 0~100)

![](static/boxcnrPBwET7BZQpcBINKO20pd7.png)

![](static/boxcn58t6oK7zKd50vAU9O2DyLf.png)

- 后处理-LUT 颜色查找表纹理

LUT 颜色查找表纹理用作颜色校正的查找表的 LUT 纹理

![](static/boxcnHpWI3XMuzmaT5xClPgdyCc.png)

![](static/boxcnSdg4UWJvyLKB2XxSzs5wnP.png)

- 后处理-环境光遮蔽强度

环境光遮蔽强度是一种近似计算因遮蔽而造成的光线衰减的效果。通常是在标准全局光照的基础上增添细微效果，例如让角落、裂缝或其他生物变暗，以形成一种更加自然真实的视觉效果（属性范围 0~1）

![](static/boxcneRsI7tZ5nEOcRoPFU6Gmjd.png)

![](static/boxcnE9wgA6f0rvGVr6Fz9WHe4c.png)

- 后处理-环境光遮蔽半径

设置环境光遮蔽的半径范围（属性范围 0.1~500）

![](static/boxcnLqRZYfGs00nU2AXJnHwokg.png)

![](static/boxcnrp9jxssVgAsFb3wQMLcaUb.png)

- 后处理-动态模糊

动态模糊将两帧画面进行模糊运算（属性范围 0~1）

- 后处理-LDR 与 HDR 阈值

设置 LDR 与 HDR 的范围（属性范围-1~1）

![](static/boxcnEeOLlqqOylDh3Ww3sAVwwb.png)

![](static/boxcnVKE1LpR3ul9s9Mb8RWwBBc.png)

- 后处理-色调映射斜率

调整用于色调映射的 S 曲线的斜率，较大值将使斜率更大（更深），较低值将使斜率更小（更浅）

![](static/boxcn3s3IRy8UvyO5meWFHi2zae.png)

![](static/boxcnb7M8eqIQKxF7nTtI0AnHdc.png)

- 后处理-色调映射低位阈值

调整色调映射中的深色(属性范围 0~1）

![](static/boxcnpSuGFSHE4CDW9fzoKr6I99.png)

![](static/boxcnE8mHqSjb658BidD1f6Ad83.png)

- 后处理-色调映射高位阈值

调整色调映射中的亮色(属性范围 0~1)

![](static/boxcnerR0laErzZhrbQh0rcaSTc.png)

![](static/boxcnQVwgKZY9zv6wH2foHuPDZd.png)

- 后处理-色调映射暗部裁剪

色调映射暗部裁剪设置交叉位置，也就是黑色开始切断数值的位置。一般来说，这个值 不应该调整(属性范围 0~1)

![](static/boxcnLf5gQIw3WmgB8p2LjIL3je.png)

![](static/boxcnbIL6X1NH1J2ubo6jwr9TOd.png)

- 后处理-色调映射亮部裁剪

色调映射亮部裁剪设置交叉位置，也就是白色开始切断数值的位置。大多数情况下，变化都比较微妙(属性范围 0~1)

![](static/boxcnNxXQFsFpfm7U7eTquZtKOe.png)

![](static/boxcnNwziqNuZpX6hJ8BElyF8ae.png)

- 后处理-曝光补偿

曝光补偿曝光的对数调整，仅在指定色调映射器的情况下使用。设为 0 时，没有调整；设为-1 时，为两倍暗，设为-2 时，为四倍暗，设为 1 时，为两倍亮，设为 2 时，为四倍亮。(属性范围-15~15)

![](static/boxcnPeni0ASFPIPNlTxb0sowzb.png)

![](static/boxcnFGTU8HqyJef1p6cbtTbFNc.png)

- 后处理-曝光最小亮度

曝光最小亮度自动曝光的最小亮度，用于限定眼部可适应的最低亮度。值必须小于 0，并且必须大于或等于 最大亮度（Max Brightness）。合适的值应为接近 0 的正值，并应在黑暗的光照条件下调整。例如，若该值过小，则图像会显得太亮。若值过大，则图像会显得太暗。实际值取决于所使用内容的 HDR 范围。若最小亮度（Min Brightness）等于最大亮度（Max Brightness），自动曝光将禁用。(属性范围-10~20)

![](static/boxcnSU90K8t2izAurIujhy97yb.png)

![](static/boxcnoEc91RZFNpKMntj6T9KlBb.png)

- 后处理-曝光最大亮度

曝光最大亮度自动曝光的最大亮度，用于限定眼部可适应的最高亮度。值必须大于 0，并且必须大于或等于 最小亮度（Min Brightness）。合适的值应为正值（2 是不错的起始值），并将在明亮的光照条件调整。例如，若该值过小，则图像会显得太亮。若值过大，则图像会显得太暗。实际值取决于所使用内容的 HDR 范围。若最大亮度（Max Brightness）等于最小亮度（Min Brightness），自动曝光将禁用。(属性范围-10~20)

![](static/boxcn1dBFwgXJMCXghrtSTg5HUc.png)

![](static/boxcnVlbdqri05dj65PtpD6JMyd.png)

- 描边设置-描边颜色

描边颜色设置描边的颜色

![](static/boxcn5CVECus63vEohQffhBtTTa.png)

- 描边设置-描边宽度

描边宽度设置描边显示宽度，值越大显示越宽（ 属性范围 0~4）

- 描边设置-被遮挡融合比例

被遮挡融合比例描边的部分可能有被遮挡的，可能有不被遮挡的，这个修改是全局的，不能只单独设置某一个队伍的融合比例（属性范围 0~1）

### 在代码中动态生成

1. 将”后处理“功能对象拖入优先加载栏，或者在代码中预加载后处理的资源 ID，不然需要使用异步 Spawn 才能使用对应资源

![](static/boxcny1SVyyMERmxr7tvSu5y9Fh.png)

```
@MWCore.MWProperty()
preloadAssets: string = "21151";
```

1. 动态 spawn 后处理，通过上面介绍的接口修改其属性

```
// 异步spawn，没有找到资源时会下载后在生成
MWCore.GameObject.asyncSpawnGameObject("21151").then((obj) => {
    let p = obj as GamePlay.PostProcess;
}
```

```
// 普通spawn生成，没有优先加载或预加载资源则无法生成
let p = MWCore.GameObject.spawnGameObject("21151") as GamePlay.PostProcess;
```

# 使用 后处理 的注意事项与建议

1. 后处理对象是全局的，所以效果会被覆盖而不是叠加

# 项目案例

无
