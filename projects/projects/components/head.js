import { HTML, nFlex } from '../../../assets/js/libs/afrontend/index.js'

export class Head extends HTML {
  title = new HTML()
  addProject = new HTML()

  onCreate() {
    this.setStyles()
    this.append(this.getFlex())
  }

  setStyles() {
    this.setStyle('margin-bottom', '1rem')
    this.setStyle('margin', '0 auto')
    this.setStyle('padding', '1rem')
    this.setStyle('width', '40rem')
  }

  getFlex() {
    const flex = new nFlex()
    flex.append(this.getTitle())
    flex.append(this.getAddProject())
    return flex
  }

  getTitle() {
    this.title.setText('projects')
    return this.title
  }

  getAddProject() {
    this.addProject.setText('create project')
    this.addProject.setStyle('cursor', 'pointer')
    this.addProject.addEventListener('click', () => this.dispatch('createproject'))
    return this.addProject
  }
}
