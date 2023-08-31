// set up event listener
// Add variables 
// Make Api requests and extract info
// Use local storage to save the search history
// function to search wether for a city

var apiKey = "6ef4bd0368a9fb8724b29006f8799de1";

var searchForm = document.getElementById("search-form");
var cityInput = document.getElementById("city-input");
var currentWeatherInfo = document.getElementById("current-weather-info");
var forecastInfo = document.getElementById("forecast-info");
var historyList = document.getElementById("history-list");
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

