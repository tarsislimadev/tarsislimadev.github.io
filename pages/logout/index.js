import { PageComponent } from '../../assets/js/components/page.component.js'

import * as FLOW from '../../assets/js/utils/flow.js'

export class Page extends PageComponent {
  onCreate() {
    super.onCreate()
    localStorage.clear()
    FLOW.goTo('/?access_token=0')
  }
}
