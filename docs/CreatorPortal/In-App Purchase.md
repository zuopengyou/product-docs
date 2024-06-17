平台正在逐步开放完善内购相关功能，您可通过以下指引接入内购，并根据数据情况优化商业化内容，丰富创作收入来源。

## 内购接入

### 创建商品

可在【创作者中心】-【游戏服务】-【[商品管理](https://portal.ark.online/#/admin/good-management)】创建商品。

- 该价格为代币价格，目前100代币≈1元，可根据游戏内定价填写合适价格
- 游戏内的每个商品都应该在商品管理内创建单独的商品以方便后续管理。
- 请注意不要多个游戏共用一个商品code。

![image](https://arkimg.ark.online/image.png)

### 游戏代码编写

1. ###### 代币的数量刷新：

- 需要在客户端注册代币刷新监听接口

```JavaScript
const onArkUpdate = (amount: number) => {
    //刷新逻辑，amount为当前代币数量
}
mw.PurchaseService.onArkBalanceUpdated.add(onArkUpdate);
```

- 需要在商店打开时，在客户端调用代币刷新方法

```JavaScript
 mw.PurchaseService.getArkBalance(); // 触发代币余额刷新。接收更新的值要用mw.PurchaseService.onArkBalanceUpdated
```

1. ###### 购买代币商品

- 需要在客户端调用购买方法，并在回调中刷新代币数量，其中CommodityId为平台配置的商品ID

```JavaScript
const commodityId = "testId";
const count = 1;
mw.PurchaseService.placeOrder(commodityId, count, (status, msg) => {
    mw.PurchaseService.getArkBalance();//刷新代币数量
});
```

- 需要在服务端注册购买成功回调

```JavaScript
const onShipOrder = (playerId: number, orderId: string, commodityId: string, amount: number, confirmOrder: (bReceived: boolean) => void) => {
    //根据playerId和commodityId来处理购买逻辑
    confirmOrder(true);//调用这个方法表示确认收货成功
}
mw.PurchaseService.onOrderDelivered.add(onShipOrder);
```

整个购买流程是客户端调用购买方法，服务端会返回购买结果，根据购买结果来给对应的player添加道具，同时刷新当前剩余代币。

### 游戏测试上线

- 游戏上线前您可通过游戏测试二维码进行测试
- 确保游戏内玩家拉起支付-支付成功-发货成功链路没问题后可提审，提审时营收方式请根据实际情况做选择。

![img](https://arkimg.ark.online/(null)-20240617192249400.png)

## 内购数据

### 订单数据

您可在游戏主页下游戏服务-[充值订单](https://portal.ark.online/#/admin/game-order-list)查看单个游戏的订单数据；也可通过访问财务与管理-[充值订单](https://portal.ark.online/#/admin/order-list)访问您账号下所有游戏的订单数据。

- 您可在订单数据内查看每一笔订单的情况，包含购买用户、购买商品及分成后数据

![img](https://arkimg.ark.online/(null)-20240617192249434.png)

### 内购看板

为了更好地助力游戏创作者通过内购提升游戏收入，我们提供了内购数据分析看板。本看板通过多个维度和细致的数据分析，帮助开发者深入了解用户购买行为，从而优化游戏内购策略。以下是各板块功能的详细介绍：

一、游戏数据概览

此板块提供游戏内购的总体数据，包括成交代币数、订单数、ARPU等关键指标。通过这些数据，您可以迅速掌握游戏的整体营收状况。

二、趋势分析

趋势分析板块展示了游戏内购数据的动态变化，包括订单数、购买人数、成交代币数趋势等。通过这些数据，您可以观察内购策略的调整如何影响游戏收入。

三、转化漏斗

转化漏斗板块详细分析了用户拉起支付-成功购买的整个流程，帮助您识别并优化转化过程中的瓶颈。您可仔细分析每一步的转化率，找出可能的流失点，并针对流失点，调整商品展示、定价策略手段，以提高转化率。

四、商品分析

此板块提供了各个商品的详细数据，包括成交代币数、成交人数、首购人数、复购人数等。通过这些数据，您可以了解哪些商品最受欢迎，哪些商品需要改进。

五、用户消费力分布

用户消费力分布板块展示了不同消费水平的用户比例，这些数据有助于您更精准地定位目标用户群，制定个性化的营销策略。您可根据用户消费力分布情况，调整商品定价策略，以吸引更多用户。

希望通过利用内购数据分析看板，您将能够更深入地了解用户需求和购买行为，从而制定更有效的游戏内购策略，提升游戏收入。

![img](https://arkimg.ark.online/(null)-20240617192249736.png)
