// define global variables
var searchHistory = [];
const apiKey = "a57dbe6e264ba286bdc558c04ad72f43";


// submit button pulls weather and forecast of the city and adds it to the search history
var submitBtnEl = $("#search-button");
submitBtnEl.on("click", searchHandler);

function searchHandler(event) {
  event.preventDefault();

  var searchInputEl = document.querySelector("#search-city");
  var searchCity = searchInputEl.value.trim();

  if(searchCity) {
    getWeather(searchCity);
  } else {
    alert("Field cannot be left blank");
  }
}

// get weather
function getWeather(searchCity) {

  var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function(response) {
      response.json().then(function(data) {
        console.log(data);
        renderWeather(data, searchCity);
      });
    });
}

// render weather
function renderWeather(currentWeather, searchCity) {
  
  // render each element within the weather container
  var weatherEl = $("#weather-container");
  weatherEl.addClass("show");
  
  var cityNameEl = $("#city-name");
  cityNameEl.text(searchCity);
  
  var currentDateEl = $("#current-date");
  var currentDate = moment().format("M/D/YYYY");
  currentDateEl.text(`(${currentDate})`);

  var currentIconEl = $("#current-icon");
  currentIconEl.attr("src", `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`)
  
  var cityTempEl = $("#city-temperature");
  cityTempEl.text(currentWeather.main.temp);

  var cityHumidityEl = $("#city-humidity");
  cityHumidityEl.text(currentWeather.main.humidity);

  var cityWindEl = $("#city-wind-speed");
  cityWindEl.text(currentWeather.wind.speed);

  // var cityUvEl = $("#city-uv-index");
}

// get forecast
function getForecast() {

}

// render forecast
function renderForecast() {

}

// save search to history
function saveSearch(searchCity) {
  searchHistory.push(searchCity);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// render search history



// city selected from search history pulls current weather and forecast of the city
// var historyBtnEl = $("#search-history");
// historyBtnEl.aon("click", historyHandler);

// function historyHandler(event) {
//   event.preventDefault();
// }
