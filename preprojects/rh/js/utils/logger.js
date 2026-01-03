
export class Logger {
  state = {
    name: null,
  }

  constructor() {
    this.state.name = name
  }

  log(key, ...values) {
    console.log(this.state.name, key, ...values)
  }

}
