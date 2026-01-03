import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { TopComponent } from './js/components/top.js'
import { JobItem } from './js/components/job-item.js'
import * as API from './js/utils/api.js'

export class Page extends HTML {
  top = new TopComponent()
  container = new HTML()

  onCreate() {
    super.onCreate()
    this.append(this.getTop())
    this.append(this.getContainer())
    this.getJobsList()
  }

  getTop() {
    return this.top
  }

  getContainer() {
    this.container.setStyle('margin', '0 auto')
    this.container.setStyle('width', '40rem')

    return this.container
  }

  getJobsList() {
    this.container.setText('loading...')

    API.jobsList({})
      .then((res) => {
        const list = res.get('list', [])

        this.container.setText(list.length === 0 ? 'no items' : '')

        list
          .map((item) => new JobItem(item))
          .map((item) => this.container.append(item))
      })
      .catch((err) => console.error(err))
  }

}
