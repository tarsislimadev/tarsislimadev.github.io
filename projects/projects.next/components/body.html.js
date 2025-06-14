import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { ProjectModel } from '../models/project.model.js'
import { ProjectHTML } from './project.html.js'

export class BodyHTML extends HTML {
  state = {
    projects: [],
  }

  projects = new HTML()

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getProjectsHTML())
  }

  setEvents() {
    this.addEventListener('createproject', () => this.onCreateProject())
  }

  onCreateProject() {
    this.state.projects.push(new ProjectModel())
    this.renderProjects()
  }

  renderProjects() {
    this.projects.clear()
    this.state.projects.map((project, ix) => {
      const html = new ProjectHTML(project)
      html.addEventListener('delete', () => this.deleteProjectByIndex(ix))
      this.projects.append(html)
    })
  }

  deleteProjectByIndex(index) {
    delete this.state.projects[index]
    this.renderProjects()
  }

  getProjectsHTML() {
    return this.projects
  }
}
