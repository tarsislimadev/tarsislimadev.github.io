import { HTML } from '../../../assets/js/libs/afrontend/index.js'

export class TdComponent extends HTML {
  getTagName() { return 'td' }

  hasContainer() { return false }

  component = new HTML()

  constructor(component = new HTML()) {
    super()
    this.component = component
  }

  onCreate() {
    super.onCreate()
    this.append(this.component)
  }
}
