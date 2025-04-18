import { PaddingComponent } from '../../assets/js/components/padding.component.js'

import * as FLOW from '../../assets/js/utils/flow.js'

export class Page extends PaddingComponent {
  onCreate() {
    super.onCreate()
    localStorage.clear()
    FLOW.goTo('/?access_token=0')
  }
}
