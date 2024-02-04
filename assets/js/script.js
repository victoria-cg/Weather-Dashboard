
//need to dynamically update HTML and CSS: append classes and elements
//use 5 day weather forecast API, aso the current weather data API for the top widget?:
//-retrieve weather data for cities
//-register for API key: need 2 hrs for it to activate
//-create a variable to store the API key
//-make a variable for the API call ‘var: city’ to hold user input for city names (see API doc for how to also store state name/abbreviation as a variable, or do I just make a second variable?)
//*need to store latitude and longitude in order to pass that into the API as a parameter?
//-make variables from the lat and long data returned by the geocoding API
//*pass ‘var city’ into geocoding API in order to get coordinates, then make coordinates variable to pass the coordinates data into the forecast API?
//-make a queryURL variable to store the modified API URL so that it can be passed into ‘fetch’ later
//-will need to modify the base API URL with the parameters it has placeholders for: use the ‘current weather data’ base URL, concatenate the variables for their data, see blog post example
//-run ‘fetch(queryURL) to fetch the data from the URL variable with its modified parameters we just made
//need variables for cities and states to store in localStorage to persist their data
//need forms to accept data input from users for names of cities and states targeted: see previous homework
//use a for  loop to log/display the data for each city’s data retrieved by the API? Like in example 6.7
//Dynamically insert the elements for the content that you want to select from the API data array, and then append those to the page. See class activities 6.9 and 6.10

//Use localStorage to store the cities already searched for
