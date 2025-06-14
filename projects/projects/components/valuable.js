import { HTML, nFlex } from '../../../assets/js/libs/afrontend/index.js'

export class Valuable extends HTML {
  title = new HTML()
  value = new HTML()

  onCreate() {
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getTitle())
    flex.append(this.getValue())
    return flex
  }

  getTitleText() {
    return ''
  }

  getTitle() {
    this.title.setText(this.getTitleText())

    return this.title
  }

  getValueText(price = 0, coin = 'R$') {
    return `${coin} ${price.toFixed(2).replace('.', ',')}`
  }

  getValue() {
    this.value.setText(this.getValueText())

    return this.value
  }
}
