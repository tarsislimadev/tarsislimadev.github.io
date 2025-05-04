const state = {
  symbol: 'USDTBRL',
  running: false,
  ids: [],
}

const request = () => fetch(`https://api2.binance.com/api/v3/klines?symbol=${state.symbol}&interval=1m&limit=1`)
  .then(res => res.json())
  .then(([[time, price]]) => `${state.symbol} is ${price} at ${time}`)
  .then(text => self.postMessage(text.toString()))
  .catch(err => console.error(err))

const run = () => {
  request()

  const id = setInterval(() => {
    if (state.running) request()
  }, 1000 * 60 * 5)

  state.ids.push(id)

  state.running = true
}

const stop = () => {
  state.running = false

  state.ids.map((id) => clearInterval(id))
}

//

self.addEventListener('message', ({ data }) => {
  const json = JSON.parse(data)
  console.log('Message from client', { json })
  switch (json['message']) {
    case 'run': return run()
    case 'stop': return stop()
  }
})

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v20250504').then((cache) => {
      return cache.addAll([
        '/index.worker.html',
        '/styles.worker.css',
        '/script.worker.js',
        '/icon.png',
      ])
    })
  )
  self.skipWaiting()
})
