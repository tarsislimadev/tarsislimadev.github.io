import { HTML, nFlex } from '../../assets/js/libs/afrontend/index.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextareaComponent } from '../../assets/js/components/textarea.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
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
  children = {
    values: new HTML(),
    inputs: [],
  }

  onCreate() {
    super.onCreate()
    this.append(this.getValuesComponent())
    this.append(new ButtonComponent({ text: 'add', onclick: () => this.onAddClick() }))
    this.append(new ButtonComponent({ text: 'save', onclick: () => this.onSaveClick() }))
  }

  getValuesComponent() {
    return this.children.values
  }

  onAddClick() {
    const input = new InputComponent({ type: 'text', label: 'var ' + String.fromCharCode(this.children.inputs.length + 97) })
    this.children.inputs.push(input)
    this.children.values.append(input)
  }

  onSaveClick() {
    this.dispatch('save', this.children.inputs.map(i => i.getValue()))
  }
}

class FunctionComponent extends HTML {
  children = {
    textarea: new TextareaComponent({}),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTextareaComponent())
    this.append(new ButtonComponent({ text: 'save', onclick: () => this.onSaveClick() }))
    this.append(new ButtonComponent({ text: 'run', onclick: () => this.onRunClick() }))
  }

  getTextareaComponent() {
    return this.children.textarea
  }

  onSaveClick() {
    this.dispatch('save', this.children.textarea.getValue())
  }

  onRunClick() {
    this.dispatch('run')
  }
}

export class Page extends PageComponent {
  children = {
    form: new FormComponent(),
    function: new FunctionComponent(),
    result: new HTML(),
  }

  state = {
    values: [],
    function: '',
  }

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
    this.children.form.addEventListener('save', ({ value }) => {
      this.state.values = Array.from(value)
      console.log('values', this.state.values)
      this.update()
    })
    return this.children.form
  }

  getFunctionComponent() {
    this.children.function.addEventListener('save', ({ value }) => {
      this.state.function = value
      console.log('function', this.state.function)
      this.update()
    })
    this.children.function.addEventListener('run', () => this.onRunClick())
    return this.children.function
  }

  getResultComponent() {
    return this.children.result
  }

  update() {
    alert('update')
  }

  onRunClick() {
    console.log('run', this.state)
    this.run()
  }

  run() {
    const { function: func, values } = this.state
    const fn = eval(`(${values.map((_, i) => String.fromCharCode(i + 97)).join(',')}) => {
${func}
}`)

    this.children.result.clear()
    try {
      const result = fn(...values)
      if (result instanceof Promise) {
        result.then(res => this.children.result.append(new TextComponent({ text: res })))
        return
      }
      this.children.result.append(new TextComponent({ text: result }))
    } catch (e) {
      this.children.result.append(new ErrorComponent({ text: e.message }))
      console.error(e)
    }
  }
}
