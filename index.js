import { HTML } from './assets/js/libs/afrontend/index.js'
import { TextComponent } from './assets/js/components/text.component.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'projects' }))
  }
}
