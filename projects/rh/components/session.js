import { HTML } from '@brtmvdl/frontend'
import * as LOCAL from '../js/utils/local.js'

export class Session extends HTML {
  onCreate() {
    super.onCreate()
    const session = LOCAL.get('session', {})
    this.setText(JSON.stringify({ session }))
  }
}
