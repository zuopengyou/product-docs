# 游戏语言本地化

::: tip **阅读本文大概需要15分钟**

* 帮助开发者快速了解并使用游戏语言本地化功能，本文包含以下内容

(1)介绍游戏语言本地化、(2)功能的使用说明、(3)其他辅助功能说明、(4)模拟使用场景的简单示例

:::

## 什么是游戏语言本地化

* 本地化是指让编辑器制作的游戏能够显示不同的语种，帮助游戏适应不同的语言环境
* 游戏语言本地化功能为开发者提供了自行配置游戏内文本在各语言环境下的文本配置功能，支持开发者通过api控制游戏内展示的语种
## 补充说明：快速了解本地化流程、原理及API各自的作用

### 本地化流程

![](https://cdn.233xyx.com/athena/online/2c31da7e7bb047ddb43e7bd468f31cb2_17445980.webp)

### 本地化原理

* 游戏运行过程中会收集UI文本框中的原文本，根据游戏的语言环境与对应配置表内提供的信息进行对比，将原文本转化成对应的转换文本

![](https://cdn.233xyx.com/athena/online/9943c81e56a64252bb0d19bfae34e9a3_16955971.webp)

* 上述操作都是针对“UI文本框”这一载体进行的，只有出现在“UI文本框”内的文本才会受到本地化功能影响

![](https://cdn.233xyx.com/athena/online/01222a10efde4746b46f881cdad928c5_16955972.webp)

### API各自的作用

#### locText

* 对于脚本中动态生成在UI文本框上的文本，除了导入excel表外暂时无法直接收集到配置表中，所以提供locText来标记需要收集的文本

![](https://cdn.233xyx.com/athena/online/c61bfa6a4ce1409ab38737544d337007_16955973.webp)

#### getLocTextValue

* 当原文本出现存在动态拼接文本的情况时，配置表中一般只记录了其中一部分，导致其无法在原文本列表中检索出来并替换上对应的转换文本，此时需要getLocTextValue直接在脚本中返回其在当前语言环境下对应的转换文本
* 具体示例可见下文的示例2

![](https://cdn.233xyx.com/athena/online/ff0bdd7204b64cc9aa46efc1db994ab6_16955974.webp)

#### useLocalizedLanguage

* pie运行状态下默认语言环境为英文，useLocalizedLanguage为开发者提供了控制语言环境的接口
* 具体示例可见下文的示例1

![](https://cdn.233xyx.com/athena/online/3a70bcdb420a41049f0269047f1cbe1e_16955975.webp)

## 本地化功能的使用

### 功能入口

* 通过编辑器上方的“游戏本地化”按钮进入

![](https://cdn.233xyx.com/athena/online/edbcce30a6a34b138879484d6b01ca75_15026008.webp)

### 本地化窗口结构

![](https://cdn.233xyx.com/athena/online/70bb438408bc4041b2c4bf2a06d846f8_15026009.webp)

1、 **“收集文本”按钮** ：用于收集在UI编辑器和脚本中标记好的原文本，列为配置表中的原文本

2、 **“导入文本”按钮** ：用于快速导入原文本与转换文本的信息表

3、 **支持语言** ：用于切换各语言环境下对应的配置表

4、 **“自动翻译”按钮** ：对原文本根据当前的支持语言自动翻译和配置转换文本

5、 **搜索框** ：支持对原文本和转换文本进行搜索，展示符合的配置项

6、 **筛选按钮** ：支持筛选并展示配置项或未配置项

7、 **“原文本”列表** ：展示所有配置项的原文本，暂不支持修改，与“转换文本”列表一起构成了完整的配置表

8、 **“转换文本”列表** ：展示所有配置项的转换文本，支持修改，与“原文本”列表一起构成了完整的配置表

9、 **页码栏** ：可展示配置项总数及对应的页数，提供页面跳转功能

10、 **配置情况展示栏** ：可展示当前支持语言下配置表的配置情况

11、 **“取消”、“导出”、“应用”按钮** ：“取消”和“应用”控制是否要将当前的全部配置表信息应用到项目内，“导出”提供了将全部配置表信息导出为excel文件的功能

### 1、“收集文本”按钮

* 用于收集在UI编辑器和脚本中标记好的原文本，列为配置表中的原文本
  
  ![](https://cdn.233xyx.com/athena/online/4f2cf98e233646aa844d4ae92c5562ab_15026010.webp)
  
  #### 两种收集方式：覆盖与新增
  
  * 覆盖：收集当前编辑器中的所有原文本并覆盖
  * 新增：收集当前编辑器中的所有原文本，新增当前表格中没有的原文本
    
    ![](https://cdn.233xyx.com/athena/online/3ca34bbe14a745898f12c7dcad51bac0_15026011.webp)
  
  #### 标记UI编辑器/脚本中的原文本
  
  * 在UI编辑器中，勾选文本组件的本地化字段，即可标记原文本，该字段默认勾选
    
    ![](https://cdn.233xyx.com/athena/online/6910954da02241c1b7063d4525b74020_15026012.webp)
  * 在脚本中需要使用Util.LanguageUtil.locText("Key")标记文本
  
  ```ts
  this.tiptxt.text = Util.LanguageUtil.locText("你好")
  //用于收集文本
  ```

::: warning **注意**

* 必须使用双引号标记原文本，使用单引号会导致该字符串无法被收集到

![](https://cdn.233xyx.com/athena/online/ea3aac7118e841f3973a50c20426669a_15026013.webp)

![](https://cdn.233xyx.com/athena/online/ad7eae5c426d47da856f32f63b5648bb_15026014.webp)

:::

### 2、“导入文本”按钮

* 用于快速导入原文本与转换文本的信息表
  
  ![](https://cdn.233xyx.com/athena/online/0e2b7817d4c541cbb69c4d4d584fa3c3_15026015.webp)
  
  #### 两种导入方式：覆盖与新增
  
  * 与收集文本逻辑一致
    
    ![](https://cdn.233xyx.com/athena/online/12d86e9ed69944c197376cbcf45233df_15026016.webp)
  
  #### 导入格式要求
  
  * 支持格式为XLSX的Excel表，表头格式要求如下·，每一个语言对应编辑器中的一种支持语言
    
| key | Chinese | English | Portuguese |
| ----- | --------- | --------- | ------------ |
    
    key：原文本
    
    Chinese：中文环境下的转换文本
    
    English：英文环境下的转换文本
    
    Portuguese：葡萄牙文环境下的转换文本

### 3、支持语言

* 用于切换各语言环境下对应的配置表
* 暂时只支持中、英、葡萄牙语

![](https://cdn.233xyx.com/athena/online/870eb3c376d4449c8fc602f1b419492b_15026017.webp)

### 4、“自动翻译”按钮

* 对原文本根据当前的支持语言自动翻译和配置转换文本

![](https://cdn.233xyx.com/athena/online/c58717f0544b41d59e5a88b27d87c0fe_15026018.webp)

::: warning **注意**

* 自动翻译功能未完善，在小部分情况下不支持个别原文本的翻译，需开发者自行配置

:::

### 5、搜索框

* 支持对原文本和转换文本进行搜索，展示符合的配置项
* 搜索结果不会实时更新，需区别于编辑器通用的搜索框（此设计为了防止在搜索状态下配置时，修改配置导致此条目被移出当前的搜索结果）
* 若要更新搜索结果，可重新输入关键词，或者聚焦至搜索框时回车，或者点击搜索图标
  
  ![](https://cdn.233xyx.com/athena/online/cfa9a686a33f4b869e65e8d553e081ac_15026019.webp)

### 6、筛选按钮

* 支持筛选并展示配置项或未配置项
* 筛选结果同样不会实时更新，目的与搜索一致
* 若要更新筛选结果，更改任意筛选项时即可更新

![](https://cdn.233xyx.com/athena/online/e049c6181911483e892a3e77ec5cb9e1_15026020.webp)

### 7、**“原文本”列表**

* 展示所有配置项的原文本，暂不支持修改，与“转换文本”列表一起构成了完整的配置表
* 悬浮至文本框上时可通过tips查看全部信息

![](https://cdn.233xyx.com/athena/online/e5460011c0cb4d5fb86c235f51e84c3a_15026021.webp)

### 8、**“转换文本”列表**

* 展示所有配置项的转换文本，支持修改，与“原文本”列表一起构成了完整的配置表
* 转换文本输入框为富文本框，支持通过Ctrl+Enter的方式换行编辑
* 未配置转换文本的原文本，在对应语言环境下会展示原文本

![](https://cdn.233xyx.com/athena/online/6e11afbe83fb416fbe658fb09d07e7b0_15026022.webp)

### 9、**页码栏**

* 可展示配置项总数及对应的页数，提供页面跳转功能
* 点击向前/向后按钮，页码向前/向后加一
* 点击页码，跳转至该页码
* 页码输入框：输入参数，点击空白处生效，并清空输入
  * 只允许输入数字
  * 若输入数字超过当前页码范围，点击空白处时则不生效，并清空输入

![](https://cdn.233xyx.com/athena/online/19521b7b61f244899abccc7e5a63e44e_15026023.webp)

### 10、**配置情况展示栏**

* 可展示当前支持语言下配置表的配置情况
* 若当前转换文本下存在XX条未翻译的文本，弹窗左下角显示“剩余XX条待配置的信息”

![](https://cdn.233xyx.com/athena/online/c65f7b55228e47b59230c68dc6ec7f44_15026024.webp)

* 若当前转换文本下所有key值均被翻译，表格显示“当前语言已全部配置”

![](https://cdn.233xyx.com/athena/online/43c4a675eb30491aa8c267103c1ceb50_15026025.webp)

### 11、**“取消”、“导出”、“应用”按钮**

* “取消”和“应用”控制是否要将当前的全部配置表信息应用到项目内，“导出”提供了将全部配置表信息导出为excel文件的功能
  
  ![](https://cdn.233xyx.com/athena/online/4a9c746c50984fdca98a04f9bd0c0da5_15026953.webp)
  
  #### “取消”按钮
  
  * 点击取消按钮，将校验有无未保存的配置项，如果没有则退出，如果有则弹出弹窗提示
    
    ![](https://cdn.233xyx.com/athena/online/9d17790aa89a4d8691c82043c45ddfc3_15026026.webp)
  
  #### “导出”按钮
  
  * 导出为Excel表，表头格式如下·，每一个语言对应编辑器中的一种支持语言

| key | Chinese | English | Portuguese |
| ----- | --------- | --------- | ------------ |

* 导出文件格式为XLSX
* 导出文件默认名称为“项目名+Translate”

#### “应用”按钮

* 点击应用按钮，将所有配置信息保存至工程，无需对每个支持语言的配置表执行应用操作

## 辅助功能

### 编辑态下预览语言

* 在完成表格的配置后，可以对主编辑器中显示的UI或UI编辑器中的UI文件按配置表中某一语言配置进行显示
* 预览的语言类型可以是原文本、中文、英文、葡萄牙文
* 仅在编辑态下生效，运行时不生效（运行时需进行语言设置）
* 主编辑器预览语言切换：
  
  ![](https://cdn.233xyx.com/athena/online/d9e08ecbbeaa4190b0428e0fa2436f90_15026027.webp)
  
  ::: warning **注意**
  
  * 世界UI的预览目前还无法在主视口下正常进行本地化预览，在运行态下可以正常显示
  
  :::
* UI编辑器预览语言切换：

![](https://cdn.233xyx.com/athena/online/dc7bd9c9de76423b8276e01b5b1eb04c_15026028.webp)

### 运行态下设置语言

::: warning **注意**

* 运行态下默认为英文语言环境
* 提供API设置语言

| API名称                                                            | 参数说明                                           | 返回                           | 注释               |
| -------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------- | -------------------- |
| Util.LanguageUtil.useLocalizedLanguage（Type：LanguageType）：void | LanguageType存在Chinese、English、Portuguese三个值 | callback：isSuccessed：boolean | 设置游戏使用的语言 |

:::

* Util.LanguageUtil.getLocTextValue(“key”)函数
  
  * 除上述设置语言的函数Util.LanguageUtil.useLocalizedLanguage与标记本地化的函数Util.LanguageUtil.locText("Key")之外；我们还提供了Util.LanguageUtil.getLocTextValue(“key”)函数，该函数的作用是： 返回该key在此语言环境下的value ；
  * 一般来说，对于静态设置且不涉及到拼接的文本来说，无需用到getLocTextValue函数，直接UI组件.text=Util.LanguageUtil.locText("key")就可以使此UI组件的文本属性本地化，对应的配置为key的多语言配置； 但如果涉及到字符串拼接或动态拼接时，仅用Util.LanguageUtil.locText("key")函数是无法实现的，需要用Util.LanguageUtil.getLocTextValue(“key”)函数进行拼接

## 示例1：利用"useLocalizedLanguage"切换游戏内的语言环境

* 第一步：完成UI并保存，打开本地化界面，点击收集文本

![](https://cdn.233xyx.com/athena/online/ad25810640dd415a8cc131218da2817f_15026029.webp)

![](https://cdn.233xyx.com/athena/online/8249c3b084304e6b9c0160c4633422f8_15026030.webp)

* 第二步：将支持语言切换至英文，对需要本地化的文本进行配置，并点击应用

![](https://cdn.233xyx.com/athena/online/99b9d9056cc6423dac494f6b1a40a1d0_15026031.webp)

* 第三步：编写如下代码

```ts
protected onStart() {
        const SwitchBtn = this.uiWidgetBase.findChildByPath('RootCanvas/StaleButton') as UI.StaleButton//获取按钮
        Util.LanguageUtil.useLocalizedLanguage(LanguageType.Chinese)//初始设置语言环境为中文
        SwitchBtn.onPressed.add(()=>{
            Util.LanguageUtil.useLocalizedLanguage(LanguageType.English)
        })//按下按钮后，设置语言环境为英文
    }
```

* 最终运行效果如下：
  
  <video controls src="https://cdn.233xyx.com/1691042312370_391.mp4"></video>

::: warning **注意**

视频中出现了转换文本超出文本框的情况，可通过两种方法解决

1. 利用编辑态预览功能调整字体或文本框的大小
2. 勾选UI文本组件中的“自适应文本”字段

![](https://cdn.233xyx.com/athena/online/5d9b37733b71458eb43568bff6e19b6c_15026033.webp)

:::

## 示例2：利用"getLocTextValue"处理脚本中的拼接文本

* locText仅提供收集文本的功能，拼接文本无法在原文本列表中检索出来，导致其无法正常本地化

![](https://cdn.233xyx.com/athena/online/c8a6511e75ba4e44a47ac18820d2c5b5_15026034.webp)

![](https://cdn.233xyx.com/athena/online/7351ed97529f459488f2c0591d3e19d7_15026035.webp)

* 此时需要使用getLocTextValue返回对应语言环境下的转换文本

![](https://cdn.233xyx.com/athena/online/73e9f4e1270341ebaab3035ec8e39ce4_16955970.webp)

![](https://cdn.233xyx.com/athena/online/2338add41ca04defb7782ece2a001d3f_15026037.webp)

::: warning **注意**

* 可以在使用locText完成对原文本的收集和配置后，直接将locText全部替换为getLocTextValue，快速实现转换文本的正常显示

:::


