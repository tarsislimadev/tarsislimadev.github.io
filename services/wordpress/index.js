import { HTML } from '../assets/js/libs/frontend/index.js'
import { PaddingComponent } from '../assets/js/components/padding.component.js'
import { TextComponent } from '../assets/js/components/text.component.js'

export class Page extends PaddingComponent {
  children = {
    products_list: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'Products' }))
    this.append(this.getProductsListComponent())
    this.loadProductsList()
  }

  getProductsListComponent() {
    return this.children.products_list
  }

  loadProductsList() {
    fetch('/api/v1/products/index.json', { mode: 'cors' })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err))
  }
}
