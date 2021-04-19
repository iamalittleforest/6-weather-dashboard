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
    fetchWeather(searchCity);
    saveSearch(searchCity);
    searchInputEl.value = "";
  } else {
    alert("Field cannot be left blank");
  }
}

// fetch weather
function fetchWeather(searchCity) {

  // API call uses city to fetch weather info
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function(response) {
      response.json().then(function(data) {
        console.log(data);
        renderWeather(data, searchCity);
      });
    });
}

// render weather
function renderWeather(weather, searchCity) {
  
  // render each element within the weather container
  var weatherEl = $("#weather-container");
  weatherEl.addClass("show");
  
  var cityNameEl = $("#city-name");
  cityNameEl.text(searchCity);
  
  var currentDateEl = $("#current-date");
  var currentDate = moment().format("M/D/YYYY");
  currentDateEl.text(`(${currentDate})`);

  var currentIconEl = $("#current-icon");
  currentIconEl.attr("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
  
  var cityTempEl = $("#city-temperature");
  cityTempEl.text(weather.main.temp);

  var cityHumidityEl = $("#city-humidity");
  cityHumidityEl.text(weather.main.humidity);

  var cityWindEl = $("#city-wind-speed");
  cityWindEl.text(weather.wind.speed);

  // store latitude and longitude for future use
  var cityLat = weather.coord.lat;
  var cityLon = weather.coord.lon;

  fetchUvIndex(cityLat, cityLon);
  fetchForecast(cityLat, cityLon);
}


// fetch UV index
function fetchUvIndex(cityLat, cityLon) {

  // API call uses latitude and longitude to fetch uv index
  var apiUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`;

  fetch(apiUrl)
  .then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      renderUvIndex(data);
    });
  });
}

// render UV index
function renderUvIndex(currentCity) {

  var cityUvEl = $("#city-uv-index");
  cityUvEl.text(currentCity.value);

  // color code UV index based on value
  if (currentCity.value <=2) {
    cityUvEl.addClass("favorable");
  } else if (currentCity.value >2 && currentCity.value <= 7) {
    cityUvEl.addClass("moderate");
  } else {
    cityUvEl.addClass("severe");
  }
}


// fetch forecast
function fetchForecast(cityLat, cityLon) {

  // API call uses latitude and longitude to fetch forecast info
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
  .then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      renderForecast(data);
    });
  });
}

// render forecast
function renderForecast(forecast) {
  
  // var forecast = forecastWeather.list;

  // for (var i=0; forecast.length; i++) {

    
  // var forecastEl = $(".forecast");

  // var currentDateEl = $("#current-date");
  // var currentDate = moment().format("M/D/YYYY");
  // currentDateEl.text(forecast.daily[0].dt);

  // var currentIconEl = $("#current-icon");
  // currentIconEl.attr("src", `https://openweathermap.org/img/wn/${forecast.daily[0].weather[0].icon}.png`)
  
  // var cityTempEl = $("#city-temperature");
  // cityTempEl.text(forecast.daily[0].temp.day);

  // var cityHumidityEl = $("#city-humidity");
  // cityHumidityEl.text(forecast.daily[0].humidity);
  // }
}

// save search to history
function saveSearch(searchCity) {
  searchHistory.push(searchCity);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  renderSearch();
}

// render search history
function renderSearch() {

  // var savedCities = JSON.parse(localStorage.getItem("searchHistory"));
  
  // // checks to see if data is stored in localStorage
  // if (savedCities !== null) {
  //     searchHistory = savedCities;
  // } else {
  //     searchHistory = [];
  // }

  // var searchList = $(".search-history")

  // for (var i = 0; i < searchHistory.length; i++) {
  //   var cityBtn = $("<button>");
  //   cityBtn.text = `${searchHistory[i]}`;
  //   cityBtn.attr("data-index", i);
  //   cityBtn.addClass("list-group-item", "list-group-item-action");
  //   searchList.append(cityBtn);
  // }  
}



// city selected from search history pulls current weather and forecast of the city
// var historyBtnEl = $("#search-history");
// historyBtnEl.aon("click", historyHandler);

// function historyHandler(event) {
//   event.preventDefault();
// }
