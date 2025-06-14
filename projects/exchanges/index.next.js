import { HTML, nFlex } from '../../assets/js/libs/afrontend/index.js'

import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TableComponent } from '../../assets/js/components/table.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { TrComponent } from '../../assets/js/components/tr.component.js'
import { TdComponent } from '../../assets/js/components/td.component.js'

import { datetime2str, price2string, interval2str } from '../../assets/js/utils/str.js'
import { getWidth, getHeight, dispatchWindowEvent } from '../../assets/js/utils/window.js'
import * as Local from '../../assets/js/utils/local.js'

import { percent } from '../../assets/js/utils/math.js'

import { getSymbolsList } from './lists/symbols.list.js'

class Model {
  toJSON() { return {} }
}

class DiffModel extends Model {
  price1 = new PriceModel()
  price2 = new PriceModel()

  constructor(price1 = new PriceModel(), price2 = new PriceModel()) {
    super()
    this.price1 = price1
    this.price2 = price2
  }

  getValuesDiff() {
    return +this.price2.value - +this.price1.value
  }

  getValuesDiffStr() {
    return price2string(this.getValuesDiff(), 'R$')
  }

  getValuesPercent() {
    return 100 * +this.price2.value / +this.price1.value - 100
  }

  getValuesPercentStr() {
    return +this.getValuesPercent().toFixed(6) + '%'
  }

  getTimeDiff() {
    return +this.price2.time - +this.price1.time
  }

  getTimeDiffStr() {
    return interval2str(this.getTimeDiff())
  }
}

class PriceModel extends Model {
  symbol = ''
  value = 0
  time = Date.now()

  constructor(symbol, value, time = Date.now()) {
    super()
    this.symbol = symbol
    this.value = value
    this.time = time
  }

  getDiff(price = new PriceModel()) {
    return new DiffModel(this, price)
  }

  getSymbol() { return this.symbol }

  getValue() { return this.value }

  getValueStr() { return price2string(this.getValue(), 'R$') }

  getTime() { return this.time }

  getTimeStr() { return datetime2str(this.getTime()) }

  toJSON() {
    const { symbol, value, time } = this
    return { symbol, value, time }
  }
}

class BuyModel extends Model {
  price = new PriceModel()

  constructor(price = new PriceModel) {
    super()
    this.price = price
  }

  toJSON() {
    const { price } = this
    return { price: price.toJSON() }
  }
}

class SellModel extends Model {
  price = new PriceModel()
  buy = new BuyModel()

  constructor(price = new PriceModel(), buy = new BuyModel()) {
    super()
    this.price = price
    this.buy = buy
  }
}

class PriceComponent extends TrComponent {
  price = new PriceModel()

  constructor(price = new PriceModel()) {
    super()
    this.price = price
  }

  onCreate() {
    super.onCreate()
    this.append(this.getSymbolColumnComponent())
    this.append(this.getValueColumnComponent())
    this.append(this.getButtonColumnComponent())
  }

  getSymbolColumnComponent() {
    return new TdComponent({ text: this.price['symbol'] })
  }

  getValueColumnComponent() {
    return new TdComponent({ text: price2string(this.price['value'], 'R$') })
  }

  getButtonColumnComponent() {
    const td = new TdComponent()
    td.append(new ButtonComponent({
      text: 'buy',
      onclick: () => dispatchWindowEvent('buy', this.price.symbol)
    }))
    return td
  }
}

class ColumnComponent extends HTML {
  lines = []

  constructor(lines = []) {
    super()
    this.lines = lines
  }

  onCreate() {
    super.onCreate()
    this.lines.map((line = new HTML()) => this.append(line))
  }
}

export class Page extends PageComponent {
  state = {
    symbols: getSymbolsList(),
    prices: [],
  }

  prices_table = new TableComponent()
  buys_table = new TableComponent()
  sells_table = new TableComponent()

  storage = {
    getBuysModels: () => Local.get(['buys'], []).map((buy) => new BuyModel(new PriceModel(buy.price.symbol, buy.price.value, buy.price.time))),
    addBuyModel: (buy = new BuyModel(null)) => Local.add(['buys'], buy)
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new TextComponent({ text: 'exchanges' }))
    this.append(this.getFlex())
    this.updateBinancePrices()
    this.updateBuysTable()
    this.updateSellsTable()
  }

  setEvents() {
    window.addEventListener('buy', ({ value }) => this.buy(value))
  }

  getFlex() {
    const flex = (getHeight() < getWidth()) ? new nFlex() : new HTML()
    flex.append(this.getPricesTable())
    flex.append(this.getBuysTable())
    flex.append(this.getSellsTable())
    return flex
  }

  getPricesTable() {
    return new ColumnComponent([
      new TextComponent({ text: 'Prices' }),
      this.prices_table
    ])
  }

  getBuysTable() {
    return new ColumnComponent([
      new TextComponent({ text: 'Buys' }),
      this.buys_table
    ])
  }

  getSellsTable() {
    return new ColumnComponent([
      new TextComponent({ text: 'Sells' }),
      this.sells_table
    ])
  }

  updatePricesTable() {
    this.prices_table.clear()

    const tr = new TrComponent({})

    Array.from(['value', 'symbol']).map((key) => {
      tr.append(new TdComponent({ text: key }))
    })

    this.prices_table.append(tr)

    Array.from(this.state.prices).map((price) => {
      this.prices_table.append(new PriceComponent(price))
    })
  }

  getPriceBySymbol(symbol = '') {
    return Array.from(this.state.prices).find((value) => value.symbol == symbol)
  }

  buy(symbol) {
    const price = this.getPriceBySymbol(symbol)
    if (price) this.storage.addBuyModel(new BuyModel(price))
  }

  updateBuysTable() {
    this.buys_table.clear()

    const buys = this.storage.getBuysModels() // Local.get(['buys'], [])

    if (buys.length == 0) return

    const tr = new TrComponent({})

    Array.from(['symbol', 'value', 'datetime', 'price_diff', 'percent_diff'])
      .map((key) => tr.append(new TdComponent({ text: key })))

    this.buys_table.append(tr)

    Array.from(buys).map((buy) => {
      const tr = new TrComponent({})
      tr.append(this.createTdText(buy.price.symbol))
      tr.append(this.createTdText(buy.price.getValueStr()))
      tr.append(this.createTdText(buy.price.getTimeStr()))

      const price = this.getPriceBySymbol(buy.price.getSymbol())
      const diff = buy.price.getDiff(price)
      tr.append(this.createTdText(diff.getValuesDiffStr()))
      tr.append(this.createTdText(diff.getValuesPercentStr()))

      const button = new TdComponent({})
      button.append(new ButtonComponent({ text: 'sell', onclick: () => this.sell(buy.buy_datetime) }))
      tr.append(button)

      this.buys_table.append(tr)
    })
  }

  createTdText(text = '') {
    return new TdComponent({ text, styles: { 'padding': 'calc(1rem / 4)' } })
  }

  sell(datetime = Date.now()) {
    const buys = Array.from(Local.get(['buys'], []))

    const buy_index = buys.findIndex((buy) => buy.buy_datetime == datetime)

    const buy = buys[buy_index]

    buy.sell_price = this.getPriceBySymbol(buy.symbol)?.price
    buy.sell_datetime = Date.now()

    Local.set(['buys'], buys.filter((_, index) => index != buy_index))

    const sell = buy
    sell.gain = percent(buy.buy_price, sell.sell_price)
    sell.time = sell.sell_datetime - buy.buy_datetime

    Local.add(['sells'], sell)

    this.updateSellsTable()
  }

  updateSellsTable() {
    this.sells_table.clear()

    const sells = Array.from(Local.get(['sells'], []))

    if (sells.length == 0) return

    const tr = new TrComponent({})

    Array.from([
      'symbol',
      'buy_price',
      'sell_price',
      'gain',
      'time',
    ]).map((key) => tr.append(this.createTdText(key)))

    this.sells_table.append(tr)

    Array.from(sells).map((sell) => {
      const tr = new TrComponent({})
      tr.append(this.createTdText(sell['symbol']))
      tr.append(this.createTdText(price2string(sell['buy_price'], 'R$')))
      tr.append(this.createTdText(price2string(sell['sell_price'], 'R$')))
      tr.append(this.createTdText(price2string(sell['gain'])))
      tr.append(this.createTdText(interval2str(sell['time'])))
      this.sells_table.append(tr)
    })
  }

  getSymbolsList() {
    return this.state.symbols.map((s) => `"${s}"`).join(',')
  }

  updateBinancePrices() {
    fetch(`https://api4.binance.com/api/v3/ticker/price?symbols=[${this.getSymbolsList()}]`)
      .then((res) => res.json())
      .then((values) => values.map(({ symbol, price }) => new PriceModel(symbol, +price)))
      .then((values) => this.state.prices = values)
      .then(() => this.updatePricesTable())
      .then(() => this.updateBuysTable())
      .then(() => this.updateBinancePrices())
  }
}
