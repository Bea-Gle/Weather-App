const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getUserDateAndTime() {
  let currentDate = new Date();
  let day = daysOfWeek[currentDate.getDay()];
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDateAndTime = document.querySelector("#current-date");
  currentDateAndTime.innerHTML = `${day} ${hour}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}°C`;

  let cityElement = document.querySelector("#cityTitle");
  cityElement.innerHTML = response.data.city;

  let humidityElement = document.querySelector("#humidityLevel");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  let windSpeedElement = document.querySelector("#windSpeed");
  let windSpeed = Number(response.data.wind.speed.toFixed(1));
  windSpeedElement.innerHTML = `${windSpeed}Km/h, `;
}

function searchCity(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#current-city");
  let city = searchElement.value;

  let apiKey = "bd2036e762d49e98974d9f9btbo13a6a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#searchCity");
form.addEventListener("submit", searchCity);

getUserDateAndTime();
