import { HTML, nTable } from '../../../assets/js/libs/afrontend/index.js'
import { BinanceBuyModel } from '../models/binance.buy.model.js'

import { UpdatableTextComponent } from '../../../assets/js/components/updatable.text.component.js'
import { TableLineComponent } from '../../../assets/js/components/table.line.component.js'
import { ButtonComponent } from '../../../assets/js/components/button.component.js'
import { TableComponent } from '../../../assets/js/components/table.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

import { dispatchWindowEvent } from '../../../assets/js/utils/window.js'
import * as Local from '../../../assets/js/utils/local.js'

import { BinanceLocal } from '../local/binance.local.js'
import { BinanceSellModel } from '../models/binance.sell.model.js'


export class BinanceBuysTableComponent extends TableComponent {
  onCreate() {
    super.onCreate()
    this.setEvents()
    this.addHeaders(['symbol', 'price', 'datetime', 'percent', 'absolute', 'sell',])
    this.update()
  }

  setEvents() { window.addEventListener('updatebuys', () => this.update()) }

  update() {
    this.body.clear()
    BinanceLocal.getBuys().map((buy = new BinanceBuyModel()) => {
      const symbol = buy.price.getSymbol()

      this.body.append(new TableLineComponent([
        new TextComponent({ text: symbol }),
        new TextComponent({ text: buy.price.getPriceString() }),
        new TextComponent({ text: buy.datetime_string }),
        new UpdatableTextComponent('updateprices', () => buy.price.getDiff(BinanceLocal.getPriceBySymbol(symbol)).getPercentageString()),
        new UpdatableTextComponent('updateprices', () => buy.price.getDiff(BinanceLocal.getPriceBySymbol(symbol)).getPriceString()),
        new ButtonComponent({ text: 'sell', onclick: () => this.onSellButtonClick(buy) }),
      ]))
    })
  }

  onSellButtonClick(buy = new BinanceBuyModel()) {
    console.log({ buy })

    const current_price = BinanceLocal.getPriceBySymbol(buy.price.symbol)

    Local.set(['binance.buys'], BinanceLocal.getBuys().filter((b) => b.price.datetime != buy.price.datetime))

    Local.add(['binance.sells'], new BinanceSellModel(buy, current_price))

    dispatchWindowEvent('updatebuys')
    dispatchWindowEvent('updatesells')
  }
}
