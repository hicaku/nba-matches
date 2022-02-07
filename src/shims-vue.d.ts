/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

import { Store } from 'vuex'
interface ComponentCustomProperties {
  $store: Store<State>
}