import { HTML, nFlex, nLink } from  '../../assets/js/libs/afrontend/index.js'

import * as API from './js/utils/api.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getTopBar())
    this.append(this.getContainer())
    this.getJobsList()
  }

  getTopBar() {
    const flex = new nFlex()
    flex.append(this.createLink('RH', '/'))
    flex.append(this.createLink('publish', '/publish/'))
    return flex
  }

  createLink(text = '', href = '/') {
    const link = new nLink()
    link.setText(text)
    link.href(href)
    return link
  }

  getContainer() {
    const flex = new nFlex()
    flex.addClass('container')
    flex.setStyle('width', '100%')
    flex.append(this.getLeftBar())
    flex.append(this.getRightBar())
    return flex
  }

  getLeftBar() {
    const bar = new HTML()
    bar.setStyle('width', '10rem')
    bar.setText('left bar')
    return bar
  }

  getRightBar() {
    const bar = new HTML()
    bar.setStyle('width', '28rem')
    bar.setText('right bar')
    return bar
  }

  getJobsList() {
    API.jobsList({})
      .then((res) => {
        res.get('list')
          .map((item) => new JobItem(item))
          .map((item) => this.right.append(item))
      })
      .catch((err) => console.error(err))
  }
}
