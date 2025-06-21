import { HTML, nTable, nTr, nTd } from '../../../assets/js/libs/afrontend/index.js'

import { UpdatableTextComponent } from '../../../assets/js/components/updatable.text.component.js'
import { TableLineComponent } from '../../../assets/js/components/table.line.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { TableComponent } from '../../../assets/js/components/table.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

import { dispatchWindowEvent } from '../../../assets/js/utils/window.js'
import * as Local from '../../../assets/js/utils/local.js'

import { BinanceBuyModel } from '../models/binance.buy.model.js'

import { BinanceLocal } from '../local/binance.local.js'

export class BinancePricesTableComponent extends TableComponent {
  constructor() { super([], ['symbol', 'price', 'buy']) }

  onCreate() {
    super.onCreate()
    this.addHeaders(['symbol', 'price', 'buy'])
    this.appendLines()
  }

  appendLines() {
    this.body.clear()
    Local.get(['binance.symbols']).map((symbol) => {
      this.body.append(new TableLineComponent([
        new TextComponent({ text: symbol }),
        new UpdatableTextComponent('updateprices', () => BinanceLocal.getPriceBySymbol(symbol)?.getPriceString()),
        new ButtonComponent({ text: 'buy', onclick: () => this.onBuyButtonClick(symbol) }),
      ]))
    })
  }

  onBuyButtonClick(symbol) {
    BinanceLocal.addBuy(new BinanceBuyModel(BinanceLocal.getPriceBySymbol(symbol), 100))
    dispatchWindowEvent('updatebuys')
  }
}
