// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var apiKey = "e0d1a433124b17c169eb4de2b1f76ba7";
var currentCity = $('#current-city')
var todaysDate = $('#current-date');
var currentTemp = $('#current-temp');
var currentHumidity = $('#current-humidity');
var currentWindSpeed = $('#current-wind');
var currentUv = $('#current-uv');
var currentImg = $('#current-img');

var searchInput
var name;

var globalThing ='first global val'

// Find current date and display in title
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");
// console.log('current temp' + JSON.stringify(currentTemp));

$('#search').on("click", function (event, searchInput) {
    event.preventDefault();

    // searchInput = '';
    var searchInput = $('#search-city').val();
    console.log(searchInput);
    // Grab value entered into search bar 
    // if (!$('#search')) {
    //     var searchInput = "neenah";
    // } else {
    //     var searchInput = JSON.stringify($('#search').val().trim());
    // }
    searchHistory(searchInput, ' TEST SECOND CITY');
    getCurrentConditions(searchInput)
   
  
 

})




var getCurrentConditions = function (searchInput) {
console.log('global thing test ??', name)
    var searchCity = searchInput;
    console.log(searchCity);
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey + "&units=imperial";
    fetch(apiUrl)
        .then(function (data) {
            console.log(data)
            return data.json()
        })
        .then(function (response) {
            // console.log('can we see the data ???',data);

            currentCity.text(response.name);  
            //  console.log(data.weather[0].main)  
            $(todaysDate).text("(" + currentDate + ")")
            $('#current-img').empty()
            $('#current-img').append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />")
            currentTemp.text("Temp: " + response.main.temp);
            currentTemp.append("&deg;F");
            currentHumidity.text("Humidity: " + response.main.humidity + "%");
            currentWindSpeed.text("Wind Speed: " + response.wind.speed + "MPH");

            var latitude = response.coord.lat;
            var longitude = response.coord.lon;

            var oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,minutely&appid=' + apiKey + '&units=imperial'
            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
            // AJAX Call for UV index
            $.ajax({
                url: oneCall,
                method: "GET"
            }).then(function (response) {


                currentUv.text("UV Index: " + response.current.uvi);
                console.log('Everything we need ? daily and UVI ??', response);
                $('#five-day-forecast').empty()
                for (let i = 0; i < 5; i++) {
                    var someDate = new Date()

                    var dd = someDate.getDate();
                    var mm = someDate.getMonth() + i;
                    var y = someDate.getFullYear();

                    var someFormattedDate = dd + '/' + mm + '/' + y;
                    var html = $(`
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Date ${someFormattedDate}</h5>
                           ${"<img src='https://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png' alt='" + response.daily[i].weather[0].icon + "' />"}
                            <p class="card-text">Temp: ${response.daily[i].temp.day} </p>
                            <p class="card-text">Wind: ${response.daily[i].wind_speed}</p>
                            <p class="card-text">Humidity: ${response.daily[i].humidity}</p>
                        </div>
                    </div>
                    `)

                    
                    $('#five-day-forecast').append(html)

                }



            });
        });


}

function searchHistory(city, lol) {
    console.log('CITY TO SAVE', city, lol)
    var pastSearches = []

    if (localStorage.getItem('searchHistroy')) {
        pastSearches = JSON.parse(localStorage.getItem('searchHistroy'))
    }

    //push the new city into the pastSearches array
    //set local starge of serachHistroy to your pastSeraches array
    
    // [] JSON.stringfy
    name = 'TOm'
    //return name
}