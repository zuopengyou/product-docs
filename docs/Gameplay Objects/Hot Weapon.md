# 热武器

| 修改日期           | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------ | ------ | -------- | -------------- |
| 2022 年 9 月 28 日 | 廖悦吾 | 文档创建 | 015            |
|                    |        |          |                |

<strong>阅读本文预计 10 分钟</strong>

本文概述了热武器的工作机制，展示在编辑器创建并使用热武器的过程和热武器在游戏中的应用。教程内容包含热武器功能对象的属性面板，类对象属性和接口以及一个示例工程。

# 什么是热武器

热武器是一个提供发射类武器完整功能框架的对象。框架涵盖发射、换弹、瞄准、上膛、射击精度、后坐力一共六个组件来模拟发射类武器的工作机制并执行相关工作逻辑。开发者可以决定启用哪些组件并自定义组件内的各种属性，通过不同的配置实现不同的武器工作流程和表现。此外热武器框架中还提供多个时间点的回调方便开发者准确把握热武器的状态同时执行自己的逻辑：例如开火时播放枪口特效，发射子弹，播放音效等等。

热武器在编辑器中以功能对象的形式存在，打开编辑器后在左侧资源栏中的“逻辑资源”中，选取“游戏功能对象”，红框中就是热武器，资源 ID 为 20638。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcneG6x0SdKL88h7BS59faJVb.png)

# 热武器 都包含什么

### 热武器的工作流程图：

### 热武器包含的属性：

| 属性名                    | 描述           | 类型                                                      |
| ------------------------- | -------------- | --------------------------------------------------------- |
| `delegateEquipOnServer`   | 服务器装备回调 | Common.MulticastDelegate<(EquipOwner: $Nullable) => void> |
| `delegateEquipOnClient`   | 客户端装备回调 | Common.MulticastDelegate<(EquipOwner: $Nullable) => void> |
| `delegateUnEquipOnServer` | 服务器卸载回调 | Common.MulticastDelegate<() => void>                      |
| `delegateUnEquipOnClient` | 客户端卸载回调 | Common.MulticastDelegate<() => void>                      |
| `accuracyOfFireComponent` | 射击精度功能   | MWSysHotWeaponAccuracyOfFireComponent                     |
| `aimComponent`            | 瞄准功能       | MWSysHotWeaponAimComponent                                |
| `fireComponent`           | 射击功能       | MWSysHotWeaponFireComponent                               |
| `loadComponent`           | 上膛功能       | MWSysHotWeaponLoadComponent                               |
| `reloadComponent`         | 换弹功能       | MWSysHotWeaponReloadComponent                             |
| `recoilForceComponent`    | 后坐力组件     | MWSysHotWeaponRecoilForceComponent                        |

### 热武器包含的接口：

| 接口名                                 | 描述                                                                                                                                                                                                                                                                                                                      | 作用端         | 参数                                                                              | 返回类型            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------- | ------------------- |
| `getOpenRecoilForceComponent`          | 获取是否开启后坐力组件                                                                                                                                                                                                                                                                                                    | 调用端         | 无                                                                                | boolean             |
| `setOpenRecoilForceComponent`          | 设置是否开启后坐力组件，默认开启                                                                                                                                                                                                                                                                                          | 服务器         | Inval: boolean（后坐力组件是否启用）                                              | void                |
| `getOpenReloadComponent`               | 获取是否开启换弹组件                                                                                                                                                                                                                                                                                                      | 调用端         | 无                                                                                | boolean             |
| `setOpenReloadComponent`               | 设置是否开启换弹组件，默认开启                                                                                                                                                                                                                                                                                            | 服务器         | Inval: boolean（换弹组件是否启用）                                                | void                |
| `getOpenLoadComponent`                 | 获取是否开启上膛组件                                                                                                                                                                                                                                                                                                      | 调用端         | 无                                                                                | boolean             |
| `setOpenLoadComponent`                 | 设置是否开启上膛组件，默认开启                                                                                                                                                                                                                                                                                            | 服务器         | Inval: boolean（上膛组件是否启用）                                                | void                |
| `getOpenAccuracyOfFireComponent`       | 获取是否开启射击精度组件                                                                                                                                                                                                                                                                                                  | 调用端         | 无                                                                                | boolean             |
| `setOpenAccuracyOfFireComponent`       | 设置是否开启射击精度组件，默认开启                                                                                                                                                                                                                                                                                        | 服务器         | Inval: boolean（射击精度组件是否启用）                                            | void                |
| `getOpenAimComponent`                  | 获取是否开启瞄准组件                                                                                                                                                                                                                                                                                                      | 调用端         | 无                                                                                | boolean             |
| `setOpenAimComponent`                  | 设置是否开启瞄准组件，默认开启                                                                                                                                                                                                                                                                                            | 服务器         | Inval: boolean（瞄准组件是否启用）                                                | void                |
| `getBulletLocWhileSpawnOnScreenCenter` | 使用屏幕中心生成子弹时，获取子弹投掷物生成的 location                                                                                                                                                                                                                                                                     | 客户端         | 无                                                                                | Type.Vector         |
| `getShootDirWithDispersion`            | 非屏幕中心生成子弹模式下，获取子弹飞行方向，该函数可传入经偏移了的屏幕中心发出的射线方向。                                                                                                                                                                                                                                | 客户端         | StartLoc: Type.Vector（子弹生成位置）<br/>ShootRange: number（最大射程）          | Type.Vector         |
| `getCurrentOwner`                      | 获取当前热武器的所有者                                                                                                                                                                                                                                                                                                    | 调用端         | 无                                                                                | Character           |
| `equipment`                            | 装备热武器到目标角色的指定插槽位置。<br/>- S 端调用可完成整个装备流程<br/>- C 端调用主要目的是刷新热武器 TS 层对象中关于持有者的数据<br/>- 请确保 TS 层热武器构造完成之后再调用该函数，否则可能出现 C 端没有成功获取到持有者数据的问题<br/>- 热武器加载完毕后会有回调，请在客户端能异步获取新构造的热武器后，填写后续逻辑 | 调用端自动广播 | character: Character（该武器的装备对象）<br/>socketName: string（装备的插槽名称） | void                |
| `unEquipment`                          | 卸载热武器                                                                                                                                                                                                                                                                                                                | 调用端自动广播 | 无                                                                                | void                |
| `setCurrentFireModel`                  | 切换设置当前开火模式，装备前只能在服务器调用，装备后可在客户端调用。                                                                                                                                                                                                                                                      | 调用端         | FireMode: MWSysHotWeaponFireMode（热武器开火模式）                                | void                |
| `startFire`                            | 开火                                                                                                                                                                                                                                                                                                                      | 调用端自动广播 | 无                                                                                | void                |
| `stopFire`                             | 停止开火                                                                                                                                                                                                                                                                                                                  | 调用端自动广播 | 无                                                                                | void                |
| `reload`                               | 换弹                                                                                                                                                                                                                                                                                                                      | 调用端自动广播 | bulletSize: number（装填子弹数）                                                  | void                |
| `breakReload`                          | 打断换弹                                                                                                                                                                                                                                                                                                                  | 调用端自动广播 | 无                                                                                | void                |
| `load`                                 | 上膛                                                                                                                                                                                                                                                                                                                      | 调用端自动广播 | 无                                                                                | void                |
| `breakLoad`                            | 打断上膛                                                                                                                                                                                                                                                                                                                  | 调用端自动广播 | 无                                                                                | void                |
| `getCurrentState`                      | 获取当前热武器状态                                                                                                                                                                                                                                                                                                        | 调用端         | 无                                                                                | MWSysHotWeaponState |
| `cloneComponentsData`                  | 从传入的热武器逻辑对象中拷贝所有组件数据，但无法拷贝代理委托绑定事件，完成拷贝后，数据同步到客户端有较短延迟。                                                                                                                                                                                                            | 服务器         | otherHotWeapon: MWSysHotWeapon<br/>（被克隆的对象）                               | void                |

### 发射组件：

<strong>属性：</strong>

| 属性名                              | 描述                           | 类型                                 |
| ----------------------------------- | ------------------------------ | ------------------------------------ |
| `delegateStartFireOnServer`         | 服务器开始开火回调             | Common.MulticastDelegate<() => void> |
| `delegateStartFireOnClient`         | 客户端开始开火回调             | Common.MulticastDelegate<() => void> |
| `delegateEndFireOnServer`           | 服务器结束开火回调             | Common.MulticastDelegate<() => void> |
| `delegateEndFireOnClient`           | 客户端结束开火回调             | Common.MulticastDelegate<() => void> |
| `delegateEndContinuousFireOnServer` | 服务器完成一次连发射击周期回调 | Common.MulticastDelegate<() => void> |

<strong>接口：</strong>

| 接口名                                 | 描述                                                                      | 作用端             | 参数                                                        | 返回类型               |
| -------------------------------------- | ------------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------- | ---------------------- |
| `setAnimationGuid`                     | 设置动画 GUID                                                             | 客户端调用自动广播 | guid: string（需要设置的动画 Id）                           | void                   |
| `getAnimationGuid`                     | 获取动画 GUID                                                             | 调用端             | 无                                                          | string                 |
| `hadAnimationGuid`                     | 是否有动画 GUID                                                           | 调用端             | 无                                                          | boolean                |
| `getCurrentFireModel`                  | 获取当前的开火模式                                                        | 调用端             | 无                                                          | MWSysHotWeaponFireMode |
| `setFireOnScreenCenter`                | 设置是否在屏幕中心开火                                                    | 客户端调用自动广播 | isFireOnScreenCenter: boolean<br/>（是否在屏幕中心开火）    | void                   |
| `getFireOnScreenCenter`                | 获取是否在屏幕中心开火                                                    | 调用端             | 无                                                          | boolean                |
| `setCurrentOffsetOfFireOnScreenCenter` | 设置屏幕中心开火时的偏移                                                  | 客户端调用自动广播 | Offest: Type.Vector（屏幕中心开火的偏移）                   | void                   |
| `getOffsetOfFireOnScreenCenter`        | 获取屏幕中心开火时的偏移                                                  | 调用端             | 无                                                          | Type.Vector            |
| `getFireComponentClipSize`             | 获取弹夹容量                                                              | 调用端             | 无                                                          | number                 |
| `setCurrentMultipleShot`               | 设置一次开火发射的子弹数量                                                | 客户端调用自动广播 | count: number（一次开火发射的子弹数量）                     | void                   |
| `getCurrentMultipleShot`               | 获取一次开火发射的子弹数量                                                | 调用端             | 无                                                          | number                 |
| `setCurrentFireInterval`               | 设置开火间隙                                                              | 客户端调用自动广播 | interval: number（开火间隙）                                | void                   |
| `getFireComponentFireInterval`         | 获取开火间隙                                                              | 调用端             | 无                                                          | number                 |
| `setCurrentClipSize`                   | 设置当前弹夹容量                                                          | 客户端调用自动广播 | value: number（当前弹夹容量）                               | void                   |
| `setCurrentBulletSize`                 | 设置当前弹夹中子弹数量                                                    | 客户端调用自动广播 | value: number（弹夹中子弹数量）                             | void                   |
| `getCurrentClipSize`                   | 获取当前弹夹容量                                                          | 调用端             | 无                                                          | number                 |
| `getCurrentBulletSize`                 | 获取当前弹夹中子弹数量                                                    | 调用端             | 无                                                          | number                 |
| `getCurrentbFiring`                    | 获取当前状态下 bFiring 的值，一般用于处理全自动开火模式下的自动换弹       | 调用端             | 无                                                          | boolean                |
| `getCurrentbIsInFullAuto`              | 获取当前状态下 bIsInFullAuto 的值，一般用于处理全自动开火模式下的自动换弹 | 调用端             | 无                                                          | boolean                |
| `setCurrentbIsInFullAuto`              | 设置当前状态下 bIsInFullAuto 的值，一般用于处理全自动开火模式下的自动换弹 | 客户端调用自动广播 | isInFullAuto: boolean<br/>（当前状态下 bIsInFullAuto 的值） | void                   |

### 射击精度组件：

<strong>属性：</strong>

| 属性名                                     | 描述                             | 类型                                 |
| ------------------------------------------ | -------------------------------- | ------------------------------------ |
| `delegateCurrentDispersionChangedOnClient` | 客户端实际射击精度值发生变化回调 | Common.MulticastDelegate<() => void> |

<strong>接口：</strong>

| 接口名                                  | 描述                                                                     | 作用端                                           | 参数                                                    | 返回类型 |
| --------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------- | -------- |
| `getRandomShootDir`                     | 获取根据射击精度角度范围定义的圆锥空间中的随机射击单位矢量（以屏幕角度） | 调用端                                           | 无                                                      | number   |
| `setDispersionHalfAngleDefault`         | Set 子弹随机发散范围的默认半径                                           | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | NewValue: number<br/>（新设置的圆型范围默认半径值）     | void     |
| `getDispersionHalfAngleDefault`         | Get 子弹随机发散范围的默认半径                                           | 调用端                                           | 无                                                      | number   |
| `setDispersionHalfAngleMax`             | Set 子弹随机发散范围的最大半径                                           | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | NewValue: number<br/>（新设置的圆型范围最大半径值）     | void     |
| `getDispersionHalfAngleMax`             | Get 子弹随机发散范围的最大半径                                           | 调用端                                           | 无                                                      | number   |
| `setDispersionHalfAngleMin`             | Set 子弹随机发散范围的最小半径                                           | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | NewValue: number<br/>（新设置的圆型范围最小半径值）     | void     |
| `getDispersionHalfAngleMin`             | Get 子弹随机发散范围的最小半径                                           | 调用端                                           | 无                                                      | number   |
| `setDispersionHalfAngleDecreaseSpeed`   | Set 子弹随机发散范围半径的收缩速度                                       | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | NewValue: number<br/>（新设置的圆型范围半径每秒收缩量） | void     |
| `getDispersionHalfAngleDecreaseSpeed`   | Get 子弹随机发散范围半径的收缩速度                                       | 调用端                                           | 无                                                      | number   |
| `setDispersionHalfAngleIncreaseSpeed`   | Set 子弹随机发散范围半径的扩张速度                                       | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | NewValue: number<br/>（新设置的圆型范围半径每秒扩张量） | void     |
| `getDispersionHalfAngleIncreaseSpeed`   | Get 子弹随机发散范围半径的扩张速度                                       | 调用端                                           | 无                                                      | number   |
| `setDispersionHalfAngleIncreasePerShot` | Set 子弹随机发散范围半径在每次射击后的扩张值                             | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | NewValue: number<br/>（新设置的圆型范围半径增量）       | void     |
| `getDispersionHalfAngleIncreasePerShot` | Get 子弹随机发散范围半径在每次射击后的扩张值                             | 调用端                                           | 无                                                      | number   |
| `getCurrentDispersionHalfAngle`         | 获取当前子弹随机发散范围半径实际值                                       | 调用端                                           | 无                                                      | number   |
| `getTargetDispersionHalfAngle`          | 获取目标子弹随机发散范围半径实际值                                       | 调用端                                           | 无                                                      | number   |

### 瞄准组件：

<strong>属性：</strong>

| 属性名                   | 描述                 | 类型                                 |
| ------------------------ | -------------------- | ------------------------------------ |
| `delegateAimStartServer` | 服务器端开始瞄准回调 | Common.MulticastDelegate<() => void> |
| `delegateAimStartClient` | 客户端开始瞄准回调   | Common.MulticastDelegate<() => void> |
| `delegateAimEndServer`   | 服务器端结束瞄准回调 | Common.MulticastDelegate<() => void> |
| `delegateAimEndClient`   | 客户端结束瞄准回调   | Common.MulticastDelegate<() => void> |

<strong>接口：</strong>

| 接口名                                     | 描述                                       | 作用端             | 参数                                                                                   | 返回类型                    |
| ------------------------------------------ | ------------------------------------------ | ------------------ | -------------------------------------------------------------------------------------- | --------------------------- |
| `setAimming`                               | 打开/关闭瞄准                              | 客户端调用自动广播 | 无                                                                                     | void                        |
| `setAimMode`                               | Set 瞄准时的第一/第三人称模式              | 客户端调用自动广播 | NewAimMode: MWSysHotWeaponAimMode<br/>（新设置的瞄准模式）                             | void                        |
| `getAimMode`                               | Get 瞄准时的第一/第三人称模式              | 调用端             | 无                                                                                     | MWSysHotWeaponAimMode       |
| setScopeTypeIndex                          | Set 模拟瞄准镜 UI 种类                     | 客户端调用自动广播 | NewScopeTypeIndex: MWSysHotWeaponCrossHairType<br/>（新的瞄准镜 UI 种类）              | void                        |
| getScopeTypeIndex                          | Get 模拟瞄准镜 UI 种类                     |                    | 无                                                                                     | MWSysHotWeaponCrossHairType |
| setAimmingZoom                             | Set 模拟瞄准时的瞄准镜放大倍数             | 客户端调用自动广播 | NewAimmingZoom: number<br/>（新设置的瞄准镜放大倍数）                                  | void                        |
| getAimmingZoom                             | Get 第一人称瞄准时的瞄准镜放大倍数         | 调用端             | 无                                                                                     | number                      |
| `setCameraOffsetDistanceInThirdPersonMode` | Set 第三人称瞄准时的连接相机弹簧组件的长度 | 客户端调用自动广播 | NewCameraOffsetDistance: number<br/>（新设置的第三人称瞄准时的连接相机弹簧组件的长度） | void                        |
| `getCameraOffsetDistanceInThirdPersonMode` | Get 第三人称瞄准时的连接相机弹簧组件的长度 | 调用端             | 无                                                                                     | number                      |
| `setCameraSpringArmLengthDefault`          | Set 第三人称常态下相机弹簧组件的默认长度   | 客户端调用自动广播 | NewCameraArmLength: number<br/>（新设置的连接相机弹簧组件的默认长度）                  | void                        |
| `getCameraSpringArmLengthDefault`          | Get 第三人称常态下相机弹簧组件的默认长度   | 调用端             | 无                                                                                     | number                      |

### 上膛组件：

<strong>属性：</strong>

| 属性名                    | 描述               | 类型                                 |
| ------------------------- | ------------------ | ------------------------------------ |
| delegateStartLoadOnServer | 服务端上膛开始回调 | Common.MulticastDelegate<() => void> |
| delegateStartLoadOnClient | 客户端上膛开始回调 | Common.MulticastDelegate<() => void> |
| delegateEndLoadOnServer   | 服务端上膛结束回调 | Common.MulticastDelegate<() => void> |
| delegateEndLoadOnClient   | 客户端上膛结束回调 | Common.MulticastDelegate<() => void> |

<strong>接口：</strong>

| 接口名             | 描述                   | 作用端             | 参数                                             | 返回类型 |
| ------------------ | ---------------------- | ------------------ | ------------------------------------------------ | -------- |
| `setAnimationGuid` | 设置动画 GUID          | 客户端调用自动广播 | guid: string（动画 ID）                          | void     |
| `getAnimationGuid` | 获取绑定的动画 GUID    | 调用端             | 无                                               | string   |
| `hadAnimationGuid` | 获取是否有动画 GUID    | 调用端             | 无                                               | boolean  |
| `setLoadAfterFire` | 设置开火后自动上膛     | 客户端调用自动广播 | bEnabled: boolean<br/>（是否开启开火后自动上膛） | void     |
| `getLoadAfterFire` | 获取是否开火后自动上膛 | 调用端             | 无                                               | boolean  |
| `setLoadTime`      | 设置上膛时间           | 客户端调用自动广播 | time: number（上膛时间）                         | void     |
| `getLoadTime`      | 获取上膛时间           | 调用端             | 无                                               | number   |

### 换弹组件：

<strong>属性：</strong>

| 属性名                        | 描述               | 类型                                 |
| ----------------------------- | ------------------ | ------------------------------------ |
| `delegateStartReloadOnServer` | 服务端换弹开始回调 | Common.MulticastDelegate<() => void> |
| `delegateStartReloadOnClient` | 客户端换弹开始回调 | Common.MulticastDelegate<() => void> |
| `delegateEndReloadOnServer`   | 服务端换弹结束回调 | Common.MulticastDelegate<() => void> |
| `delegateEndReloadOnClient`   | 客户端换弹结束回调 | Common.MulticastDelegate<() => void> |

<strong>接口：</strong>

| 接口名             | 描述                | 作用端             | 参数                       | 返回类型 |
| ------------------ | ------------------- | ------------------ | -------------------------- | -------- |
| `setAnimationGuid` | 设置动画 GUID       | 客户端调用自动广播 | guid: string（动画 GUID）  | void     |
| `getAnimationGuid` | 获取绑定的动画 GUID | 调用端             | 无                         | string   |
| `hadAnimationGuid` | 是否有动画 GUID     | 调用端             | 无                         | boolean  |
| `setReloadTime`    | 设置换弹时间        | 客户端调用自动广播 | time: number（新换弹时间） | void     |
| `getReloadTime`    | 获取换弹时间        | 调用端             | 无                         | number   |

### 后坐力组件：

<strong>属性：</strong>

| 属性名                             | 描述                 | 类型                                 |
| ---------------------------------- | -------------------- | ------------------------------------ |
| `delegateStartRecoilForceOnServer` | 服务器后坐力开始广播 | Common.MulticastDelegate<() => void> |
| `delegateStartRecoilForceOnClient` | 客户端后坐力开始广播 | Common.MulticastDelegate<() => void> |

<strong>接口：</strong>

| 接口名                   | 描述                   | 作用端                                           | 参数                            | 返回类型 |
| ------------------------ | ---------------------- | ------------------------------------------------ | ------------------------------- | -------- |
| `setHorizontalOffsetMin` | 设置水平偏移最小值     | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | value: number（水平偏移最小值） | void     |
| `getHorizontalOffsetMin` | 获取水平偏移最小值     | 调用端                                           | 无                              | number   |
| `setHorizontalOffsetMax` | 设置水平偏移最大值     | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | value: number（水平偏移最大值） | void     |
| `getHorizontalOffsetMax` | 获取水平偏移最大值     | 调用端                                           | 无                              | number   |
| `setVerticalOffsetMin`   | 设置垂直偏移最小值     | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | value: number（垂直偏移最小值） | void     |
| `getVerticalOffsetMin`   | 获取垂直偏移最小值     | 调用端                                           | 无                              | number   |
| `setVerticalOffsetMax`   | 设置垂直偏移最大值     | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | value: number（垂直偏移最大值） | void     |
| `getVerticalOffsetMax`   | 获取垂直偏移最大值     |                                                  | 无                              | number   |
| `setHorizontalJitterMin` | 设置相机水平抖动最小值 | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | value: number（水平抖动最小值） | void     |
| `getHorizontalJitterMin` | 获取相机水平抖动最小值 | 调用端                                           | 无                              | number   |
| `setHorizontalJitterMax` | 设置相机水平抖动最大值 | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | value: number（水平抖动最大值） | void     |
| `getHorizontalJitterMax` | 获取相机水平抖动最大值 | 调用端                                           | 无                              | number   |
| `setVerticalJitterMin`   | 设置相机垂直抖动最小值 | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | value: number（垂直抖动最小值） | void     |
| `getVerticalJitterMin`   | 获取相机垂直抖动最小值 | 调用端                                           | 无                              | number   |
| `setVerticalJitterMax`   | 设置相机垂直抖动最大值 | 装备前仅服务端<br/>装备后双端<br/>客户端调用广播 | value: number（垂直抖动最大值） | void     |
| `getVerticalJitterMax`   | 获取相机垂直抖动最大值 | 调用端                                           | 无                              | number   |
| `getHorizontalOffset`    | 获取水平偏移值         | 调用端                                           | 无                              | number   |
| `getVerticalOffset`      | 获取垂直偏移值         | 调用端                                           | 无                              | number   |
| `getHorizontalJitter`    | 获取水平抖动值         | 调用端                                           | 无                              | number   |
| `getVerticalJitter`      | 获取垂直抖动值         | 调用端                                           | 无                              | number   |

### 热武器相关枚举：

| 枚举                        | 元素                                                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| MWSysHotWeaponFireMode      | /** 单发 */<br/> SingleFire = 0,<br/> /** 连发 */<br/> ContinuousFire = 1,<br/> /** 全自动 */<br/> FullAutomationFire = 2                                                                                                      |
| MWSysHotWeaponState         | /** 准备好，可以进行射击 非射机姿态 */<br/> Idle = 0,<br/> /** 换弹夹，装弹 */<br/> Reloading = 1,<br/> /** 上膛 */<br/> Loading = 2,<br/> /** 射击中 */<br/> Firing = 3                                                       |
| MWSysHotWeaponAimMode       | /** 第一人称 */<br/> First_Person = 0,<br/> /** 第三人称 */<br/> Third_Person = 1                                                                                                                                              |
| MWSysHotWeaponCrossHairType | /** TODO */<br/> None = 0,<br/> /** 第三人称准心 */<br/> ThirdPersonCrossHair = 1,<br/> /** 第三人称点 */<br/> ThirdPersonDot = 2,<br/> /** 第一人称准心 */<br/> FirstPersonCrossHair = 3,<br/> /** 仅用于补位 */<br/> Max = 4 |

# 如何合理利用 / 使用 热武器

### <strong>将能力对象拖入场景，开关它的组件，并自定义组件的各种属性：</strong>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcncwml14jlGPUVkWYmJ9Gk3g.png)

<strong>发射组件（必须开启）：</strong>

- 发射动作绑定：热武器开火时播放绑定的动作（资源库拖拽）
- 发射模式：

  - 单发：每次执行开火时，发射 1 次后停火。
  - 连发：每次执行开火时，发射“连发次数”次后停火。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn4HXrBLtY9Jxf6wG9DRiqJc.png)

- 全自动：每次执行开火时持续发射，直到手动调用停火或者弹夹子弹为 0；
- 发射间隔：热武器发射两发子弹的最小间隔时间
- 弹夹容量：热武器弹夹大小
- 多重射击：每发子弹的分裂数
- <del>屏幕中心发射：</del>

  - <del>发射偏移调整</del>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn2CKUkut5WnmnOk5X1mXy2g.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnS6N0G1YqoRqEX1PZguF7Eg.png)

<strong>发射精度组件（可选）：</strong>

开发者可以对射击范围进行设置，更改上图锥形范围半径，调整射击精准度。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnMRdcJ04WVvwLzgonCFmdGd.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn80Wfls3UHo9jQFCWwVdgUh.png)

- 散布范围设置：默认散布范围半径
- 最大散布范围：最大散布范围半径
- 最小散布范围：最小散布范围半径
- 范围收缩速度：散布范围收缩的速度
- 范围扩张速度：散布范围扩展的速度

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn82v6Pi4R94Y8oNSKO8iHie.png)

<strong>瞄准组件（可选）：</strong>

- 瞄准模式：

  - <del>第一人称：</del>

<del>瞄准 UI</del>

<del>瞄准镜倍率</del>

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnGW4zozFvzEiL8s3BOBp2xo.png)

- 第三人称：

摄像机距离调整：瞄准时摄像机杆的长度变化

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnC8oxLBPbhpgia266vilu1f.png)

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnfonMpQUFlV7E3KEYAwNG2f.png)

<strong>上膛组件（可选）：</strong>

- 上膛动作绑定：热武器上膛时播放绑定的动作（资源库拖拽）
- 上膛时间：上膛动作完成的时间
- 发射后上膛：勾选后每次发射后会自动进行一次上膛（默认是换弹后才进行上膛）

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn2UlKbgKj0mMWu0iQXyVSUb.png)

<strong>换弹组件（可选）：</strong>

- 换弹动作绑定：热武器换弹时播放绑定的动作（资源库拖拽）
- 换弹时间：换弹动作完成的时间

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcn5Rj5kfu9kRUNAg6bnrL8Ff.png)

<strong>后坐力组件：</strong>

- 水平偏移最小值/最大值：热武器每次发射时，摄像机会基于开火时摄像机位置，进行水平方向的旋转，偏移值从设定的区间内随机。
- 垂直偏移最小值/最大值：热武器每次发射时，摄像机会基于开火时摄像机位置，进行垂直方向的旋转偏移，偏移值从设定的区间内随机。
- 水平抖动最小值/最大值：热武器发射时，摄像机会基于开火时摄像机位置，进行水平方向的旋转，在单次开火后，摄像机会回到水平偏移后的位置，即摄像机水平抖动是一个表现，并不会影响枪械的最终位置
- 垂直抖动最小值/最大值：热武器发射时，摄像机会基于开火时摄像机位置，进行垂直方向的旋转，在单次开火后，摄像机会回到垂直偏移后的位置，即摄像机垂直抖动是一个表现，并不会影响枪械的最终位置

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnKRIJjhXgEdtOYtLH29Vfif.png)

### 添加热武器实体表现，控制脚本

热武器对象默认动态，挂载的模型只需要注意关闭碰撞。

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnFbEoWjaLePvtZOU7JrPclf.png)

将热武器需要用到的特效挂在下方，等热武器执行相应功能时获取并进行对应的操作

![](https://wstatic-a1.233leyuan.com/productdocs/static/boxcnSvbboWWivLHY92zLQW1lmg.png)

### <strong>在脚本中通过热武器对象提供的接口对它进行控制，做出各种行为。</strong>

装备热武器：

```ts
// 热武器对象装备需要先去服务端装备，然后返回客户端再次装备。
this.equipOnServer(chara); //这里推荐使用RPC函数在同脚本直接进行双端通信

@MWCore.MWFunction(MWCore.MWServer)
private equipOnServer(chara: GamePlay.Character) {
    // 在服务端执行装备，装备回调双端执行，服务端owner修改为chara， 但客户端owner属性不刷新仍然为null，需要在客户端手动调用equipment装备第二次刷新owner
    this.weapon.equipment(chara, this.socket);
}


@MWCore.MWFunction(MWCore.MWClient, MWCore.MWMulticast)
private equipOnClient(chara: GamePlay.Character) {
    // 服务端调用equipment不会触发回调, 且没有广播，没有执行客户端装备的客户端无法获取武器的owner
    this.weapon.equipment(chara, this.socket);
    // 客户端可以打印一下装备后调用getCurrentOwner的结果，未装备时是null。
    console.error("owner " + this.weapon.getCurrentOwner().characterName);
    // 通常会在装备热武器后修改角色的运动面朝方向模式和持枪姿态：角色朝向控制器方向，持枪瞄准姿态
    this.weapon.getCurrentOwner().animationStance = this.pose;
    this.weapon.getCurrentOwner().moveFacingDirection = GamePlay.MoveFacingDirection.ControllerDirection;
}
```

卸载热武器：

```ts

```

### <strong>通过接口对热武器进行其他操作：添加</strong><strong>回调</strong><strong>函数，修改属性，获取计算结果等等</strong>

# 使用 热武器 的注意事项与建议

1. 装备热武器只能在服务端执行，同时执行完后需要在客户端手动执行一次刷新客户端热武器的持有者属性，否则客户端持有者一直是 null 造成问题。
2. 已装备的热武器在<strong>客户端</strong>只能被当前角色操作，其他角色对它进行操作都会被屏蔽
3. 刚装备上的热武器是没有子弹的，需要换弹或者手动指定子弹数。
4. 上膛时间和换弹时间并不影响动画播放的时间
5. 射击间隔过短会增加性能消耗
6. 热武器不同状态是互斥的

# 项目案例
