import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { MessageModel } from '../models/message.model.js'
import { TextComponent } from '../../../assets/js/components/text.component.js'

export class MessageComponent extends HTML {
  message = new MessageModel()

  constructor(message = new MessageModel()) {
    super()
    this.message = message
  }

  onCreate() {
    super.onCreate()
    if (this.message.text) this.append(new TextComponent(this.message.text))
  }
}
