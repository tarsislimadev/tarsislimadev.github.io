import { HTML, nSpan } from '../assets/js/libs/afrontend/index.js'
import { NoContainerLinkComponent } from '../assets/js/components/no.container.link.component.js'
import { ThumbnailComponent } from '../assets/js/components/thumbnail.component.js'
import { PageComponent } from '../assets/js/components/page.component.js'

import projects from '../assets/js/lists/projects.js'

class ProjectThumbnailComponent extends ThumbnailComponent { }

class MenuComponent extends HTML {
  onCreate() { 
    super.onCreate()
    const html = new nSpan()
    html.append(new NoContainerLinkComponent({ text: 'frontend', href: '?search=frontend' }))
    html.append(new NoContainerLinkComponent({ text: 'game', href: '?search=game' }))
    html.append(new NoContainerLinkComponent({ text: 'api', href: '?search=api' }))
    this.append(html)
  }
}

class ProjectsListComponent extends HTML {
  updateProjectsList(list = []) {
    this.clear()

    if (list.length === 0) {
      this.setText('No projects found')
      return
    }

    Array.from(list).map((project) => this.append(new ProjectThumbnailComponent(project)))
  }
}

export class Page extends PageComponent {
  menu = new MenuComponent()
  projectsList = new ProjectsListComponent()

  getBodyComponent() {
    const html = new HTML()
    html.append(this.menu)
    html.append(this.projectsList)
    this.projectsList.updateProjectsList(projects)
    return html
  }
}
