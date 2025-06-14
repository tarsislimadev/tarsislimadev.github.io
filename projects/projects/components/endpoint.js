import { HTML, nFlex, nInputNumber, nInputText } from '../../../assets/js/libs/afrontend/index.js'

import { EndPointModel } from '../models/endpoint.js'

export class EndPoint extends HTML {
  state = {
    path: '/',
    hours: 0,
  }

  path = new nInputText()
  hours = new nInputNumber()
  delButton = new HTML()

  constructor(state = new EndPointModel()) {
    super()

    this.state = state
  }

  onCreate() {
    this.setStyles()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getPath())
    flex.append(this.getHours())
    return flex
  }

  getPath() {
    this.path.setValue(this.state.path)

    this.path.setPlaceholder('/home')
    this.path.setStyle('width', '80%')
    this.path.setStyle('border', 'none')
    this.path.setStyle('padding', 'calc(1rem / 4)')
    this.path.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    this.path.setContainerStyle('width', '100%')

    this.path.addEventListener('input', () => {
      this.state.path = this.path.getValue()
      this.dispatch('updateendpoint')
    })

    return this.path
  }

  getHours() {
    this.hours.setValue(this.state.hours)

    this.hours.setValue(8)
    this.hours.setAttr('min', 1)

    this.hours.setStyle('width', '80%')
    this.hours.setStyle('border', 'none')
    this.hours.setStyle('text-align', 'right')
    this.hours.setStyle('padding', 'calc(1rem / 4)')
    this.hours.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    this.hours.addEventListener('input', () => {
      this.state.hours = +this.hours.getValue()
      this.dispatch('updateendpoint')
    })

    return this.hours
  }
}
