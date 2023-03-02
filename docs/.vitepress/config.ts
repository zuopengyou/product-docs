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
  title: 'API',
  appearance: false,
  description: '口袋方舟编辑器的产品文档',
  outDir: '../dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon_kd.ico' }]
    // [
    //   'script',
    //   {},
    //   `
    //         var _hmt = _hmt || [];
    //     (function() {
    //       var hm = document.createElement("script");
    //       hm.src = "https://hm.baidu.com/hm.js?5629eb7e7272f7af14f1b8ef288c5f57";
    //       var s = document.getElementsByTagName("script")[0];
    //       s.parentNode.insertBefore(hm, s);
    //     })();
    // `
    // ]
  ],
  themeConfig: {
    logo: '/logo.png',
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
        text: 'API 文档',
        link: 'https://api-docs.ark.online/'
      },
      {
        text: '论坛',
        link: 'https://forum.ark.online/'
      }
    ],
    outline: [2, 3],
    editLink: {
      pattern:
        'https://github.com/prodigytech-doc/project-docs/tree/main/docs/:path',
      text: '编辑'
    },
    lastUpdatedText: 'Updated Date',
    docFooter: {
      prev: 'Pagina prior',
      next: 'Proxima pagina'
    }
  }
})
