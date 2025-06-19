import { Model } from '../../../assets/js/models/model.js'
import { PriceModel } from '../../../assets/js/models/price.model.js'

export class BinanceBuyModel extends Model {
  datetime = new Date()
  price = new PriceModel()
  amount = 1

  constructor(price = new PriceModel(), amount = 1) {
    super()
    this.price = price
    this.amount = amount
  }

  get total() { return this.price.getPrice() * this.amount }

  get datetime_string() { return new Date(this.datetime).toJSON() }

  toJSON() {
    const { price, amount, datetime_string } = this
    return { price, amount, datetime: datetime_string }
  }

  fromJSON(buy = { price: { datetime: new Date(), price: 0, symbol: '' }, amount: 1, datetime: new Date() }) {
    this.datetime = new Date(buy.datetime)
    const price = new PriceModel()
    this.price = price.fromJSON(buy.price)
    this.amount = buy.amount
    return this
  }
}
