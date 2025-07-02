import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextAreaElement } from '../../assets/js/elements/text.area.element.js'
import { TextButtonElement } from '../../assets/js/elements/text.button.element.js'
import { TextElement } from '../../assets/js/elements/text.element.js'
import { FirebaseHelper } from '../../assets/js/helpers/firebase.helper.js'

export class Page extends PageComponent {
  text_area = new TextAreaElement({ placeholder: 'text', styles: { width: '80%' } })
  firebase_helper = new FirebaseHelper('texts')

  onCreate() {
    super.onCreate()
    this.append(new TextElement({ text: 'texts' }))
    this.append(this.text_area)
    this.append(new TextButtonElement({ text: 'save', onclick: () => this.onSubmitButtonComponentClick() }))
  }

  onSubmitButtonComponentClick() {
    this.firebase_helper.save({
      text: this.text_area.getValue(),
      datetime: Date.now().toString()
    })
      .then(() => { alert('Document successfully written!') })
      .then(() => { this.text_area.setValue('') })
      .catch((err) => { alert('Error writing document: ' + err.message) })
  }
}
