import { HTML } from '../assets/js/libs/afrontend/index.js'
import { ProjectThumbnailComponent } from './assets/js/components/project.thumbnail.component.js'
import { PaddingComponent } from './assets/js/components/padding.component.js'
import { TextComponent } from './assets/js/components/text.component.js'
import experiences from './assets/js/lists/experiences.js'

export class Page extends PaddingComponent {
  onCreate2() {
    this.append(new TextComponent({ text: 'projects' }))
    const projects = new HTML()
    Array.from(experiences).filter(({ step }) => step >= 3).map(({ id }) => projects.append(new ProjectThumbnailComponent({ id })))
    this.append(projects)

    this.append(new TextComponent({ text: 'posts' }))
    const posts = new HTML()
    Array.from(experiences).filter(({ step }) => step >= 3).map(({ id }) => posts.append(new ProjectThumbnailComponent({ id })))
    this.append(posts)
  }
}
