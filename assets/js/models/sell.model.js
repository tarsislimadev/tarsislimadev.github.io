import { Model } from './model.js'
import { BuyModel } from './buy.model.js'
import { PriceModel } from './price.model.js'

export class SellModel extends Model {
  buy = new BuyModel()
  price = new PriceModel()

  constructor(buy = new BuyModel(), price = new PriceModel()) {
    super()
    this.buy = buy
    this.price = price
  }

  toJSON() {
    const { price, buy } = this
    return { price, buy }
  }

  fromJSON(sell = { buy: { price: { price: 0, symbol: '', datetime: new Date() }, amount: 1 }, price: { price: 0, symbol: '', datetime: new Date() } }) {
    const buy = new BuyModel()
    this.buy = buy.fromJSON(sell.buy)
    const price = new PriceModel()
    this.price = price.fromJSON(sell.price)
    return this
  }
}
