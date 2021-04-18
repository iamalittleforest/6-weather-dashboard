// submit button pulls weather and forecast of the city and adds it to the search history
var submitBtnEl = document.querySelector("#search-button");
submitBtnEl.addEventListener("click", searchHandler);

function searchHandler(event) {
  event.preventDefault();

  var searchInputEl = document.querySelector("#search-city");
  var searchCity = searchInputEl.value.trim();
}

// get weather
function getWeather() {
  var apiKey = "a57dbe6e264ba286bdc558c04ad72f43";
  var apiUrl = `http://api.openweathermap.org/data/2.5/weater?q=${searchEl}&appid=${apiKey}`;
}

// render weather
function renderWeather() {

}

// get forecast
function getForecast() {

}

// render forecast
function renderForecast() {

}

// save search to history
function saveSearch() {

}

// city selected from search history pulls current weather and forecast of the city
var historyBtnEl = document.querySelector("#search-history");
historyBtnEl.addEventListener("click", historyHandler);

function historyHandler(event) {
  event.preventDefault();
}
