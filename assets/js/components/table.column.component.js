import { HTML, nTd } from '../../../assets/js/libs/afrontend/index.js'

export class TableColumnComponent extends nTd {
  el = new HTML()

  constructor(el = new HTML()) {
    super()
    this.el = el
  }

  onCreate() {
    super.onCreate()
    this.append(this.el)
  }
}
