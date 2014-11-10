////JSON CALLBACK/////

function getJSONP(url, cbName){
  var $script = document.createElement('script');
  $script.src = url + '?callback=' + cbName;
  document.body.appendChild($script);
}

var $target = document.getElementById("target");

function processWeatherData(data){
  appendData(data, $target);

}

////APPEND TO DOM AS PART OF JSON CALLBACK////

function appendData(weather, itemToAppend){
  for(i=0; i<5; i++){
    var $li = document.createElement("li");
    itemToAppend.appendChild($li);
    var $h3 = document.createElement("h3");
    var dayNames = weather.forecast.simpleforecast.forecastday[i].date.weekday;
    $h3.innerHTML = dayNames;
    $li.appendChild($h3);
    var $p = document.createElement("p");
    var highTemp = weather.forecast.simpleforecast.forecastday[i].high.fahrenheit;
    var lowTemp = weather.forecast.simpleforecast.forecastday[i].low.fahrenheit;
    $p.innerHTML = "High: " + highTemp + " Low: " + lowTemp;
    $li.appendChild($p);
    var $image = document.createElement("img");
    var iconURL = weather.forecast.simpleforecast.forecastday[i].icon_url;
    $image.setAttribute("src", iconURL);
    $li.appendChild($image);
  }
}

////UPON DOM CONTENT LOADING////

document.addEventListener("DOMContentLoaded", function(){
  
  var $zipForm = document.getElementById("zip");
  $zipForm.addEventListener("submit", function(event){
    event.preventDefault();
    var zip = document.getElementById("user-zip");
    var url = 'http://api.wunderground.com/api/0f666007003f1a39/forecast10day/q/' + zip.value + '.json';
    $target.innerHTML = "";
    getJSONP(url, 'processWeatherData');
  });


////GET CURRENT POSITION////

  var $getLocationButton = document.querySelector(".locate-button");
  $getLocationButton.addEventListener("click", function(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(geoCallBack);
    function geoCallBack(data){
      console.log(data);
      var latitude = data.coords.latitude;
      var longitude = data.coords.longitude;
      var coordinates = latitude + "," + longitude;
      console.log(coordinates);
      var url = 'http://api.wunderground.com/api/0f666007003f1a39/forecast10day/q/' + coordinates + '.json';
      $target.innerHTML = "";
      getJSONP(url, 'processWeatherData');
    }
  });
});





