import { BinanceBuyModel } from '../models/binance.buy.model.js'
import * as Local from '../../../assets/js/utils/local.js'
import { PriceModel } from '../../../assets/js/models/price.model.js'

export class BinanceLocal {
  static getBuys() {
    return Local.get(['binance.buys'], [])
      .map((b) => {
        const buy = new BinanceBuyModel()
        buy.fromJSON(b)
        return buy
      })
  }

  static getPrices() {
    return Local.get(['binance.prices'])
      .map((b) => {
        const price = new PriceModel()
        price.fromJSON(b)
        return price
      })
  }

  static getPriceBySymbol(symbol) {
    return BinanceLocal.getPrices().find((p) => p.symbol == symbol)
  }
}
