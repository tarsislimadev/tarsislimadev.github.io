import { HTML, nInput, nButton, nFlex, nInputTextGroup, nImage, nLink, nHr } from  '../../assets/js/libs/afrontend/index.js'
import * as COLORS from '../utils/colors.js'

export class nInput extends nInput {
  onCreate() {
    super.onCreate()
    this.setStyle('width', '100%')
  }
}

export class nButton extends nButton {
  onCreate() {
    super.onCreate()
    this.setStyle('box-sizing', 'border-box')
  }
}

export class nFlex extends nFlex {
  onCreate() {
    super.onCreate()
    this.setStyle('box-sizing', 'border-box')
  }
}

export class nTextAreaGroup extends nInputTextGroup {
  children = {
    label: new nLabel(),
    input: new nTextArea(),
    error: new nError(),
  }
}

export class nInputTextGroup extends nInputTextGroup {
  onCreate() {
    super.onCreate()
    this.setStyle('box-sizing', 'border-box')
  }
}

export class nImage extends nImage {
  onCreate() {
    super.onCreate()
    this.setStyle('box-sizing', 'border-box')
  }
}

export class nLink extends nLink {
  onCreate() {
    super.onCreate()
    this.setStyle('box-sizing', 'border-box')
  }
}

export class nHr extends nHr {
  onCreate() {
    super.onCreate()
    this.setStyle('box-sizing', 'border-box')
  }
}

export class Item extends HTML {
  state = {}
  children = {}
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

  children = {
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
    this.children.name.setText(this.state.name)

    return this.children.name
  }

  getTypeInput() {
    this.children.type.setText(this.state.type)

    return this.children.type
  }

  getScheduleInput() {
    this.children.schedule.setText(this.state.schedule)

    return this.children.schedule
  }

  getDescriptionInput() {
    this.children.description.setText(this.state.description)

    return this.children.description
  }

  getCompanyNameInput() {
    this.children.company_name.setText(this.state.company_name)

    return this.children.company_name
  }

  getCompanyLocationInput() {
    this.children.company_location.setText(this.state.company_location)

    return this.children.company_location
  }

  getSalaryMinInput() {
    this.children.salary_min.setText(this.state.salary_min)

    return this.children.salary_min
  }

  getSalaryMaxInput() {
    this.children.salary_max.setText(this.state.salary_max)

    return this.children.salary_max
  }

  getCreatedAtInput() {
    this.children.created_at.setText(this.state.created_at)

    return this.children.created_at
  }

  getUpdatedAtInput() {
    this.children.updated_at.setText(this.state.updated_at)

    return this.children.updated_at
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
