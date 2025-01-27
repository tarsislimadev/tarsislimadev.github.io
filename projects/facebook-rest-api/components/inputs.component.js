import * as Components from '../../../assets/js/components/inputs.component.js'
import { InputComponent } from '../../../assets/js/components/input.component.js'

export class InputsComponent extends Components.InputsComponent {
  children = {
    path: new InputComponent({ label: 'path' }),
    path2: new InputComponent({ label: 'path2' }),
  }
}
