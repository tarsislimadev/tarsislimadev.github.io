import { HTML, nH1, nInput, nFlex } from '../../assets/js/libs/frontend/index.js'

class nError extends HTML { }

class nInputText extends nInput { }

const app = HTML.fromId('app')
app.setStyle('font', 'monospace')

const title = new nH1()
title.setText('Market')
title.setStyle('text-align', 'center')
title.setStyle('margin-bottom', '1rem')
app.append(title)

const errorMessage = new nError()
app.append(errorMessage)

const input = new nFlex()
input.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 16) #000000')
app.append(input)

const inputText = new nInputText()
input.append(inputText)

const inputButton = new HTML()
inputButton.setText('search')
inputButton.addEventListener('click', () => {
  const search = inputText.getText()
  API.productsSearch({ search })
    .then((res) => renderList(res.get('list')))
    .catch((err) => errorMessage.setText(err.message))
})
inputButton.setStyle('padding', '0.5rem')
input.append(inputButton)

const arrItems = []

const listEl = new HTML()
listEl.append((new HTML()).setText('...').setStyle('text-align', 'center'))
app.append(listEl)

const stringifyPrice = (price = 0) => `R$ ${price.toFixed(2)}`

const renderList = (list = []) => {
  const now = Date.now()

  listEl.clear()

  list.forEach((item, ix) => {
    if (!item.name) return

    const itemEl = new HTML()
    itemEl.setStyle('padding', '0.5rem 0rem')

    const photoEl = new nImage()
    photoEl.src(item.photos[0])
    itemEl.append(photoEl)

    const textEl = new HTML()
    textEl.setText(item.name)
    itemEl.append(textEl)

    item.prices.forEach((price) => {
      const priceEl = new nFlex()
      priceEl.setStyle('margin-top', '1rem')

      const pricePlaceEl = new HTML()
      pricePlaceEl.setText((price.place))
      priceEl.append(pricePlaceEl)

      const priceValueEl = new HTML()
      priceValueEl.setText(stringifyPrice(price.value))
      priceEl.append(priceValueEl)

      itemEl.append(priceEl)
    })

    const buttons = new nFlex()

    const addNewButton = (text, onclick = () => { }) => {
      const button = new HTML()

      button.setText(text)
      button.addEventListener('click', () => onclick())

      button.setStyle('padding', '1rem 0rem')

      buttons.append(button)
    }

    addNewButton('show', () => { })
    addNewButton('add', () => { })

    // itemEl.append(buttons)

    listEl.append(itemEl)
  })
}

// API.productsList()
Promise.resolve({ get: () => Array.from([]) })
  .then((res) => renderList(res.get('list')))
