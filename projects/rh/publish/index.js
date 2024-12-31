import { HTML, nInputTextGroup, nFlex, nButton, nTextAreaGroup } from  '../../assets/js/libs/afrontend/index.js'
import { TopComponent } from '../js/components/top.js'
import * as API from '../js/utils/api.js'
import * as Flow from '../js/utils/flow.js'
import * as PAGES from '../js/utils/pages.js'

class ContainerComponent extends HTML {
  children = {
    name: this.createInput('name'),
    type: this.createInput('type'),
    schedule: this.createInput('schedule'),
    description: new nTextAreaGroup(),
    company_name: this.createInput('company name'),
    company_location: this.createInput('company location'),
    salary_min: this.createInput('salary min', 'number'),
    salary_max: this.createInput('salary max', 'number'),
    button: new nButton(),
  }

  createInput(label = '', type = 'text') {
    const group = new nInputTextGroup()

    // label
    group.children.label.setText(label)
    group.children.label.setContainerStyle('padding', 'calc(1rem / 4) 0rem')

    // input
    group.children.input.setRules()

    group.children.input.setAttr('type', type)

    group.children.input.setStyle('width', '100%')
    group.children.input.setStyle('border', 'none')
    group.children.input.setStyle('outline', 'none')
    group.children.input.setStyle('max-width', '100%')
    group.children.input.setStyle('padding', 'calc(1rem / 4)')

    group.children.input.setContainerStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    group.children.input.setContainerStyle('overflow', 'hidden')

    // error
    group.children.error.setContainerStyle('padding', 'calc(1rem / 4) 0rem')

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
    return this.children.name
  }

  getSalaryMin() {
    return this.children.salary_min
  }

  getSalaryMax() {
    return this.children.salary_max
  }

  getSalaryInputs() {
    return this.createFlex(
      this.getSalaryMin(),
      this.getSalaryMax(),
    )
  }

  getTypeInput() {
    return this.children.type
  }

  getScheduleInput() {
    return this.children.schedule
  }

  getDescriptionTextArea() {
    this.children.description.children.input.setRules()

    // label
    this.children.description.children.label.setText('description')
    this.children.description.children.label.setContainerStyle('padding', 'calc(1rem / 4) 0rem')

    // input
    this.children.description.children.input.setStyle('padding', 'calc(1rem / 4)')
    this.children.description.children.input.setStyle('min-width', '100%')
    this.children.description.children.input.setStyle('max-width', '100%')
    this.children.description.children.input.setStyle('height', '20rem')
    this.children.description.children.input.setStyle('outline', 'none')
    this.children.description.children.input.setStyle('border', 'none')
    this.children.description.children.input.setStyle('width', '100%')

    this.children.description.children.input.setContainerStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')
    this.children.description.children.input.setContainerStyle('overflow', 'hidden')

    // error
    this.children.description.children.error.setContainerStyle('padding', 'calc(1rem / 4) 0rem')

    return this.children.description
  }

  getCompanyName() {
    return this.children.company_name
  }

  getCompanyLocation() {
    return this.children.company_location
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
      .map((field) => field.children.input.getErrorMessage())
      .filter((err) => err)

    if (errors.length > 0) return

    const payload = field_names
      .reduce((payload, field) => {
        payload[field] = this.children[field].children.input.getValue()

        return payload
      }, {})

    API.jobsSave(payload)
      .then((res) => Flow.goTo(PAGES.INDEX))
      .catch((err) => console.error(err))
  }

  getButton() {
    this.children.button.setText('publish')

    this.children.button.setStyle('padding', 'calc(1rem / 2) 1rem')
    this.children.button.setStyle('background-color', '#000000')
    this.children.button.setStyle('margin', '1rem 0rem')
    this.children.button.setStyle('color', '#ffffff')
    this.children.button.setStyle('border', 'none')

    this.children.button.setContainerStyle('text-align', 'right')

    this.children.button.on('click', () => this.onButtonClick())

    return this.children.button
  }
}

export class Page extends HTML {
  children = {
    top: new TopComponent(),
    container: new ContainerComponent(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTop())
    this.append(this.getContainer())
  }

  getTop() {
    return this.children.top
  }


  getContainer() {
    return this.children.container
  }

}
