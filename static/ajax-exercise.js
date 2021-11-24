'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // get the fortune and show it in the #fortune-text div
  fetch('/fortune')
    .then(response => response.text())
    .then(fortuneText => {
      document.querySelector('#fortune-text').innerHTML = fortuneText;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER


function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json'; 
  const zipcode = document.querySelector('#zipcode-field').value;

  // request weather with that URL and show the forecast in #weather-info
  const newUrl = url + `?zipcode=${zipcode}`;

  fetch(newUrl)
    .then(response => response.json())
    .then(weatherData => {
      // {temp: TEMP, forecast: FORECAST}
      document.querySelector('#weather-info').innerHTML = weatherData.forecast;
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

  // <input class="form-control" type="number" name="qty" id="qty-field">
  // <select id="melon-type-field" name="melon_type" class="form-control"> 
  const formInputs = {
    qty: document.querySelector('#qty-field').value,
    melon_type: document.querySelector('#melon-type-field').value,
  };

  // fetch at /order-melons.json POST 
  fetch('/order-melons.json', 
      { method: 'POST',
        body: JSON.stringify(formInputs),
        headers: { 'Content-Type': 'application/json', },
      } // then JSON response use .json()
  ).then(response => response.json())
  // then data {'code': result_code, 'msg': result_text}
  .then(data => {
      // get code and msg values
      const code = data.code;
      const msg = data.msg;
      // put msg in #order-status div
      const order_div = document.querySelector('#order-status');
      order_div.innerHTML = msg;
      // if code is ERROR
      if (code === 'ERROR') {
          // change #order-status div message to red 
          order_div.classList.add('order-error');
      } else if (code === 'OK') {
          order_div.classList.remove('order-error');
      }
  });

}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
