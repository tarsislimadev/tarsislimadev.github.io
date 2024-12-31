import { HTML } from '../../../assets/js/libs/afrontend/index.js'

export class TdComponent extends HTML {
  getTagName() { return 'td' }

  hasContainer() { return false }

  children = { component: new HTML() }

  constructor(component = new HTML()) {
    super()
    this.children.component = component
  }

  onCreate() {
    super.onCreate()
    this.append(this.children.component)
  }
}
