import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { Head } from './components/head.js'
import { Body } from './components/body.js'

export class Page extends PageComponent {
  header = new Head()
  body = new Body()

  onCreate() {
    super.onCreate()
    this.header.addEventListener('createproject', () => this.body.dispatch('createproject'))
    this.append(this.header)
    this.append(this.body)
  }
}
