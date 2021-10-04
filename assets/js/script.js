// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var apiKey = "e0d1a433124b17c169eb4de2b1f76ba7"
var searchCity = "oshkosh"
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey;
var todaysDate = $('#sect-h2');
var 

// currentCity.text(response.name);
// currentCity.append("<small class='text-muted' id='current-date'>");
// $("#current-date").text("(" + currentDate + ")");
// currentCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />" )
// currentTemp.text(response.main.temp);
// currentTemp.append("&deg;F");
// currentHumidity.text(response.main.humidity + "%");
// currentWindSpeed.text(response.wind.speed + "MPH");

// Find current date and display in title
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");
console.log(currentDate);

$.ajax({
    url: apiUrl,
    method: "GET"
}).then(function(response){
    console.log(response);
    currentCity.text(response.name);
    currentCity.append("<small class='text-muted' id='current-date'>");
    $("#current-date").text("(" + currentDate + ")");
    currentCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />" )
    currentTemp.text(response.main.temp);
    currentTemp.append("&deg;F");
    currentHumidity.text(response.main.humidity + "%");
    currentWindSpeed.text(response.wind.speed + "MPH");
});