import * as Components from '../../../assets/js/components/input.component.js'

export class InputComponent extends Components.InputComponent {
  onCreate() {
    super.onCreate()
    this.label.setStyle('padding', 'calc(1rem / 4)')
    this.label.setStyle('margin', '0rem')
    this.input.setStyle('padding', 'calc(1rem / 4)')
    this.input.setStyle('box-sizing', 'border-box')
    this.input.setStyle('margin', '0rem')
    this.input.setStyle('width', '100%')
  }
}
