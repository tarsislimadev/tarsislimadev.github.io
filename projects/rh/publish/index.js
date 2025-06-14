import { HTML, nInputTextGroup, nFlex, nButton, nTextAreaGroup } from '../../assets/js/libs/afrontend/index.js'
import { TopComponent } from '../js/components/top.js'
import * as API from '../js/utils/api.js'
import * as Flow from '../js/utils/flow.js'
import * as PAGES from '../js/utils/pages.js'

class ContainerComponent extends HTML {
  name = this.createInput('name')
  type = this.createInput('type')
  schedule = this.createInput('schedule')
  description = new nTextAreaGroup()
  company_name = this.createInput('company name')
  company_location = this.createInput('company location')
  salary_min = this.createInput('salary min', 'number')
  salary_max = this.createInput('salary max', 'number')
  button = new nButton()

  createInput(label = '', type = 'text') {
    const group = new nInputTextGroup()

    // label
    group.label.setText(label)
    group.label.setContainerStyle('padding', 'calc(1rem / 4) 0rem')

    // input
    group.input.setRules()

    group.input.setAttr('type', type)

    group.input.setStyle('width', '100%')
    group.input.setStyle('border', 'none')
    group.input.setStyle('outline', 'none')
    group.input.setStyle('max-width', '100%')
    group.input.setStyle('padding', 'calc(1rem / 4)')

    group.input.setContainerStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    group.input.setContainerStyle('overflow', 'hidden')

    // error
    group.error.setContainerStyle('padding', 'calc(1rem / 4) 0rem')

    return group
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getForm())
  }

  setStyles() {
    this.setStyle('box-sizing', 'border-box')
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
  }

  getForm() {
    this.append(this.createFlex(this.getNameInput(), this.getSalaryInputs()))
    this.append(this.createFlex(this.getTypeInput(), this.getScheduleInput()))
    this.append(this.createFlex(this.getCompanyName(), this.getCompanyLocation()))
    this.append(this.getDescriptionTextArea())
    this.append(this.getButton())
  }

  createFlex(...es) {
    const flex = new nFlex()

    es.map((e) => {
      e.setContainerStyle('box-sizing', 'border-box')
      e.setContainerStyle('width', '48%')
      flex.append(e)
    })

    return flex
  }

  getNameInput() {
    return this.name
  }

  getSalaryMin() {
    return this.salary_min
  }

  getSalaryMax() {
    return this.salary_max
  }

  getSalaryInputs() {
    return this.createFlex(
      this.getSalaryMin(),
      this.getSalaryMax(),
    )
  }

  getTypeInput() {
    return this.type
  }

  getScheduleInput() {
    return this.schedule
  }

  getDescriptionTextArea() {
    this.description.input.setRules()

    // label
    this.description.label.setText('description')
    this.description.label.setContainerStyle('padding', 'calc(1rem / 4) 0rem')

    // input
    this.description.input.setStyle('padding', 'calc(1rem / 4)')
    this.description.input.setStyle('min-width', '100%')
    this.description.input.setStyle('max-width', '100%')
    this.description.input.setStyle('height', '20rem')
    this.description.input.setStyle('outline', 'none')
    this.description.input.setStyle('border', 'none')
    this.description.input.setStyle('width', '100%')

    this.description.input.setContainerStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    this.description.input.setContainerStyle('overflow', 'hidden')

    // error
    this.description.error.setContainerStyle('padding', 'calc(1rem / 4) 0rem')

    return this.description
  }

  getCompanyName() {
    return this.company_name
  }

  getCompanyLocation() {
    return this.company_location
  }

  onButtonClick() {
    const field_names = [
      'name',
      'type',
      'schedule',
      'description',
      'company_name',
      'company_location',
      'salary_min',
      'salary_max',
    ]

    const fields = field_names
      .map((field) => this.children[field].setData('field', field))

    const errors = fields
      .map((field) => field.validate())
      .map((field) => field.input.getErrorMessage())
      .filter((err) => err)

    if (errors.length > 0) return

    const payload = field_names
      .reduce((payload, field) => {
        payload[field] = this.children[field].input.getValue()

        return payload
      }, {})

    API.jobsSave(payload)
      .then((res) => Flow.goTo(PAGES.INDEX))
      .catch((err) => console.error(err))
  }

  getButton() {
    this.button.setText('publish')

    this.button.setStyle('padding', 'calc(1rem / 2) 1rem')
    this.button.setStyle('background-color', '#000000')
    this.button.setStyle('margin', '1rem 0rem')
    this.button.setStyle('color', '#ffffff')
    this.button.setStyle('border', 'none')

    this.button.setContainerStyle('text-align', 'right')

    this.button.on('click', () => this.onButtonClick())

    return this.button
  }
}

export class Page extends HTML {
  top = new TopComponent()
  container = new ContainerComponent()

  onCreate() {
    super.onCreate()
    this.append(this.getTop())
    this.append(this.getContainer())
  }

  getTop() {
    return this.top
  }


  getContainer() {
    return this.container
  }

}
