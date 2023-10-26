import VPTheme from 'metaapp-prodigytech-doc-theme'
import Documate from '@documate/vue'
import '@documate/vue/dist/style.css'
import { h } from 'vue'

export default {
  ...VPTheme,
  Layout: h(VPTheme.Layout, null, {
    'nav-bar-content-before': () =>
      h(Documate, {
        endpoint: 'https://38wnp18uy7.us.aircode.run/ask'
      })
  })
}
