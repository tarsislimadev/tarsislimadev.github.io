import { TextComponent } from '../../../assets/js/components/text.component.js'
import { SelectComponent } from '../../../assets/js/components/select.component.js'
import { RangeComponent } from '../../../assets/js/components/range.component.js'
import * as COMPONENTS from '../../../assets/js/components/inputs.component.js'

export class InputsComponent extends COMPONENTS.InputsComponent {
  components = {
    text: new TextComponent({ label: 'text' }),
    model_id: new SelectComponent({ label: 'model_id', options: this.getModelsList().map((s) => ([s, s])) }),
    voice_id: new SelectComponent({ label: 'voice_id', options: this.getVoicesList() }),
    stability: new RangeComponent({ label: 'stability', min: 0, max: 1, step: 0.01 }),
    language_code: new SelectComponent({ label: 'language_code', options: this.getLanguagesList().map((s) => ([s, s])) }),
  }

  getModelsList() {
    return [
      'eleven_multilingual_v2'
    ]
  }

  getVoicesList() {
    return [
      ['9BWtsMINqrJLrRacOk9x', 'Aria'],
    ]
  }

  getLanguagesList() {
    return [
      'portuguese',
      'english',
      'spanish',
      'french',
      'german',
      'italian',
      'russian',
      'korean',
      'japanese',
      'chinese',
      'hindi',
    ]
  }
}
