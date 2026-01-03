import { HTML, nInput, nButton, nFlex, nInputTextGroup, nImage, nLink, nHr } from '../../assets/js/libs/afrontend/index.js'
import * as COLORS from '../utils/colors.js'

export class nInput extends nInput {
  onCreate() {
    super.onCreate()
    this.setStyle('width', '100%')
  }
}

export class nTextAreaGroup extends nInputTextGroup {
  label = new nLabel()
  input = new nTextArea()
  error = new nError()
}

export default { nInputTextGroup }

export class Item extends HTML {
  state = {}
  components = {}
}

export class JobItem extends Item {
  state = {
    name: '',
    type: '',
    schedule: '',
    description: '',
    company_name: '',
    company_location: '',
    salary_min: '',
    salary_max: '',
    created_at: '',
    updated_at: '',
  }

  components = {
    name: new HTML(),
    type: new HTML(),
    schedule: new HTML(),
    description: new HTML(),
    company_name: new HTML(),
    company_location: new HTML(),
    salary_min: new HTML(),
    salary_max: new HTML(),
    created_at: new HTML(),
    updated_at: new HTML(),
  }

  constructor({
    name = '',
    type = '',
    schedule = '',
    description = '',
    company_name = '',
    company_location = '',
    salary_min = '',
    salary_max = '',
    created_at = '',
    updated_at = '',
  } = {}) {
    super()

    this.state.name = name
    this.state.type = type
    this.state.schedule = schedule
    this.state.description = description
    this.state.company_name = company_name
    this.state.company_location = company_location
    this.state.salary_min = salary_min
    this.state.salary_max = salary_max
    this.state.created_at = created_at
    this.state.updated_at = updated_at
  }

  onCreate() {
    super.onCreate()
    //
    this.append(this.getNameInput())
    this.append(this.getTypeInput())
    //
    this.append(this.getScheduleInput())
    this.append(this.getDescriptionInput())
    //
    this.append(this.getCompanyNameInput())
    this.append(this.getCompanyLocationInput())
    //
    this.append(this.getSalaryMinInput())
    this.append(this.getSalaryMaxInput())
    //
    this.append(this.getCreatedAtInput())
    this.append(this.getUpdatedAtInput())
    //
    this.append(this.getBottomBar())
  }

  getNameInput() {
    this.name.setText(this.state.name)

    return this.name
  }

  getTypeInput() {
    this.type.setText(this.state.type)

    return this.type
  }

  getScheduleInput() {
    this.schedule.setText(this.state.schedule)

    return this.schedule
  }

  getDescriptionInput() {
    this.description.setText(this.state.description)

    return this.description
  }

  getCompanyNameInput() {
    this.company_name.setText(this.state.company_name)

    return this.company_name
  }

  getCompanyLocationInput() {
    this.company_location.setText(this.state.company_location)

    return this.company_location
  }

  getSalaryMinInput() {
    this.salary_min.setText(this.state.salary_min)

    return this.salary_min
  }

  getSalaryMaxInput() {
    this.salary_max.setText(this.state.salary_max)

    return this.salary_max
  }

  getCreatedAtInput() {
    this.created_at.setText(this.state.created_at)

    return this.created_at
  }

  getUpdatedAtInput() {
    this.updated_at.setText(this.state.updated_at)

    return this.updated_at
  }

  getBottomBar() {
    const hr = new HTML()

    hr.setStyle('background-color', COLORS.GRAY_2)
    hr.setStyle('height', 'calc(1rem / 8)')
    hr.setStyle('margin', '1rem 0rem')
    hr.setStyle('width', '100%')

    return hr
  }
}
