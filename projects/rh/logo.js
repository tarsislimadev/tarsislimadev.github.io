import { HTML } from '@brtmvdl/frontend'

class nCanvas extends HTML {
  getTagName() {
    return 'canvas'
  }

  getName() {
    return 'canvas'
  }

  getContext() {
    return this.element.getContext('2d')
  }
}

export class Page extends HTML {
  state = {
    width: 16,
  }

  children = {
    canvas: new nCanvas(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getCanvas())
    this.draw()
  }

  getCanvas() {
    const width = this.state.width * 32
    const height = width * 3 / 4

    this.children.canvas.setStyle('height', `${height}px`)
    this.children.canvas.setStyle('width', `${width}px`)
    this.children.canvas.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

    return this.children.canvas
  }

  draw() {
    const ctx = this.children.canvas.getContext()
    const width = this.state.width * 32
    const height = width * 3 / 4

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop('0', 'magenta')
    gradient.addColorStop('0.5', 'blue')
    gradient.addColorStop('1.0', 'red')

    ctx.fillStyle = gradient
    ctx.font = `${this.state.width * 8}px sans-serif`
    ctx.fillText(
      'RH',
      this.state.width * 4,
      this.state.width * 6,
    )
  }
}
