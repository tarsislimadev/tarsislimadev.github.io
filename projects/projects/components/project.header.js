import { HTML, COLORS, nFlex, nInput, nSelect } from '../../../assets/js/libs/afrontend/index.js'

import { CONTRACTS } from '../utils/constansts.js'

import { ButtonComponent } from '../../../assets/js/components/button.component.js'

export class ProjectHeader extends nFlex {
  state = {
    domain: '',
    contract: 1,
  }

  domain = new nInput()
  contract = new nSelect()

  onCreate() {
    this.setStyles()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('padding', '1rem')

    this.setContainerStyle('box-shadow', 'inset 0rem 0rem 0rem calc(1rem / 8) #000000')
  }

  getFlex() {
    const flex = new nFlex()

    const left = new HTML()
    left.append(this.getDomain())
    flex.append(left)

    const right = new nFlex()
    right.append(this.getContract())
    right.append(this.getDelButton())
    right.append(this.getPlusButton())
    flex.append(right)

    return flex
  }

  getDomain() {
    this.domain.setText(this.state.domain)
    this.domain.setPlaceholder('domain.com')
    this.domain.setStyle('border', 'none')

    this.domain.addEventListener('input', () => this.state.domain = this.domain.getValue())

    return this.domain
  }

  getContract() {
    this.contract.setValue(10)

    CONTRACTS.map(([key, value]) => this.contract.addOption(key, value))

    this.contract.setStyle('border', 'none')
    this.contract.setStyle('background-color', COLORS.WHITE_1)

    this.contract.addEventListener('input', () => this.state.contract = this.contract.getValue())

    return this.contract
  }

  getDelButton() {
    return new ButtonComponent({ text: 'delete', onclick: () => this.dispatch('deleteproject', this) })
  }

  getPlusButton() {
    return new ButtonComponent({ text: 'plus', onclick: () => this.dispatch('createendpoint', this) })
  }
}
