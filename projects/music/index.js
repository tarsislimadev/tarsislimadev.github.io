import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { InputFileComponent } from '../../assets/js/components/input.file.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import * as Local from '../../assets/js/utils/local.js'

export class Page extends PaddingComponent {
  children = {
    file: new InputFileComponent({ type: '.musicxml' }),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFileComponent())
    this.append(this.getOpenFileButton())
  }

  setFile(content = '') {
    Local.set(['musicxml.content'], content)
  }

  openFile(file = new File({})) {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setFile(reader.result))
    if (file) reader.readAsText(file)
  }

  getFileComponent() {
    this.children.file.addEventListener('change', ({ target: { files: [file] } }) => this.openFile(file))
    return this.children.file
  }

  getOpenFileButton() {
    return new ButtonComponent({ text: 'open file', onclick: () => this.children.file.children.input.element.click() })
  }
}
