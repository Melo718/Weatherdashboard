const inputEl = document.getElementById("city-input");
const searchEl = document.getElementById("search-button");
const nameEl = document.getElementById("city-name");
const currentPicEl = document.getElementById("current-pic");
const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity");
const currentWindEl = document.getElementById("wind-speed");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const APIKey = "2e56ce92568f99ee2b67daab51839f52";



searchEl.addEventListener("click",function() {
    const searchTerm = inputEl.value;
    getWeather(searchTerm);
})



function getWeather(cityName) {

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    axios.get(queryURL)
    .then(function(response){
        

        const currentDate = new Date(response.data.dt*1000);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() +1;
        const year = currentDate.getFullYear();
        nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
        
        let weatherPic = response.data.weather[0].icon;
        
        currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        currentPicEl.setAttribute("alt",response.data.weather.description);

        currentTempEl.innerHTML = "Temperature: " + fahrenheit(response.data.main.temp) + " &#730F";
        currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
        currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
        console.log(currentDate);
        
    let cityID = response.data.id;
    let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
    axios.get(forecastQueryURL)
    .then(function(response){
     
        
        const forecastEls = document.querySelectorAll(".forecast");
        for (i=0; i<forecastEls.length; i++) {
            forecastEls[i].innerHTML = "";
            const forecastIndex = i*8 + 4;
            const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
            const forecastDay = forecastDate.getDate();
            const forecastMonth = forecastDate.getMonth() + 1;
            const forecastYear = forecastDate.getFullYear();
            const forecastDateEl = document.createElement("p");

            forecastDateEl.setAttribute("class","sm-3 sm-0 forecast-date");
            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;

            forecastEls[i].append(forecastDateEl);
            const forecastWeatherEl = document.createElement("img");
            forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
            forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather.description);

            forecastEls[i].append(forecastWeatherEl);
            const forecastTempEl = document.createElement("p");
            forecastTempEl.innerHTML = "Temp: " + fahrenheit(response.data.list[forecastIndex].main.temp) + " &#730F";

            forecastEls[i].append(forecastTempEl);
            const forecastHumidityEl = document.createElement("p");
            forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
            forecastEls[i].append(forecastHumidityEl);
            }
        })
    });  

    function fahrenheit(F) {
        return Math.floor((F - 273.15) *1.80 + 32);
    };
    
}

