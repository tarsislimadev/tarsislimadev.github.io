import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { TextComponent } from './text.component.js'

export class TitleComponent extends TextComponent {
  onCreate() {
    super.onCreate()
    this.setStyles()
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }
}
