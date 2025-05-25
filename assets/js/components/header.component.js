import { HTML, nFlex } from '../libs/afrontend/index.js'
import { LinkComponent } from './link.component.js'
import * as LOCAL from '../../../assets/js/utils/local.js'

export class HeaderComponent extends HTML {
  props = {
    subdomains: {
      products: 'https://loja.tarsislima.com/',
    },
    links: Array.from([
      ['products'],
      ['projects', '/projects/',],
      ['github', '/pages/github/',],
      ['linkedin', '/pages/linkedin/',],
      ['youtube', '/pages/youtube/',],
      LOCAL.get(['access_token']) ? ['logout', '/pages/logout/'] : ['login', '/pages/login/'],
    ])
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(new LinkComponent({ text: 'tarsis lima', href: '/?' + Date.now() }))
    flex.append(this.getRight())
    return flex
  }

  getRight() {
    const html = new nFlex()
    Array.from(this.props.links)
      .map(([key, value = null]) => new LinkComponent({ text: key, href: value || this.props.subdomains[key] }))
      .map((link) => link.setContainerStyle('margin-left', 'calc(1rem / 4)'))
      .map((link) => html.append(link))
    return html
  }
}
