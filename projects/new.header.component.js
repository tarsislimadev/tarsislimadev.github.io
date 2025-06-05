import { HTML, nSpan, nFlex, nImage } from '../assets/js/libs/afrontend/index.js'
import { TwoColumnsComponent } from '../assets/js/components/two.columns.component.js'

import { LogoComponent } from './logo.component.js'
import { MenuComponent } from './menu.component.js'

import { getRandomAd } from '../assets/js/utils/ads.js'

export class NewHeaderComponent extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getTopBar())
    this.append(this.getMenu())
  }

  getTopBar() {
    return new TwoColumnsComponent({
      html1: this.getLogoComponent(),
      html2: this.getAdsComponent(),
    })
  }

  getLogoComponent() {
    return new LogoComponent()
  }

  getAdsComponent(ad = getRandomAd()) {
    return new HTML()
    // return new ImageComponent({ src: `/images/ads/${ad.id}.png`, alt: ad.title, href: ad.link })
  }

  getMenu() {
    return new MenuComponent()
  }
}
