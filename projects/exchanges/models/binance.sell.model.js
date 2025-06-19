import { Model } from '../../../assets/js/models/model.js'
import { BinanceBuyModel } from './binance.buy.model.js'
import { PriceModel } from '../../../assets/js/models/price.model.js'

export class BinanceSellModel extends Model {
  datetime = new Date()
  buy = new BinanceBuyModel()
  price = new PriceModel()

  constructor(buy = new BinanceBuyModel(), price = new PriceModel()) {
    super()
    this.buy = buy
    this.price = price
  }

  toJSON() {
    const { price, buy, datetime } = this
    return { price, buy, datetime }
  }

  fromJSON(sell = { buy: { price: { price: 0, symbol: '', datetime: new Date() }, amount: 1 }, price: { price: 0, symbol: '', datetime: new Date() } }) {
    const buy = new BinanceBuyModel()
    this.buy = buy.fromJSON(sell.buy)
    const price = new PriceModel()
    this.price = price.fromJSON(sell.price)
    return this
  }
}
