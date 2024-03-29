//-create a variable to store the API key
var apiKey = 'c0502d3ccf7aaee3e8c3edf82303a125';
//create variable to get the city names input but the user
var cityName = document.getElementById('city-name');
//create variable targeting the search button element
var searchButton = document.getElementById('search-button');
//var city = cityName.value;

function getApi() {
     //-make a variable for the API call ‘var: city’ to hold user input for city names (see API doc for how to also store state name/abbreviation as a variable, or do I just make a second variable?)
    //need to get the values of city names entered by user in order to use them in geocoding API, done with 'var city'
     var city = cityName.value;
    // city [0] = cityName.value;
    // saveToStorage(city);
    console.log(city)
    //variable for the API call to Geocode the city name into coordinates below 
    //is it required to add state and country codes too to get geocode API to work?
    //limit parameter in request URL is set to =1 to only return 1 city by the requested name
    var requestUrlGeocode = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

//function to request geocode data for city name, parse data from returned json 
//function then does a for loop to turn the latitude and longitude data in the array into variables that the next API call can use to fetch the weather by coordinates
//latitude and longitude data returned by geocoding API are placed into their own variables, does this need to go in localStorage too?
    fetch(requestUrlGeocode)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) { //does this need to be looped here or just loop the cities in storage?
        var latitude = data[i].lat;
        console.log(latitude);
        var longitude = data[i].lon;
        console.log(longitude);
        //TO DO FOR SETTNG STORAGE OF CITIES figure out if the city name is available and saveToStorage(data.city)
        //must add logic mentioned above for asking if city name is available so that non-city names entered in box won't be saved-boolean
        //setItem below sets 'city' value into localStorage as a string
        saveToStorage(city); //sets city name into local storage
        console.log(localStorage);
        //function below gets forecast for city based on coordinates
        var requestUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=Imperial';
        //fetch the forecast data request URL 
        fetch(requestUrlForecast)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              //function to render current city's most recent/current weather
              function currentWeather(){
              //variable to select the div html element with ID of 'current-conditions'
              var currentContainerEl = document.getElementById('current-conditions');
              //sets current weather container as empty at the start of a new search so old cities don't persist on screen
              currentContainerEl.innerText = "";
              //VARIABLE FOR ICON CODES NEEDED to get weather icons
              var iconCodeToday = data.list[0].weather[0].icon;
              console.log(iconCodeToday);
              //Variable for icon URL to get icon image
              var UrlIconToday = 'https://openweathermap.org/img/wn/' + iconCodeToday + '@2x.png'
              //create image element in which to dynamically insert the icon URL containing the icon code
              var iconTodayEl = document.createElement('img');
              //set source of iconTodayEl html image element to be the URL contained in UrlIconToday
              iconTodayEl.src = UrlIconToday;
              //variable to create h2 element for the name of the current city searched for, will append to currentContainerEl
              var currentWeatherNameEl = document.createElement('h2'); //create elements for daily forecast, will get appended to parent container and styled as card, will hold current info
              //sets the text of h2 currentWeatherNameEl to be the name of the current city
              currentWeatherNameEl.textContent = data.city.name;
                console.log(data.city.name);
                //makes container for h3 of current date
                var dateContainerEl = document.createElement('h3');
                //makes variable passing current date from API array and setting it to format of US style short date
                var currentDate = (new Date(data.list[0].dt_txt)).toLocaleDateString('en-US');
                //log date to console to test
                console.log("current date test");
                console.log(currentDate);
                //sets the formatted date as the content of the container
                dateContainerEl.textContent = currentDate;
               
                //To Do: Make a ul to hold the temp, wind, humidity
                var currentWeatherListEl = document.createElement('ul');
                //TO DO: make li for temp, wind, and humidity
                var currentWeatherTempLi = document.createElement('li');
                var currentWeatherWindSpeedLi = document.createElement('li');
                var currentWeatherHumidityLi =document.createElement('li');
                //Set text content for list items/weather condition info pulled from API data, added strings to label the data on screen
                currentWeatherTempLi.textContent = "Temp: " + data.list[0].main.temp + "° F";
                console.log(currentWeatherTempLi);
                currentWeatherWindSpeedLi.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
                console.log(currentWeatherWindSpeedLi)
                currentWeatherHumidityLi.textContent = "Humidity: " + data.list[0].main.humidity + "%";
                console.log(currentWeatherHumidityLi);
                
              //appends city name to container for current weather
              currentContainerEl.appendChild(currentWeatherNameEl); 
              //appends the current date container to the current conditions container
              currentContainerEl.appendChild(dateContainerEl);
              //appends current weather icon to container
              currentContainerEl.appendChild(iconTodayEl);
              //appends unordered list element for current weather
              currentContainerEl.appendChild(currentWeatherListEl);
              //appends list items of each type of weather data to the unordered list
              currentWeatherListEl.appendChild(currentWeatherTempLi);
              currentWeatherListEl.appendChild(currentWeatherWindSpeedLi);
              currentWeatherListEl.appendChild(currentWeatherHumidityLi);
              }
              currentWeather();
              //Code to create elements and select data for 5 day forecast below:

              //for loop selects 5 day forecast data by skipping ahead to the next day starting at array item 8, and counting by 7 to skip over the 3 hour increments of the same day
              //create functiion to hold the code for the 5 day forecast
              function createForecast(){ 

                //selects div to append 5 day forecast children to, will style its children as cards
                var fiveDayContainerEl= document.getElementById('five-day-forecast');
                //starts container content as empty string when function runs so that previously searched cities don't persist on screen
                fiveDayContainerEl.innerText = "";
                for (var i = 8; i <= 36; i+=7) {
                 //creates div for cards for each day in 5 day forecast loop
              var fiveDayCard = document.createElement('div');
              //sets class of "weather-card" for the new fiveDayCard elements that will be inserted
              fiveDayCard.setAttribute("class", "weather-card");
              //select icon for 5 day weather card in API data array, selecting by array index in the loop iterating over the array, [0] inside "weather" array is where 'icon' object is
              var fiveDayIconCode = data.list[i].weather[0].icon;
              //create URL to get icon image from API website using the icon code
              var fiveDayIconUrl = 'https://openweathermap.org/img/wn/' + fiveDayIconCode + '@2x.png'
              //create img element to store image/icon
              var fiveDayIconEl = document.createElement('img');
              //set the source of the image to the URL made above which retrieves the icon
              fiveDayIconEl.src = fiveDayIconUrl;
              //create element for 5 day forecast date, will append to fiveDayCard
              var forecastDateEl = document.createElement('h3')
              //get date data and format for all forecast cards 
              var forecastDate = (new Date(data.list[i].dt_txt)).toLocaleDateString('en-US');
              //set text content for forecast date element using data retrieved
              forecastDateEl.textContent = forecastDate;
              //create an element to hold the temperature for the 5 day cards
              var fiveDayTempEl = document.createElement('p');
              //sets the temperature data from the for loop index number as the text content of the temperature element
              fiveDayTempEl.textContent = "Temp: " + data.list[i].main.temp + "° F";
              //same process to select wind for 5 day cards and create element to display that data
              var fiveDayWindSpeedEl = document.createElement('p');
              fiveDayWindSpeedEl.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
              //same process again to select data and create element for the humidity 5 day data
              var fiveDayHumidityEl = document.createElement('p');
              fiveDayHumidityEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";
              //TODO Append the date to the 5 day forecast card
              fiveDayCard.appendChild(forecastDateEl);
              //appends weather icon to the card for the first day of the 5 day forecast
              fiveDayCard.appendChild(fiveDayIconEl);
              //appends temperature element as a child of the 5 day temperature card
              fiveDayCard.appendChild(fiveDayTempEl);
              //appends wind speed element as a child of the 5 day card
              fiveDayCard.appendChild(fiveDayWindSpeedEl);
              //appends humidity element as a child of the 5 day card
              fiveDayCard.appendChild(fiveDayHumidityEl);
              //appends card elementsfor the 5 day forecast to the 5 day forecast container for the length of the loop
              fiveDayContainerEl.appendChild(fiveDayCard);
              }
            }
            createForecast();
               
            })   
      }
    });

}
//event listener to call getApi function when searchButton element is clicked
searchButton.addEventListener('click', getApi);

// RETRIEVE AND RENDER STORAGE, storage is saved, not dependent on re-running search, will load storage on page load
function loadStorage(){
  var savedCities = JSON.parse(localStorage.getItem("cityNames"))
  if (savedCities===null) {
    localStorage.setItem("cityNames", JSON.stringify([])) //creates array of city names if there were none in storage to retrieve
    return
  }

  //container is outside of the loop so that we won't get extra containers, set innerText to empty striing to start so that old buttons will clear before loop runs again
  var savedButtonContainer = document.getElementById('saved-city-buttons');
  savedButtonContainer.innerText = ""; 
  //iterate through the array and append the cities in the area to the document as elements
  for (var i = 0; i < savedCities.length; i++) {
    var savedCityButtonEl = document.createElement('button');
    savedCityButtonEl.textContent = savedCities[i];
    savedButtonContainer.appendChild(savedCityButtonEl);

//function to make new value for cityName to use saved city name from storage in getApi( ) 
//Code below is commented out because it is broken/somehow created and infinite loop of saved city buttons
// function changeCityName(cityName){
//   var result = cityName=savedCities[i];
//   return result;
}
// var resultCityName = changeCityName(cityName);
// //function below to render weather when saved city button is clicked:
//     savedCityButtonEl.addEventListener('click', getApi(resultCityName));
//   }
//   console.log(savedCities);
  //need to make event listener that runs getAPI function with saved city names: may need to make new version of function to pass correct city name in this function
  //return
}


function saveToStorage(newCity){
//saved cities starts as empty array so that we can push new information to it
console.log(newCity);
var savedCities =[];
savedCities= localStorage.getItem("cityNames");
//saved cities is an array because the city names get parsed back into an array by json.parse

if (savedCities){
   savedCities = JSON.parse(savedCities);
};
console.log("log savedCities")
console.log(savedCities);
//use push to add the new city to the end of the array

savedCities.push(newCity);
localStorage.setItem("cityNames", JSON.stringify(savedCities));
loadStorage();
}

//saveToStorage();

loadStorage();



