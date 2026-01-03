import { HTML, nLink, nFlex } from '../../assets/js/libs/afrontend/index.js'

import { RowComponent } from '../../../../assets/js/components/row.component.js'

class LogoComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyle('padding', '1rem 0rem')
    const link = new nLink()
    link.setText('RH')
    link.href('/')
    this.append(link)
  }
}

class MenuComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyle('padding', '1rem 0rem')
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
  onCreate() {
    super.onCreate()
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
    this.append(new RowComponent([new LogoComponent(), new MenuComponent()]))
  }
}
