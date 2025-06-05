import { HTML, nSpan } from '../assets/js/libs/afrontend/index.js'
import { NoContainerLinkComponent } from '../assets/js/components/no.container.link.component.js'

export class MenuComponent extends HTML {
  onCreate() {
    super.onCreate()
    const html = new nSpan()
    html.append(new NoContainerLinkComponent({ text: 'frontend', href: '?search=frontend' }))
    html.append(new NoContainerLinkComponent({ text: 'game', href: '?search=game' }))
    html.append(new NoContainerLinkComponent({ text: 'api', href: '?search=api' }))
    this.append(html)
  }
}
