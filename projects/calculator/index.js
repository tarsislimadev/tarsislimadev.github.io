import { HTML, nFlex } from '../../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

class TabsComponent extends HTML {
  state = {
    tabs: [],
  }

  children = {
    flex: new nFlex(),
  }

  constructor({ tabs = [] } = {}) {
    super()
    this.state.tabs = tabs
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
    this.addEventListener('change', alert)
  }

  getFlex() {
    Array.from(this.state.tabs).map((tab) => {
      const html = new HTML()
      html.setText(tab)
      html.addEventListener('click', () => this.dispatchEvent(this.createChangeEvent(tab)))
      this.children.flex.append(html)
    })
    return this.children.flex
  }

  createChangeEvent(tab) {
    const ev = new Event('change')
    ev.value = tab
    return ev
  }
}

export class Page extends PaddingComponent {
  children = {
    tabs: new TabsComponent({ tabs: ['bhaskara', 'sum'] }),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'calculator' }))
    this.append(this.getTabsComponent())
  }

  getTabsComponent() {
    this.children.tabs.addEventListener('change', ({ value }) => alert('tab: ' + value))
    return this.children.tabs
  }
}
