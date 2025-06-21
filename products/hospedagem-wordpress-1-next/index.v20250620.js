import { HTML, nFlex } from '../../assets/js/libs/afrontend/index.js'

import { ImageLinkComponent } from '../../assets/js/components/image.link.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { ColumnComponent } from '../../assets/js/components/column.component.js'
import { ImageComponent } from '../../assets/js/components/image.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { RowComponent } from '../../assets/js/components/row.component.js'

export class MainMenuComponent extends ImageLinkComponent {
  constructor() { super({ href: '/', src: '/assets/img/logo.svg' }) }
}

export class MenuComponent extends ColumnComponent {
  constructor() {
    super([
      new LinkComponent({ text: 'hosting', href: '/products/hosting/' }),
      new LinkComponent({ text: 'mail', href: '/products/mail/' }),
      new LinkComponent({ text: 'domains', href: '/products/domains/' }),
      new LinkComponent({ text: 'databases', href: '/products/databases/' }),
    ])
  }
}

export class Action {
  text = ''
  fn = (() => { })

  constructor({ text = '', fn = (() => { }) } = {}) {
    this.text = text
    this.fn = fn
  }
}

export class JumbotronComponent extends HTML {
  title = ''
  subtitle = ''
  action = new Action()
  image = ''

  constructor({ title = '', subtitle = '', action = new Action(), image = '' } = {}) {
    super()
    this.title = title
    this.subtitle = subtitle
    this.action = action
    this.image = image
  }

  onCreate() {
    super.onCreate()
    this.append(new ColumnComponent([
      new RowComponent([
        new TextComponent({ text: this.title }),
        new TextComponent({ text: this.subtitle }),
        new ButtonComponent({ text: this.action.text, onclick: () => this.action?.fn?.() }),
      ]),
      new ImageComponent({ src: this.image, alt: this.action.text }),
    ]))
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

export class Page extends PageComponent {
  onCreate() {
    super.onCreate()
    this.append(new RowComponent([
      new MainMenuComponent(),
      new MenuComponent(),
      new JumbotronComponent(),
      new PlansTableComponent(),
      new FrequentlyQuestionsComponent(),
      new FooterComponent(),
    ]))
  }
}
