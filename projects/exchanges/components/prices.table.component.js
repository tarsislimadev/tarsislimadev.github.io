import { nTable } from '../../../assets/js/libs/afrontend/index.js'

import * as Local from '../local.js'

export class PricesTableComponent extends nTable {
  onCreate() {
    super.onCreate()
    window.addEventListener('updated_ticker_prices', () => this.onUpdatedTickerPrices())
  }

  onUpdatedTickerPrices() {
    this.clear()
    const prices = Local.read(['ticker', 'price'])
    console.log(Date.now(), prices)
  }
}
