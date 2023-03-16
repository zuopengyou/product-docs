# 单机游戏开发注意事项

| 修改日期            | 修改内容 | 所属编辑器版本 |
| ------------------- | -------- | -------------- |
| 2022 年 10 月 17 日 | 文档创建 | v0.15          |
|                     |          |                |

**阅读本文预计 10 分钟**

**本文概述了在编辑器中，想要开发单机游戏需要注意哪些流程以及代码规范注意事项**

## 单机游戏特性

为方便单机游戏开发与多人联网游戏开发的转换，编辑器的单机模式引入了局域网的概念

可简单的理解为编辑器的单机模式终端，即是客户端也是服务端

## 运行环境判断区别

**如上图所示**

- 原多人联网游戏逻辑中，所有使用【if(isServer){...}else{...}】、【if(isClient){...}else{...}】的逻辑将都只会执行第一个 if
- 【Client1&Host】端 isServer 永远为 true

```ts
//此处永远为true，只执行if
if(SystemUtil.isServer())
{
    //...
}
else{//永远不会执行
    //...
}
//---------------------------------------------------
//此处永远为true，只执行if
if(SystemUtil.isClient())
{
    //...
}
else{//永远不会执行
    //...
}
```

**以上逻辑可以改成如下格式**

```ts
if(SystemUtil.isServer()){
    //...
}

if(SystemUtil.isClient()){
    //...
}
```

## 单机游戏模式对 RPC 的影响

**在单机游戏模式中，以【Client1&Host】端为例**

主控端既是客户端又是服务端，故可以在客户端写服务端的代码

例如：

if(Gameplay.isClient())

{

Events.addClientListener("xxx",(player:Gameplay.Player)=>{ });

}

if(Gameplay.isServer())

{

Events.addServerListener("xxx",(player:Gameplay.Player)=>{ });

}

若逻辑需要过滤自己发送给自己的信息：

- dispatchToServer 指令，用 addClientListener 接的时候，是有 Player 参数的，这个指令在 LS 中没有改变，所以可通过 Player 来判断是否是自己发给自己，用来过滤信息
- dispatchToClient、dispatchToAllClient 这两个指令原本不携带 Player 参数，则需要开发者手动在事件参数中做标识，用来过滤信息

## 

## 单机游戏转多人联网游戏的注意事项

- 运行环境判断的改变【SystemUtil.isServer()】【SystemUtil.isClient()】
- 单机游戏的客户端可以 addClientListener，多人联网游戏中的客户端是不可以的
- 单机游戏主控端过滤消息时可以使用 Player 来判断，在多人联网游戏的服务端是无法 getCurrentPlayer 的

## 单机游戏数据存储的注意事项

详情可参考[数据存储](https://meta.feishu.cn/wiki/wikcnl49v1cFFHKGwNaL6rSEMVg) 产品手册
