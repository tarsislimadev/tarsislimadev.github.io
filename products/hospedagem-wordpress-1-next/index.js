import { HTML, nFlex } from '../../assets/js/libs/afrontend/index.js'

import { ImageLinkComponent } from '../../assets/js/components/image.link.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { ImageComponent } from '../../assets/js/components/image.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'

export class MainMenuComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLeft())
    flex.append(this.getRight())
    return flex
  }

  getLeft() {
    return new ImageLinkComponent({ href: '/', src: '/assets/img/logo.svg' })
  }

  getRight() {
    return new LinkComponent({ text: 'login', href: '/pages/login/' })
  }
}

export class MenuComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(new LinkComponent({ text: 'hosting', href: '/products/hosting/' }))
    flex.append(new LinkComponent({ text: 'mail', href: '/products/mail/' }))
    flex.append(new LinkComponent({ text: 'domains', href: '/products/domains/' }))
    flex.append(new LinkComponent({ text: 'databases', href: '/products/databases/' }))
    return flex
  }
}

export class Action {
  state = {
    text: '',
    fn: (() => { }),
  }

  constructor({ text = '', fn = (() => { }) } = {}) {
    this.state.text = text
    this.state.fn = fn
  }
}

export class JumbotronComponent extends HTML {
  state = {
    title: '',
    subtitle: '',
    action: new Action(),
    image: '',
  }

  constructor({ title = '', subtitle = '', action = new Action(), image = '' } = {}) {
    super()
    this.state.title = title
    this.state.subtitle = subtitle
    this.state.action = action
    this.state.image = image
  }

  onCreate() {
    super.onCreate()
    this.append(this.getFlex())
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getLeft())
    flex.append(new ImageComponent({ src: this.state.image, alt: this.state.action.state.text }))
    return flex
  }

  getLeft() {
    const html = new HTML()
    html.append(new TextComponent({ text: this.state.title }))
    html.append(new TextComponent({ text: this.state.subtitle }))
    html.append(new ButtonComponent({ text: this.state.action.state.text, onclick: () => this.state.action.state?.fn?.() }))
    return html
  }
}

export class Plan {
  state = { items: [] }

  constructor({ items = [] } = {}) {
    this.state.items = items
  }
}

export class PlansTableComponent extends HTML {
  state = { plans: [] }

  constructor({ plans = [new Plan()] } = {}) {
    super()
    this.state.plans = plans
  }
}

export class FrequentlyQuestionsComponent extends HTML { }

export class FooterComponent extends HTML { }

export class PageComponenent extends HTML {
  onCreate() {
    super.onCreate()
    this.setContainerStyle('width', '60rem')
    this.setContainerStyle('margin', '1rem auto')
  }
}

export class Page extends PageComponenent {
  onCreate() {
    super.onCreate()
    this.append(new MainMenuComponent())
    this.append(new MenuComponent())
    this.append(new JumbotronComponent())
    this.append(new PlansTableComponent())
    this.append(new FrequentlyQuestionsComponent())
    this.append(new FooterComponent())
  }
}
