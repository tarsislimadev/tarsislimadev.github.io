document.body.style.margin = '0rem'

const app = document.getElementById('app')

const props = {
  height: () => 600,
  width: () => 400,
  head_w: () => 300,
  head_h: () => 30,
  head_x: () => (props.width() / 2) - (props.head_w() / 2),
  head_y: () => 20,
}

const canvas = document.createElement('canvas')

canvas.height = props.height()
canvas.width = props.width()

canvas.style.boxShadow = '0rem 0rem 1rem 0rem #000000'
canvas.style.margin = '1rem'

app.append(canvas)

canvas.addEventListener('click', ({ clientX, clientY }) => onClick({ clientX, clientY }))

const onClick = ({ clientX, clientY } = {}) => {
  console.log({ clientX, clientY })
}

const ctx = canvas.getContext('2d')

const drawHead = () => {
  ctx.fillStyle = 'black'
  ctx.fillRect(props.head_x(), props.head_y(), props.head_w(), props.head_h())
  ctx.fill()
}

const drawLine = (index = 0) => {
  const w = 2
  const h = 600
  const x = props.head_x() + (props.head_w() / 5 * index)
  const y = 20

  ctx.fillStyle = 'black'
  ctx.fillRect(x, y, w, h)
  ctx.fill()
}

const draw = () => {
  drawHead()

  Array.from(Array(6)).map((_, i) => drawLine(i))
}

draw()
