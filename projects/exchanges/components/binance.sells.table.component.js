import { PriceModel } from '../../../assets/js/models/price.model.js'
import { BinanceSellModel } from '../models/binance.sell.model.js'
import { BinanceBuyModel } from '../models/binance.buy.model.js'

import { TableLineComponent } from '../../../assets/js/components/table.line.component.js'
import { TableComponent } from '../../../assets/js/components/table.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

import * as Local from '../../../assets/js/utils/local.js'

export class BinanceSellsTableComponent extends TableComponent {
  onCreate() {
    super.onCreate()
    this.addHeaders(['symbol', 'price'])

    window.addEventListener('updatesells', () => this.update())
    this.update()
  }

  update() {
    this.body.clear()
    Local.get(['binance.sells'], []).map((s) => {
      const sell = new BinanceSellModel(new BinanceBuyModel(new PriceModel()), new PriceModel()).fromJSON(s)

      this.body.append(new TableLineComponent([
        new TextComponent({ text: sell.buy.price.getSymbol() }),
        new TextComponent({ text: sell.price.getPriceString() }),
      ]))
    })
  }
}
