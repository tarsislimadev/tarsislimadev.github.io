import { HTML } from '../../assets/js/libs/frontend/index.js'

export class InputFileComponent extends HTML {
  
  getName() { return 'input' }
  
  getTagName() { return 'input' }

  onCreate() {
    super.onCreate()
    this.setAttr('type', 'file')
  }
}
