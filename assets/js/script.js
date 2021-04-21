// define global variables
var searchHistory = [];
const apiKey = "a57dbe6e264ba286bdc558c04ad72f43";

// get and render search history
init();


// search button pulls weather and forecast of the city and adds it to the search history
$("#search-button").on("click", searchHandler);

function searchHandler(event) {
  event.preventDefault();
  
  var searchCity = $("#search-city").val().toLowerCase().trim();
  
  if(searchCity) {
    
    // clear the input
    $("#search-city").val("");
    
    // save city in local storage and re-render the list
    saveSearch(searchCity);
    renderSearch(searchCity);
    
    // fetch weather for the city
    fetchWeather(searchCity);
  } else {
    alert("Field cannot be left blank");
  }
}

// city from search history pulls current weather and forecast of the city
$(".city-button").on("click", historyHandler);

function historyHandler(event) {
  event.preventDefault();
  
  var searchCity = $(this).text();
  // console.log(searchCity);
  fetchWeather(searchCity);
}

// clear history button clears search history, localStorage, and containers
$("#clear-button").on("click", clearHistory);

function clearHistory() {
  localStorage.clear();
  searchHistory = [];
  $(".search-history").empty();
  $("#weather-container").hide();
  $("#error-container").hide();
}


// fetch weather
function fetchWeather(searchCity) {
  
  // API call uses city to fetch weather info
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=${apiKey}`;
  
  fetch(apiUrl).then(function(response) {
    
    // Check the search city is valid
    if (response.status === 404) {
      $("#weather-container").hide();
      $("#error-container").show();
    } else {
      response.json().then(function(data) {
        // console.log(data);
        renderWeather(data, searchCity);
      });
    }
  });
}

// render weather
function renderWeather(weather, searchCity) {
  
  // show weather container
  $("#weather-container").show();
  $("#error-container").hide();
  
  // render each element within the weather container
  $("#city-name").text(weather.name);
  // $("#current-date").text(`(${moment.unix(weather.dt).format("M/D/YYYY")})`);
  // $("#current-icon").attr("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
  // $("#city-temperature").text(weather.main.temp);
  // $("#city-humidity").text(weather.main.humidity);
  // $("#city-wind-speed").text(weather.wind.speed);
  
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
  
  fetch(apiUrl) .then(function(response) {
    response.json().then(function(data) {
      // console.log(data);
      renderUvIndex(data);
    });
  });
}

// render UV index
function renderUvIndex(currentCity) {
  
  var uvIndex = currentCity.value;
  $("#city-uv-index").text(uvIndex);
  // console.log(uvIndex);
  
  // color code UV index based on value
  if (uvIndex <= 2) {
    $("#city-uv-index").attr("class", "favorable");
  } else if (uvIndex > 2 && uvIndex <= 7) {
    $("#city-uv-index").attr("class", "moderate");
  } else {
    $("#city-uv-index").attr("class", "severe");
  }
}


// fetch forecast
function fetchForecast(cityLat, cityLon) {
  
  // API call uses latitude and longitude to fetch forecast info
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`;
  
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      // console.log(data);
      renderForecast(data);
    });
  });
}

// render forecast
function renderForecast(forecast) {
  
  // render current weather information
  $("#current-date").text(`(${moment.unix(forecast.daily[0].dt).format("M/D/YYYY")})`);
  $("#current-icon").attr("src", `https://openweathermap.org/img/wn/${forecast.daily[0].weather[0].icon}.png`)
  $("#city-temperature").text(forecast.daily[0].temp.day);
  $("#city-humidity").text(forecast.daily[0].humidity);
  $("#city-wind-speed").text(forecast.daily[0].wind_speed);

  // render forecast dates
  $("#day1").text(moment.unix(forecast.daily[1].dt).format("M/D/YYYY"));
  $("#day2").text(moment.unix(forecast.daily[2].dt).format("M/D/YYYY"));
  $("#day3").text(moment.unix(forecast.daily[3].dt).format("M/D/YYYY"));
  $("#day4").text(moment.unix(forecast.daily[4].dt).format("M/D/YYYY"));
  $("#day5").text(moment.unix(forecast.daily[5].dt).format("M/D/YYYY"));
  
  // render forecast icons
  $("#day1-icon").attr("src", `https://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}.png`);
  $("#day2-icon").attr("src", `https://openweathermap.org/img/wn/${forecast.daily[2].weather[0].icon}.png`);
  $("#day3-icon").attr("src", `https://openweathermap.org/img/wn/${forecast.daily[3].weather[0].icon}.png`);
  $("#day4-icon").attr("src", `https://openweathermap.org/img/wn/${forecast.daily[4].weather[0].icon}.png`);
  $("#day5-icon").attr("src", `https://openweathermap.org/img/wn/${forecast.daily[5].weather[0].icon}.png`);
  
  // render forecast temperature
  $("#day1-temperature").text(forecast.daily[1].temp.day);
  $("#day2-temperature").text(forecast.daily[2].temp.day);
  $("#day3-temperature").text(forecast.daily[3].temp.day);
  $("#day4-temperature").text(forecast.daily[4].temp.day);
  $("#day5-temperature").text(forecast.daily[5].temp.day);
  
  // render forecast humidity
  $("#day1-humidity").text(forecast.daily[1].humidity);
  $("#day2-humidity").text(forecast.daily[2].humidity);
  $("#day3-humidity").text(forecast.daily[3].humidity);
  $("#day4-humidity").text(forecast.daily[4].humidity);
  $("#day5-humidity").text(forecast.daily[5].humidity);
}


// render search history
function renderSearch() {
  
  // clear search history elements
  $(".search-history").html("");
  
  // create a new button for each saved city and add to search history list
  for (var i = 0; i < searchHistory.length; i++) {
    var cityBtn = $("<button>");
    cityBtn.text(`${searchHistory[i]}`);
    cityBtn.attr("type", "button");
    cityBtn.attr("data-index", i);
    cityBtn.addClass("list-group-item list-group-item-action city-button");
    $(".search-history").prepend(cityBtn);
  }
}

// save search
function saveSearch(searchCity) {
  
  // save to localStorage
  searchHistory.push(searchCity);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// initialize search history
function init() {
  
  // hide weather container and error container
  $("#weather-container").hide();
  $("#error-container").hide();
  
  // get stored search history from localStorage
  var savedCities = JSON.parse(localStorage.getItem("searchHistory"));
  // console.log(savedCities);
  
  // checks to see if data is stored in localStorage
  if (savedCities !== null) {
    searchHistory = savedCities;
    // console.log(searchHistory);
  } else {
    searchHistory = [];
  }

  // render search history 
  renderSearch(); 
}