import { HTML, nFlex } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'

import { LogsComponent } from './logs.component.js'
import { NodesComponent } from './nodes.component.js'
import { nodes, getNodeByTypeId } from './functions/index.js'

export class Page extends PageComponent {
  nodes = new NodesComponent()
  logs = new LogsComponent()

  onCreate() {
    super.onCreate()
    this.append(new TwoColumnsComponent({ html1: this.getLeft(), html2: this.getRight() }))
    this.setEvents()
  }

  getLeft() {
    const html = new HTML()
    html.append(this.getNodesList())
    html.append(this.getButtons())
    return html
  }

  getNodesList() {
    const list = new HTML()
    list.append(new TextComponent({ text: 'Add New Nodes' }))
    Array.from(Object.keys(nodes)).map((type) => {
      const node = getNodeByTypeId(type)
      const button = new ButtonComponent({ text: node.name, onclick: () => this.dispatch('addnode', node.type) })
      list.append(button)
    })
    return list
  }

  getButtons() {
    const buttons = new nFlex()
    buttons.append(new ButtonComponent({ text: 'Start', onclick: () => console.log('start') }))
    buttons.append(new ButtonComponent({ text: 'Stop', onclick: () => console.log('stop') }))
    return buttons
  }

  getRight() {
    const html = new HTML()
    html.append(this.nodes)
    html.append(this.logs)
    return html
  }

  setEvents() {
    this.addEventListener('addnode', ({ value }) => this.onAddNode(value))
  }

  onAddNode(value) {
    this.nodes.appendNode(getNodeByTypeId(value))
    this.nodes.update()
  }
}
