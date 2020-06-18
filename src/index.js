//CURRENT TIME AND DAY
//CURRENT TIME AND DAY
function jsClock() {
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
let day = dayName[now.getDay()];
let dateTimeOutput = document.querySelector("#date-time");
dateTimeOutput.innerHTML = `${day} ${jsClock()}`;

//WEATHER API INPUT FROM SEARCH BAR
//WEATHER API INPUT FROM SEARCH BAR
function searchInfo(response) {
  let showTemp = document.querySelector("#current-degrees");
  let temperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let cityHeader = document.querySelector("#city");
  cityHeader.innerHTML = currentCity;
  showTemp.innerHTML = temperature;
  let windSpeed = document.querySelector("#wind-speed");
  let wind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${wind}mph`;
  let humidity = document.querySelector("#humidity");
  let humid = response.data.main.humidity;
  humidity.innerHTML = `${humid}%`;
  let condition = document.querySelector("#condition");
  let weatherCondition = response.data.weather[0].main;
  condition.innerHTML = weatherCondition;
  let feelsLike = document.querySelector(".feelsTemp");
  let feels = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `${feels}°`;
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let apiKey = "419fb4560d921e7e18ca1ed3261fc38f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(searchInfo);
}
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", searchCity);

//CURRENT LOCATION COORDS and CHANGE CURRENT TEMP
//CURRENT LOCATION COORDS and CHANGE CURRENT TEMP
function showTemperature(response) {
  let showTemp = document.querySelector("#current-degrees");
  let temperature = Math.round(response.data.main.temp);
  let currentLocCity = response.data.name;
  let cityHeader = document.querySelector("#city");
  cityHeader.innerHTML = currentLocCity;
  showTemp.innerHTML = temperature;
  let windSpeed = document.querySelector("#wind-speed");
  let wind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${wind}mph`;
  let humidity = document.querySelector("#humidity");
  let humid = response.data.main.humidity;
  humidity.innerHTML = `${humid}%`;
  let condition = document.querySelector("#condition");
  let weatherCondition = response.data.weather[0].main;
  condition.innerHTML = weatherCondition;
  let feelsLike = document.querySelector(".feelsTemp");
  let feels = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `${feels}°`;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "419fb4560d921e7e18ca1ed3261fc38f";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(showTemperature);
}
function findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", findCurrentLocation);
