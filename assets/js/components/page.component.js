import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { HeaderComponent } from './header.component.js'
import { FooterComponent } from './footer.component.js'

export class PageComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getHeaderComponent())
    this.append(this.getBodyComponent())
    this.append(this.getFooterComponent())
  }

  setStyles() {
    this.setStyle('padding', '0.5rem')
    this.setStyle('margin', '0 auto')
  }

  getHeaderComponent() {
    return new HeaderComponent()
  }

  getBodyComponent() {
    return new HTML()
  }

  getFooterComponent() {
    return new FooterComponent()
  }

}
