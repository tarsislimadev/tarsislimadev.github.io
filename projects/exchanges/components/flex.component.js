import { nFlex } from '../../../assets/js/libs/afrontend/index.js'

export class FlexComponent extends nFlex {
  components = []

  constructor(components = []) {
    super()
    this.components = components
  }

  onCreate() {
    super.onCreate()
    this.components.map((c) => this.append(c))
  }
}
