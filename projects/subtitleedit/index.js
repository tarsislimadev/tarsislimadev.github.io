import { HTML } from '../../assets/js/libs/frontend/index.js'
import { TwoColumnsComponent } from '../../assets/js/components/two.columns.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { InputComponent } from '../../assets/js/components/input.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { InputFileComponent } from './input.file.component.js'

class SubtitlesEditor extends HTML {
  children = {
    input_file: new InputFileComponent(),
    text: new HTML(),
  }

  state = {
    texts: [],
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'Subtitles Editor' }))
    this.append(this.getInputFileComponent())
    this.append(this.getText())
  }

  getText() {
    return this.children.text
  }

  getInputFileComponent() {
    this.children.input_file.addEventListener('change', () => this.readFile(this.children.input_file.element.files[0]))
    return this.children.input_file
  }

  readFile(file = new File) {
    const reader = new FileReader()
    reader.addEventListener('loadend', () => this.setTexts(reader.result, file.type))
    reader.readAsText(file)
  }

  setTexts(text, type = 'text/plain') {
    switch (type) {
      case 'text/plain': this.setTextPlain(text); break;
      default: alert('not a .txt file'); break;
    }
  }

  setTextPlain(text = '') {
    this.state.texts = text.toString().split(/\r?\n/ig)
    this.update()
  }

  update() {
    this.children.text.setText(this.state.texts.join(' --- '))
  }
}

class VideoPlayer extends HTML {
  children = {
    url: new InputComponent({ label: 'video url', placeholder: 'https://youtu.be/Vtot7ZVXHHU' }),
    button: new ButtonComponent({ text: 'load video', onclick: () => this.onLoadVideoClick() }),
  }

  onLoadVideoClick() {
    console.log('on load video click')
  }

  onCreate() {
    super.onCreate()
    this.append(new TextComponent({ text: 'Video Player' }))
    this.append(this.getURL())
    this.append(this.getButton())
  }

  getURL() {
    return this.children.url
  }

  getButton() {
    return this.children.button
  }
}

export class Page extends PageComponent {
  children = {
    subtitles_editor: new SubtitlesEditor(),
    video_player: new VideoPlayer(),
  }

  state = {
    subtitles: {},
    video: { url: '', },
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTwoColumns())
  }

  getTwoColumns() {
    return new TwoColumnsComponent({
      html1: this.getSubtitlesEditor(),
      html2: this.getVideoPlayer(),
      widths: ['50%', '50%'],
    })
  }

  getSubtitlesEditor() {
    return this.children.subtitles_editor
  }

  getVideoPlayer() {
    return this.children.video_player
  }
}
