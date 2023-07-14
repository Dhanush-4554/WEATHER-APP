// search data
var city = document.getElementById('city');
var country = document.getElementById('country');
var search = document.getElementById('search');

//weather 
var temperature = document.getElementById('currentTemp');
var weatherLogo = document.getElementById('weatherLogo');
var weatherDescription = document.getElementById('desc');
var uviRays = document.getElementById('uvi');
var humidity = document.getElementById('humidityLevel');


// Time and dates 
var currentTime = document.querySelector('.time');
var currentDate = document.querySelector('.date');

//sunrise and sun set
var sunriseTime = document.getElementById('sunrise');
var sunsetTime = document.getElementById('sunset')


//utilities
var weatherApi;
var responseData;
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];




//FUNCTION FOR GET WEATHER REPORT
async function weatherReport(search) {
    weatherApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=da2103b2c4ce4f95af051626232503&q=${search}&days=7&aqi=yes&alerts=no`);
    responseData = await weatherApi.json();
    city.innerHTML = responseData.location.name;
    country.innerHTML = ' <i class="fa-sharp fa-solid fa-location-dot"></i>  ' + responseData.location.country;

    // weather report 
    // temperature
    temperature.innerHTML = responseData.current.temp_c;
    // weather symbol 
    weatherLogo.setAttribute('src', responseData.current.condition.icon);
    // weather description 
    weatherDescription.innerHTML = responseData.current.condition.text;
    // humidity 
    humidity.innerHTML = responseData.current.humidity + '%'
    // UV data 
    uviRays.innerHTML = responseData.current.uv + ' UVI';
    // sunrise and sun set 
    sunriseTime.innerHTML = responseData.forecast.forecastday[0].astro.sunrise;
    sunsetTime.innerHTML = responseData.forecast.forecastday[0].astro.sunset;

    setInterval(() => {
        // time 
        var timezone = responseData.location.tz_id;
        var now = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
        currentTime.innerHTML = now;
    }, 1000)


    // date 
    var today = new Date(responseData.forecast.forecastday[0].date);
    currentDate.innerHTML = `${today.getDate()} ${month[today.getMonth()]} ${today.getFullYear()}, ${Days[today.getDay()]}`

}






search.addEventListener('keyup', () => {
    weatherReport(search.value)
})

// By default city
weatherReport('bengaluru');