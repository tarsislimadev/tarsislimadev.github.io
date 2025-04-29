import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PaddingComponent } from '../../assets/js/components/padding.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { SelectComponent } from './components/select.component.js'
import { InputsComponent } from './components/inputs.component.js'

class FormComponent extends HTML {
  children = {
    endpoints: new SelectComponent(),
    values: new InputsComponent(),
  }

  onCreate() {
    super.onCreate()
  }
}

class MessagesComponent extends HTML {
}

export class Page extends PaddingComponent {
  children = {
    form: new FormComponent(),
    messages: new MessagesComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(new LinkComponent({
      text: 'elevenlabs rest api',
      href: 'https://elevenlabs.io/docs/overview'
    }))
    this.append(new TwoColumnsComponent({
      html1: this.getFormComponent(),
      html2: this.getMessagesComponent()
    }))
  }

  getFormComponent() {
    return new HTML()
  }

  getMessagesComponent() {
    return new HTML()
  }
}
