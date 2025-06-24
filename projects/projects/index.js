import { HTML } from '../../assets/js/libs/afrontend/index.js'
import { ColumnComponent } from '../../assets/js/components/column.component.js'
import { ButtonComponent } from '../../assets/js/components/button.component.js'
import { PageComponent } from '../../assets/js/components/page.component.js'
import { TextComponent } from '../../assets/js/components/text.component.js'
import { RowComponent } from '../../assets/js/components/row.component.js'
import { TextareaComponent } from '../../assets/js/components/textarea.component.js'

import * as URL from '../../assets/js/utils/url.js'

import { FirebaseHelper } from '../../assets/js/helpers/firebase.helper.js'

const firebase = new FirebaseHelper('projects')

class TopBarComponent extends ColumnComponent {
  constructor({ id } = {}) {
    super([
      new TextComponent({ text: 'projects' }),
      new ColumnComponent([
        new ButtonComponent({ text: 'create new', onclick: () => this.onCreateNewButtonClick() }),
        new ButtonComponent({ text: 'save this', onclick: () => this.onSaveButtonClick() }),
      ])
    ])
    this.id = id
  }

  onCreateNewButtonClick() { }

  onSaveButtonClick() { }
}

class HtmlEditorComponent extends TextareaComponent { }

class JavascriptEditorComponent extends TextareaComponent { }

class CssEditorComponent extends TextareaComponent { }

class ViewerComponent extends HTML { }

class LeftSideComponent extends RowComponent {
  constructor() {
    super([
      new HtmlEditorComponent(),
      new JavascriptEditorComponent(),
    ])
  }
}

class RightSideComponent extends RowComponent {
  constructor() {
    super([
      new CssEditorComponent(),
      new ViewerComponent(),
    ])
  }
}

class CodeComponent extends ColumnComponent {
  constructor({ id } = {}) {
    super([
      new LeftSideComponent(),
      new RightSideComponent(),
    ])
    this.id = id
  }
}

export class Page extends PageComponent {
  onCreate() {
    super.onCreate()
    const id = URL.getURLSearchParam('id')
    if (id) {
      this.append(
        new RowComponent([
          new TopBarComponent({ id }),
          new CodeComponent({ id }),
        ]))
    } else {
      this.append(new ButtonComponent({ text: 'create new', onclick: () => this.onCreateNewButtonClick() }))
    }
  }

  onCreateNewButtonClick() {
    firebase.save({}).then((saved) => {
      console.log({ saved })
      // window.location.href = URL.createURL({ search: { id: '' } })
    })
  }
}
