# 编辑器集成背包

::: tip 背包功能

阅读本文大概需要 10 分钟

本文概述了背包功能的各项属性以及使用方法。

:::

## 什么是背包功能？

背包功能是游戏中的常见功能，玩家在游戏中获得的道具可以通过背包功能让玩家进行可视化的管理。编辑器目前内置了一整套的背包逻辑，方便大家实现背包道具存取和道具搜索功能。

## 背包功能说明

### 注册道具

在将道具装入背包之前，我们需要使用 BagModule.registerItem 在**服务端**与**客户端**注册道具信息。

```TypeScript
@Component
export default class BagItem extends Script {
    protected onStart(): void {
        //注册一个ID为1的物品，图标AssetID为"94574"，名称为物品1，品质为传说，允许最大堆叠1个
        BagModule.registerItem(1, "94574", "物品1", ItemQuality.Legend, 1);
        //注册一个ID为2的物品，图标AssetID为"118086"，名称为物品2，品质为普通，允许最大堆叠2个
        BagModule.registerItem(2, "118086", "物品2", ItemQuality.Common, 2);
    }
}
```

::: tip

道具需要在客户端和服务端都注册一次才能生效

:::

### 打开/关闭背包

我们要在游戏中展示背包界面时，可以通过在客户端直接调用 BagModule.open/close 或者在服务端调用 BagModule.open/close 并传入 Player 来实现开关某个客户端的背包界面：

```TypeScript
BagModule.open()//客户端直接调用，即可打开此客户端的背包
BagModule.close()//客户端直接调用，即可关闭此客户端的背包
```

在服务端可以通过传入player实现相同的逻辑：

```TypeScript
let player: Player
BagModule.open(player)//服务端调用时需要传入Player，则会打开该Player客户端的背包
BagModule.close(player)//服务端调用时需要传入Player，则会关闭该Player客户端的背包
```

<video controls src="https://arkimg.ark.online/BackPack032RN1.mp4"></video>

:::tip

默认的背包界面右上角会自带一个关闭背包的按钮

:::

### 向背包中增加/删除道具

接下来我们需要将最开始注册的道具增添到玩家的背包中，增加道具代码如下：

```TypeScript
//客户端
//增加两个注册ID为1的道具
BagModule.addItem(1, 2)
//删除两个注册ID为1的道具
BagModule.removeItem(1, 2)
```

在服务端，我们也可以通过传入player来实现给对应玩家的背包中增加道具

```TypeScript
//服务端
let player1:Player
//给player1增加两个注册ID为1的道具
BagModule.addItem(1, 2, player1)
//删除player1两个注册ID为1的道具
BagModule.removeItem(1, 2, player1)
```

<video controls src="https://arkimg.ark.online/BackPack032RN2.mp4"></video>

::: tip

玩家的背包存贮情况会自动存储到玩家存档中

:::

## BagModule属性

| 属性名称         | 英文名称      | 类型    | 默认值 | 取值范围   | 说明                         | 读写       | 编辑器 |
| ---------------- | ------------- | ------- | ------ | ---------- | ---------------------------- | ---------- | ------ |
| 道具是否可拖动   | dragEnabled   | boolean | true   | true/false | 道具是否可拖动交换           | Read/Write | Hidden |
| 是否开启搜索功能 | searchEnabled | boolean | true   | true/false | 道具是否可通过背包搜索框搜索 | Read/Write | Hidden |
| 道具名称是否显示 | labelVisible  | boolean | true   | true/false | 道具名称是否显示             | Read/Write | Hidden |
| 背包最大容量     | capacity      | number  | 24     | 1-1000     | 背包可容纳的最大道具数量     | Read/Write | Hidden |

## BagModule接口

| 说明                 | 接口                                                         | 返回类型  | 输入说明                                                     | 输入值范围 | 输出说明 | 输出值范围 | 使用域        |
| :------------------- | :----------------------------------------------------------- | :-------- | :----------------------------------------------------------- | :--------- | :------- | :--------- | :------------ |
| 注册道具信息         | registerItem(itemId: number, icon: string, name: string, quality: ItemQuality = ItemQuality.Common, stackCount: number = 1, customData?: any): this | BagModule | itemId 道具IDicon 道具图片name 名称quality 道具品质，默认普通stackCount 堆叠数量，默认堆叠1个customData 额外数据 | -          | -        | -          | Client&Server |
| 打开背包             | open(player?: Player): this                                  | BagModule | player服务端传入，打开指定玩家的背包                         | -          | -        | -          | Client/Server |
| 关闭背包             | close(player?: Player): this                                 | BagModule | player服务端传入，关闭指定玩家的背包                         | -          | -        | -          | Client/Server |
| 设置背包外观         | skin(bagSkin: IBagSkin, itemSkin: IBagItemSkin, itemBgSkin:UIScript, deleteDialogSkin: IItemDeleteSkin): this |           | bagSkin背包UI皮肤itemSkin背包Item皮肤itemBgSkin背包Item背景皮肤deleteDialogSkin背包Item删除弹窗皮肤 |            |          |            | Client        |
| 获取背包指定道具数量 | getItemCount(itemId: number, player?: Player): number        | number    | itemId道具IDplayer服务端传入，获取指定玩家道具数量           | -          | -        | -          | Client/Server |
| 添加道具             | addItem(itemId: number, count: number = 1, player?: Player): this | BagModule | itemId道具IDcount道具数量，默认1player道具所有者，服务端必传入 | -          | -        | -          | Client/Server |
| 删除道具             | removeItem(itemId: number, count: number = 1, player?: Player): this | BagModule | itemId道具IDcount道具数量，默认1player道具所有者，服务端必传入 | -          | -        | -          | Client/Server |
| 增加道具点击回调     | addItemClickListener(clickCallback: (config: ItemConfig) => void, thisObject: any): this | BagModule | clickCallback点击回调config-点击的道具配置,信息如下  /**道具ID */        itemId: number;        /**道具图标 */        icon: string;        /**道具名字 */        name: string;        /**道具品级 */        quality: Extension_ItemQuality.ItemQuality;        /**堆叠数量 */        stackCount: number;        /**额外数据 */        customData: string;thisObject调用上下文 | -          | -        | -          | Client        |
| 移除道具点击回调     | removeItemClickListener(clickCallback: (config: ItemConfig) => void, thisObject: any): this | BagModule | clickCallback点击回调config-点击的道具配置,信息如下  /**道具ID */        itemId: number;        /**道具图标 */        icon: string;        /**道具名字 */        name: string;        /**道具品级 */        quality: Extension_ItemQuality.ItemQuality;        /**堆叠数量 */        stackCount: number;        /**额外数据 */        customData: string;thisObject调用上下文 | -          | -        | -          | Client        |
| 背包整理             | sort():this                                                  | BagModule | 整理背包 先按quality排序 再按itemId排序                      | -          | -        |            | Client        |

## 背包Demo

https://arkimg.ark.online/BagDemo.rar