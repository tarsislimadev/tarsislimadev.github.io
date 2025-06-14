import * as COMPONENTS from '../../../assets/js/components/inputs.component.js'
import { InputComponent } from '../../../assets/js/components/input.component.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'

import { getSymbolsList } from '../lists/symbols.list.js'
import { getIntervalsList } from '../../../assets/js/lists/intervals.list.js'

class TimestampComponent extends InputComponent {
  getInput() {
    const input = super.getInput()
    input.addEventListener('focus', () => input.setValue(Date.now()))
    return input
  }

  onUpdateButton() {
    this.input.setValue(Date.now())
  }
}

export class InputsComponent extends COMPONENTS.InputsComponent {
  components = {
    limit: new SelectComponent({ label: 'limit', options: [[1, 1], [5, 5], [10, 10], [50, 50], [100, 100],] }),
    symbol: new SelectComponent({ label: 'symbol', options: getSymbolsList().map((s) => ([s, s])) }),
    interval: new SelectComponent({ label: 'interval', options: getIntervalsList().map((s) => ([s, s])) }),
    startTime: new TimestampComponent({ label: 'startTime' }),
  }
}
