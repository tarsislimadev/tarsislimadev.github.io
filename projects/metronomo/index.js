import { HTML, nFlex } from '../../assets/js/libs/afrontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { CursorComponent } from './components/cursor.component.js'

const MINUTE = 1000 * 60
const TIMES = 4
const SPEED = 120

export class Page extends PageComponent {
  state = {
    id: -1,
    pointer: 0,
  }

  speed = new InputComponent({ label: 'speed', type: 'number', value: SPEED })
  start_button = new ButtonComponent({ text: 'start', onclick: () => this.onStartButtonClick() })
  reset_button = new ButtonComponent({ text: 'reset', onclick: () => this.onResetButtonClick() })
  pointers = Array.from(Array(TIMES)).map(() => new CursorComponent())

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'metronomo' }))
    this.append(this.getTwoColumns())
    this.update()
  }

  getTwoColumns() {
    return new TwoColumnsComponent({ html1: this.getForm(), html2: this.getPointers(), })
  }

  getForm() {
    const form = new HTML()
    form.append(this.getSpeedInputComponent())
    form.append(this.getStartButton())
    form.append(this.getResetButton())
    return form
  }

  onStartButtonClick() {
    const speed = this.speed.getValue()
    this.start_button.getText() == 'start'
      ? this.start(+speed)
      : this.stop()
  }

  start(speed) {
    this.state.id = setInterval(() => this.tick(), (MINUTE / speed))
    this.start_button.setText('stop')
  }

  tick() {
    this.update(this.state.pointer + 1)
  }

  stop() {
    clearInterval(this.state.id)
    this.start_button.setText('start')
    this.update()
  }

  getSpeedInputComponent() {
    return this.speed
  }

  getStartButton() {
    return this.start_button
  }

  getResetButton() {
    return this.reset_button
  }

  onResetButtonClick() {
    this.speed.input.setValue(SPEED)
    this.stop()
    this.update()
  }

  update(pointer = 0) {
    this.state.pointer = pointer
    Array.from(Array(TIMES)).map((_, ix) => this.pointers[ix].down())
    this.pointers[pointer % 4].up()
  }

  getPointers() {
    const html = new nFlex()
    Array.from(Array(TIMES)).map((_, ix) => {
      const pointer = this.pointers[ix]
      pointer.setText(ix + 1)
      html.append(pointer)
    })
    return html
  }

}
