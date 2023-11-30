# Replicated使用规范

1. 用户在修改过程中注意事项：当前**需要严格注意的是多维数组，属性同步后续会不支持多维数组**，但当前项目中如果有使用多维数组也会触发onchanged，所以无法避免蓝军没有在属性同步中使用多维数组。蓝军要自己看下项目是否有在属性同步中使用多维数组，有的话需要改为其他类型。以及如果有自定义类型的情况下，最好修改为Core.Type自定义类型。

2. 单个属性支持类型：String Boolean Number null undefined Vector2 Vector Vector4 LinearColor Rotation Transform GameObject 和 符合Core.Type规范的自定义类型 以及这些类型的一维数组，确定不会支持的类型有多维数组和Set&Map类型。

   a.Core.Type自定义类型使用方法（注意：自定义类型的属性也仅支持上述的单个属性支持类型）

   1. ![023-1](https://arkimg.ark.online/023-1.PNG)

   b.当前也支持继承Core.Script的脚本类，但不建议把脚本对象（Core.Script）作为数据载体用 脚本有周期函数

3. 当前版本String Boolean Number Vector 类型的属性不支持动态修改类型（后续会支持 改为null和undefined）

4. 目前Number采用Float类型传输，精度6-7位。（23版本会进行优化, 开发者可以根据业务决定数据使用哪种格式）

5. 现阶段属性同步数组，splice和.length=0的操作不会触发onchanged，已反馈。蓝军如果有确切需求需要使用属性同步数组的话，可通过修改时进行new数组避免。该操作只是暂时解决方法，后续编辑器支持后考虑性能最好还是改回去。