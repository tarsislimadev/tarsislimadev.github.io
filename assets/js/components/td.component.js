import { HTML, nTd } from '../../../assets/js/libs/afrontend/index.js'

export class TdComponent extends nTd {
  styles = {}
  text = ''

  constructor({ text = '', styles = {} } = {}) {
    super()
    this.text = text
    this.styles = styles
  }

  onCreate() {
    super.onCreate()
    this.setText(this.text)
    this.setStyles()
  }

  setStyles() {
    const self = this
    Object.keys(self.styles).map((key) => self.setStyle(key, self.styles[key]))
  }
}
