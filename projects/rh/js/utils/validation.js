import { Logger } from './logger.js'

class Field {
  logger = new Logger('Field')

  state = {
    name: null,
    value: null,
    rules: [],
    errors: [],
    events: {
      error: [],
    }
  }

  constructor(name) {
    this.state.name = name
  }

  setValue(value = '') {
    this.logger.log('setValue', { value })

    this.state.value = value
    return this
  }

  setRule(rule = '') {
    this.logger.log('setRule', { rule })

    this.state.rules.push(rule)
    return this
  }

  setRules(rules = []) {
    this.logger.log('setRules', { rules })

    rules.map((value) => this.setRule(value))
    return this
  }

  addError(error) {
    this.state.errors.push(error)
    return this
  }

  clearError() {
    for (let i = 0; i < this.state.errors.length; i++) {
      this.state.errors.shift()
    }

    return this
  }

  onError(error) {
    this.state.errors.push(error)
    this.state.events.error.map((fn) => fn(error))
    return this
  }

  setOnError(fn = (() => { })) {
    this.logger.log('onError', { fn })

    this.state.events.error.push(fn)
    return this
  }
}

export class Validator {
  logger = new Logger('Validator')

  state = {
    fields: [],
  }

  addField(name) {
    this.logger.log('addField', { name })

    const field = new Field(name)
    this.state.fields.push(field)
    return field
  }

  validate() {
    this.logger.log('validate', {})

    let hasError = false

    this.state.fields.map((field) => {
      field.clearError()

      field.state.rules.map((rule) => {
        const error = rule(field.value)

        if (error != '') {
          field.onError(error)
          hasError = true
        }

      })
    })

    return Promise.resolve(hasError)
  }
}

export class Validation {
  static logger = new Logger('Validation')

  static required(errorMessage = 'This field is required.') {
    Validation.logger.log('required', { errorMessage })

    return (value) => !!value ? null : errorMessage
  }

  static datetime(errorMessage = 'This field must be date and time.') {
    Validation.logger.log('datetime', { errorMessage })

    return () => errorMessage
  }

}
