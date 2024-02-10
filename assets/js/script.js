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
              //VARIABLE FOR ICON CODES NEEDED to get weather icons
              var iconCodeToday = data.list[0].weather[0].icon;
              console.log(iconCodeToday);
              //Variable for icon URL to get icon image
              var UrlIconToday = 'https://openweathermap.org/img/wn/' + iconCodeToday + '@2x.png'
              //create image element in which to dynamically insert the icon URL containing the icon code
              var iconTodayEl = document.createElement('img');
              //set source of iconTodayEl html image element to be the URL contained in UrlIconToday
              iconTodayEl.src = UrlIconToday;
              //variable to select the div html element with ID of 'current-conditions'
              //need to style this container div as a card via CSS classes, add attribute of card class to container and style in css
              var currentContainerEl = document.getElementById('current-conditions');
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
                //Set text content for list items/weather condition info pulled from API data
                currentWeatherTempLi.textContent = data.list[0].main.temp;
                console.log(currentWeatherTempLi);
                currentWeatherWindSpeedLi.textContent = data.list[0].wind.speed;
                console.log(currentWeatherWindSpeedLi)
                currentWeatherHumidityLi.textContent = data.list[0].main.humidity;
                console.log(currentWeatherHumidityLi);
                //TO DO: append list items to list
                //TO DO: append list to  current weather container

              currentContainerEl.appendChild(currentWeatherNameEl); //instead of this, option to clean up the code by using object literals
              currentContainerEl.appendChild(iconTodayEl);

              var fiveDayWeatherEl= document.createElement('div'); //creates div to style as cards for 5 day and append to its container, style as card
                 //create variables to make elements for every piece of information needed
                 //set textContent of each variable equal to the API Data
                 //then append the list of elements by variable name to the parent container
                
              //   issueTitle.textContent = data[i].title;
                
              //   issueContainer.append(issueTitle);
              //   //make variable looping icon data out of the returned data
               
            })
            
          
              
      }
    });
// need to dynamically update HTML by appending elements for the current weather and for the 5 day forecast
//need to use variables for cities (and states if used?) to store their names in localStorage to persist their data on screen
//need another fetch to get the icons using the icon codes fetched from the weather
//need to append buttons with the city names from localStorage?
}
//event listener to call getApi function when searchButton element is clicked
searchButton.addEventListener('click', getApi);

//use 5 day weather forecast API, aso the current weather data API for the top widget?:

//*pass ‘var city’ into geocoding API in order to get coordinates, then make coordinates variable to pass the coordinates data into the forecast API?
//-make a queryURL variable to store the modified API URL so that it can be passed into ‘fetch’ later
//-will need to modify the base API URL with the parameters it has placeholders for: use the ‘current weather data’ base URL, concatenate the variables for their data, see blog post example
//-run ‘fetch(queryURL) to fetch the data from the URL variable with its modified parameters we just made
//use a for  loop to log/display the data for each city’s data retrieved by the API? Like in example 6.7
//Dynamically insert the elements for the content that you want to select from the API data array, and then append those to the page. See class activities 6.9 and 6.10


//Use localStorage to store the cities already searched for
