const searchInput = document.getElementById("main-search-bar");
const searchBtn = document.getElementById("main-search-btn");
const inputArea = document.getElementById("main-search-bar");
const weatherDisplayArea = document.getElementById("weather-container");
searchBtn.addEventListener("click", searchBtnClickHandler);
inputArea.addEventListener("keypress", function (event) { if (event.key === "Enter") { searchBtn.click() } });

const apiKey = "bd79d1fecdf34a2cb2771301231902";
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`
function searchBtnClickHandler() {
    let userInput = searchInput.value;

    if (userInput) {
        displayWeather(userInput);
    }
    else {
        weatherDisplayArea.innerHTML = `<p class="warning-text">Please Enter Some Text</p>`;
    }
}
async function displayWeather(userInput) {
    const fullUrl = url + userInput;

    fetch(fullUrl)
        .then(response => response.json())
        .then(data => {
            const currentTemp = data.current.temp_c;
            const state = data.location.region;
            const country = data.location.country;
            const imageLink = data.current.condition.icon;
            const condition = data.current.condition.text;
            const weatherImageContainer = document.createElement("div");
            weatherImageContainer.innerHTML = `<div class="large-text sky-condition-container">${condition}<img src="${imageLink}"></div>`;
            weatherDisplayArea.innerHTML = `<p>The Temperature in ${userInput}, ${state}, ${country} is <span class="large-text">${currentTemp}°C</span></p>`;
            weatherDisplayArea.appendChild(weatherImageContainer);
        })
        .catch(() => { weatherDisplayArea.innerHTML = `<p class="error-text">There has been a error</p>`; })
}