import { HTML, nFlex } from '../../../assets/js/libs/frontend/index.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'
import { ImageComponent } from '../../../assets/js/components/image.component.js'
import { PayPalButtonComponent } from '../../../assets/js/components/paypal.button.component.js'

export class ServiceComponent extends HTML {
  state = {
    image: '',
    title: '',
    price: 0,
  }

  constructor({ image = '', title = '', price = 0 } = {}) {
    super()

    this.state.image = image
    this.state.title = title
    this.state.price = price
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getFlex())
    this.append(new PayPalButtonComponent({ price: this.state.price }))
  }

  setStyles() {
    this.setStyle('padding', 'calc(1rem / 2) 0')
    this.setStyle('margin', 'calc(1rem / 2) 0')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getFlexLeft())
    flex.append(this.getFlexRight())
    return flex
  }

  getFlexLeft() {
    const image = new ImageComponent({ src: `/assets/img/${this.state.image}.png`, alt: this.state.title })
    image.setStyle('max-width', '3rem')
    return image
  }

  getFlexRight() {
    return new TextComponent({ text: this.state.title })
  }
}
