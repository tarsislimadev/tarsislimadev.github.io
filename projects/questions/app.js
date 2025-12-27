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
  state = { app: null, db: null, database: null, }
  answers = []

  init() {
    this.state.app = initializeApp(firebase)
    this.state.db = getFirestore(this.state.app)
    this.state.database = getDatabase(this.state.app)
  }

  getRef(path = '') {
    return ref(this.state.database, '/questions' + path)
  }

  toogleAnswer(ix) {
    // FIXME
  }

  checkAnswer() {
    // FIXME
  }

  nextQuestion() {
    const index = Math.floor(Math.random() * this.questions.length)
    const question = this.questions[index]
    this.question.clear()
    this.question.append(new TextComponent({ text: question.question }))
    Array.from(question.answers).map((answer, answer_index) => {
      this.question.append(new ButtonComponent({
        text: answer,
        onclick: () => this.toogleAnswer(answer_index)
      }))
    })
    this.question.append(new ButtonComponent({ text: 'Vai!', onclick: () => this.checkAnswer() }))
  }

  onCreate() {
    super.onCreate()
    this.init()
    this.append(new TextComponent({ text: 'Questions' }))
    this.append(this.question)
    const searchParam = URL_UTILS.getURLSearchParam('questions')
    const html = new HTML()
    this.append(html)
    if (searchParam) {
      onValue(this.getRef('/' + searchParam), (data) => {
        html.append(new TextComponent({ text: `Questions about ${searchParam}` }))
        html.append(new ButtonComponent({ text: 'Play', onclick: () => [html.clear(), this.nextQuestion()] }))
        this.questions = data.val()
        console.log({ questions: this.questions })
      })
    } else {
      onValue(this.getRef(), (data) => {
        Object.keys(data.val()).map((key) => {
          const url = new URL(window.location)
          url.searchParams.set('questions', key)
          html.append(new ButtonComponent({
            text: key,
            onclick: () => FLOW.goTo(url.toString())
          }))
        })
      }, {
        onlyOnce: true
      })
    }
  }
}
