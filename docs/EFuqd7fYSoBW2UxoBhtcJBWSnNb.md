# 数据存储

<strong>阅读本文预计 10 分钟</strong>

<strong>本文概述了如何通过编辑器提供的 API 对游戏进行数据存储。</strong>

## 数据存储功能概述

用于处理数据持久存储，每个玩家在每一个游戏中允许最多存储 16Kb 的编码数据。超过此限制的任何数据都不能保证被存储，并且可能导致存储数据丢失。超过限制时会在编辑器的 Log 中显示警告。

## 如何使用数据存储

### 2.1 存储环境

<strong>多人联网游戏</strong>和<strong>单机游戏</strong>对于数据存储方式不同，在<strong>单机游戏</strong>模式下，临时数据存储在手机地本内存中，在不卸载 APP 的情况下，数据会持久保存。

在<strong>多人联网游戏</strong>模式中，数据存储环境分为临时数据和永久数据，通过 setEvn()函数进行设置，默认为本地存储。

- true 设置为临时数据，会以房间为单位，创建一份临时数据记录，当游戏房间销毁时，存储的数据会一同销毁。
- false 设置为永久数据， 会以游戏为单位创建一份永久数据记录，该数据不会随着游戏房间销毁而消失。

### 2.2 设置数据存储

编辑器提供了两种数据存储方式，一种是自定义数据，另一种是储存在角色身上。

- <strong>通过自定义存储数据的方法</strong>

  - 使用 asyncSetCustomData()的方法进行数据进行存储时，可以通过自定义的键值对同一个数据进行管理。
  - 对使用自定义索引值进行存储的数据，使用 asyncGetCustomData()进行数据读取。

``` ts
//数据存储
    SaveCustomData(value) {
        //在服务器端执行
        if (Util.SystemUtil.isServer()) {
            DataStorage.setTemporaryStorage(true);  //设置为临时数据存储，将数据存放在本地进程中
            let myData = new CustomData();

            //可以通过sizeOfData()获取当前数据的大小,单位为bytes（字节）,，以确保不会超过编码数据的存储限制
            let myDataSize = DataStorage.sizeOfData(myData);
            console.log(`---当前数据大小: ${myDataSize}`);

            /*将myData中的分数属性通过“score"键名进行存储
              -参数设置：key:string,value:unknown
              -返回值：Promise<DataStorageResultCode>
            */
            //将myData中的职业属性通过“vocation"键名进行存储
            DataStorage.asyncSetCustomData("score", value).then(async (state) => {

                //判断是否存储成功
                if (state == DataStorage.DataStorageResultCode.Success) {

                    /*通过键名异步获取自定义数据
                      -参数设置：key:string
                      -返回值：Promise<unknown>
                    */

                    //读取数据
                    this._CustomData = await DataStorage.asyncGetCustomData("score");
                    console.log(`asyncGetCustomData:${this._CustomData}`);
                } else {
                    //存储失败时，返回本次存储状态
                    console.log(`asyncSetCustomData:"${DataStorage.DataStorageResultCode[state]}`);
                }
            });
        }
    }
```

- <strong>通过角色对象存储数据的方法</strong>

  - 使用 asyncSetPlayerData()进行存储，可以让每个角色只对自己的数据进行管理。
  - 数据存储时，会将角色作为唯一标识，同一个角色在同一游戏中，会自动使用新数据覆盖原有数据。
  - 对使用角色对象进行存储的数据，使用 asyncGetPlayerData()进行数据读取。

``` ts
//数据存储
    SavePlayerData(playerValue:Gameplay.Player,scoreValue:number) {
        //在服务器端执行
        if (Util.SystemUtil.isServer()) {
            DataStorage.setTemporaryStorage(true);  //设置为临时数据存储，将数据存放在本地服务器进程中
            let myData = new CustomData();

            //可以通过sizeOfData()获取当前数据的大小,单位为bytes（字节）,，以确保不会超过编码数据的存储限制
            let myDataSize = DataStorage.sizeOfData(myData);
            console.log(`---当前数据大小: ${myDataSize}`);

            /*将myData中的分数属性通过玩家进行存储
                -参数设置：player:Player,value:unknown
                -返回值：Promise<DataStorageResultCode>
            */
            DataStorage.asyncSetPlayerData(playerValue, scoreValue).then(async (state) => {

                //判断是否存储成功
                if (state == DataStorage.DataStorageResultCode.Success) {

                    /*通过键名异步获取自定义数据
                      -参数设置：key:string
                      -返回值：Promise<unknown>
                    */

                    //读取数据
                    this._CustomData = await DataStorage.asyncGetPlayerData(playerValue) as number;
                    Events.dispatchToAllClient("showScore",this._CustomData,playerValue.character.characterName);
                    console.log(`asyncGetPlayerData:${this._CustomData}`);
                } else {
                    //存储失败时，返回本次存储状态
                    console.log(`asyncSetPlayerData:"${DataStorage.DataStorageResultCode[state]}`);
                }
            });
        }
    }
```

## 使用数据存储的注意事项与建议

数据存储相关接口只能通过服务器脚本访问，尝试在客户端脚本中进行访问将导致错误。

目前可存储数据类型暂不支持 map 类型、自定义函数。


## 项目案例
