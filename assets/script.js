// set up event listener
// Add variables... replace them with consts
// Make Api requests and extract info
// Use local storage to save the search history
// function to display current weather
// function for 5 day forecast
// function to search wether for a city


const apiKey = "63b9def0f9eaa24d16407a649d42467c";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const currentWeatherInfo = document.getElementById("current-weather-info");
const forecastInfo = document.getElementById("forecast-info");
const historyList = document.getElementById("history-list");

const apiUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  function displayWeatherData(data) {
    const currentWeather = data.list[0];
    const iconUrl = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
    currentWeatherInfo.innerHTML = `
      <h3>${data.city.name}</h3>
      <img src="${iconUrl}" alt="${currentWeather.weather[0].description}">
      <p>Temperature: ${currentWeather.main.temp}°C</p>
      <p>Humidity: ${currentWeather.main.humidity}%</p>
      <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
    `;
   
    forecastInfo.innerHTML = "";
    for (let i = 0; i < data.list.length; i += 8) {
      const forecast = data.list[i];
      const forecastIconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
      forecastInfo.innerHTML += `
        <div>
          <p>${forecast.dt_txt.slice(0, 10)}</p>
          <img src="${forecastIconUrl}" alt="${forecast.weather[0].description}">
          <p>Temperature: ${forecast.main.temp}°C</p>
          <p>Humidity: ${forecast.main.humidity}%</p>
          <p>Wind Speed: ${forecast.wind.speed} m/s</p>
        </div>
      `;
    }
  }
  
  function fetchWeather(city) {
    fetch(apiUrl(city))
      .then((response) => response.json())
      .then((data) => {
        displayWeatherData(data);
        addToSearchHistory(data.city.name);
        cityInput.value = "";
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }
  
  function addToSearchHistory(city) {
    const history = localStorage.getItem("searchHistory") || "[]";
    const historyArray = JSON.parse(history);
  
    if (!historyArray.includes(city)) {
      historyArray.push(city);
      localStorage.setItem("searchHistory", JSON.stringify(historyArray));
      loadSearchHistory();
    }
  }
  
  function loadSearchHistory() {
    const history = localStorage.getItem("searchHistory") || "[]";
    const historyArray = JSON.parse(history);
  
    historyList.innerHTML = "";
    for (const city of historyArray) {
      historyList.innerHTML += `<li>${city}</li>`;
    }
  }
  
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityName = cityInput.value;
    if (cityName) {
      fetchWeather(cityName);
    }
  });
  
  historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const cityName = e.target.textContent;
      fetchWeather(cityName);
    }
  });
  
  loadSearchHistory();