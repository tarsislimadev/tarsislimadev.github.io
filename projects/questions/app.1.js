import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { initializeApp } from '../../assets/js/apis/firebase/app/index.js'
import { getFirestore } from '../../assets/js/apis/firebase/firestore/index.js'
import { getDatabase, ref, onValue } from '../../assets/js/apis/firebase/database/index.js'
import firebase from '../../assets/js/config/firebase/index.js'
import * as URL_UTILS from '../../assets/js/utils/url.js'
import * as FLOW from '../../assets/js/utils/flow.js'

export class Page extends PageComponent {
  questions = null
  question = new HTML()
  state = {
    app: null,
    db: null,
    database: null,
    history: [],
    index: -1
  }
  options = []

  init() {
    this.state.app = initializeApp(firebase)
    this.state.db = getFirestore(this.state.app)
    this.state.database = getDatabase(this.state.app)
  }

  getRef(path = '') {
    return ref(this.state.database, '/questions' + path)
  }

  checkOption(answer) {
    const question = this.questions[this.state.index]
    this.state.history.push({ answer, question })
    this.nextQuestion()
  }

  nextQuestion() {
    this.state.index = Math.floor(Math.random() * this.questions.length)
    const question = this.questions[this.state.index]
    this.question.clear()
    this.question.append(new TextComponent({ text: question.question }))
    Array.from(question.options).map((option, option_index) => {
      this.question.append(new ButtonComponent({
        text: option,
        onclick: () => this.checkOption(option_index)
      }))
    })
  }

  onCreate() {
    super.onCreate()
    this.init()
    this.append(new TextComponent({ text: 'Questions' }))
    this.append(this.question)
    const searchParam = URL_UTILS.getURLSearchParam('questions')
    if (searchParam) {
      onValue(this.getRef('/' + searchParam), (data) => {
        const value = data.val()
        console.log({ value })
        this.questions = Array.from(value)
        this.nextQuestion()
      })
    } else {
      const html = new HTML()
      this.append(html)
      onValue(this.getRef(), (data) => {
        Object.keys(data.val()).map((key) => {
          const url = new URL(window.location)
          url.searchParams.set('questions', key)
          html.append(new ButtonComponent({
            text: key,
            onclick: () => FLOW.goTo(url.toString())
          }))
        })
      }, { onlyOnce: true })
    }
  }
}
