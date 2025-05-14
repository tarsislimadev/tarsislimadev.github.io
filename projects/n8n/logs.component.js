import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

export class LogsComponent extends HTML {
  append(text = '') {
    this.append(new TextComponent({ text }))
    this.scrollTo(0, this.scrollHeight)
  }
}
