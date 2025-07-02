import { HTML } from '../libs/afrontend/index.js'

export class Element extends HTML {
  constructor({ children = [], attrs = [], styles = {}, container_styles = {}, events = {} } = {}) {
    super()
    Array.from(children).map(c => this.append(c))
    Array.from(attrs).map((a) => this.setAttr(a, attrs[a]))
    Object.keys(styles).map(s => this.setStyle(s, styles[s]))
    Object.keys(container_styles).map(s => this.setContainerStyle(s, container_styles[s]))
    Object.keys(events).map((e) => this.addEventListener(e, events[e]))
  }
}
