# 数据存储与数据共享

::: info
阅读本文预计 20 分钟
本文概述了如何通过编辑器提供的 API 对游戏进行数据存储，以及如何将游戏的云端数据共享给多个游戏。
:::

## 1. 数据存储

> 用于处理数据持久存储，每个玩家在每一个游戏中，单条数据存储容量最大支持 64Kb 。超过此限制的任何数据都不能保证被存储，并且可能导致存储数据丢失。超过限制时会在编辑器的 Log 中显示警告。

### 使用数据存储的步骤：

### 1.1 存储环境

**多人联网游戏**和**单机游戏**对于数据存储方式不同。

在**单机游戏**模式下，数据存储在手机地本内存中，在不卸载 APP 的情况下，数据会持久保存。

在**多人联网游戏**模式中，会以游戏为单位创建一份永久数据记录，该数据不会随着游戏房间销毁而消失。

### 1.2 本地存储

- 使用asyncSetLocalData()的方法可以在本地添加/覆盖数据，该数据仅保存在本地，且在不卸载 APP 的情况下，数据会持久保存。
- 同理可以使用asyncGetLocalData()和asyncRemoveData()的方法获得和删除数据。

```TypeScript
// 数据存储
SaveLocalData(value: any) {
    // 在客户端执行
    if (!SystemUtil.isClient()) {

        let myData = new CustomData();

        // getDataSize() 获取当前数据的大小, 单位为 bytes（字节）, 以确保不会超过编码数据的存储限制
        let myDataSize = DataStorage.getDataSize(myData);
        console.log(`当前数据大小: ${myDataSize}`);

        /* 将 myData 中的分数属性通过 “score" 键名进行存储
          - 参数设置：key: string, value: unknown
          - 返回值：Promise<DataStorageResultCode>
        */
        DataStorage.asyncSetLocalData("score", value).then(async (state) => {
            // 判断是否存储成功
            if (state == DataStorageResultCode.Success) {
                /* 通过键名异步获取本地数据
                  - 参数设置：key: string
                  - 返回值：Promise<unknown>
                */
                // 读取数据
                this._CustomData = await DataStorage.asyncGetLocalData("score");
                console.log(`asyncGetLocalData: ${this._CustomData}`);
            } else {
                // 存储失败时，返回本次存储状态
                console.log(`asyncSetLocalData: "${DataStorageResultCode[state]}"`);
            }
        });
    }
}
```

::: warning 注意
本地存储容量限制5MB，本地存储不参与数据共享。
:::

### 1.3 在线存储

- 使用asyncSetData()的方法进行数据进行存储时，可以通过自定义的键值对同一个数据进行管理。
- 对使用自定义索引值进行存储的数据，可以使用asyncGetData()读取其数据。
- 在线存储的数据可以在控制台查看，并且设置为共享，具体查看第二部分。

```TypeScript
//数据存储
SaveOnlineData(value) {
    //在服务器端执行
    if (SystemUtil.isServer()) {

        let myData = new CustomData();

        //getDataSize()获取当前数据的大小,单位为bytes（字节）,，以确保不会超过编码数据的存储限制
        let myDataSize = DataStorage.getDataSize(myData);
        console.log(`当前数据大小: ${myDataSize}`);

        /*将myData中的分数属性通过“score"键名进行存储
          -参数设置：key:string,value:unknown
          -返回值：Promise<DataStorageResultCode>
        */
        DataStorage.asyncSetData("score", value).then(async (state) => {
            //判断是否存储成功
            if (state == DataStorageResultCode.Success) {
                /*通过键名异步获取自定义数据
                  -参数设置：key:string
                  -返回值：Promise<unknown>
                */
                //读取数据
                this._CustomData = await DataStorage.asyncGetData("score");
                console.log(`asyncGetData:${this._CustomData}`);
            } else {
                //存储失败时，返回本次存储状态
                console.log(`asyncSetCustomData:"${DataStorageResultCode[state]}`);
            }
        });
    }
}
```

### 1.4 注意事项与建议

- 数据存储相关接口需要在对应的环境中请求，尝试在客户端脚本中访问在线存储将导致错误，同理在服务端脚本中访问本地存储也会导致错误。
- 目前可存储数据类型只包括基础数据类型，暂不支持 map 类型、GameObject及自定义函数等。

## 2. 数据共享

> 根据文档内容，我们了解到了如何通过编辑器提供的 API 将游戏数据存储下来，如果我们设置了数据为在线存储，可以通过开发者平台控制这份数据的读取权限，这样我们就可以将这份数据共享给其他游戏，实现多款游戏共用一份游戏数据。

### 使用数据存储的步骤：

### 2.1 存储数据

我们通过asyncSetData()函数将数据以在线存储到开发者平台上，这样我们在开发者平台就会看到这份数据。也可以通过 asyncSetData()函数获取到该数据。

### 2.2 本地存储

- 使用asyncSetLocalData()的方法可以在本地添加/覆盖数据，该数据仅保存在本地，且在不卸载 APP 的情况下，数据会持久保存。
- 同理可以使用asyncGetLocalData()和asyncRemoveData()的方法获得和删除数据。

```TypeScript
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

### 2.3 查看开发者平台中游戏数据

- 我们在发布完游戏，并通过审核后，打开开发者平台，在数据存储中找到要修改的游戏。

|中文示例|英文示例|
|-----|-----|
|![](https://qn-cdn.233leyuan.com/online/HNbKLlm2ccAE1724058131585.png)|![](https://qn-cdn.233leyuan.com/online/OYYzUKDCw5Bm1724058132341.png)|

- 选择游戏存档并将数据类型选择为自定义。

|中文示例|英文示例|
|-----|-----|
|![](https://qn-cdn.233leyuan.com/online/SMBQtGPyBnDU1724058132809.png)|![](https://qn-cdn.233leyuan.com/online/6mFVvTSY63cN1724058133291.png)|

- 最后根据 key 进行搜索，或直接点击搜索按钮，就可以看到我们游戏中存储的所有的数据啦！

|中文示例|英文示例|
|-----|-----|
|![](https://qn-cdn.233leyuan.com/online/p2eiOEiHNqOt1724058133769.png)|![](https://qn-cdn.233leyuan.com/online/QO5HpviY2Bj71724058134190.png)|

::: warning 注意
平台上的游戏数据需要等实际游戏的运行后，即执行了数据存储的游戏逻辑后，开发者平台上面才会存在相应的数据。
只有在线储存的数据是可以在平台编辑的，本地存储的数据无法编辑。
:::

### 2.4 设置开发者平台数据库权限

- 找到授权管理按钮，并点击打开游戏授权的管理界面。

|中文示例|英文示例|
|-----|-----|
|![](https://qn-cdn.233leyuan.com/online/LWDYjcTp3ZoG1724058134669.png)|![](https://qn-cdn.233leyuan.com/online/BPRvZtlQxyxe1724058135107.png)|

- 点击添加按钮，添加授权游戏。

  - 游戏名称：需要共享数据的游戏
  - 权限范围：是设置数据更改权限的能力
  - 授权游戏：被授权的游戏，可以填写 gameid 指定某些游戏
  - 状态：开启授权或关闭授权

|中文示例|英文示例|
|-----|-----|
|![](https://qn-cdn.233leyuan.com/online/HTeFohzAV6wf1724058135580.png)|![](https://qn-cdn.233leyuan.com/online/UU2LAptOXwOU1724058136007.png)|

### 2.5 其他游戏读取并修改共享数据

- 当游戏开通了数据授权后，另一个游戏就可以进行读取和修改数据啦！
- 然后我们通过 asyncGetOtherGameData()函数中 gameid，获取到对应游戏的平台数据。当然我们也可以通过 asyncSetOtherGameData()函数修改该数据。

```TypeScript
//通过游戏ID和key，获取其他游戏的共享平台数据
this.hp = await DataStorage.asyncGetOtherGameData("gameid", "hp");
//通过游戏ID和key，修改其他游戏的共享平台数据
DataStorage.asyncSetOtherGameData("gameid", "hp", "600");
```
