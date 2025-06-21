import { BinanceBuyModel } from '../models/binance.buy.model.js'
import * as Local from '../../../assets/js/utils/local.js'
import { PriceModel } from '../../../assets/js/models/price.model.js'

export class BinanceLocal {
  static getBuys() {
    return Local.get(['binance.buys'], [])
      .map((b) => new BinanceBuyModel().fromJSON(b))
  }

  static getPrices() {
    return Local.get(['binance.prices'])
      .map((b) => new PriceModel().fromJSON(b))
  }

  static getPriceBySymbol(symbol) {
    return BinanceLocal.getPrices().find((p) => p.getSymbol() == symbol)
  }

  static addBuy(buy = new BinanceBuyModel()) {
    Local.add(['binance.buys'], buy)
  }
}
