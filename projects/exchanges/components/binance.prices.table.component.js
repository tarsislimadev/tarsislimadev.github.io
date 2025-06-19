import { HTML, nTable, nTr, nTd } from '../../../assets/js/libs/afrontend/index.js'

import { UpdatableTextComponent } from '../../../assets/js/components/updatable.text.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import { TableLineComponent } from './table.line.component.js'

import { dispatchWindowEvent } from '../../../assets/js/utils/window.js'

import { BuyModel } from '../../../assets/js/models/buy.model.js'

import * as Local from '../../../assets/js/utils/local.js'
import { PriceModel } from '../../../assets/js/models/price.model.js'

class TableComponent extends nTable { }

export class BinancePricesTableComponent extends TableComponent {
  onCreate() {
    super.onCreate()
    this.appendLines()
  }

  getPrices() {
    return Local.get(['binance.prices'])
      .map((p) => {
        const price = new PriceModel()
        price.fromJSON(p)
        return price
      })
  }

  getPriceBySymbol(symbol) { return this.getPrices().find((p) => p.getSymbol() == symbol) }

  getPriceStringBySymbol(symbol) { return this.getPriceBySymbol(symbol)?.getPriceString() }

  appendLines() {
    this.clear()
    Local.get(['binance.symbols']).map((symbol) => {
      this.append(new TableLineComponent([
        new TextComponent({ text: symbol }),
        new UpdatableTextComponent('updateprices', () => this.getPriceStringBySymbol(symbol)),
        new ButtonComponent({ text: 'buy', onclick: () => this.onBuyButtonClick(symbol) }),
      ]))
    })
  }

  onBuyButtonClick(symbol) {
    Local.add(['binance.buys'], new BuyModel(this.getPriceBySymbol(symbol), 100))
    dispatchWindowEvent('updatebuys')
  }

  createColumn(html = new HTML()) {
    const col = new nTd()
    col.append(html)
    return col
  }
}
