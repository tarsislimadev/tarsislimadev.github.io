import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputFileComponent } from '../../assets/js/components/input.file.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

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
    texts: new HTML(),
    run: new ButtonComponent({ text: 'start', onclick: () => this.onStartButtonClick() }),
    stop: new ButtonComponent({ text: 'stop', onclick: () => this.onStopButtonClick() }),
  }

  state = {
    worker: new Worker('./worker.js'),
  }

  onStartButtonClick() {
    this.children.texts.append(new TextComponent({ text: 'run' }))
    this.postMessage({ message: 'run' })
  }

  onStopButtonClick() {
    this.children.texts.append(new TextComponent({ text: 'stop' }))
    this.postMessage({ message: 'stop' })
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFileComponent())
    //
    this.append(this.children.run)
    this.append(this.children.stop)
    this.append(this.children.texts)
    //
    this.append(this.children.name)
    this.append(this.children.nodes)
    this.setWorker()
  }

  postMessage({ message } = {}) {
    this.state.worker.postMessage(JSON.stringify({ message }))
  }

  setWorker() {
    this.state.worker.addEventListener('message', ({ data }) => this.onWorkerMessage(data))
  }

  onWorkerMessage(message) {
    this.children.texts.append(new TextComponent({ text: message }))
    Notification.requestPermission()
      .then(() => new Notification('n8n', { body: message }))
      .catch((err) => this.children.texts.append(new TextComponent({ text: message })))
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
