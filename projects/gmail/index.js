import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'

export class Page extends PageComponent {
  onCreate() {
    super.onCreate()
    this.append(new TextComponent('Gmail API'))
    this.append(new TwoColumnsComponent({
      html1: new TextComponent('Left Column'),
      html2: new TextComponent('Right Column'),
    }))
  }
}
