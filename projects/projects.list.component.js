import { HTML } from '../assets/js/libs/afrontend/index.js'
import { BootstrapCardComponent } from '../assets/js/components/bootstrap/index.js'
import { LinkComponent } from '../assets/js/components/link.component.js'

class ProjectModel {
  id = null
  step = null
}

class ProjectThumbnailComponent extends BootstrapCardComponent {
  project = new ProjectModel()

  constructor(project = {}) {
    super()
    this.project = project
  }

  onCreate() {
    super.onCreate()
    this.setContainerStyle('padding-bottom', '1rem')
    this.card_image_top.src(`/projects/${this.project.id}/image.jpg`)
    this.card_body.body_title.append(this.getLinkComponent())
    this.card_body.body_text.setText('Step: ' + this.getStepById(this.project.step))
  }

  getStepById(step = 1) {
    const steps = ['', 'staging', 'beta', 'production']
    return steps[step]
  }

  getLinkComponent() {
    return new LinkComponent({
      text: this.project.id,
      href: `/projects/${this.project.id}/index.html?date=` + Date.now()
    })
  }
}

export class ProjectsListComponent extends HTML {
  onCreate() {
    super.onCreate()
  }

  updateProjectsList(list = []) {
    this.clear()

    if (list.length === 0) {
      this.setText('No projects found')
      return
    }

    Array.from(list).map((project) => this.append(new ProjectThumbnailComponent(project)))
  }
}
