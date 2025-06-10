import { PageComponent } from '../../assets/js/components/page.component.js'

import { BinanceSpotApiV3 } from '../../assets/js/apis/binance.js'

import { FlexComponent } from './components/flex.component.js'
import { PricesTableComponent } from './components/prices.table.component.js'
import { BuysTableComponent } from './components/buys.table.component.js'
import { SellsTableComponent } from './components/sells.table.component.js'

import { dispatchWindowEvent } from '../../assets/js/utils/window.js'

import * as Local from './local.js'

export class Page extends PageComponent {
  flex = new FlexComponent([
    new PricesTableComponent(),
    new BuysTableComponent(),
    new SellsTableComponent(),
  ])

  onCreate() {
    super.onCreate()
    this.append(this.flex)
    this.updatePrices()
  }

  updatePrices(symbol = 'BTCBRL') {
    BinanceSpotApiV3.getTickerPrice({ symbols: [symbol] })
      .then((json) => Local.write(['ticker', 'price'], json))
      .then(() => dispatchWindowEvent('updated_ticker_prices'))
      .finally(() => this.updatePrices(symbol))
  }
}
