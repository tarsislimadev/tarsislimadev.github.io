import { HTML, nFlex } from '../../assets/js/libs/afrontend/index.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextareaComponent } from '../../assets/js/components/textarea.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { FirebaseDatabasePageComponent } from '../../assets/js/components/firebase.database.page.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'

class ErrorComponent extends TextComponent {
  onCreate() {
    super.onCreate()
    this.setStyle('color', 'red')
  }
}

class FormComponent extends HTML {
  values = new HTML()
  inputs = []

  onCreate() {
    super.onCreate()
    this.append(this.getValuesComponent())
    this.append(new ButtonComponent({ text: 'add', onclick: () => this.onAddClick() }))
    this.append(new ButtonComponent({ text: 'save', onclick: () => this.onSaveClick() }))
  }

  getValuesComponent() {
    return this.values
  }

  onAddClick() {
    const input = new InputComponent({ type: 'text', label: 'var ' + String.fromCharCode(this.inputs.length + 97) })
    this.inputs.push(input)
    this.values.append(input)
  }

  onSaveClick() {
    this.dispatch('save', this.inputs.map(i => i.getValue()))
  }
}

class FunctionComponent extends HTML {
  textarea = new TextareaComponent({})

  onCreate() {
    super.onCreate()
    this.append(this.getTextareaComponent())
    this.append(new ButtonComponent({ text: 'save', onclick: () => this.onSaveClick() }))
    this.append(new ButtonComponent({ text: 'run', onclick: () => this.onRunClick() }))
  }

  getTextareaComponent() {
    return this.textarea
  }

  onSaveClick() {
    this.dispatch('save', this.textarea.getValue())
  }

  onRunClick() {
    this.dispatch('run')
  }
}

export class Page extends FirebaseDatabasePageComponent {
  form = new FormComponent()
  function = new FunctionComponent()
  result = new HTML()

  state = {
    name: '',
    values: [],
    function: '',
  }

  getDirectory() { return 'functions' }

  onCreate() {
    super.onCreate()
    this.append(new LinkComponent({ text: 'functions', href: '?' }))
    this.append(this.getFlexComponent())
  }

  getFlexComponent() {
    const flex = new nFlex()
    flex.append(this.getFormComponent().setContainerStyle('width', '19%'))
    flex.append(this.getFunctionComponent().setContainerStyle('width', '60%'))
    flex.append(this.getResultComponent().setContainerStyle('width', '19%'))
    return flex
  }

  getFormComponent() {
    this.form.addEventListener('save', ({ value }) => {
      this.state.values = Array.from(value)
    })
    return this.form
  }

  getFunctionComponent() {
    this.function.addEventListener('save', ({ value }) => {
      this.state.function = value
      this.save(this.state).then(() => alert('saved'))
    })
    this.function.addEventListener('run', () => this.onRunClick())
    return this.function
  }

  getResultComponent() {
    return this.result
  }

  onRunClick() {
    this.run()
  }

  run({ function: func, values } = this.state) {
    const fn = eval(`(${values.map((_, i) => String.fromCharCode(i + 97)).join(',')}) => {
${func}
}`)

    this.result.clear()
    try {
      const result = fn(...values)
      if (result instanceof Promise) {
        result.then(res => this.result.append(new TextComponent({ text: res })))
        return
      }
      this.result.append(new TextComponent({ text: result }))
    } catch (e) {
      this.result.append(new ErrorComponent({ text: e.message }))
      console.error(e)
    }
  }
}
