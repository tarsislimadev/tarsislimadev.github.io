import { HTML, nFlex, nSpan } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'

export class Page extends PageComponent {
  symbol = new InputComponent({ placeholder: 'symbol' })
  buy_quantity_input = new InputComponent({ placeholder: 'quantity', type: 'number' })
  buy_price_input = new InputComponent({ placeholder: 'price', type: 'number' })
  sell_price_input = new InputComponent({ placeholder: 'price', type: 'number' })
  gain_price = new TextComponent()
  gain_percent = new TextComponent()
  links = new HTML()

  state = {
    buy: { quantity: 0, price: 0 },
    sell: { quantity: 0, price: 0 },
    gain: '',
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'coins calculator' }))
    this.appendFlex('when', this.getSymbolInput())
    this.appendFlex('is in', this.getBuyPriceInput())
    this.appendFlex('buy', this.getBuyQuantityInput())
    this.appendFlex('sell', this.getSellPriceInput())
    this.appendFlex('we get', new HTML())
    this.appendFlex('in price', this.getGainPriceHTML())
    this.appendFlex('in percent', this.getGainPercentHTML())
    this.append(new ButtonComponent({ text: 'export', onclick: () => this.onExportButtonClick() }))
    this.append(this.links)
  }

  appendFlex(text = '', component = new HTML()) {
    const flex = new nFlex()
    flex.setStyle('margin', '1rem 0rem')
    flex.append(new TextComponent({ text }))
    flex.append(component)
    this.append(flex)
  }

  getSymbolInput() {
    return this.symbol
  }

  getBuyQuantityInput() {
    this.buy_quantity_input.addEventListener('keyup', () => this.calcGains())
    return this.buy_quantity_input
  }

  getBuyPriceInput() {
    this.buy_price_input.addEventListener('keyup', () => this.calcGains())
    return this.buy_price_input
  }

  getSellPriceInput() {
    this.sell_price_input.addEventListener('keyup', () => this.calcGains())
    return this.sell_price_input
  }

  getGainPriceHTML() {
    return this.gain_price
  }

  getGainPercentHTML() {
    return this.gain_percent
  }

  calcGains() {
    this.gain_price.setText(this.getPrice())
    this.gain_percent.setText(this.getPercent() + '%')
  }

  getPrice() {
    const sell_price = this.sell_price_input.getValue()
    const buy_quantity = this.buy_quantity_input.getValue()
    const buy_price = this.buy_price_input.getValue()
    return ((sell_price * buy_quantity / buy_price) - buy_quantity).toFixed(4)
  }

  getPercent() {
    const price = this.getPrice()
    const buy_quantity = this.buy_quantity_input.getValue()
    return (100 * price / buy_quantity).toFixed(4)
  }

  onExportButtonClick() {
    this.links.append(this.createDownloadLink(
      this.symbol.getValue(),
      this.sell_price_input.getValue(),
      this.buy_quantity_input.getValue(),
      this.buy_price_input.getValue(),
      this.getPrice(),
      this.getPercent(),
    ))
  }

  createDownloadLink(symbol, sell_price, buy_quantity, buy_price, price, percent, filename = `${Date.now()}.json`) {
    const type = 'application/json'
    const href = URL.createObjectURL(new File([new Blob([JSON.stringify({ symbol, sell_price, buy_quantity, buy_price, price, percent })], { type })], filename, { type }))
    const link = new LinkComponent({ text: filename, href })
    link.setAttr('download', filename)
    return link
  }

}
