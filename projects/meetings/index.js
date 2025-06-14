import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { HeaderComponent } from '../../assets/js/components/header.component.js'
import { FooterComponent } from '../../assets/js/components/footer.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { CalendarComponent } from '../../assets/js/components/calendar.component.js'

export class Page extends HTML {
  event_type = new HTML()
  calendar = new CalendarComponent()
  payment_buttons = new HTML()

  onCreate() {
    super.onCreate()
    this.append(new HeaderComponent())
    this.append(this.getBody())
    this.append(new FooterComponent())
  }

  getBody() {
    const html = new HTML()
    html.append(this.getEventTypeHTML())
    html.append(this.getCalendarHTML())
    html.append(this.getPaymentButtons())
    return html
  }

  getEventTypeHTML() {
    this.event_type.append(this.getCreateMeetingEventButton())
    return this.event_type
  }

  getCreateMeetingEventButton() {
    return new ButtonComponent({ text: 'Meeting', onclick: () => this.onCreateMeetingEventButtonClick() })
  }

  onCreateMeetingEventButtonClick() {
    this.event_type.setStyle('display', 'none')
    this.calendar.setStyle('display', 'block')
  }

  getCalendarHTML() {
    this.calendar.setStyle('display', 'none')
    this.calendar.addEventListener('change', ({ value }) => this.onCalendarChange({ value }))
    return this.calendar
  }

  onCalendarChange({ value } = {}) {
    console.log('on Calendar Change', { value })
  }

  getPaymentButtons() {
    this.payment_buttons.setStyle('display', 'none')
    return this.payment_buttons
  }
}
