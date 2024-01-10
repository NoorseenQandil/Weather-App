"use strict";

// global variables
let inputSearch = document.querySelector("#inputSearch"),
    btnSearch = document.querySelector("#btnSearch"),
    res,
    data,
    
    dayIcon = document.querySelectorAll(".dayIcon"),
    monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
   days = [  
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];



// TODAYS VARIABLES
let todayDate = document.querySelector(".todayDate"),
    todayMonth = document.querySelector(".todayMonth"),
    todayTemp = document.querySelector(".todayTemp"),
    todayCondition = document.querySelector(".todayCondition"),
    todayWind = document.querySelector(".todayWind p"),
    todayHumididty = document.querySelector(".todayHumididty p"),
    todayDirection = document.querySelector(".todayDirection p"),
    cityName = document.querySelector(".cityName");

// NEXT DAYS VARAIBLES

let nextDayDate = document.querySelectorAll(".nextDayDate"),
    nextDayMonth = document.querySelectorAll(".nextDayMonth"),
    nextDayTemp = document.querySelectorAll(".nextDayTemp"),
    nextDayCondition = document.querySelectorAll(".nextDayCondition"),
    nextDayWind = document.querySelectorAll(".nextDayWind"),
    nextDayHumididty = document.querySelectorAll(".nextDayHumididty"),
    nextDayDirection = document.querySelectorAll(".nextDayDirection"),
    nextdayImgWeather = document.querySelectorAll(".nextdayImgWeather");





async function getWeather(country="alex") {
    const apiKey = "f71c317b9b694ef8b88141142232912";
    res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${country}&days=3`);
     if (res.status == 400) {
        document.querySelector(".error").style.display= "block";
    }
    else {
        document.querySelector(".error").style.display= "none";
    }
    data = await res.json();
    console.log(data);
    displayTodayWeather();
    displayNextdayWeather();
    changeIcon();
}
getWeather()


btnSearch.addEventListener("click", function () {
    if (inputSearch.value === "") {
      Swal.fire({
        title: "Select City First",
        text: "🤡",
        icon: "error",
      });
    } else {
      getWeather(inputSearch.value);
    }
  });

function displayTodayWeather() {
    let date = new Date ();
    todayDate.innerHTML = days[date.getDay()];
    todayMonth.innerHTML = `${date.getDate()} ${ monthName[date.getMonth()]}`;
    todayTemp.innerHTML=Math.floor(data.current.temp_c) + `<span>°C</span>`;
    cityName.innerHTML=data.location.name;
    todayCondition.innerHTML=data.current.condition.text;
    todayWind.innerHTML=data.current.wind_kph + ` km/h`;
    todayHumididty.innerHTML=`<i class="fa-solid fa-water"></i> `+ data.current.humidity;
    todayDirection.innerHTML=`<i class="fa-regular fa-compass"></i> `+ data.current.wind_dir;
}


function displayNextdayWeather (){
    for (let i = 0; i < nextDayDate.length; i++) {
        const nextDate = new Date(data.forecast.forecastday[i + 1].date);
        nextDayDate[i].innerHTML = days[nextDate.getDay()];
        nextDayMonth[i].innerHTML = `${nextDate.getDate()} ${monthName[nextDate.getMonth()]}`;
        nextDayTemp[i].innerHTML = Math.floor(data.forecast.forecastday[i + 1].day.avgtemp_c) + `<span>°C</span>`;
        nextDayCondition[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text;
        nextDayWind[i].innerHTML = data.forecast.forecastday[i + 1].day.avgvis_km + ` km/h`;
        nextDayHumididty[i].innerHTML = `<i class="fa-solid fa-water"></i> ` + data.forecast.forecastday[i + 1].day.avghumidity;
        nextDayDirection[i].innerHTML = `<i class="fa-regular fa-compass"></i> ` + data.forecast.forecastday[i + 1].hour[i].wind_dir;
      }
    
}


inputSearch.addEventListener("keyup",function(){
  getWeather(inputSearch.value);
})

  btnSearch.addEventListener("click",function(){
    let value = inputSearch.value
    getWeather(value);
    
})


function dateAndTime() {
    
const date = new Date();
const day = date.getDate();
const month = date.toLocaleString('default', { month: 'long' });
const hours = date.getHours();
const minutes = date.getMinutes();
let seconds = date.getSeconds();

setInterval(() => {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  if (hours === 24) {
    hours = 0;
    day++;
  }
  const newDate = new Date();
  const newDay = newDate.getDate();
  if (newDay !== day) {
    day = newDay;
    month = newDate.toLocaleString('default', { month: 'long' });
  }
  document.querySelector(".timeDate").innerHTML= ` ${day}th of ${month} ${hours}:${minutes}:${seconds}`;
}, 1000);
}
dateAndTime();


 function changeIcon() { 
    for (let i = 0; i < dayIcon.length; i++) {
        switch (data.forecast.forecastday[i].day.condition.text) {
            case "Sunny":
                dayIcon[i].src = "./image/weather/64x64/day/113.png"
                break;
            case "Partly cloudy":
                dayIcon[i].src = "./image/weather/64x64/day/116.png"
                break;
            case "Cloudy":
                dayIcon[i].src = "./image/weather/64x64/day/119.png"
                break;
            case "Overcast":
                dayIcon[i].src = "./image/weather/64x64/day/122.png"
                break;
            case "Mist":
                dayIcon[i].src = "./image/weather/64x64/day/143.png"
                break;
            case "Patchy rain possible":
                dayIcon[i].src = "./image/weather/64x64/day/176.png"
                break;
            case "Patchy snow possible":
                dayIcon[i].src = "./image/weather/64x64/day/179.png"
                break;
            case "Patchy rain possible":
                dayIcon[i].src = "./image/weather/64x64/day/176.png"
                break;
            case "Patchy sleet possible":
                dayIcon[i].src = "./image/weather/64x64/day/182.png"
                break;
            case "Patchy freezing drizzle possible":
                dayIcon[i].src = "./image/weather/64x64/day/185.png"
                break;
            case "Thundery outbreaks possible":
                dayIcon[i].src = "./image/weather/64x64/day/200.png"
                break;
            case "Blowing snow":
                dayIcon[i].src = "./image/weather/64x64/day/227.png"
                break;
            case "Blizzard":
                dayIcon[i].src = "./image/weather/64x64/day/230.png"
                break;
            case "Fog":
                dayIcon[i].src = "./image/weather/64x64/day/248.png"
                break;
            case "Freezing fog":
                dayIcon[i].src = "./image/weather/64x64/day/260.png"
                break;
            case "Patchy light drizzle":
                dayIcon[i].src = "./image/weather/64x64/day/263.png"
                break;
            case "Light drizzle":
                dayIcon[i].src = "./image/weather/64x64/day/266.png"
                break;
            case "Freezing drizzle":
                dayIcon[i].src = "./image/weather/64x64/day/281.png"
                break;
            case "Heavy freezing drizzle":
                dayIcon[i].src = "./image/weather/64x64/day/284.png"
                break;
            case "Patchy light rain":
                dayIcon[i].src = "./image/weather/64x64/day/293.png"
                break;
            case "Light rain":
                dayIcon[i].src = "./image/weather/64x64/day/296.png"
                break;
            case "Moderate rain at times":
                dayIcon[i].src = "./image/weather/64x64/day/299.png"
                break;
            case "Moderate rain":
                dayIcon[i].src = "./image/weather/64x64/day/302.png"
                break;
            case "Heavy rain at times":
                dayIcon[i].src = "./image/weather/64x64/day/305.png"
                break;
            case "Heavy rain":
                dayIcon[i].src = "./image/weather/64x64/day/308.png"
                break;
            case "Light freezing rain":
                dayIcon[i].src = "./image/weather/64x64/day/311.png"
                break;
            case "Moderate or heavy freezing rain":
                dayIcon[i].src = "./image/weather/64x64/day/314.png"
                break;
            case "Light sleet":
                dayIcon[i].src = "./image/weather/64x64/day/317.png"
                break;
            case "Moderate or heavy sleet":
                dayIcon[i].src = "./image/weather/64x64/day/320.png"
                break;
            case "Patchy light snow":
                dayIcon[i].src = "./image/weather/64x64/day/323.png"
                break;
            case "Light snow":
                dayIcon[i].src = "./image/weather/64x64/day/326.png"
                break;
            case "Patchy moderate snow":
                dayIcon[i].src = "./image/weather/64x64/day/329.png"
                break;
            case "Moderate snow":
                dayIcon[i].src = "./image/weather/64x64/day/332.png"
                break;
            case "Patchy heavy snow":
                dayIcon[i].src = "./image/weather/64x64/day/335.png"
                break;
            case "Heavy snow":
                dayIcon[i].src = "./image/weather/64x64/day/338.png"
                break;
            case "Ice pellets":
                dayIcon[i].src = "./image/weather/64x64/day/350.png"
                break;
            case "Light rain shower":
                dayIcon[i].src = "./image/weather/64x64/day/353.png"
                break;
            case "Moderate or heavy rain shower":
                dayIcon[i].src = "./image/weather/64x64/day/356.png"
                break;
            case "Torrential rain shower":
                dayIcon[i].src = "./image/weather/64x64/day/359.png"
                break;
            case "Light sleet showers":
                dayIcon[i].src = "./image/weather/64x64/day/362.png"
                break;
            case "Moderate or heavy sleet showers":
                dayIcon[i].src = "./image/weather/64x64/day/365.png"
                break;
            case "Light snow showers":
                dayIcon[i].src = "./image/weather/64x64/day/368.png"
                break;
            case "Moderate or heavy snow showers":
                dayIcon[i].src = "./image/weather/64x64/day/371.png"
                break;
            case "Light showers of ice pellets":
                dayIcon[i].src = "./image/weather/64x64/day/374.png"
                break;
            case "Moderate or heavy showers of ice pellets":
                dayIcon[i].src = "./image/weather/64x64/day/377.png"
                break;
            case "Patchy light rain with thunder":
                dayIcon[i].src = "./image/weather/64x64/day/386.png"
                break;
            case "Moderate or heavy rain with thunder":
                dayIcon[i].src = "./image/weather/64x64/day/389.png"
                break;
            case "Patchy light snow with thunder":
                dayIcon[i].src = "./image/weather/64x64/day/392.png"
                break;
            case "Moderate or heavy snow with thunder":
                dayIcon[i].src = "./image/weather/64x64/day/395.png"
                break;
            default:
                break;
        }
        
    }
    
}






