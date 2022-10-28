const $result = document.getElementById("result");
const $form = document.getElementById("get_weather");
const $city = document.getElementById("city");
const $country = document.getElementById("country");


$form.addEventListener("submit", (e)=>{
  e.preventDefault();

  if ($city.value === "" || $country === "") {
    showError("Ambos campos son obligatorios...")
    return;
  }

  callAPI($city.value, $country.value);

  //console.log($city.value);
  //console.log($country.value);
})

function callAPI($city, $country) {
  const apiId = '2ebdac1a72fa89de2620a0c736558fef';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${$city},${$country}&appid=${apiId}`;

  fetch(url)
  .then((data)=>{
    return data.json();
  })
  .then((dataJSON)=>{
    if (dataJSON.cod === "404") {
      showError('Ciudad no encontrada...')
    } else {
      clearHTML();
      showWeather(dataJSON);
    }
    console.log(dataJSON);
  })
  .catch(error =>{
    console.log(error);
  })
}

function showWeather(data) {
  const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
  const degress = kelvinToCentigrade(temp);
  const min = kelvinToCentigrade(temp_min);
  const max = kelvinToCentigrade(temp_max);

  const content = document.createElement("div");
  content.innerHTML = `
  <h4 class = "weather_city">Clima en ${name}</h4>
  <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon" class ="icon">
  <h2 class="temp">${degress}°C</h2>
  <p class="temp_max">Max: ${max}°C</p>
  <p class="temp_min">Min: ${min}°C</p>
  `;
  $result.appendChild(content);

/*   console.log(name);
  console.log(temp);
  console.log(temp_max);
  console.log(temp_min);
  console.log(arr.icon); */
}

function showError(message) {
  console.log(message);
  const alert = document.createElement("p");
  alert.classList.add("alert_message");
  alert.innerHTML = message;

  $form.appendChild(alert);
  setTimeout(()=>{
    alert.remove();
  }, 2000);
}

function kelvinToCentigrade(temp) {
  return parseInt(temp - 273.15);
}

function clearHTML() {
  $result.innerHTML = '';
}