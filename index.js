import { HTML } from './assets/js/libs/afrontend/index.js'
import { PageComponent } from './assets/js/components/page.component.js'

import projects from './assets/js/lists/projects.js'

import { ProjectsListComponent } from './assets/js/components/projects.list.component.js'

export class Page extends PageComponent {
  projectsList = new ProjectsListComponent()

  getBodyComponent() {
    const html = new HTML()
    html.append(this.projectsList)
    this.projectsList.updateProjectsList(projects)
    return html
  }
}
