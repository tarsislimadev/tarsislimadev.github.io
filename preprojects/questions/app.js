import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

export class Page extends PageComponent {
  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'Questions' }))
  }
}
