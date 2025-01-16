import { HTML } from '../libs/afrontend/index.js'
import { HeaderComponent } from './header.component.js'
import { FooterComponent } from './footer.component.js'

export class PaddingComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(new HeaderComponent())
    this.onCreate2()
    this.append(new FooterComponent())
  }

  setStyles() {
    this.setStyles('padding', 'calc(1rem / 4)')
    this.setStyle('margin', '0 auto')
  }

  onCreate2() { }

}
