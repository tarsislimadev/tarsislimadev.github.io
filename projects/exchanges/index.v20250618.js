import { PageComponent } from '../../assets/js/components/page.component.js'
import { UpdatableTextComponent } from '../../assets/js/components/updatable.text.component.js'
import { BinancePricesTableComponent } from './components/binance.prices.table.component.js'
import { BinanceSellsTableComponent } from './components/binance.sells.table.component.js'
import { BinanceBuysTableComponent } from './components/binance.buys.table.component.js'
import { ColumnComponent } from '../../assets/js/components/column.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'

import { getSymbolsList } from './lists/symbols.list.js'

import { dispatchWindowEvent } from '../../assets/js/utils/window.js'
import { datetime2str } from '../../assets/js/utils/str.js'
import * as Local from '../../assets/js/utils/local.js'
import * as API from '../../assets/js/utils/api.js'

import { PriceModel } from '../../assets/js/models/price.model.js'

export class Page extends PageComponent {
  onCreate() {
    super.onCreate()
    Local.set(['binance.symbols'], getSymbolsList())
    this.append(new ColumnComponent([
      new TextComponent({ text: 'exchanges' }),
      new UpdatableTextComponent('updateprices', () => datetime2str(new Date()))
    ]))
    this.append(new ColumnComponent([
      new BinancePricesTableComponent(),
      new BinanceBuysTableComponent(),
      new BinanceSellsTableComponent(),
    ]))
    this.update()
  }

  update() {
    API.rest.binance.v3.ticker.getPricesBySymbols(getSymbolsList())
      .then((prices) => Local.set(['binance.prices'], this.parsePrices(prices)))
      .then(() => dispatchWindowEvent('updateprices'))
      .finally(() => this.update())
  }

  parsePrices(prices = []) {
    return Array.from(prices)
      .map((p) => {
        const price = new PriceModel()
        price.fromJSON(p)
        return price
      })
  }
}
