//-create a variable to store the API key
var apiKey = 'c0502d3ccf7aaee3e8c3edf82303a125';
//create variable to get the city names input but the user
var cityName = document.getElementById('city-name');
//create variable targeting the search button element
var searchButton = document.getElementById('search-button');

function getApi() {
     //-make a variable for the API call ‘var: city’ to hold user input for city names (see API doc for how to also store state name/abbreviation as a variable, or do I just make a second variable?)
    //need to get the values of city names entered by user in order to use them in geocoding API, done with 'var city'
     var city = cityName.value;
    console.log(city)
    //variable for the API call to Geocode the city name into coordinates below 
    //is it required to add state and country codes too to get geocode API to work?
    //limit parameter in request URL is set to =1 to only return 1 city by the requested name
    var requestUrlGeocode = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

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
        localStorage.setItem(data.city, JSON.stringify(city)); //sets city name into local storage
        console.log(localStorage);
        //function below gets forecast for city based on coordinates
        var requestUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=Imperial';
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
                //TO DO: Make a day.js h2 for the date
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
              currentContainerEl.appendChild(currentWeatherNameEl); //instead of this, option to clean up the code by using object literals?
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
                var fiveDayContainerEl= document.getElementById('5-day-forecast');
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
// RETRIEVE AND RENDER STORAGE, storage is saved, not dependent on re-running search

// need to dynamically update HTML by appending elements for the current weather and for the 5 day forecast
//need to use variables for cities (and states if used?) to store their names in localStorage to persist their data on screen
//need another fetch to get the icons using the icon codes fetched from the weather
//need to append buttons with the city names from localStorage?

//use 5 day weather forecast API, aso the current weather data API for the top widget?:

//*pass ‘var city’ into geocoding API in order to get coordinates, then make coordinates variable to pass the coordinates data into the forecast API?
//-make a queryURL variable to store the modified API URL so that it can be passed into ‘fetch’ later
//-will need to modify the base API URL with the parameters it has placeholders for: use the ‘current weather data’ base URL, concatenate the variables for their data, see blog post example
//-run ‘fetch(queryURL) to fetch the data from the URL variable with its modified parameters we just made
//use a for  loop to log/display the data for each city’s data retrieved by the API? Like in example 6.7
//Dynamically insert the elements for the content that you want to select from the API data array, and then append those to the page. See class activities 6.9 and 6.10


//Use localStorage to store the cities already searched for
