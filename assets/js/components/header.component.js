import { HTML, nFlex, nSpan } from '../libs/afrontend/index.js'
import { NoContainerLinkComponent } from './no.container.link.component.js'
import { LinkComponent } from './link.component.js'
import * as LOCAL from '../../../assets/js/utils/local.js'
import * as CONFIG from '../../../assets/js/utils/config.js'

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
    flex.append(this.getLeft())
    flex.append(this.getRight())
    return flex
  }

  getLeft() {
    const left = new nSpan()
    left.append(new LinkComponent({ text: CONFIG.NAME, href: CONFIG.PAGES.HOME }))
    return left
  }

  getRight() {
    const html = new nFlex()
    Array.from(this.props.links)
      .map(([key, value = null]) => new NoContainerLinkComponent({ text: key, href: value || this.props.subdomains[key] }))
      .map((link) => html.append(link))
    return html
  }
}
