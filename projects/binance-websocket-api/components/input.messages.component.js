import { BinanceMessageCardComponent } from './binance.message.card.component.js'
import { CardBodyComponent } from '../../../assets/js/components/card.body.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

export class KlinesMessageCardComponent extends BinanceMessageCardComponent {
  getBodyComponent() {
    const body = new CardBodyComponent()
    body.append(new TextComponent({ text: 'klines' }))
    return body
  }
}
