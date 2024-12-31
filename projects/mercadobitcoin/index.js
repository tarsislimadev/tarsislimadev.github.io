import { HTML } from '../../assets/js/libs/afrontend/index.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.setText('https://api.mercadobitcoin.net/api/v4/docs')
  }
}
