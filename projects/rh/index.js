import { HTML } from  '../../assets/js/libs/afrontend/index.js'
import { TopComponent } from './js/components/top.js'
import { JobItem } from './js/components/job-item.js'
import * as API from './js/utils/api.js'

export class Page extends HTML {
  children = {
    top: new TopComponent(),
    container: new HTML(),
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTop())
    this.append(this.getContainer())
    this.getJobsList()
  }

  getTop() {
    return this.children.top
  }

  getContainer() {
    this.children.container.setStyle('margin', '0 auto')
    this.children.container.setStyle('width', '40rem')

    return this.children.container
  }

  getJobsList() {
    this.children.container.setText('loading...')

    API.jobsList({})
      .then((res) => {
        const list = res.get('list', [])

        this.children.container.setText(list.length === 0 ? 'no items' : '')

        list
          .map((item) => new JobItem(item))
          .map((item) => this.children.container.append(item))
      })
      .catch((err) => console.error(err))
  }

}
