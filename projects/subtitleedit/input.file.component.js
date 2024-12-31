import { HTML } from '../../assets/js/libs/afrontend/index.js'

export class InputFileComponent extends HTML {
  
  getName() { return 'input' }
  
  getTagName() { return 'input' }

  onCreate() {
    super.onCreate()
    this.setAttr('type', 'file')
  }
}
