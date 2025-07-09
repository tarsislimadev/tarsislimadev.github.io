import { Element } from '../../assets/js/elements/element.js'
import { TextButtonElement } from '../../assets/js/elements/text.button.element.js'
import { SelectElement } from '../../assets/js/elements/select.element.js'

import * as API from '../../assets/js/utils/api.js'

import { getSymbolsList } from './lists/symbols.list.js'

class ErrorElement extends Element {
  constructor() { super({ styles: { color: 'red' } }) }
}

export class Page extends Element {
  state = {
    running: false,
    prices: [],
  }

  button = new TextButtonElement({
    text: 'start',
    onclick: () => this.onButtonClick(),
    styles: { 'background-color': '#00cc00', 'color': '#ffffff', 'border': 'none' }
  })

  select = new SelectElement({
    options: this.getSymbolsList(),
    styles: { 'padding': '1rem' }
  })

  pair_price = new Element()

  pair_medium = new Element()

  buy_a_percent = new Element()

  error = new ErrorElement()

  constructor() {
    super({ styles: { margin: '0rem auto', width: '100%' } })
    this.append(this.select)
    this.append(this.button)
    this.append(this.pair_price)
    this.append(this.pair_medium)
    this.append(this.buy_a_percent)
    this.append(this.error)
  }

  onButtonClick() {
    if (this.button.getText() == 'start') {
      this.button.setStyle('background-color', '#cc0000')
      this.button.setText('stop')
      this.state.running = true
      this.updatePairPrice()
    } else {
      this.button.setStyle('background-color', '#00cc00')
      this.button.setText('start')
      this.state.running = false
      this.pair_price.setText('')
    }
  }

  getSymbolsList() {
    return getSymbolsList().map((pair) => ([pair, pair]))
  }

  updatePairPrice() {
    if (this.state.running) {
      API.rest.binance.v3.ticker.getPricesBySymbols([this.select.getValue()])
        .then(([{ price }]) => this.state.prices.push(+price))
        .then(() => this.pair_price.setText(this.getPriceString()))
        .then(() => this.pair_medium.setText(this.getMediumString()))
        .then(() => this.buy_a_percent.setText(this.isPriceLessThanAPercent()))
        .catch(console.error)
        .finally(() => this.updatePairPrice())
        .finally(() => console.log('length', this.state.prices.length))
    }
  }

  getPrice() {
    return +this.state.prices[this.state.prices.length - 1]
  }

  getPriceString(price = this.getPrice()) {
    return this.state.prices.length > 100 ? ('price: ' + price.toString()) : 'loading...'
  }

  getMedium() {
    return (this.state.prices.reduce((s, p) => s + p, 0) / this.state.prices.length)
  }

  getMediumString() {
    return this.getMedium()
      .toFixed(8)
      .toString()
      .replace(/000000.+/g, '')
      .replace(/(.)999999.+/g, (_, n) => n + 1)
  }

  isPriceLessThanAPercent() {
    return this.getPrice() < (this.getMedium() / 1.011)
  }
}
