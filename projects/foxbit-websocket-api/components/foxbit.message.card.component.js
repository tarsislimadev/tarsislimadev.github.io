import { MessageCardComponent } from '../../../assets/js/components/message.card.component.js'
import { CardBodyComponent } from '../../../assets/js/components/card.body.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

export class FoxbitMessageCardComponent extends MessageCardComponent {
  getBodyComponent() {
    const card = new CardBodyComponent()
    card.append(new TextComponent({ text: JSON.stringify(this.message.asJSON()) }))
    return card
  }
  
  createEndpointBodyComponent() {
    const card = new CardBodyComponent()
    card.append(new TextComponent({ text: this.message.Endpoint }))
    return card
  }
}

export class EndpointMessageCardComponent extends FoxbitMessageCardComponent {
  getBodyComponent() {
    const body = new CardBodyComponent()
    body.append(new TextComponent({ text: this.message.Endpoint }))
    return body
  }
}

export class PayloadTableMessageCardComponent extends FoxbitMessageCardComponent {
  getBodyComponent() {
    const body = new CardBodyComponent()
    body.append(this.getTableHTML(this.message.Payload))
    return body
  }
}
