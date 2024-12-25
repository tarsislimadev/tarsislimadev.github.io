import { HTML } from '@brtmvdl/frontend'

export class Title extends HTML {
  title = null

  constructor(title) {
    super()
    this.title = title
  }

  onCreate() {
    super.onCreate()
    this.setText(this.title)
    this.setStyle('font-size', '3rem')
  }

}
