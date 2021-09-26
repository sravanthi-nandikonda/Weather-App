window.addEventListener('load', () => {

  /* getting geolocation----------------------------------------------------------*/

  /* Date and time section*/
  document.getElementById("search-city").value = "";

  var dateElement = document.getElementById("date");
  var timeElement = document.getElementById("time");
  var locationElement = document.getElementById("curr-location");
  var locTempElement = document.getElementById("currloc-temp");
  var wrapperbg = document.getElementById("wrapper-1");





  var options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
  var today = new Date();

  dateElement.innerHTML = today.toLocaleDateString("en-Us", options);
  timeElement.innerHTML = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  });

  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      let api =
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
        lat +
        '&lon=' +
        long +
        '&appid=cbb17a41d2981957e3e8b6b180b82ccd';
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { name } = data;
          const { feels_like } = data.main;
          const {  icon } = data.weather[0];
          console.log(data);

          locationElement.innerHTML = name;
          locTempElement.innerHTML = Math.round(feels_like - 273) + "&degC";
          document.getElementById("curr-icon").src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';



        })
        .catch(console.log("request not accepted"));
    });
  } else {
    locationElement.innerHTML = "Not supported";
  }
});


  /*-----------------------------------------fetching data by city name------------*/
  
          
  searchbtn.addEventListener('click', e => {
    let cityname = document.getElementById("search-city").value;
  let searchbtn = document.getElementById("searchbtn");
  

    let api =
      'https://api.openweathermap.org/data/2.5/weather?q='+ cityname+'&appid=cbb17a41d2981957e3e8b6b180b82ccd';


    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var { name } = data;
        var { temp } = data.main;
        
        var { humidity } = data.main;

        var { country } = data.sys;
        var { main, icon } = data.weather[0];
        

        document.getElementById("res-city").innerHTML = name;
        document.getElementById("climate-temp").innerHTML = Math.round(temp - 273) + "&degC";
        document.getElementById("climate-desc").innerHTML = main;
        document.getElementById("city-icon").src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        document.getElementById("country").innerHTML = country;
        document.getElementById("search-city").value = "";

       
        document.getElementById("humidity").innerHTML="Humidity: &nbsp &nbsp"+humidity+"%";
        

      })
      .catch(() => {

        document.getElementById("res-city").textContent = 'Please search for a valid city 😩';
        document.getElementById("climate-temp").innerHTML = "";
        document.getElementById("climate-desc").innerHTML = ""
        document.getElementById("city-icon").src ="";
        document.getElementById("country").innerHTML = ""
        document.getElementById("search-city").value = "";

       
        document.getElementById("humidity").innerHTML="";
      });
  })

