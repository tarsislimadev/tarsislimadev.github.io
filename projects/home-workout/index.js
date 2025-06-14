import { HTML, nFlex, nH1, nLink, nH2 } from '../../assets/js/libs/afrontend/index.js'
import { ChallengeListComponent } from './components/challenge.list.component.js'
import * as API from './utils/api.js'

import { padLeft } from './../../assets/js/utils/str.js'

class CardHTML extends HTML {
  state = {
    num: 0,
    text: '',
  }

  num = new HTML()
  text = new HTML()

  constructor(num = 0, text = '') {
    super()
    this.state.num = num
    this.state.text = text
  }

  onCreate() {
    super.onCreate()
    this.append(this.getNumHTML())
    this.append(this.getTextHTML())
  }

  getNumHTML() {
    this.num.setText(padLeft(this.state.num, 2, '0'))
    return this.num
  }

  getTextHTML() {
    this.text.setText(this.state.text)
    return this.text
  }
}

export class Page extends HTML {
  errorMessage = new HTML()
  header = new HTML()
  resume = new HTML()
  goals = new HTML()
  challenges = new HTML()
  challengesList = new HTML()

  onCreate() {
    this.append(this.getHeader())
    this.append(this.getErrorMessage())
    this.append(this.getResume())
    this.append(this.getChallenges())

    this.appendChallengesList()
  }

  getHeader() {
    const title = new nH1()
    title.setText('Home Workout')
    title.setStyle('margin', '0rem')
    this.header.append(title)
    this.header.setStyle('padding', '1rem')
    return this.header
  }

  getErrorMessage() {
    return this.errorMessage
  }

  getResume() {
    const flex = new nFlex()
    flex.append(new CardHTML(0, 'minutes'))
    flex.append(new CardHTML(0, 'workouts'))
    flex.append(new CardHTML(0, 'kcal'))
    this.resume.append(flex)
    this.resume.setStyle('text-align', 'center')
    this.resume.setStyle('padding', '1rem')
    return this.resume
  }

  getChallenges() {
    const title = new nH2()
    title.setText('Challenges')
    this.challenges.append(title)
    this.challenges.append(this.challengesList)
    this.challenges.setStyle('margin', '1rem')
    return this.challenges
  }

  appendChallengesList() {
    API.getChallengesList()
      .then((res) => {
        this.challengesList.clear()
        res.get('list')
          .map((item) => new ChallengeListComponent(item))
          .map((challenge) => this.challengesList.append(challenge))
      })
      .catch((err) => this.errorMessage.setText(err.message))
  }
}
