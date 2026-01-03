import { Peer } from '../../assets/js/libs/peerjs/index.js'

const et = new EventTarget()

const peer = new Peer()

peer.on('open', () => {
  const conn = peer.connect(getIdByUrl())

  conn.on('open', () => et.addEventListener('btnclick', (ev) => conn.send(ev.value)))
})

const getIdByUrl = () => (new URL(window.location)).searchParams.get('id')

Array.from(['up', 'down', 'left', 'right']).map((str) => {
  const btn = document.createElement('button')

  btn.innerText = str

  btn.addEventListener('click', () => {
    const ev = new Event('btnclick')
    ev.value = str
    et.dispatchEvent(ev)
  })

  document.body.append(btn)
})
