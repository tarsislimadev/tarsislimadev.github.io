import { HTML, nSpan, nLink, nImage } from '../assets/js/libs/afrontend/index.js'
import { ThumbnailComponent } from '../assets/js/components/thumbnail.component.js'
import { PageComponent } from '../assets/js/components/page.component.js'

import projects from '../assets/js/lists/projects.js'

class ProjectThumbnailComponent extends ThumbnailComponent { }

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
  projectsList = new ProjectsListComponent()

  getBodyComponent() {
    const html = new HTML()
    html.append(this.projectsList)
    this.projectsList.updateProjectsList(projects)
    return html
  }
}
