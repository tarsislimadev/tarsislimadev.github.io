import { HTML } from '../../../assets/js/libs/afrontend/index.js'

export class VideoComponent extends HTML {
  getName() { return 'video-component' }

  getTagName() { return 'video' }

  srcObject(srcObject) {
    this.element.srcObject = srcObject
  }

  play() {
    this.element.play()
  }
}
