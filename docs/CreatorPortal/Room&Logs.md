# 房间监控及日志

::: tip 功能概述

房间数据部分提供实时房间&玩家数据，可以查看分时/分日的数据变动趋势，以及每个房间的实时日志。

::: 

## 房间管理

### 房间列表

房间列表可以按照状态（运行、销毁、异常）查询每个房间&玩家行为，同时支持查看每个房间的性能监控；

![CleanShot 2023-09-24 at 17.11.41@2x](https://arkimg.ark.online/CleanShot%202023-09-24%20at%2017.11.41@2x.webp)

### 实时日志

可以通过实时日志打印房间日志信息，找到当前房间号点击【实时日志】，即可打印&下载服务端房间日志；

![CleanShot 2023-09-24 at 17.27.01@2x](https://arkimg.ark.online/CleanShot%202023-09-24%20at%2017.27.01@2x.webp)

游戏代码编写时可以通过Log或Error来区别打印日志，通过日志等级（Log、Error）、类型或关键词等过滤无关信息；

- MWTSLIB日志类型：编辑器底层打印的日志（TS层调用接口查找一个对象超时也可能反应在这里）

![CleanShot 2023-09-24 at 17.42.29@2x](https://arkimg.ark.online/CleanShot%202023-09-24%20at%2017.42.29@2x.webp)

- MWTS日志类型：TS代码层调用引发的日志

  关于**TypeError类**的报错，这种一般是由于我们代码自身写出了bug导致的报错，代码里查找一个guid为**55555**的对象，当然是无法找到这个对象的，而后续逻辑里没有对这个对象进行判断就直接调用方法设置位置，自然就会报错，而这种报错类型通常就含有关键字**TypeError**，这种类型的错误也是开发者应该重点关注的；

### 服务端性能

点击【房间列表】-【服务端性能】可监控当前房间的服务端性能，最多支持查询24小时内数据，统计时间间隔支持5秒-5分钟；

<video controls src="https://cdn.233xyx.com/online/YZM5b0O9JB9n1695549695668.mp4"></video>

| 字段         | 纵轴单位 | 指标介绍                                                     | 简要介绍                                                     | 优化case                                                     | 备注     |
| ------------ | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | -------- |
| 服务器内存   | MiB      | 使用：进程实际使用内存情况限制：使用上限，超出内存会出现崩溃 | 服务器根据房间最大人数来分配内存，房间最大人数*40M           | 场景合并，控制动态对象数量减少不必要的全局常量定义使用对象池不使用的对象destroy掉 | 重点关注 |
| 服务器CPU    | C        | 使用：实际使用服务器CPU限制：分配cpu使用上限                 | 房间最大人数*0.02                                            | 减少update执行量考虑分帧执行提高cpu的使用效率，当cpu在执行一块逻辑时，特别是循环遍历时，当数据的物理地址不是连续的时候会降低cpu的执行效率，这个对应客户端的cpu也是适用的减少网络请求 | 重点关注 |
| 服务端帧率   | 帧/s     | 使用：服务器当前帧率                                         | 最高30帧，也就是正常情况下每帧的执行时间为0.033              | 同CPU，当CPU执行一遍的时间大于0.033时，帧率就会降低，优化CPU消耗 | 重点关注 |
| RPC函数调用  | 次数     | 使用：每秒PRC(远程过程调用)调用次数                          | 服务器与客户端函数调用频率建议控制在20/s*最大玩家数RPC过多会导致CPU和带宽的增长 | 减少rpc的调用，对于频繁的改动，使用属性同步合并请求，在下一帧使用一个rpc函数传输同时需要考虑多玩家都在进行RPC双端可以保存自己的数据，不用频繁同步(如在使用道具时，客户端判断条件，使用消耗，同时发送给服务器，服务器验证消耗） | 重点关注 |
| 在线玩家     | 人数     | 使用：当前房间在线的人数                                     | 当前房间玩家数，范围5-50，游戏设置里配置                     | 人数越多，分配的内存与CPU也多，但消耗也就增多，需要根据项目情况做好设计平衡 |          |
| 同步对象数量 | 数量     | 使用：每秒同步多少对象到客户端                               | 同步对象数量增多会导致CPU和带宽的增长                        | 减少双端动态对象，玩家登陆时同步量会很高，将场景双端对象通过逻辑分开逐步添加，使用属性同步时可以分帧 |          |
| 网络带宽     | Mbit     | 输入：服务器的输入流量 输出：服务器的输出流量                | 服务器发送给每个客户端的带宽总量:100kb/s*最大玩家数rpc与同步对象占用 | 优化rpc频率优化同步对象数量优化rpc中数据总大小               |          |
| 网络传输包   | 个数     | 【输入，输出】束，协议包数量， 【输入，输出】包， 具体分成多少协议包发出 | 网络传输包是进行数据传输时的基本数据单元，包含元数据和数据部分，通过网络传输到目的地并在目的地重新组合成完整的数据。网络传输包过多会导致：网络延迟增加网络拥塞能耗增加（移动端） | 尽量避免发送重复的数据 合并传输包可以是一种有效的优化方式，可以减少网络传输过程中的延迟和能耗，同时降低网络拥塞的风险。 合并多个小的网络包成为一个较大的网络包，可以减少网络通信的次数，从而减少网络延迟和网络拥塞的风险。此外，较少的网络通信也可以降低移动设备的能耗，延长电池寿命。 当然也要考虑合并传输包的容量大小，不能超过网络连接的缓冲区大小。 |          |
| 丢包         | 个数     | 服务器没有收到ack，重发的丢包数量次数                        |                                                              |                                                              |          |



房间看板提供实时指标和离线指标，指标包括当前在线人数、CCU(今天最大同时在线人数)、满房率、房间时长分布等描述玩家和房间情况的核心指标

## 房间监控

### 实时满房率

关键指标包含游戏的当前存活房间数、当前在线人数、今天最大同时在线人数、今日累计游戏人数，方便创作者关注最新数据变动；

统计口径是5分钟，数据为当前实时数据，进行数据对比（红色上涨、绿色下跌）。

![Google Chrome 2024-07-22 17.09.00](https://arkimg.ark.online/Google%20Chrome%202024-07-22%2017.09.00.png)

- **当前存活房间数：**当前有多少存活中的房间数量。
- **当前在线人数：**当前有多少玩家在这个游戏里。
- **最大同时在线人数：**今天截止到目前，同时在线的最大人数。
- **今日累计游戏人数：**今天截至目前，累积的游戏人数。
- **1人房比例：**在5分钟内，有且只有一个人在的房间占比在线总的房间数。

满房率低的房间多，玩家流失率可能增加，因为长时间等待或一个人游戏会降低联机游戏体验，导致游戏时长和留存差。

![img](https://arkimg.ark.online/(null)-20240722165613099.png)

创作者可以通过上图实时观察到当前房间分布状态——横轴代表当前房间人数/满房人数，纵轴代表当前存在的房间数量。

### 房间离线数据

离线数据目前仅提供7.15之后的数据，可以通过查看数据变化趋势来进行游戏分析，制定改进策略。

![img](https://arkimg.ark.online/(null)-20240722165613333.png)

1. **房间创建与销毁数量——**反映游戏的房间数量量级与销毁情况，创建量高则玩家活跃度高、新玩家涌入多。
2. **游戏日活与最大同时在线人数CCU——**反映了游戏的每日玩家活跃度和受欢迎与玩家集中程度，最大同时在线人数高：高峰时间段玩家集中、特别活动吸引大量玩家。
3. **房间最大人数分布——**反映游戏房间存活期间最大玩家数量，了解不同规模房间的利用情况。
4. **房间存活****时长****分布——**反映游戏房间的持续时间，了解玩家游戏时长和房间的利用效率。