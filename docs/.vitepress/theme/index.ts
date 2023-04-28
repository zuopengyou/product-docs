import VPTheme from 'metaapp-prodigytech-doc-theme'
import { useRoute } from 'vitepress'
import { watch } from 'vue'
import mediumZoom, { Zoom } from 'medium-zoom'
import './index.css'

export default {
  ...VPTheme,
  setup() {
    const route = useRoute()
    let zoom: Zoom | undefined
    watch(
      route,
      () => {
        zoom?.detach()
        setTimeout(() => {
          zoom = mediumZoom('img', { background: 'var(--vp-c-bg)' })
        })
      },
      {
        immediate: true
      }
    )
  }
}
