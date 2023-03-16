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
  title: '文档',
  appearance: false,
  description: '口袋方舟编辑器的产品文档',
  outDir: '../dist',
  head: [['link', { rel: 'icon', href: '/favicon_kd.ico' }]],
  themeConfig: {
    logo: '/logo.png',
    sidebar: [
      {
        text: 'System Requirements',
        link: '/System Requirements.md',
        items: [
          // { text: 'System Requirements', link: '/System Requirements.md' }
        ]
      },
      {
        text: 'Editor',
        items: dealItem('Editor')
      },
      {
        text: 'UI',
        items: dealItem('UI')
      },
      {
        text: 'Gameplay Objects',
        items: dealItem('GameplayObjects')
      },
      {
        text: 'Motion Control Objects',
        items: dealItem('MotionControlObjects')
      },
      {
        text: 'World Objects',
        items: dealItem('WorldObjects')
      },
      {
        text: 'Scripting',
        items: dealItem('Scripting')
      },
      {
        text: 'Resource',
        items: dealItem('Resource')
      },
      {
        text: 'Localization',
        items: dealItem('Localization')
      }
    ],
    // algolia: {
    //   appId: 'I2PHYUBLCN',
    //   apiKey: '62ee775311415d26549e0e30fef5aa38',
    //   indexName: 'api-docs_prodigytech'
    // },
    siteTitle: '产品文档',
    nav: [
      {
        text: '官网',
        link: 'https://creator.ark.online/'
      },
      {
        text: '教程',
        link: 'https://meta.feishu.cn/wiki/wikcnmY0MQweLdbnlywkJJiDucd'
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
        'https://github.com/prodigytech-doc/product-docs/tree/main/docs/:path',
      text: '编辑'
    },
    lastUpdatedText: 'Updated Date',
    docFooter: {
      prev: 'Pagina prior',
      next: 'Proxima pagina'
    }
  }
})
