# 

| 修改日期           | 修改人 | 修改内容 | 所属编辑器版本 |
| ------------------ | ------ | -------- | -------------- |
| 2022 年 9 月 28 日 | 廖悦吾 | 文档创建 | 015            |
|                    |        |          |                |

<strong>阅读本文预计 10 分钟</strong>

本文概述了区域效果的工作机制，展示在编辑器创建并使用区域效果的过程和区域效果在游戏中的应用。教程内容包含区域效果功能对象的属性面板，类对象属性和接口以及一个示例工程。

# 什么是区域效果

区域效果是一个可以播放特效并带有范围判定的一个对象。开发者可以自定义范围的形状，然后获取该范围内的角色。该对象在游戏开放中常用于释放带变化范围判定的特效技能，例如蓄力重击和蔓延伤害技能。

区域效果在编辑器中以功能对象的形式存在，打开编辑器后在左侧资源栏中的“逻辑资源”中，选取“游戏功能对象”，红框中就是区域效果，资源 ID 为 14197。

![](static/boxcnwLCt9Y1TQ6GHUrErNF8e3g.png)

# 区域效果 都包含什么

### 区域效果的工作流程图：

### 区域效果包含的属性：

| 属性名             | 描述       | 类型               |
| ------------------ | ---------- | ------------------ |
| `effectRangeType`  | 效果类型   | effectRangeType    |
| `effectRangeShape` | 效果形状   | effectRangeShape3D |
| `circleRadius`     | 圆形半径   | number             |
| `rectangleWidget`  | 矩形长度   | number             |
| `rectangleHight`   | 矩形宽度   | number             |
| `sectorRadius`     | 扇形半径   | number             |
| `sectorAngle`      | 扇形角度   | number             |
| `sphereRadius`     | 球形半径   | number             |
| `cubeWidget`       | 立方体长度 | number             |
| `cubeHeight`       | 立方体宽度 | number             |
| `cubeLength`       | 立方体高度 | number             |
| `segmentRadius`    | 扇形半径   | number             |
| `segmentAngle`     | 扇形体角度 | number             |
| `segmentHeight`    | 扇形体高度 | number             |

### 区域效果包含的接口：

| 接口名               | 描述                        | 作用端     | 参数 | 返回类型 |
| -------------------- | --------------------------- | ---------- | ---- | -------- |
| `startPlay`          | 播放效果                    | 调用端生效 | 无   | void     |
| `stopPlay`           | 停止效果                    | 调用端生效 | 无   | void     |
| `getInRangeAllActor` | 获取范围内的所有 Gameobject | 调用端生效 | 无   | Array    |

### 区域效果使用的枚举：

| 枚举               | 元素                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| effectRangeType    | /** 2D 形状 */<br/> twoD = 0,<br/> /** 3D 形状 */<br/> threeD = 1                                  |
| effectRangeShape2D | /** 矩形 */<br/> rectangle = 0,<br/> /** 圆形 */<br/> circle = 1,<br/> /** 扇形 */<br/> sector = 2 |
| effectRangeShape3D | /** 盒体 */<br/> cube = 0,<br/> /** 球体 */<br/> sphere = 1,<br/> /** 扇形体 */<br/> segment = 2   |

# 如何合理利用 / 使用 区域效果

### 在编辑器工作区中直接使用：

1. <strong>将区域效果拖入场景，添加特效，并自定义区域的各种参数：</strong>

效果范围类型：2D/3D

效果范围形状：2D：矩形/圆形/扇形；3D：盒体/球体/扇形体

不同形状具有不同参数

效果表现：要播放的特效，可直接将特效资源拖入框中

![](static/boxcnoezbfH1o6xpLDpLk0vDLvg.png)

1. <strong>创建控制区域效果的脚本，可以拖入对象栏，也可以挂在区域效果底下。</strong>

![](static/boxcnfa0FhgtxOXZcnGFD3by9pe.png)

1. <strong>在脚本中使用区域效果对象提供的接口对它进行控制：播放/停止播放特效，获取区域内的所有对象并返回对象数组。</strong>

```ts
// 通过GUID异步获取能力对象，保证能力对象获取到后对它进行操作
MWCore.GameObject.asyncFind("6E772250435C4F92BE14F187A21110F7").then((obj) => {

    let eArea = obj as GamePlay.EffectLogical;

    // 监听本地事件播放区域效果
    Events.addLocalListener("startPlay", () => {
        eArea.startPlay();
    });

    // 监听本地事件停止区域效果
    Events.addLocalListener("stopPlay", () => {
        eArea.stopPlay();
    });

    // 监听本地事件获取区域内所有对象返回它们的数组
    Events.addLocalListener("getObject", () => {
        let actorArray = eArea.getInRangeAllActor();
        let s = "";
        for(let actor of actorArray) {
            s += `对象id: ${actor.guid} \n`;
        }
        Events.dispatchLocal("PrintObject", s);
    });

});
```

1. <strong>通过接口对区域效果进行其他操作：修改区域类型，形状和形状属性</strong>

```ts
// 0: 盒体 1：球体 2：扇形体 3：矩形 4： 圆形 5：扇形（3 4 5接口暂时未实现）

// 监听本地事件修改区域类型，形状和形状属性
Events.addLocalListener("change", (size: number) => {
        this.area++;
        let key = this.area % 3;
        console.error("key " + key);
        console.error("size " + size);
        let s = "";
        switch (key) {
                case 0:
                        eArea.effectRangeType = GamePlay.effectRangeType.threeD;
                        eArea.effectRangeShape = GamePlay.effectRangeShape3D.cube;
                        eArea.cubeHeight = size;
                        eArea.cubeLength = size;
                        eArea.cubeWidget = size;
                        setTimeout(() => {
                                s += `区域类型: ${eArea.effectRangeType} \n`;
                                s += `区域形状: ${eArea.effectRangeShape} \n`;
                                s += `盒体宽度度: ${eArea.cubeHeight} \n`;
                                s += `盒体高度: ${eArea.cubeLength} \n`;
                                s += `盒体长度: ${eArea.cubeWidget} \n`;
                                Events.dispatchLocal("PrintAttribute", s);
                        }, 500);
                        
                        break;
                case 1:
                        eArea.effectRangeType = GamePlay.effectRangeType.threeD;
                        eArea.effectRangeShape = GamePlay.effectRangeShape3D.sphere;
                        eArea.sphereRadius = size;
                        setTimeout(() => {
                                s += `区域类型: ${eArea.effectRangeType} \n`;
                                s += `区域形状: ${eArea.effectRangeShape} \n`;
                                s += `球体半径: ${eArea.sphereRadius} \n`;
                                Events.dispatchLocal("PrintAttribute", s);
                        }, 500);
                        

                        break;

                case 2:
                        eArea.effectRangeType = GamePlay.effectRangeType.threeD;
                        eArea.effectRangeShape = GamePlay.effectRangeShape3D.segment;
                        eArea.segmentHeight = size;
                        eArea.segmentRadius = size;
                        setTimeout(() => {
                                s += `区域类型: ${eArea.effectRangeType} \n`;
                                s += `区域形状: ${eArea.effectRangeShape} \n`;
                                s += `扇形体高度: ${eArea.segmentHeight} \n`;
                                s += `扇形体半径: ${eArea.segmentRadius} \n`;
                                Events.dispatchLocal("PrintAttribute", s);
                        }, 500);
                        break;
                        
                case 3:
                        // 接口未实现
                        break;

                case 4:
                        // 接口未实现
                        break;

                case 5:
                        // 接口未实现
                        break; 
        
                default:
                        break;
        }
```

### 在代码中动态生成

目前区域效果不支持动态指定特效，所以代码里只能动态生成场景中已有的区域效果对象或者 prefab

# 使用 区域效果 的注意事项与建议

1. 如果客户端修改双端区域效果对象的属性后需要等待服务器将修改后的属性同步回来所以需要延时。
2. 使用 getInRangeAllActor()获取区域内所有对象，当区域内有角色对象时会报错，待修复
3. 区域效果支持单端使用

# 项目案例
