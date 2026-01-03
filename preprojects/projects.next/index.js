import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { HeaderHTML } from './components/header.html.js'
import { BodyHTML } from './components/body.html.js'
import { FooterHTML } from './components/footer.html.js'

export class Page extends HTML {
  header = new HeaderHTML()
  body = new BodyHTML()
  footer = new FooterHTML()

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getHeader())
    this.append(this.getBody())
    this.append(this.getFooter())
  }

  setStyles() {
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
  }

  getHeader() {
    this.header.addEventListener('createproject', () => this.body.dispatch('createproject'))
    return this.header
  }

  getBody() {
    this.body.addEventListener('update', () => this.footer.dispatch('update'))
    return this.body
  }

  getFooter() {
    return this.footer
  }
}
