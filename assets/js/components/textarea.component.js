import { nInput } from '../../../assets/js/libs/afrontend/index.js'
import { InputComponent } from '../../../assets/js/components/input.component.js'

class nTextarea extends nInput {
  getTagName() { return 'textarea' }

  getName() { return 'textarea-component' }
}

export class TextareaComponent extends InputComponent {
  getName() { return 'textarea-component' }

  createInput() { return new nTextarea() }
}
