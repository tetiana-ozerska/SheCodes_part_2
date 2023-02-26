//current date
function formatDate(currentDay) {
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = month[currentDay.getMonth()];
  let currentDate = currentDay.getDate();
  let currentYear = currentDay.getFullYear();
  let currentHours = currentDay.getHours();
  let currentMinutes = currentDay.getMinutes();

  let textToDisplay = `${currentMonth}, ${currentDate} ${currentYear} ${currentHours}:${currentMinutes}`;
  return textToDisplay;
}

let currentDateOnPage = document.querySelector("#current-data-main-card");
currentDateOnPage.innerHTML = formatDate(new Date());

//weather for main card via search engine
let apiKey = "2718952144ed077c12e7c160fb6fc351";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

function getSearchCityWeather(response) {
  let currentCity = document.querySelector("h1.card-title");
  let cityName = response.data.name;
  currentCity.innerHTML = cityName;

  let currentTemperature = document.querySelector("#current-temperature");
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  currentTemperature.innerHTML = temperature;

  let currentWindSpeed = document.querySelector("#current-wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  currentWindSpeed.innerHTML = windSpeed;

  let currentCondition = document.querySelector("#current-condition");
  let condition = response.data.weather[0].description;
  currentCondition.innerHTML = condition;

  let curretnIcon = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  curretnIcon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
  curretnIcon.setAttribute("alt", condition)
}

function displaySearchCityWeather(event) {
  event.preventDefault();
  let searchFieldInput = document.querySelector("#search-field");
  // let currentCity = document.querySelector("h1.card-title");
  // currentCity.innerHTML = `${searchFieldInput.value}`;

  let path = `${apiEndpoint}?q=${searchFieldInput.value}&appid=${apiKey}&units=metric`;

  axios.get(path).then(getSearchCityWeather);
}

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="card-group">`;
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function(day){
    forecastHTML = forecastHTML + `
    <div class="card days">
          <div class="card-body">
            <h4 class="card-title">
              ${day}
              <i class="fa-solid fa-temperature-low"></i>
            </h4>
            <h6 class="card-title">January, 16 2023</h6>
            <ul class="card-text">
              <li><b>Day</b> -3°C</li>
              <li><b>Night</b> -10°C</li>
              <li><b>Wind</b> 4 km/h</li>
              <li><b>Precipitation</b> no</li>
            </ul>
          </div>
          <img
            src="images/cat_cold.jpg"
            class="card-img-bottom"
            alt="cat_cold"
          />
        </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", displaySearchCityWeather);

//current location button
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getSearchCityWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();


//cel to fah, fah to cel
// function celToFah(celsius) {
//   var fahrenheit = Math.round(celsius * (9 / 5) + 32);
//   return fahrenheit;
// }

// function fahToCel(fahrenheit) {
//   var celsius = Math.round((5 / 9) * (fahrenheit - 32));
//   return celsius;
// }

// function clickOnCel(event) {
//   event.preventDefault();
//   let currentTemperature = Number(
//     document.querySelector("#current-temperature").innerText
//   );
//   let currentTempText = document.querySelector("#current-temperature");
//   if (currentTemperature !== 8) {
//     currentTempText.innerHTML = fahToCel(currentTemperature);
//   }
// }

// function clickOnFah(event) {
//   event.preventDefault();
//   let currentTemperature = Number(
//     document.querySelector("#current-temperature").innerText
//   );
//   let currentTempText = document.querySelector("#current-temperature");
//   if (currentTemperature === 8) {
//     currentTempText.innerHTML = celToFah(currentTemperature);
//   }
// }

// let celciusLink = document.querySelector("#celcium");
// let fahrenheitLink = document.querySelector("#fahrenheit");

// celciusLink.addEventListener("click", clickOnCel);
// fahrenheitLink.addEventListener("click", clickOnFah);

//Challenge Week3

// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };
// // write your code here

// let userCity = prompt("Enter a city");
// let updatedUserCity = userCity.toLowerCase();

// function celToFah(celsius) {
//   var fahrenheit = Math.round(celsius * (9 / 5) + 32);
//   return fahrenheit;
// }

// if (weather[updatedUserCity] != undefined) {
//   alert(
//     `It is currently ${Math.round(weather[updatedUserCity].temp)}°C (${celToFah(
//       weather[updatedUserCity].temp
//     )}°F) in ${userCity.trim()} with a humidity of ${
//       weather[updatedUserCity].humidity
//     }%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${userCity.trim()}`
//   );
// }
