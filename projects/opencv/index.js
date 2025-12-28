import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import * as API from '../../assets/js/utils/api.js'

class CaptionsItemComponent extends HTML {
  id = null
  kind = null

  constructor({ id, kind } = {}) {
    super()
    this.id = id
    this.kind = kind
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'ID: ' + this.id }))
    this.append(new ButtonComponent({ text: 'download caption', onclick: () => this.onDownloadCaptionButtonClick() }))
  }

  onDownloadCaptionButtonClick() {
    API.rest.youtube.v3.captions.download(this.id)
      .then(res => console.log(res.getData()))
      .catch(console.error)
  }
}

class CaptionsListComponent extends HTML {
  list = null

  constructor(list) {
    super()
    this.list = list
  }

  onCreate() {
    super.onCreate()
    Array.from(this.list.items)
      .map((item) => this.append(new CaptionsItemComponent(item)))
  }
}

class VideoItem extends HTML {
  id = null
  kind = null

  constructor({ id, kind } = {}) {
    super()
    this.id = id
    this.kind = kind
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'ID: ' + this.id }))
    this.append(new ButtonComponent({ text: 'getCaptions', onclick: () => this.onGetCaptionsButtonClick() }))
    this.append(this.list)
  }

  onGetCaptionsButtonClick() {
    API.rest.youtube.v3.captions.list(this.id)
      .then(res => this.append(new CaptionsListComponent(res.getData())))
      .catch(console.error)
  }
}

class VideosListComponent extends HTML { }

export class Page extends PageComponent {
  data = null
  videos_list = new VideosListComponent()

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'Youtube Data API' }))
    this.append(new ButtonComponent({ text: 'list most popular videos', onclick: () => this.onListVideosButtonClick() }))
    this.append(this.videos_list)
  }

  onListVideosButtonClick() {
    API.rest.youtube.v3.videos.mostPopular()
      .then(res => res.getData())
      .then(data => this.data = data)
      .then(() => this.renderVideos())
      .catch(console.error)
  }

  renderVideos() {
    Array.from(this.data.items).map((item) => this.videos_list.append(new VideoItem(item)))
  }
}
