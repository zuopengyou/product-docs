# 游戏语言本地化

<strong>阅读本文大约需要 10 分钟</strong>

本文讲述了本地化的含义、使用方法与流程。

# 什么是本地化

本地化是指让编辑器制作的游戏在某些条件下显示不同的语种，此处的条件由开发者自行控制（可以根据不同 windows 语言自动显示对应语种，也可以做到 UI 中让玩家手动切换语言，可以实现开发者想要的逻辑）

# 本地化功能的使用

1. 功能入口：工具栏——游戏本地化

![](static/boxcn9yC6ibcjdp0OW1zCyYAuMg.png)

- 收集文本：

![](static/boxcnm8IcZ1HNQ0pPVpfx0X5VPb.png)

- 收集所有的 key，并更新当前配置表的 key

  - 收集 key 不会对配置产生影响
  - 收集 key 会删除之前存在，但当前已不存在的 key 与其配置
- key 的意义：UI 组件中的原始文本或者代码中的原始文本
- 怎么让 key 被收集到：

  - 方法一：勾选 UI 组件的本地化

![](static/boxcnYjwSCkCXjw9JC0rfB4PUZe.png)

```
- 备注：老项目用以下脚本刷一下使得UI组件自动录入本地化字段

  - 使用方法：放入MetaworldSaved目录下，运行将刷新所有项目
```

![](static/boxcns3Wgsow10ns5CHpCOLoKge.png)

```
- 方法二：通过Util.LanguageUtil.locText("Key")函数来使得此文本能够本地化

  - 备注：该函数返回key本身，一般用于标识代码中出现的新文本；
```

- 支持语言：

  - 选择一种语言后，下方文本配置表显示对应语言的配置

![](static/boxcnDxewExYl6qHcGM5LxTsttg.png)

- 第一版暂时只做了中、英、葡萄牙语，若有需求后续可添加
- 自动翻译：将所有当前所选支持语言下未配置的文本进行自动翻译，当前版本暂不支持
- 配置表：

  - 左侧显示 key，右侧显示配置信息
  - 收集文本成功后自动填入，不可编辑
  - 配置信息为左侧 key 值的翻译，若不翻译，则在游戏中默认显示 key 值本身
- 页码逻辑：

![](static/boxcn8INbpN923cbMxoEMykYudg.png)

- 点击向前/向后按钮，页码向前/向后加一
- 点击页码，跳转至该页码
- 页码输入框：输入参数，点击空白处生效，并清空输入

  - 只允许输入数字
  - 若输入数字超过当前页码范围，点击空白处时则不生效，并清空输入
- 若当前转换文本下存在 XX 条未翻译的文本，弹窗左下角显示“剩余 XX 条待配置的信息”

![](static/boxcnSiDS1eBEmYtwT80RStXi5e.png)

- 若当前转换文本下所有 key 值均被翻译，表格显示“当前语言已全部配置”

![](static/boxcnxVlpubTWTB1Hk4Go87Ezbe.png)

- 配置表的导入与导出

  - 导出为 Excel 表，表头格式如下·，每一个语言对应编辑器中的一种支持语言

| key | Chinese | English | Portuguese |
| --- | ------- | ------- | ---------- |

- 导出文件格式为 XLSX
- 导出文件默认名称为“项目名 +Translate”
- 支持从外部导入表格，文件格式支持 XLSX
- 导入文件将会覆盖当前所有语言的配置信息
- 导入后校验格式

  - 若表头字段均为当前支持字段，导入成功
  - 若表头字段包含当前不支持的字段，导入失败
- 自动忽略 key 为空的行
- 若存在相同的多个 key，行数最大的 key 将会生效，行数小的将被忽略
- 导入将覆盖编辑器中的语言表
- eg：将下表导入后语言配置表显示如图

![](static/boxcnGoezQm2sbdaC2WinZY3EOe.png)

![](static/boxcnj3bcxFvQ6LaTpb78zOJrih.png)

![](static/boxcnHzI8sek4mjItTNm6Gzn1Sf.png)

![](static/boxcn09tD8H3li0Ee5Iqh7arxUe.png)

- 应用、取消按钮

  - 点击应用按钮，将配置信息保存至工程
  - 点击取消按钮，将校验有无未保存的配置项，如果没有则退出，如果有则弹出弹窗提示

![](static/boxcnUNCZFJS4GNIzsedpJCki1b.jpg)

```
- 点击确认按钮，关闭本地化页面，并清空未保存的所有配置项

- 点击取消按钮，取消该操作
```

- 语言设置

  - 提供 API 设置语言

| API 名称                                                                | 参数说明                                                   | 返回                                | 注释               |
| ----------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------- | ------------------ |
| Util.LanguageUtil.useLocalizedLanguage<br/>（Type：LanguageType）：void | LanguageType 存在 Chinese、English、<br/>Portuguese 三个值 | callback：<br/>isSuccessed：boolean | 设置游戏使用的语言 |

# 简单示例

1. 示例一：点击键盘 1、2、3，将某一按钮切换为中/英/法语

配置表信息如下：

![](static/boxcnJs7qiotdVcD6ZP0bslLfjb.png)

![](static/boxcnaFqrmed5zdVI1po4tkudDc.png)

![](static/boxcnKfAg17OJM5McyYtfqA76Wb.png)

对应逻辑代码如下：

```
Util.LanguageUtil.useLocalizedLanguage(LanguageType.Chinese)
        //初始化为中文
        Util.InputUtil.onKeyDown(Type.Keys.One,()=>{
            Util.LanguageUtil.useLocalizedLanguage(LanguageType.Chinese);
        })
        Util.InputUtil.onKeyDown(Type.Keys.Two,()=>{
            Util.LanguageUtil.useLocalizedLanguage(LanguageType.English);
        })
        Util.InputUtil.onKeyDown(Type.Keys.Three,()=>{
            Util.LanguageUtil.useLocalizedLanguage(LanguageType.Portuguese);
        })
```

1. 示例二：点击某按钮，将此按钮的文本切换为另一个 key 所对应的配置

配置表信息如下：

![](static/boxcnV80dktg8mwGzJ4PX4il62e.png)

对应逻辑代码如下：

```
const Btn = base.findChildByPath("MWCanvas/MWButton_TsButton")as UI.StaleButton;
Btn.onPressed.add(() => {
            Btn.text =  Util.LanguageUtil.locText("Ts---Button")
        });
```

<strong>Util.LanguageUtil.getLocTextValue(“key”)函数</strong>

- 除上述设置语言的函数 Util.LanguageUtil.useLocalizedLanguage 与标记本地化的函数 Util.LanguageUtil.locText("Key")之外；我们还提供了 Util.LanguageUtil.getLocTextValue(“key”)函数，该函数的作用是：<strong>返回该 key 在此语言环境下的 value</strong>；
- 一般来说，对于静态设置且不涉及到拼接的文本来说，无需用到 getLocTextValue 函数，直接 UI 组件.text=Util.LanguageUtil.locText("key")就可以使此 UI 组件的文本属性本地化，对应的配置为 key 的多语言配置；

但如果涉及到字符串<strong>拼接或动态拼接</strong>时，仅用 Util.LanguageUtil.locText("key")函数是无法实现的，需要用 Util.LanguageUtil.getLocTextValue(“key”)函数进行拼接
