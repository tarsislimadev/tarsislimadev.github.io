import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ChartsComponent } from './components/charts.component.js'
import { MovesComponent } from './components/moves.component.js'
import { FormComponent } from './components/form.component.js'
import * as Local from '../../assets/js/utils/local.js'

export class Page extends PageComponent {
  form = new FormComponent()
  charts = new ChartsComponent()
  moves = new MovesComponent()

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(new TextComponent({ text: 'candlesticks' }))
    this.append(new TwoColumnsComponent({ html1: this.getLeft(), html2: this.getRight(), }))
  }

  setEvents() {
    this.addEventListener('update', () => this.moves.dispatch('update'))
    this.form.addEventListener('update', ({ value: data }) => this.update({ form: data }))
    this.moves.addEventListener('buy', () => this.saveMove({ side: 'buy' }))
    this.moves.addEventListener('sell', () => this.saveMove({ side: 'sell' }))
  }

  getLeft() {
    return this.getForm()
  }

  getForm() {
    return this.form
  }

  getRight() {
    const html = new HTML()
    html.append(this.getChartsComponent())
    html.append(this.getMovesComponent())
    return html
  }

  getChartsComponent() {
    return this.charts
  }

  getMovesComponent() {
    return this.moves
  }

  saveMove(params = {}) {
    Local.add(['orders'], {
      symbol: this.form.getSymbol(),
      type: 'LIMIT',
      quantity: this.form.getQuantity(),
      price: this.charts.getPrice(),
      timeInForce: 'GTC',
      timestamp: Date.now(),
      ...params
    })
    this.dispatch('update')
  }

  update(data = {}) {
    this.form.dispatch('input', data)
    this.charts.dispatch('input', data)
  }
}
