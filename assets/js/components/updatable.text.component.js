import { HTML } from '../../../assets/js/libs/afrontend/index.js'

export class UpdatableTextComponent extends HTML {
  name = ''
  onUpdateText = (() => { })

  constructor(name, onUpdateText = (() => { })) {
    super()
    this.name = name
    this.onUpdateText = onUpdateText
  }

  onCreate() {
    super.onCreate()
    window.addEventListener(this.name, () => this.setText(this.onUpdateText()))
  }
}
