import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { SelectComponent } from './components/select.component.js'
import { InputsComponent } from './components/inputs.component.js'

class FormComponent extends HTML {
  endpoints = new SelectComponent()
  values = new InputsComponent()
}

class MessagesComponent extends HTML { }

export class Page extends PageComponent {
  link = new LinkComponent({
    text: 'elevenlabs rest api',
    href: 'https://elevenlabs.io/docs/overview'
  })
  form = new FormComponent()
  messages = new MessagesComponent()

  onCreate() {
    super.onCreate()
    this.append(this.link)
    this.append(new TwoColumnsComponent({
      html1: this.form,
      html2: this.messages,
    }))
  }
}
