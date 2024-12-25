import { HTML, nLink, nFlex } from '@brtmvdl/frontend'

class LogoComponent extends HTML {
  onCreate() {
    super.onCreate()
    const link = new nLink()
    link.setText('RH')
    link.href('/')
    this.append(link)
  }
}

class MenuComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.createLink('publish a job', '/publish/'))
  }

  createLink(text = '', href = '') {
    const link = new nLink()
    link.setText(text)
    link.href(href)
    this.append(link)
  }
}

export class TopComponent extends HTML {
  children = {
    logo: new LogoComponent(),
    menu: new MenuComponent(),
  }

  onCreate() {
    super.onCreate()
    const flex = new nFlex()
    flex.setStyle('margin', '0 auto')
    flex.setStyle('width', '40rem')
    flex.append(this.getLogo())
    flex.append(this.getMenu())
    this.append(flex)
  }

  getLogo() {
    this.children.logo.setStyle('padding', '1rem 0rem')

    return this.children.logo
  }

  getMenu() {
    this.children.menu.setStyle('padding', '1rem 0rem')

    return this.children.menu
  }
}
