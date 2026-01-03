import { HTML, nH1, nFlex } from '../../../assets/js/libs/afrontend/index.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import { getIntervalList } from '../utils/lists/interval.list.js'
import { getQuantityList } from '../utils/lists/quantity.list.js'
import { getSymbolList } from '../utils/lists/symbol.list.js'

export class FormComponent extends HTML {
  quantity = new SelectComponent({ label: 'quantity' })
  symbol = new SelectComponent({ label: 'symbol' })
  interval = new SelectComponent({ label: 'interval' })

  onCreate() {
    super.onCreate()
    this.append(this.getMenu())
  }

  getSymbol() {
    return this.symbol.getValue()
  }

  getMenu() {
    const menu = new HTML()
    menu.append(this.getSymbolSelect())
    menu.append(this.getIntervalSelect())
    menu.append(this.getQuantitySelect())
    return menu
  }

  getSymbolSelect() {
    getSymbolList().map((symbol) => this.symbol.addOption(symbol, symbol))
    this.symbol.addEventListener('change', () => this.update())
    return this.symbol
  }

  getIntervalSelect() {
    getIntervalList().map((interval) => this.interval.addOption(interval, interval))
    this.interval.addEventListener('change', () => this.update())
    return this.interval
  }

  getQuantitySelect() {
    getQuantityList().map((quantity) => this.quantity.addOption(quantity, quantity))
    this.quantity.addEventListener('change', () => this.update())
    return this.quantity
  }

  getQuantity() {
    return this.quantity.getValue()
  }

  update() {
    this.dispatch('update', {
      quantity: this.quantity.getValue(),
      symbol: this.symbol.getValue(),
      interval: this.interval.getValue(),
    })
  }
}
