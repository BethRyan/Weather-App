//CURRENT TIME AND DAY
function jumbotronClock() {
  let time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let temp = "" + (hour > 12 ? hour - 12 : hour);
  if (hour === 0) temp = "12";
  temp += (minute < 10 ? ":0" : ":") + minute;
  temp += hour >= 12 ? " P.M." : " A.M.";
  return temp;
}
let now = new Date();
let dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function jumbotronTimeDate() {
  let day = dayName[now.getDay()];
  let dayDisplay = document.querySelector("#day");
  let time = document.querySelector("#time");
  dayDisplay.innerHTML = day;
  time.innerHTML = jumbotronClock();
}

//API FUNCTION IN JUMBROTRON
function displayJumbotron(response) {
  let currentTemp = document.querySelector("#current-degrees");
  let currentCity = document.querySelector("#city");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#condition");
  let feelsLike = document.querySelector(".feelsTemp");
  let weatherIcon = document.querySelector("#weather-icon");

  farhrenheitTemperature = response.data.main.temp;

  currentTemp.innerHTML = Math.round(farhrenheitTemperature);
  currentCity.innerHTML = response.data.name;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}mph`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  description.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°F`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

//API FUNCTION FORECAST ROW
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  console.log(forecast);

  forecastElement.innerHTML = `
  <div class="col-3">
    <h3>
      12:00
      </h3>
    <img 
    src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
      <div class="forecast-temp">
        <strong>${Math.round(forecast.main.temp_max)}°</strong>${Math.round(
    forecast.main.temp_min
  )}°
            </div>
        </div>
  </div>`;
}

//CURRENT LOCATION BUTTON
function displayCoordTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "419fb4560d921e7e18ca1ed3261fc38f";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayJumbotron).then(jumbotronTimeDate);
}
function findCoords() {
  navigator.geolocation.getCurrentPosition(displayCoordTemp);
}
let currentLocation = document.querySelector("#currentloc-button");
currentLocation.addEventListener("click", findCoords);

//INPUT FROM SEARCH BAR
function displaySearchTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let apiKey = "419fb4560d921e7e18ca1ed3261fc38f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayJumbotron).then(jumbotronTimeDate);
}
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", displaySearchTemp);

//DEFAULT PAGE LOAD VIEW
function defaultCity(city) {
  let apiKey = "419fb4560d921e7e18ca1ed3261fc38f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayJumbotron).then(jumbotronTimeDate);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayForecast);
}

//UNIT CONVERSION
function displayCelsiusTemp(event) {
  event.preventDefault();
  let celTemp = ((farhrenheitTemperature - 32) * 5) / 9;
  celLink.classList.add("active");
  farLink.classList.remove("active");
  let celTempElement = document.querySelector("#current-degrees");
  celTempElement.innerHTML = Math.round(celTemp);
}

function displayFarhenheitTemp(event) {
  event.preventDefault();
  farLink.classList.add("active");
  celLink.classList.remove("active");
  let farTempElement = document.querySelector("#current-degrees");
  farTempElement.innerHTML = Math.round(farhrenheitTemperature);
}

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", displayCelsiusTemp);

let farLink = document.querySelector("#far");
farLink.addEventListener("click", displayFarhenheitTemp);

let farhrenheitTemperature = null;

defaultCity("New York");
