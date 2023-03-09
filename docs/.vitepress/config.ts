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
    sidebar: [
      {
        text: 'Index',
        items: [
          { text: '电脑配置', link: '/doccnBbvKZOJu5PrxBvc5sjy9tb.md' },
          { text: '数据存储', link: '/EFuqd7fYSoBW2UxoBhtcJBWSnNb.md' },
          { text: '脚本的生命周期', link: '/NLALdufpZo2GKrx3fzfcLRGanRd.md' },
          {
            text: '单机游戏开发注意事项',
            link: '/OJBkdoADvooBbLxM6hPcfyxInHe.md'
          },
          {
            text: '网络同步原理和结构',
            link: '/RGF0ddYCroefzNxWUiAc6ex4nxf.md'
          }
        ]
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
    outline: [2, 3],
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
