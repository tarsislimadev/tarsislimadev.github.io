import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { InputFileComponent } from '../../assets/js/components/input.file.component.js'

class MyInputFileComponent extends InputFileComponent {
  onCreate() {
    super.onCreate()

    const self = this

    self.addEventListener('change', (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = ({ target: { result: content } }) => self.dispatch('filecontent', content)
        reader.readAsText(file)
      }
    })
  }
}

export class Page extends PageComponent {
  children = {
    file: new MyInputFileComponent({ label: 'Import workflow' }),
    name: new HTML(),
    nodes: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFileComponent())
    this.append(this.children.name)
    this.append(this.children.nodes)
  }

  getFileComponent() {
    this.children.file.addEventListener('filecontent', ({ value: content }) => this.onUpdateWorlflows(JSON.parse(content)))
    return this.children.file
  }

  onUpdateWorlflows(workflow) {
    this.children.file.clear()
    this.children.name.setText(workflow.name)
    this.children.nodes.setText(workflow.nodes.map(({ type }) => type).join(' | '))
  }
}
