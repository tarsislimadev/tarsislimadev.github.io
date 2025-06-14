import { HTML, nFlex } from '../../assets/js/libs/afrontend/index.js'

class LeftBar extends HTML {
  onCreate() {
    super.onCreate()
    this.setText('left bar')
  }
}

export class ContainerComponent extends HTML {
  left = new LeftBar()
  right = new HTML()

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
    return this.left
  }

  getRight() {
    this.right.setText('right')

    return this.right
  }
}
