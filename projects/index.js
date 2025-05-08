import { HTML } from '../assets/js/libs/afrontend/index.js'
import { ThumbnailComponent } from '../assets/js/components/thumbnail.component.js'
import { PaddingComponent } from '../assets/js/components/padding.component.js'
import { TextComponent } from '../assets/js/components/text.component.js'

import projects from '../assets/js/lists/projects.js'
import products from '../assets/js/lists/products.js'
import posts from '../assets/js/lists/posts.js'

class ProjectThumbnailComponent extends ThumbnailComponent { }
class ProductThumbnailComponent extends ThumbnailComponent { }
class PostThumbnailComponent extends ThumbnailComponent { }

export class Page extends PaddingComponent {
  onCreate2() {
    const html = new HTML()

    html.append(new TextComponent({ text: 'projects' }))
    Array.from(projects).map((project) => html.append(new ProjectThumbnailComponent(project)))

    html.append(new TextComponent({ text: 'products' }))
    Array.from(products).map((product) => html.append(new ProductThumbnailComponent(product)))

    html.append(new TextComponent({ text: 'posts' }))
    Array.from(posts).map((post) => html.append(new PostThumbnailComponent(post)))

    this.append(html)
  }
}
