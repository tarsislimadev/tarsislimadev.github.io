import { HTML, nTable } from '../../../assets/js/libs/afrontend/index.js'
import { BuyModel } from '../../../assets/js/models/buy.model.js'
import { SellModel } from '../../../assets/js/models/sell.model.js'

import { TextComponent } from '../../../assets/js/components/text.component.js'
import { TableLineComponent } from './table.line.component.js'

import * as Local from '../../../assets/js/utils/local.js'
import { PriceModel } from '../../../assets/js/models/price.model.js'

export class BinanceSellsTableComponent extends nTable {
  onCreate() {
    super.onCreate()
    window.addEventListener('updatesells', () => this.update())
    this.update()
  }

  update() {
    this.clear()
    Local.get(['binance.sells'], []).map((s) => {
      const sell = new SellModel(new BuyModel(new PriceModel()), new PriceModel()).fromJSON(s)

      const symbol = sell.buy.price.getSymbol()

      this.append(new TableLineComponent([
        new TextComponent({ text: symbol }),
        new TextComponent({ text: sell.price.getPriceString() }),
      ]))
    })
  }
}
