# 共享数据

**阅读本文预计 10 分钟**

**本文概述了如何通过编辑器提供的****API****以及****开发者平台****授权设置，将游戏的云端数据共享给多个游戏**

## 共享数据概述

根据【[数据存储](https://meta.feishu.cn/wiki/wikcnl49v1cFFHKGwNaL6rSEMVg) 】的文档内容，我们了解到了如何通过编辑器提供的 API 将游戏数据存储下来，当我们将游戏数据存储为**永久数据**后，就可以使用 API 将数据存储到我们的开发者平台上。然后我们可以通过开发者平台控制这份数据的读取权限，这样我们就可以将这份数据共享给其他游戏，完成让多款游戏共用一份游戏数据。

## 共享数据的步骤

##### 2.1 存储数据

**注意：一定要将数据存储环境设置为永久数据哦！**

- 首先我们在脚本中将数据存储环境改为 false，也就是设置为永久数据， 这样会以游戏为单位创建一份永久数据记录，该数据不会随着游戏房间销毁而消失。

```ts
//将游戏数据设置为永久存储，在游戏退出时数据不会被删除。
DataStorage.setTemporaryStorage(false);
```

- 然后我们通过 asyncSetData()函数将数据存储到开发者平台上，这样我们在开发者平台就会看到这份数据。也可以通过 asyncGetData()函数获取到该数据。

```ts
//设置一个key为“hp”的数据，Value为“50”
await DataStorage.asyncSetData("hp", "50");
//设置一个key为“lv”的数据，Value为“1”
await DataStorage.asyncSetData("lv", "1");
//设置一个key为“coin”的数据，Value为“9999”
await DataStorage.asyncSetData("coin", "9999");
//获取key为“hp”的数据
let data1 = await DataStorage.asyncGetData("hp");
//获取key为“lv”的数据
let data2 = await DataStorage.asyncGetData("lv");
//获取key为“coin”的数据
let data3 = await DataStorage.asyncGetData("coin");
```

##### 2.2 查看开发者平台中游戏数据

- 我们在发布完游戏，并通过审核后，打开开发者平台，找到存档管理列表。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnTlNSqwT4chVzV0pCdAjOFh.png)

- 然后选择我们的游戏名，定位我们所要找的游戏存档。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnHpVNAyHu9EAxMRRL9fvB4c.png)

- 接下来数据类型选择自定义。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnP0gTVAgSPf9onxMY7091xd.png)

- 最后根据 key 进行搜索，或直接点击搜索按钮，就可以看到我们游戏中存储的所有的数据啦！

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnDi0RyxBzoJkRPBXNg9PFMb.png)

- 注意：平台上的游戏数据需要等实际游戏的运行后，即执行了数据存储的游戏逻辑后，开发者平台上面才会存在相应的数据。

##### 2.3 开发者平台设置权限

- 找到授权管理按钮，并点击打开游戏授权的管理界面。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnK6q9I67GPYgrzFipQMkCWh.png)

- 点击添加按钮，添加授权游戏。

  - 游戏名称：需要共享数据的游戏
  - 权限范围：是设置数据更改权限的能力
  - 授权游戏：被授权的游戏，可以填写 gameid 指定某些游戏
  - 状态：开启授权或关闭授权

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnw91nIKk7sVs30sbSUf0sdc.png)

##### 2.4 其他游戏读取并修改共享数据

- 当游戏开通了数据授权后，另一个游戏就可以进行读取和修改数据啦！
- 首先我们还是在脚本中将数据存储环境改为 false，也就是设置为永久数据。

```ts
//将游戏数据设置为永久存储，在游戏退出时数据不会被删除。
DataStorage.setTemporaryStorage(false);
```

- 然后我们通过 asyncGetOtherGameData()函数中 gameid，获取到对应游戏的平台数据。当然我们也可以通过 asyncSetOtherGameData()函数修改该数据。

```ts
//通过游戏ID和key，获取其他游戏的共享平台数据
this.hp = await DataStorage.asyncGetOtherGameData("gameid", "hp");
//通过游戏ID和key，修改其他游戏的共享平台数据
DataStorage.asyncSetOtherGameData("gameid", "hp", "600");
```
