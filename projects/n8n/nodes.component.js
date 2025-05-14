import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ScheduleTriggerNode } from './models/scheduleTrigger.node.js'
import { Node } from './models/node.js'

export class NodesComponent extends HTML {
  nodes = [new ScheduleTriggerNode(),]

  html = new HTML()

  onCreate() {
    super.onCreate()
    this.append(this.html)
    this.update()
  }

  update() {
    this.html.clear()
    Array.from(this.nodes).map((node) => {
      this.html.append(new TextComponent({ text: node.name + ' v' + node.typeVersion }))
    })
  }

  appendNode(node = new Node()) {
    this.nodes.push(node)
    return this
  }

  removeNode(id) {
    const nodes = Array.from(this.nodes)
    delete nodes[id]
    this.nodes = Array.from(nodes)
    return this
  }
}
