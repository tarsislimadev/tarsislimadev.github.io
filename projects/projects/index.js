import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { Head } from './components/head.js'
import { Body } from './components/body.js'

export class Page extends PageComponent {
  children = {
    header: new Head(),
    body: new Body(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getHeader())
    this.append(this.getBody())
  }

  getHeader() {
    this.children.header.addEventListener('createproject', () => this.children.body.dispatch('createproject'))

    return this.children.header
  }

  getBody() {
    return this.children.body
  }
}
