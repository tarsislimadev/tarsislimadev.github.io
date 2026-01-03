import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { ColumnComponent } from '../../assets/js/components/column.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { SelectComponent } from '../../assets/js/components/select.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { RowComponent } from '../../assets/js/components/row.component.js'

import { getEndpointsList, getParamsByEndpoint } from './lists/endpoints.list.js'

export class Page extends PageComponent {
  endpoint_select = new SelectComponent({ label: 'Endpoint', options: getEndpointsList() })
  inputs = new HTML()

  onCreate() {
    super.onCreate()
    this.body.append(new RowComponent([
      this.getHeaderComponent(),
      this.getBodyComponent(),
    ]))
  }

  getHeaderComponent() {
    return new LinkComponent({
      text: 'Financial Times REST API',
      href: 'https://markets.ft.com/research/webservices/securities/v1/docs'
    })
  }

  getBodyComponent() {
    return new ColumnComponent([
      this.getFormComponent(),
      this.getMessagesComponent()
    ])
  }

  getFormComponent() {
    return new RowComponent([
      this.getEndpointInputComponent(),
      this.getInputsComponent(),
      this.getSendButtonComponent(),
    ])
  }

  getEndpointInputComponent() {
    return this.endpoint_select
  }

  getInputsComponent() {
    this.endpoint_select.addEventListener('change', () => {
      this.inputs.clear()
      getParamsByEndpoint(this.endpoint_select.getValue()).map(param => {
        this.inputs.append(getInputComponent(param))
      })
    })
    return this.inputs
  }

  getSendButtonComponent() {
    return new ButtonComponent({
      text: 'send',
      onclick: () => this.onSendButtonClick()
    })
  }

  onSendButtonClick() {
    alert('Send button clicked')
  }

  getMessagesComponent() {
    return new HTML()
  }
}
