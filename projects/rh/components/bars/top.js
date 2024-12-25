import { HTML, nFlex, nLink } from '@brtmvdl/frontend'

export class TopBar extends HTML {
  onCreate() {
    super.onCreate()
    const flex = new nFlex()

    const left = new HTML()
    left.append(this.createLink('RH', '/'))
    flex.append(left)

    const right = new HTML()
    right.append(this.createLink('publish a job', '/publish/'))
    flex.append(right)

    this.append(flex)
  }

  createLink(text = '', href = '/') {
    const link = new nLink()
    link.setText(text)
    link.href(href)
    return link
  }
}
