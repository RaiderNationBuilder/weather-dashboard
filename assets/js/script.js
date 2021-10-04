// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var apiKey = "e0d1a433124b17c169eb4de2b1f76ba7"
var searchCity = "oshkosh"
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey;
var currentCity = $('#current-city')
var todaysDate = $('#current-date');
var currentTemp = $('#current-temp');
var currentHumidity = $('#current-humidity');
var currentWindSpeed = $('#current-wind');
var currentUv = $('#current-uv');
var currentImg = $('#current-img');

// Find current date and display in title
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");
console.log('current temp' + currentTemp);

$.ajax({
    url: apiUrl,
    method: "GET"
}).then(function(response){
    console.log(response);
    currentCity.text(response.name);    
    $(todaysDate).text("(" + currentDate + ")");
    $("#current-date").append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />" )
    currentTemp.text("Temp: " + response.main.temp);
    currentTemp.append("&deg;F");
    currentHumidity.text("Humidity: " + response.main.humidity + "%");
    currentWindSpeed.text("Wind Speed: " + response.wind.speed + "MPH");

    var latitude = response.coord.lat;
    var longitude = response.coord.lon;

    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
        // AJAX Call for UV index
        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then(function(response){          
            currentUv.text("UV Index: " + response.value);
        });
});

