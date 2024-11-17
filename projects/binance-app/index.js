
document.getElementById('chart_btn').addEventListener('click', () => klines())

const klines = () => fetch('https://api4.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=10', {
  mode: 'cors',
  method: 'GET',
})
  .then((res) => res.json())
  .then((json) => {
    const _data = Array.from(json).map(([
      Kline_open_time,
      Open_price,
      High_price,
      Low_price,
      Close_price
    ]) => ([
      +Kline_open_time,
      +Open_price,
      +High_price,
      +Low_price,
      +Close_price,
    ]))

    var data = google.visualization.arrayToDataTable(_data, true);

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

    chart.draw(data, { legend: 'none' });
  })

google.charts.load('current', { 'packages': ['corechart'] });
