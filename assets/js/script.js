// define global variables
var searchHistory = [];
const apiKey = "a57dbe6e264ba286bdc558c04ad72f43";


// submit button pulls weather and forecast of the city and adds it to the search history
var submitBtnEl = $("#search-button");
submitBtnEl.on("click", searchHandler);

function searchHandler(event) {
  event.preventDefault();

  var searchInputEl = document.querySelector("#search-city");
  var searchCity = searchInputEl.value.toLowerCase().trim();

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
  
  // render day 1 forecast
  var day1El = $("#day1");
  day1El.text(moment.unix(forecast.daily[1].dt).format("M/D/YYYY"));

  var day1IconEl = $("#day1-icon");
  day1IconEl.attr("src", `https://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}.png`)
  
  var day1TempEl = $("#day1-temperature");
  day1TempEl.text(forecast.daily[1].temp.day);

  var day1HumidityEl = $("#day1-humidity");
  day1HumidityEl.text(forecast.daily[1].humidity);

  // render day 2 forecast
  var day2El = $("#day2");
  day2El.text(moment.unix(forecast.daily[2].dt).format("M/D/YYYY"));

  var day2IconEl = $("#day2-icon");
  day2IconEl.attr("src", `https://openweathermap.org/img/wn/${forecast.daily[2].weather[0].icon}.png`)
  
  var day2TempEl = $("#day2-temperature");
  day2TempEl.text(forecast.daily[2].temp.day);

  var day2HumidityEl = $("#day2-humidity");
  day2HumidityEl.text(forecast.daily[2].humidity);

  // render day 3 forecast
  var day3El = $("#day3");
  day3El.text(moment.unix(forecast.daily[3].dt).format("M/D/YYYY"));

  var day3IconEl = $("#day3-icon");
  day3IconEl.attr("src", `https://openweathermap.org/img/wn/${forecast.daily[3].weather[0].icon}.png`)
  
  var day3TempEl = $("#day3-temperature");
  day3TempEl.text(forecast.daily[3].temp.day);

  var day3HumidityEl = $("#day3-humidity");
  day3HumidityEl.text(forecast.daily[3].humidity);

  // render day 4 forecast
  var day4El = $("#day4");
  day4El.text(moment.unix(forecast.daily[4].dt).format("M/D/YYYY"));

  var day4IconEl = $("#day4-icon");
  day4IconEl.attr("src", `https://openweathermap.org/img/wn/${forecast.daily[4].weather[0].icon}.png`)
  
  var day4TempEl = $("#day4-temperature");
  day4TempEl.text(forecast.daily[4].temp.day);

  var day4HumidityEl = $("#day4-humidity");
  day4HumidityEl.text(forecast.daily[4].humidity);

  // render day 5 forecast
  var day5El = $("#day5");
  day5El.text(moment.unix(forecast.daily[5].dt).format("M/D/YYYY"));

  var day5IconEl = $("#day5-icon");
  day5IconEl.attr("src", `https://openweathermap.org/img/wn/${forecast.daily[5].weather[0].icon}.png`)
  
  var day5TempEl = $("#day5-temperature");
  day5TempEl.text(forecast.daily[5].temp.day);

  var day5HumidityEl = $("#day5-humidity");
  day5HumidityEl.text(forecast.daily[5].humidity);
}

// save search
function saveSearch(searchCity) {
  
  // add city to search history and save in localStorage
  searchHistory.push(searchCity);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  // create button
  var cityBtn = $("<button>");
  cityBtn.text(`${searchCity}`);
  cityBtn.attr("type", "button");
  cityBtn.addClass("list-group-item list-group-item-action");

  // add button to search history list
  var searchList = $(".search-history")
  searchList.prepend(cityBtn);
}

// render search history
function renderSearch() {

  // get stored search history from localStorage
  var savedCities = JSON.parse(localStorage.getItem("searchHistory"));
  console.log(savedCities);
  
  // checks to see if data is stored in localStorage
  if (savedCities !== null) {
      searchHistory = savedCities;
      console.log(searchHistory);
  } else {
      searchHistory = [];
  }

  // create a new button for each city and append to search history list
  var searchList = $(".search-history")

  for (var i = 0; i < searchHistory.length; i++) {
    var cityBtn = $("<button>");
    cityBtn.text(`${searchHistory[i]}`);
    cityBtn.attr("type", "button");
    cityBtn.attr("data-index", i);
    cityBtn.addClass("list-group-item list-group-item-action");
    searchList.prepend(cityBtn);
  }  
}

renderSearch();



// city selected from search history pulls current weather and forecast of the city
// var historyBtnEl = $("#search-history");
// historyBtnEl.aon("click", historyHandler);

// function historyHandler(event) {
//   event.preventDefault();
// }
