import { HTML, nImage, nFlex, nLink, nH1 } from './assets/js/libs/afrontend/index.js'
import { ImageComponent } from './assets/js/components/image.component.js'
import { ServiceComponent } from './assets/js/components/service.component.js'
import * as socials from './assets/js/utils/socials.js'

const link_wordpress_1 = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Z3JADZ5H9NWUJ'

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
    html.append(this.getServicesComponent())
    html.append(this.getProductsComponent())
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

  getServicesComponent() {
    const html = new HTML()
    html.append(new ServiceComponent({ image: 'wordpress', title: 'Hospedagem Wordpress 1.0', price: 99.9, href: link_wordpress_1 }))
    // html.append(new ServiceComponent({ image: 'wordpress', title: 'Hospedagem Wordpress 2.0', price: 199.9 }))
    return html
  }

  getProductsComponent() {
    const html = new HTML()
    return html
  }
}
