import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { FormComponent } from './components/form.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'

export class Page extends PageComponent {
  form = new FormComponent()
  results = new HTML()

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'news rest api' }))
    this.append(this.getForm())
    this.append(this.getResultsHTML())
  }

  getForm() {
    this.form.addEventListener('result', ({ value }) => console.log({ value }))
    this.form.addEventListener('error', ({ value: error }) => console.error(error))
    return this.form
  }

  getResultsHTML() {
    return this.results
  }
}
