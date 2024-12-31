import { HTML, nLink } from  '../../assets/js/libs/afrontend/index.js'

export class Title extends HTML {
  state = {
    title: ''
  }

  constructor(title = '') {
    super()
    this.state.title = title
  }

  onCreate() {
    super.onCreate()
    this.append(this.getLink())
  }

  getLink() {
    const link = new nLink()
    link.setText(['RH', this.state.title].filter((text) => text).join(' - '))
    link.href('/')
    link.setStyle('font-size', '2rem')
    link.setStyle('margin-bottom', '1rem')
    return link
  }
}
