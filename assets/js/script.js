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
        //must add logic mentioned above for asking if city name is available so that non-city names entered in box won't be saved
        //function below gets forecast for city based on coordinates
        var requestUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey;
        //fetch the forecast request URL 
        fetch(requestUrlForecast)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
               //for (var i = 0; i < data.list.length; i++) {
                 var currentWeatherEl = document.createElement('div'); //create elements for daily forecast, will get appended to parent container and styled as card, will hold current info
                 var fiveDayWeatherEl= document.createElement('div'); //creates div to style as cards for 5 day and append to its container, style as card
                 var currentContainerEl = document.getElementById('current-conditions');
                currentWeatherEl.textContent = data.city.name;
                console.log(data.city.name);
              //   issueTitle.textContent = data[i].title;
                currentContainerEl.appendChild(currentWeatherEl); //instead of this clean up the code by using object literals
              //   issueContainer.append(issueTitle);
              //   //make variable looping icon data out of the returned data
               //} 
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
