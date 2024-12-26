import { HTML, nImage, nFlex, nLink, nH1 } from './assets/js/libs/frontend/index.js'
import { ImageComponent } from './assets/js/components/image.component.js'
import * as socials from './assets/js/utils/socials.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getHeaderComponent())
  }

  getHeaderComponent() {
    const html = new HTML()
    html.setStyle('text-align', 'center')
    html.setStyle('margin', '0 auto')
    html.setStyle('width', '20rem')
    html.append(new ImageComponent({ src: './assets/img/me.png' }))
    html.append(this.getTitlesComponent())
    html.append(this.getLinksComponent())
    return html
  }

  getTitlesComponent() {
    const titles = new HTML()

    const title = new nH1()
    title.setStyle('margin', '1rem 0rem')
    title.setText('🇧🇷 Tarsis Lima')
    titles.append(title)

    const subtitle = new HTML()
    subtitle.setStyle('margin', '1rem 0rem')
    subtitle.setText('Full Stack Developer')
    titles.append(subtitle)

    return titles
  }

  getLinksComponent() {
    const flex = new nFlex()
    flex.append(this.createImageLink('linkedin'))
    flex.append(this.createImageLink('github'))
    flex.append(this.createImageLink('youtube'))
    return flex
  }

  createImageLink(name) {
    const link = new nLink()
    link.href(socials[name])
    const image = new nImage()
    image.src(`./assets/img/${name}-white.svg`)
    image.alt(name)
    link.append(image)
    return link
  }
}
