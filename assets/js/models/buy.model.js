import { Model } from './model.js'
import { PriceModel } from './price.model.js'

export class BuyModel extends Model {
  price = new PriceModel()
  amount = 1

  constructor(price = new PriceModel(), amount = 1) {
    super()
    this.price = price
    this.amount = amount
  }

  get total() { return this.price.getPrice() * this.amount }

  toJSON() {
    const { price, amount } = this
    return { price, amount }
  }

  fromJSON(buy = { price: { datetime: new Date(), price: 0, symbol: '' }, amount: 1 }) {
    const price = new PriceModel()
    this.price = price.fromJSON(buy.price)
    this.amount = buy.amount
    return this
  }
}
