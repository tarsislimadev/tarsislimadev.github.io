import { HTML, nTable } from '../../../assets/js/libs/afrontend/index.js'
import { BuyModel } from '../../../assets/js/models/buy.model.js'
import { SellModel } from '../../../assets/js/models/sell.model.js'

import { UpdatableTextComponent } from '../../../assets/js/components/updatable.text.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import { TableLineComponent } from './table.line.component.js'

import * as Local from '../../../assets/js/utils/local.js'
import { PriceModel } from '../../../assets/js/models/price.model.js'

export class BinanceBuysTableComponent extends nTable {
  onCreate() {
    super.onCreate()
    window.addEventListener('updatebuys', () => this.update())
    this.update()
  }

  update() {
    this.clear()
    Local.get(['binance.buys'], []).map((b) => {
      const buy = new BuyModel(new PriceModel('', 0), 1).fromJSON(b)
      const symbol = buy.price.getSymbol()

      this.append(new TableLineComponent([
        new TextComponent({ text: symbol }),
        new TextComponent({ text: buy.price.getPriceString() }),
        new UpdatableTextComponent('updateprices', () => buy.price.getDiff(this.getCurrenPrice(symbol)).getPercentageString()),
        new UpdatableTextComponent('updateprices', () => buy.price.getDiff(this.getCurrenPrice(symbol)).getPriceString()),
        new ButtonComponent({ text: 'sell', onclick: () => this.onSellButtonClick(buy) }),
      ]))
    })
  }

  onSellButtonClick(buy = new BuyModel(), current_price = new PriceModel()) {
    if (price.symbol == '') current_price = this.getCurrenPrice(buy.price.symbol)

    Local.add(['binance.sells'], new SellModel(buy, current_price))
    dispatchWindowEvent('updatesells')
  }

  getCurrenPrice(symbol = '') {
    return Local.get(['binance.prices'], [])
      .map((p) => {
        const price = new PriceModel()
        price.fromJSON(p)
        return price
      })
      .find((p) => p.symbol == symbol)
  }
}
