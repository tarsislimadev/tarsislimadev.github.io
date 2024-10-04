import { HTML } from './assets/js/libs/frontend/index.js'
import { TextComponent } from './assets/js/components/text.component.js'

export class HeaderComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    return new TextComponent({ text: 'header' }) // FIXME
  }
}

export class FooterComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    return new TextComponent({ text: 'footer' }) // FIXME
  }
}

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent())
    this.onBodyCreate()
    this.append(new FooterComponent())
  }

  onBodyCreate() {
    this.append(new TextComponent({ text: 'tarsis lima' }))
  }
}
