var apiKey = "e0d1a433124b17c169eb4de2b1f76ba7"
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var searchCity = "oshkosh"
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey;
var todaysDate = $('#sect-h2')

// Find current date and display in title
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");
console.log(currentDate);

fetch(apiUrl)
.then(function(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  console.log(response);
  return response.blob();
})
.then(function(response) {
  let objectURL = URL.createObjectURL(response);
  console.log(objectURL);
});