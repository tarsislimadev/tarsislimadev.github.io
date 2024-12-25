import { HTML, nFlex } from '@brtmvdl/frontend'

class LeftBar extends HTML {
  onCreate() {
    super.onCreate()
    this.setText('left bar')
  }
}

export class ContainerComponent extends HTML {
  children = {
    left: new LeftBar(),
    right: new HTML(),
  }

  onCreate() {
    super.onCreate()
    const flex = new nFlex()
    flex.setStyle('margin', '0 auto')
    flex.setStyle('width', '40rem')
    // flex.append(this.getLeft())
    flex.append(this.getRight())
    this.append(flex)
  }

  getLeft() {
    return this.children.left
  }

  getRight() {
    this.children.right.setText('right')

    return this.children.right
  }
}
