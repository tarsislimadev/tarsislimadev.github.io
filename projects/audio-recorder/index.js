import { HTML, nLink } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { LinkComponent } from '../../assets/js/components/link.component.js'
import { RowComponent } from '../../assets/js/components/row.component.js'

import { padLeft } from '../../assets/js/utils/str.js'

class DownloadLinkComponent extends LinkComponent {
  name = ''

  constructor({ text = '', href = '' }) {
    super({ text, href })
    this.name = text
  }

  onCreate() {
    super.onCreate()
    this.setAttr('download', this.name)
  }
}

export class Page extends PageComponent {
  state = {
    is_playing: false,
    media_recorder: null,
    timer: 0,
    id: -1,
  }

  button = new ButtonComponent({ text: 'play', onclick: () => this.onButtonClick() })
  records = new HTML()

  onCreate() {
    super.onCreate()
    this.body.append(new RowComponent([
      new TextComponent({ text: 'audio recorder' }),
      this.button,
      this.records,
    ]))
  }

  onButtonClick() {
    (this.state.is_playing = !this.state.is_playing)
      ? this.startRecord()
      : this.stopRecording()

    this.updateButtonText()
  }

  setButtonText(text = '') {
    this.button.setText(text)
  }

  startRecord() {
    this.getUserMedia()
      .then((stream) => this.onUserMedia(stream))
      .catch((err) => console.error(err))
  }

  stopRecording() {
    this.state.media_recorder?.stop()
    clearInterval(this.state.id)
    this.state.timer = 0
  }

  getUserMedia() {
    return navigator.mediaDevices.getUserMedia({ audio: true })
  }

  onUserMedia(data) {
    this.state.id = setInterval(() => this.tick(), 1000)
    this.createMediaRecorder(data)
    this.startMediaRecorder()
  }

  tick() {
    this.state.timer++
    this.updateButtonText()
  }

  updateButtonText() {
    this.state.is_playing
      ? this.setButtonText(`stop (${padLeft(this.state.timer, 2, '0')}s)`)
      : this.setButtonText('play')
  }

  createMediaRecorder(stream) {
    this.state.media_recorder = new MediaRecorder(stream)
  }

  startMediaRecorder() {
    if (this.state.media_recorder) {
      this.state.media_recorder.start()
      this.state.media_recorder.addEventListener('dataavailable', (data) => this.onMediaRecorderDataAvailable(data))
    }
  }

  onMediaRecorderDataAvailable({ data } = {}) {
    this.records.append(new DownloadLinkComponent({
      text: Date.now() + '.webm',
      href: window.URL.createObjectURL(data)
    }))
  }
}
