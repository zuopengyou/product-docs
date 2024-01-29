# 富文本

**阅读本文大概需要 5 分钟**

本文概述了文本控件/文本框控件中富文本功能的使用方法。

## 什么是富文本？

**富文本** ，又称多文本格式，使用特定的富文本标记格式，可使一个文本控件/文本框控件内的文本实现不同字号、不同颜色等多种效果；与富文本相对应的是纯文本，即完全根据UI控件的文本设置来格式化的文本

![](https://cdn.233xyx.com/1681453407514_654.gif)
![](https://cdn.233xyx.com/1681453407666_299.gif)

## 如何使用富文本？

* 首先，在需要使用富文本的文本/输入框控件的属性面板中找到【文本】-【富文本】属性，并勾选

![](https://cdn.233xyx.com/1681453409999_645.png)

* 再按照下面的标记格式表，在文本/输入框控件中输入带有开始和结束标签的格式化文本内容，脱离输入状态后，文本内容就会按照标签显示为富文本样式，示例：

```ts
//<u>格式化的文本</u>
```

* 文本可以相互嵌套，只要结束标签的顺序与开始标签相反即可，示例：

```ts
//<u><s>格式化的文本</s></u> 或者 <s><u>格式化的</u>文本</s>都可以识别；
//而<s><u>格式化的文本</s></u> 或者 <u>格<s>式化的</u>文本</s>不能被正确识别
```

* 自适应文本框功能的计算暂不考虑富文本的字号大小，因此请勿同时使用富文本与自适应文本框

## 富文本标记格式列表

* 富文本标记格式列表
  * 目前编辑器的默认中文字体暂不支持粗体、斜体、粗斜体字形，后续会补充

| ***标签***                            | ***描述***                                                   | ***示例***                                                   |
| ------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **`<b>`**                             | 以粗体显示文本                                               | We are `<b>not</b>` amused.                                  |
| **`<i>`**                             | 以斜体显示文本                                             | We are `<i>usually</i>` amused.                                  |
| **`<size=50>`**                             | 根据参数值设置文本的大小                                             | We are `<size=50>`largely`</size>` unaffected.                                |
| **`<color=#ff0000ff>或<color=#red>`** | 根据参数值#rrggbbaa设置文本的颜色，分别表示颜色的红、绿、蓝和 Alpha（透明度）值，大小写都能识别20种常用颜色可以直接使用颜色名称，大小写都能识别 | We are `<color=#ff0000ff>colorfully</color>` amused We are `<color=#red>colorfully</color`> amused |
| **`<u>`**                             | 以下划线显示文本                                             | We are `<u>not</u>` amused.                                  |
| **`<s>`**                             | 以删除线显示文本                                             | We are `<s>not</s>` amused.                                  |
| **`<!-- -->`**                             | 备注，即不显示里面的文本                                             | WWe are not amused.`<!--not shown-->`                                  |



* 20种常用颜色和颜色名对应表

| ***颜色名称*** | ***十六进制值*** | ***样本***                                                                                                                                                                                                                             |
| ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| black                  | `#000000ff`          | ![](https://cdn.233xyx.com/1681453411072_716.png) |
| blue                   | `#0000ffff`          | ![](https://cdn.233xyx.com/1681453409539_068.png) |
| brown                  | `#a52a2aff`          | ![](https://cdn.233xyx.com/1681453409845_218.png) |
| cyan                   | `#00ffffff`          | ![](https://cdn.233xyx.com/1681453411384_835.png) |
| darkblue               | `#0000a0ff`          | ![](https://cdn.233xyx.com/1681453410917_310.png) |
| fuchsia                | `#ff00ffff`          | ![](https://cdn.233xyx.com/1681453409226_745.png) |
| green                  | `#008000ff`          | ![](https://cdn.233xyx.com/1681453408916_143.png) |
| grey                   | `#808080ff`          | ![](https://cdn.233xyx.com/1681453410765_795.png) |
| lightblue              | `#add8e6ff`          | ![](https://cdn.233xyx.com/1681453411225_900.png) |
| lime                   | `#00ff00ff`          | ![](https://cdn.233xyx.com/1681453410460_269.png) |
| maroon                 | `#800000ff`          | ![](https://cdn.233xyx.com/1681453409690_142.png) |
| navy                   | `#000080ff`          | ![](https://cdn.233xyx.com/1681453410612_055.png) |
| olive                  | `#808000ff`          | ![](https://cdn.233xyx.com/1681453407972_905.png) |
| orange                 | `#ffa500ff`          | ![](https://cdn.233xyx.com/1681453408438_665.png) |
| purple                 | `#800080ff`          | ![](https://cdn.233xyx.com/1681453407820_308.png) |
| red                    | `#ff0000ff`          | ![](https://cdn.233xyx.com/1681453409075_747.png) |
| silver                 | `#c0c0c0ff`          | ![](https://cdn.233xyx.com/1681453408126_939.png) |
| teal                   | `#008080ff`          | ![](https://cdn.233xyx.com/1681453408279_910.png) |
| white                  | `#ffffffff`          | ![](https://cdn.233xyx.com/1681453408609_561.png) |
| yellow                 | `#ffff00ff`          | ![](https://cdn.233xyx.com/1681453408762_077.png) |



## 富图片及其标记格式列表
* 文本框/输入框控件支持使用标记格式插入富图片，富图片功能目前支持使用233娘表情图共94张
* 使用方法：将文本框/输入框控件的富文本属性开启，在文字输入富图片的对应标记格式，标记格式会自动转成富图片，富图片的尺寸由文本框的字号大小决定
* 如果使用了ChatBubble类的聊天气泡接口，能自动支持将房间内聊天使用到的233表情同步显示在聊天气泡中
* 请注意：目前这批233娘的富图片仅支持在国内环境使用，请谨慎使用，处理海外本地化时应将所使用的富图片去除，否则会展示标记格式原文本
* 富图片标记格式对应表
| 富图片标记格式 | 图片                                                                                                                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [发怒]     | ![](https://cdn.233xyx.com/online/VeiFRqN3AHIb1706526133475.png) |
| [鼓掌]     | ![](https://cdn.233xyx.com/online/qfvGMY7kKNyd1706526133475.png) |
| [背叛]     | ![](https://cdn.233xyx.com/online/i2I2LcSlqSpl1706526133475.png) |
| [大笑]     | ![](https://cdn.233xyx.com/online/UGNa2UhGCHiu1706526133475.png) |
| [笑容满面] | ![](https://cdn.233xyx.com/online/kKQ2qZw5S3gO1706526133475.png) |
| [黑线]     | ![](https://cdn.233xyx.com/online/rilMuaqxk1WB1706526133475.png) |
| [羞]       | ![](https://cdn.233xyx.com/online/7QMMELUhQ0D91706526133475.png) |
| [快哭了]   | ![](https://cdn.233xyx.com/online/C8qHT07EZVZf1706526133475.png) |
| [冷汗]     | ![](https://cdn.233xyx.com/online/voOj9uIxJQQD1706526133475.png) |
| [冲]       | ![](https://cdn.233xyx.com/online/BEi11KPfiPK11706526133475.png) |
| [酷]       | ![](https://cdn.233xyx.com/online/Tb6PtiHJZoKH1706526133475.png) |
| [抓狂]     | ![](https://cdn.233xyx.com/online/QDXH1ydXKFd91706526133475.png) |
| [新月脸]   | ![](https://cdn.233xyx.com/online/HcfME4d4QNCQ1706526133475.png) |
| [哭哭]     | ![](https://cdn.233xyx.com/online/vAva3hO8Q2Ff1706526133475.png) |
| [可爱]     | ![](https://cdn.233xyx.com/online/MCKY2y5Yvorw1706526133475.png) |
| [鄙视你]   | ![](https://cdn.233xyx.com/online/5xbexxtDpc1T1706526133475.png) |
| [在做了]   | ![](https://cdn.233xyx.com/online/K9HMTGSI5a4g1706526133475.png) |
| [疑问]     | ![](https://cdn.233xyx.com/online/MbAkZAJfL6I31706526133475.png) |
| [吃饭]     | ![](https://cdn.233xyx.com/online/3MZDK4dlmoGg1706526133475.png) |
| [期待]     | ![](https://cdn.233xyx.com/online/XRpOpXmhcoUC1706526133475.png) |
| [打call]   | ![](https://cdn.233xyx.com/online/mBbWEK5ZqjkX1706526133475.png) |
| [财迷]     | ![](https://cdn.233xyx.com/online/0bQJhDMvk5Jo1706526133475.png) |
| [委屈]     | ![](https://cdn.233xyx.com/online/CImJRhFDQsLI1706526133475.png) |
| [皱眉]     | ![](https://cdn.233xyx.com/online/5nolrekhWtym1706526133476.png) |
| [满月脸]   | ![](https://cdn.233xyx.com/online/UL0IktLMpC2t1706526133476.png) |
| [收到]     | ![](https://cdn.233xyx.com/online/XSW3iyfou2Dj1706526133476.png) |
| [拜拜]     | ![](https://cdn.233xyx.com/online/hFDnePEcf6721706526133476.png) |
| [做鬼脸]   | ![](https://cdn.233xyx.com/online/PelOjeppSeil1706526133476.png) |
| [呲牙]     | ![](https://cdn.233xyx.com/online/A20p7npWyyhY1706526133476.png) |
| [我晕]     | ![](https://cdn.233xyx.com/online/ttoftYT0TL6i1706526133476.png) |
| [愉快]     | ![](https://cdn.233xyx.com/online/2VxipacFLOCd1706526133476.png) |
| [心心脸]   | ![](https://cdn.233xyx.com/online/7txiuymqfa0e1706526133476.png) |
| [送心心]   | ![](https://cdn.233xyx.com/online/W9FTY09qkUED1706526133476.png) |
| [吐血]     | ![](https://cdn.233xyx.com/online/GsSv8B8gOYsW1706526133476.png) |
| [稍等]     | ![](https://cdn.233xyx.com/online/D2eXphDo42vX1706526133476.png) |
| [摊手]     | ![](https://cdn.233xyx.com/online/pavlLuKI5QXh1706526133476.png) |
| [求抱抱]   | ![](https://cdn.233xyx.com/online/QFUBdZRd74e61706526133476.png) |
| [灵光一闪] | ![](https://cdn.233xyx.com/online/eavLsPbSdwap1706526133476.png) |
| [无辜笑]   | ![](https://cdn.233xyx.com/online/ESyAGf93oF3g1706526133476.png) |
| [烦躁]     | ![](https://cdn.233xyx.com/online/LjDNxp7PALUb1706526133476.png) |
| [小丑]     | ![](https://cdn.233xyx.com/online/cTYsFrSGUrSv1706526133476.png) |
| [敲键盘]   | ![](https://cdn.233xyx.com/online/nmsvHhjPu8SA1706526133476.png) |
| [飞吻]     | ![](https://cdn.233xyx.com/online/pCXYRQ9dJHPN1706526133476.png) |
| [亲亲]     | ![](https://cdn.233xyx.com/online/yeITAehCaN8x1706526133476.png) |
| [笑]       | ![](https://cdn.233xyx.com/online/WFpZEpkAHo861706526133476.png) |
| [笑哭]     | ![](https://cdn.233xyx.com/online/yWSuEWAHu2Ml1706526133476.png) |
| [嬉笑]     | ![](https://cdn.233xyx.com/online/3xKlx5flI3vQ1706526133476.png) |
| [柠檬]     | ![](https://cdn.233xyx.com/online/i8ZEPCWtrIis1706526133476.png) |
| [听音乐]   | ![](https://cdn.233xyx.com/online/f4ALYAWfePxK1706526133476.png) |
| [心]       | ![](https://cdn.233xyx.com/online/AdVHNZRceqUi1706526133476.png) |
| [戴口罩]   | ![](https://cdn.233xyx.com/online/vJkCmsPMW8fs1706526133476.png) |
| [调皮]     | ![](https://cdn.233xyx.com/online/20Zer2PmWIyV1706526133476.png) |
| [抠鼻]     | ![](https://cdn.233xyx.com/online/V1O0915qJwp61706526133476.png) |
| [我看行]   | ![](https://cdn.233xyx.com/online/CKRHohKIoqUx1706526133476.png) |
| [惊恐]     | ![](https://cdn.233xyx.com/online/6CqT999xNjVR1706526133476.png) |
| [派对]     | ![](https://cdn.233xyx.com/online/GB5skm5ynmAS1706526133476.png) |
| [我想静静] | ![](https://cdn.233xyx.com/online/LHqkO0Iol1Kj1706526133476.png) |
| [石化]     | ![](https://cdn.233xyx.com/online/0leiIbxsWUCA1706526133476.png) |
| [可怜]     | ![](https://cdn.233xyx.com/online/ia6q9PwDQplg1706526133476.png) |
| [撇嘴]     | ![](https://cdn.233xyx.com/online/YcCP5ur7rn391706526133476.png) |
| [尬笑]     | ![](https://cdn.233xyx.com/online/3TpBGfMR9iSj1706526133476.png) |
| [举手]     | ![](https://cdn.233xyx.com/online/8eC6Tjv11Ub51706526133476.png) |
| [翻白眼]   | ![](https://cdn.233xyx.com/online/a2sGiw3dLT9b1706526133476.png) |
| [致敬]     | ![](https://cdn.233xyx.com/online/TU898GvKRlNt1706526133476.png) |
| [流泪]     | ![](https://cdn.233xyx.com/online/Lbm1h0GAtSUO1706526133476.png) |
| [注意]     | ![](https://cdn.233xyx.com/online/G1fw1VuUslia1706526133476.png) |
| [震惊]     | ![](https://cdn.233xyx.com/online/DFjW6H1gQ1Is1706526133476.png) |
| [闭嘴]     | ![](https://cdn.233xyx.com/online/QCCerFeyNq2C1706526133476.png) |
| [害羞]     | ![](https://cdn.233xyx.com/online/hc61A5OUkKa21706526133476.png) |
| [叹气]     | ![](https://cdn.233xyx.com/online/3ea5NnZnf4wE1706526133476.png) |
| [骷髅]     | ![](https://cdn.233xyx.com/online/Qg668cQH9Gpe1706526133476.png) |
| [酣睡]     | ![](https://cdn.233xyx.com/online/V81MHyhdJM3o1706526133476.png) |
| [困]       | ![](https://cdn.233xyx.com/online/08ZOhjS6dk3v1706526133476.png) |
| [开心]     | ![](https://cdn.233xyx.com/online/1tIfyne76StA1706526133476.png) |
| [打脸]     | ![](https://cdn.233xyx.com/online/M18o0TWpcIi91706526133476.png) |
| [骄傲]     | ![](https://cdn.233xyx.com/online/sZawfcsdH0sC1706526133476.png) |
| [泣不成声] | ![](https://cdn.233xyx.com/online/mFy2wDneJYvu1706526133476.png) |
| [无奈]     | ![](https://cdn.233xyx.com/online/mYCulZgkvESu1706526133476.png) |
| [敲打]     | ![](https://cdn.233xyx.com/online/kTrUMFVg9sCw1706526133476.png) |
| [强]       | ![](https://cdn.233xyx.com/online/YLBIBfIisByX1706526133476.png) |
| [奋斗]     | ![](https://cdn.233xyx.com/online/tx5786jw7WLY1706526133477.png) |
| [惊呆]     | ![](https://cdn.233xyx.com/online/TLZTKbdNJ1T51706526133477.png) |
| [汗]       | ![](https://cdn.233xyx.com/online/sDukpmdWxTDK1706526133477.png) |
| [泪奔]     | ![](https://cdn.233xyx.com/online/mQD84EGx6aDX1706526133477.png) |
| [感谢]     | ![](https://cdn.233xyx.com/online/oYCo1aqlbUJQ1706526133477.png) |
| [思索]     | ![](https://cdn.233xyx.com/online/BdU3bwl46Ptm1706526133477.png) |
| [偷笑]     | ![](https://cdn.233xyx.com/online/4w5G3QbfK42p1706526133477.png) |
| [摸头]     | ![](https://cdn.233xyx.com/online/cqWN74bM5JSu1706526133477.png) |
| [呕吐]     | ![](https://cdn.233xyx.com/online/WcO1KTXSp3xS1706526133477.png) |
| [vr]       | ![](https://cdn.233xyx.com/online/5DZtKoSX9W791706526133477.png) |
| [坏笑]     | ![](https://cdn.233xyx.com/online/njXUd0FtTAKj1706526133477.png) |
| [机智]     | ![](https://cdn.233xyx.com/online/uwLHIFiWFVQA1706526133477.png) |
| [哈欠]     | ![](https://cdn.233xyx.com/online/By27hPmx2F4w1706526133477.png) |
| [耶]       | ![](https://cdn.233xyx.com/online/YWo5C8vQYuGD1706526133477.png) |



