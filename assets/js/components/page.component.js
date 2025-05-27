import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { HeaderComponent } from './header.component.js'
import { FooterComponent } from './footer.component.js'

export class PageComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
    if (this.hasHeader()) this.append(new HeaderComponent())
    this.append(this.getBodyComponent())
    if (this.hasFooter()) this.append(new FooterComponent())
  }

  setStyles() {
    this.setStyle('padding', '0.5rem')
    this.setStyle('margin', '0 auto')
  }

  getBodyComponent() {
    return new HTML()
  }

  hasHeader() { return true }

  hasFooter() { return true }
}
