import { Model } from '../../../assets/js/models/model.js'
import { PriceModel } from '../../../assets/js/models/price.model.js'
import { datetime2str } from '../../../assets/js/utils/str.js'

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

  get datetime_string() { return datetime2str(this.datetime) }

  toJSON() {
    const { price, amount, datetime_string } = this
    return { price, amount, datetime: datetime_string }
  }

  fromJSON(buy = { price: { datetime: new Date(), price: 0, symbol: '' }, amount: 1, datetime: new Date() }) {
    this.datetime = new Date(buy.datetime)
    this.price = new PriceModel().fromJSON(buy.price)
    this.amount = buy.amount
    return this
  }
}
