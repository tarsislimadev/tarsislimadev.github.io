import { BinanceMessageCardComponent } from './binance.message.card.component.js'
import { CardBodyComponent } from '../../../assets/js/components/card.body.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

import { Element } from '../../../assets/js/elements/element.js'

class CandlestickChartsElement extends Element {
  data = []

  constructor({ data = [] } = {}) {
    super({})
    this.data = data
  }

  onCreate() {
    const chart = new google.visualization.CandlestickChart(this.element)
    chart.draw(
      google.visualization.arrayToDataTable(this.data, true),
      {
        legend: 'none',
        bar: { groupWidth: '100%' }, // Remove space between bars.
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
          risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
        }
      }
    )
  }
}

export class KlinesMessageCardComponent extends BinanceMessageCardComponent {
  getBodyComponent() {
    const data = this.message.Payload.map(([
      kline_open_time,
      open_price,
      high_price,
      low_price,
      close_price
    ]) => ([
      new Date(kline_open_time),
      +low_price,
      +open_price,
      +close_price,
      +high_price,
    ]))

    const body = new CardBodyComponent()
    body.append(new CandlestickChartsElement({ data }))
    return body
  }
}
