// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var apiKey = "e0d1a433124b17c169eb4de2b1f76ba7";
var currentCity = $('#current-city')
var todaysDate = $('#current-date');
var currentTemp = $('#current-temp');
var currentHumidity = $('#current-humidity');
var currentWindSpeed = $('#current-wind');
var currentUv = $('#current-uv');
var currentImg = $('#current-img');
var pastSearches = [] 
var searchInput

$(window).ready(function(pastSearches) {
    console.log('ready')
    if (localStorage.getItem('searchHistroy')) {
        pastSearches = JSON.parse(localStorage.getItem('searchHistroy'))
        console.log(pastSearches.length)

        for (var i = 0; i < pastSearches.length; i++) {
            console.log('activated history for loop')
            var html = $(`
                    <li><button class="btn button-style city-button" type="button" id="search-city-button${i}">${pastSearches[i]}</button></li>
            `)
    
            $('#search-history-list').append(html)
        }
    }
})

// Find current date and display in title
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");

// api call with search input
$('#search').on("click", function (event, searchInput) {
    event.preventDefault();
    var searchInput = $('#search-city').val();
    console.log(searchInput);
    searchHistory(searchInput, ' TEST SECOND CITY');
    getCurrentConditions(searchInput)
})

$('#search-history-list').on("click", function (event) {
    event.preventDefault();
    $('.city-button').each(function() {
        $(this).click(function(){
            var id = "#" + $(this).attr('id') 
            console.log(id)
            var historyCity = $(id).text()
            console.log(historyCity)

            // searchHistory(historyCity);
            callHistoricalConditions(historyCity)

        });
     });    
})


var callHistoricalConditions = function (historyCity) {
    console.log('callHistoricalConditions')
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + historyCity + "&appid=" + apiKey + "&units=imperial";
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
           
            // AJAX Call for UV index
            $.ajax({
                url: oneCall,
                method: "GET"
            }).then(function (response) {
                currentUv.text("UV Index: " + response.current.uvi)
                var uvText = response.current.uvi
                console.log(uvText)
                switch(uvText) {
                    case x < 2:
                        $(currentUv).attr('class', 'green');
                    break;
                    case 2:
                     //execute code block 2
                     break;
                    default:
                    // code to be executed if n is different from case 1 and 2
                   }   
                console.log('Everything we need ? daily and UVI ??', response);
                $('#five-day-forecast').empty()
                for (let i = 0; i < 5; i++) {
                    var someDate = new Date()
                    console.log('activated for loop')
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
var getCurrentConditions = function (searchInput) {
    console.log('getCurrentConditions');
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
                
                $('#five-day-forecast').empty()
                for (let i = 0; i < 5; i++) {
                    var someDate = new Date()
                    console.log('activated for loop')
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

function searchHistory(city) {
    console.log('CITY TO SAVE', city)
    
    //push the new city into the pastSearches array
    if (!pastSearches.includes(city) && pastSearches.length < 8 && city != "") {
        pastSearches.push(city)
        console.log(pastSearches)
        //set local storge of serachHistroy to your pastSeraches array
        localStorage.setItem('searchHistroy', JSON.stringify(pastSearches))           
    } else if (pastSearches.length = 8 && city != "") {
        pastSearches.shift()
        pastSearches.push(city)
        console.log(pastSearches)
        //set local storge of serachHistroy to your pastSeraches array
        localStorage.setItem('searchHistroy', JSON.stringify(pastSearches))  
    }
    addHtmlHistory(pastSearches)
    
    // for development
    // function clearArray(pastSearches) {
    //     pastSearches.length = 0
    //     console.log(pastSearches)
    // }
    // clearArray(pastSearches);
}
  
function addHtmlHistory(pastSearches) {
    $('#search-history-list').empty()

    for (var i = 0; i < pastSearches.length; i++) {
        console.log('activated history for loop')
        var html = $(`
                <li><button class="btn button-style city-button" type="button" id="search-city-button${i}">${pastSearches[i]}</button></li>
        `)

        $('#search-history-list').append(html)
    }
}
