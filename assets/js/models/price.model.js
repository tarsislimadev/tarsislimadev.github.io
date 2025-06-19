import { Model } from './model.js'
import { interval2str, padLeft, price2string } from '../utils/str.js'

class DiffModel extends Model {
  price1 = new PriceModel()
  price2 = new PriceModel()

  constructor(price1 = new PriceModel(), price2 = new PriceModel()) {
    super()
    this.price1 = price1
    this.price2 = price2
  }

  getPrice() { return +this.price2.price - +this.price1.price }

  getPriceString() { return price2string(this.getPrice(), 'R$') }

  getPercentage() { return (1 - (+this.price2.price / +this.price1.price)).toFixed(6) }

  getPercentageString() { return this.getPercentage() + '%' }

  getInterval() { return +this.price2.datetime - +this.price1.datetime }

  getIntervalString() { return interval2str(this.getInterval()) }

  toJSON() {
    const { price1, price2 } = this
    return { price1, price2 }
  }
}

export class PriceModel extends Model {
  datetime = new Date()
  symbol = ''
  price = 0

  constructor(symbol, price = 0) {
    super()
    this.symbol = symbol
    this.price = price
  }

  getDiff(price = new PriceModel()) { return new DiffModel(this, price) }

  getSymbol() { return this.symbol }

  getPrice() { return +this.price }

  getPriceString() { return price2string(this.getPrice(), 'R$') }

  getDatetimeString() {
    const date = new Date(this.datetime)

    const month = date.getMonth() + 1
    const day = date.getDay()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return [
      [month, day].map((a) => padLeft(a, '0', 2)).join('/'),
      [hours, minutes].map((b) => padLeft(b, '0', 2)).join(':')
    ].join(' ')
  }

  toJSON() {
    const { datetime, symbol, price } = this
    return { datetime, symbol, price }
  }

  fromJSON(price = { datetime: new Date(), price: 0, symbol: '' }) {
    this.datetime = price.datetime ? new Date(price.datetime) : null
    this.symbol = price.symbol
    this.price = price.price
    return this
  }
}
