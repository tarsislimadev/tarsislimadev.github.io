import { HTML, nSpan, nFlex, nHr } from '@brtmvdl/frontend'

class nSpanExtended extends nSpan {
  hasContainer() {
    return true
  }
}

export class JobItem extends HTML {

  state = {
    name: '',
    type: '',
    schedule: '',
    company_name: '',
    company_location: '',
    salary_min: '',
    salary_max: '',
    description: '',
    created_at: '',
    updated_at: '',
  }

  children = {
    name: new HTML(),
    type: new HTML(),
    schedule: new HTML(),
    company_name: new HTML(),
    company_location: new HTML(),
    salary_min: new HTML(),
    salary_max: new HTML(),
    description: new HTML(),
    created_at: new HTML(),
    updated_at: new HTML(),
  }

  constructor({
    company_location = '',
    company_name = '',
    created_at = '',
    description = '',
    name = '',
    salary_max = '',
    salary_min = '',
    schedule = '',
    type = '',
    updated_at = '',
  } = {}) {
    super()

    this.state.company_location = company_location
    this.state.company_name = company_name
    this.state.created_at = created_at
    this.state.description = description
    this.state.name = name
    this.state.salary_max = salary_max
    this.state.salary_min = salary_min
    this.state.schedule = schedule
    this.state.type = type
    this.state.updated_at = updated_at
  }

  onCreate() {
    super.onCreate()
    const flex = new nFlex()

    const left = new HTML()
    left.append(this.getNameText())
    left.append(this.getSalary())
    left.append(this.getCompany())
    left.append(this.getSchedule())
    flex.append(left)

    const right = new HTML()
    right.setContainerStyle('width', '60%')
    right.append(this.getDescription())
    right.append(this.getCreatedAt())
    right.append(this.getUpdatedAt())
    flex.append(right)

    this.append(flex)

    this.append(new nHr())
  }

  createHead(text = '') {
    const head = new nSpanExtended()
    head.setText(text)
    head.setStyle('background-color', '#000000')
    head.setStyle('padding', 'calc(1rem / 8)')
    head.setStyle('color', '#ffffff')
    return head
  }

  createBody(text = '', height = 1) {
    const body = new nSpanExtended()
    body.setText(text)
    body.setContainerStyle('margin', 'calc(1rem / 2) 0rem')
    body.setStyle('min-height', `${height}rem`)
    body.setStyle('display', 'inline-block')
    return body
  }

  getNameText() {
    const name = new HTML()
    name.append(this.createHead('Name:'))
    name.append(this.createBody(this.state.name))
    return name
  }

  getPriceText(price = 0, coin = 'R$') {
    return `${coin} ${price.toFixed(2).replace('.', ',')}`
  }

  getSalary() {
    const salary = new HTML()
    salary.append(this.createHead('Salary:'))
    const body = `${this.getPriceText(+this.state.salary_min)} - ${this.getPriceText(+this.state.salary_max)}`
    salary.append(this.createBody(body))
    return salary
  }

  getCompany() {
    const company = new HTML()
    company.append(this.createHead('Company:'))
    company.append(this.createBody(this.state.company_name))
    return company
  }

  getSchedule() {
    const schedule = new HTML()
    schedule.append(this.createHead('Schedule:'))
    schedule.append(this.createBody(this.state.schedule))
    return schedule
  }

  getType() {
    const type = new HTML()
    type.append(this.createHead('Type:'))
    type.append(this.createBody(this.state.type))
    return type
  }

  getDescription() {
    const description = new HTML()
    description.append(this.createHead('Description:'))
    description.append(this.createBody(this.state.description, 10))
    return description
  }

  padLeft(text = '', length = 0, pad = ' ') {
    while (text.toString().length < length) {
      text = pad.toString() + text.toString()
    }

    return text.toString()
  }

  getDatetimeString(datetime = '') {
    const date = new Date(+datetime)

    const [day, month, year] = [date.getDay(), date.getMonth() + 1, date.getFullYear(),]

    return [day, month, year].map((d) => this.padLeft(d, 2, '0')).join('/')
  }

  getCreatedAt() {
    const created_at = new HTML()
    created_at.append(this.createHead('Created at:'))
    created_at.append(this.createBody(this.getDatetimeString(this.state.created_at)))
    return created_at
  }

  getUpdatedAt() {
    const updated_at = new HTML()
    updated_at.append(this.createHead('Updated at:'))
    updated_at.append(this.createBody(this.getDatetimeString(this.state.updated_at)))
    return updated_at
  }
}
