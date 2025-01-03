import { HTML } from '../../assets/js/libs/afrontend/index.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getMenu())
  }

  getMenu() {
    const html = new HTML()
    html.setText('menu')
    return html
  }

}
