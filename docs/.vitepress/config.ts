import type { DefaultTheme } from '../../viteTheme/shared'
import { dealConfigSidebar, dealItem } from '../../utils'
import { defineConfigWithTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = [
  {
    text: 'Index',
    items: [{ text: '介绍', link: '/index.md' }]
  }
]

export default defineConfigWithTheme<DefaultTheme.Config>({
  ignoreDeadLinks: true,
  title: '产品手册',
  appearance: false,
  description: '口袋方舟编辑器的产品文档',
  outDir: '../dist',
  head: [['link', { rel: 'icon', href: '/favicon_kd.ico' }]],
  themeConfig: {
    logo: '/logo.png',
    sidebar: [
      {
        text: '编辑器',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '安装需求', link: '/Editor/InstallationRequirements.md' },
          { text: '编辑器设置', link: '/Editor/EditorSettings.md' },
          { text: '编辑器窗口操作', link: '/Editor/EditorWindowsOperation.md' },
          {
            text: '画质级别模拟与设置',
            link: '/Editor/GraphicsQualitySettings.md'
          },
          { text: '预制体功能说明', link: '/Editor/Prefabs.md' },
          { text: '游戏断线重连', link: '/Editor/GameReconnection.md' },
          { text: '绘制模式', link: '/Editor/DrawMode.md' },
          {
            text: '横竖屏&分辨率模拟功能说明',
            link: '/Editor/ScreenOrientation&ResolutionSimulation.md'
          },
          { text: '游戏发布流程', link: '/Editor/GameReleaseProcess.md' },
          { text: '接入社交功能', link: '/Editor/UseMGS.md' },
          { text: '角色编辑工具', link: '/Editor/CharacterEditor.md' }
        ]
      },
      {
        text: '用户界面',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '创建游戏界面(UI)',
            link: '/UI/CreatingUserInterface(UI).md'
          },
          { text: 'UI控件的基础属性', link: '/UI/UIWidget-BaseProperties.md' },
          { text: 'UI控件-容器', link: '/UI/UIComponent-Canvas.md' },
          { text: 'UI控件-图片', link: '/UI/UIComponent-Image.md' },
          { text: 'UI控件-文本', link: '/UI/UIComponent-Text.md' },
          { text: 'UI控件-输入框', link: '/UI/UIComponent-InputBox.md' },
          { text: 'UI控件-按钮', link: '/UI/UIComponent-Button.md' },
          { text: 'UI控件-遮罩按钮', link: '/UI/UIComponent-MaskedButton.md' },
          { text: 'UI控件-进度条', link: '/UI/UIComponent-ProgressBar.md' },
          { text: 'UI控件-滚动框', link: '/UI/UIComponents-ScrollBar.md' },
          { text: 'UI控件-摇杆', link: '/UI/UIWidget-Joystick.md' },
          { text: 'UI控件-摄像机滑动区', link: '/UI/UIWidget-Touchpad.md' },
          { text: 'UI控件-加载图', link: '/UI/UIComponent-LoadingIcon.md' },
          { text: 'UI控件-调色板', link: '/UI/UIComponent-ColorPicker.md' },
          { text: '富文本', link: '/UI/Rich-text.md' }, 
          { text: 'UI编辑器设计功能', link: '/UI/UIDesigner.md' },
          {
            text: '按键绑定（针对PC端）及预设UI',
            link: '/UI/KeybindsandPremadeUI.md'
          },
          { text: 'UI性能与优化', link: '/UI/UIPerformanceandOptimization.md' },
          {
            text: 'UI脚本的生命周期及事件说明',
            link: '/UI/LifeCycleandEventDescriptionofUIScripts.md'
          }
        ]
      },
       {
        text: '物理',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '物理对象', link: '/Physics/PhysicalObject.md' },
          { text: '推进器', link: '/Physics/Propeller.md' }
        ]
      },
      {
        text: '游戏功能对象',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '四轮载具',
            link: '/GameplayObjects/Four-wheeledVehicles.md'
          },
          { text: '高级轮式载具', link: '/GameplayObjects/AdvancedVehicle.md' },
          { text: '寻路系统', link: '/GameplayObjects/NavigationArea.md' },
          { text: '交互物', link: '/GameplayObjects/Interactors.md' },
          { text: '世界UI', link: '/GameplayObjects/WorldUI.md' },
          { text: '触发器', link: '/GameplayObjects/Trigger.md' },
          { text: '空锚点', link: '/GameplayObjects/Anchor.md' },
          { text: '热武器', link: '/GameplayObjects/HotWeapon.md' },
          { text: '游泳区域', link: '/GameplayObjects/SwimmingArea.md' },
          { text: '初生点', link: '/GameplayObjects/SpawnPoint.md' },
          { text: '投掷物', link: '/GameplayObjects/Projectiles.md' },
          { text: '禁行区', link: '/GameplayObjects/BlockingArea.md' },
          { text: '点光源', link: '/GameplayObjects/PointLight.md' },
          { text: '非玩家对象', link: '/GameplayObjects/NPCs.md' },
          { text: '音效', link: '/GameplayObjects/SoundEffect.md' }
        ]
      },
      {
        text: '运动功能对象',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '冲量对象', link: '/MotionControlObjects/ImpulseObject.md' },
          { text: '运动器', link: '/MotionControlObjects/IntegratedMover.md' }
        ]
      },
      {
        text: '世界对象',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '环境光', link: '/WorldObjects/AmbientLight.md' },
          { text: '太阳光', link: '/WorldObjects/Sunlight.md' },
          { text: '摄像机', link: '/WorldObjects/Camera.md' },
          { text: '角色', link: '/WorldObjects/Characters.md' },
          { text: '后处理', link: '/WorldObjects/Post-Processing.md' },
          { text: '天空球', link: '/WorldObjects/Skybox.md' }
        ]
      },
      {
        text: '脚本',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '脚本的生命周期', link: '/Scripting/ScriptLifeCycle.md' },
          {
            text: '单机游戏开发注意事项',
            link: '/Scripting/DevelopingStandaloneGames.md'
          },
          {
            text: '使用与动态加载资源',
            link: '/Scripting/UsingandDynamicallyLoadingResources.md'
          },
          { text: '事件系统', link: '/Scripting/TheEventSystem.md' },
          { text: '数据存储', link: '/Scripting/DataStorage.md' },
          {
            text: '网络同步原理和结构',
            link: '/Scripting/NetworkSynchronizationStructureandMechanics.md'
          },
          {
            text: '接入社交功能(MGS)',
            link: '/Scripting/EnablingSocialFeatures(MGS).md'
          },
          { text: '共享数据', link: '/Scripting/DataSharing.md' }
        ]
      },
      {
        text: '资源',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '美术资源', link: '/Resource/ArtResources.md' }
        ]
      },
      {
        text: '本地化',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: '游戏语言本地化',
            link: '/Localization/GameLanguageLocalization.md'
          }
        ]
      }
    ],
    algolia: {
      // appId: '89BNK6UU0A',
      // apiKey: 'f691939e4fa8b414f92c84c288d2097a',
      // indexName: 'all-docs',
      appId: 'I2PHYUBLCN',
      apiKey: '62ee775311415d26549e0e30fef5aa38',
      indexName: 'api-docs_prodigytech',
      project: {
        active: 'product-docs',
        arr: [
          {
            key: 'product-docs',
            facetFilters: ['tags:product-docs'],
            name: '产品手册'
          },
          {
            key: 'api-docs',
            facetFilters: ['tags:api-docs'],
            name: 'API文档'
          }
        ]
      }
    },
    siteTitle: '产品手册',
    nav: [
      {
        text: '创作者',
        link: 'https://creator.ark.online/'
      },
      {
        text: '教程',
        link: 'https://learning.ark.online/'
      },
      {
        text: 'API',
        link: 'https://api-docs.ark.online/'
      },
      {
        text: '论坛',
        link: 'https://forum.ark.online/'
      }
    ],
    outline: [2, 4],
    editLink: {
      pattern:
        'https://github.com/prodigytech-doc/product-docs/tree/release-025/docs/:path',
      text: '编辑'
    },
    lastUpdatedText: 'Updated Date',
    docFooter: {
      prev: 'Pagina prior',
      next: 'Proxima pagina'
    }
  }
})
