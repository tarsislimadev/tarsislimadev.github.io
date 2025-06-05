import { HTML, nSpan, nFlex, nImage } from '../assets/js/libs/afrontend/index.js'

import { getPageStyle } from '../assets/js/utils/page.js'

export class LogoComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.createSpan('Tarsis', { color: getPageStyle() == 'dark' ? 'white' : 'black' }))
    this.append(this.createSpan('Lima', { color: 'yellow' }))
  }

  createSpan(text, styles = {}) {
    const span = new nSpan()
    span.setText(text)
    Object.entries(styles).map(([key, value]) => span.setStyle(key, value))
    return span
  }
}
