const container = document.querySelector(".container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const weatherBox = document.querySelector(".weather-box");
const weatherDetail = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");


function getWeather(){
    const APIKey = "b47d1e6177259a8e8a867e871132536c";
    let city = document.querySelector(".search").value;

    if(city == "")
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if(json.cod == "404"){
            cityHide.textContent = city
            container.style.height = "450px";
            weatherBox.classList.remove("active")
            weatherDetail.classList.remove("active")
            error404.classList.add("active");
            return;
        }


        const image = document.querySelector(".weather-box img");
        const tempreture = document.querySelector(".weather-box .tempreture");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");


        if(cityHide.textContent == city){
            return;
        }
        else{
            cityHide.textContent = city;

            container.style.height = "580px";
            weatherBox.classList.add("active")
            weatherDetail.classList.add("active")
            error404.classList.remove("active");

            setTimeout(() => {
                container.classList.remove("active")
            }, 2500);


            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "images/clear.png";
                    break;
            
                case "Rain":
                    image.src = "images/rain.png";
                    break;
            
                case "Snow":
                    image.src = "images/snow.png";
                    break;
            
                case "Clouds":
                    image.src = "images/cloud.png";
                    break;
            
                case "Mist":
                    image.src = "images/mist.png";
                    break;
            
                case "Haze":
                    image.src = "images/mist.png";
                    break;
            
                default:
                    image.src = "images/cloud.png";;
            }
    
            tempreture.innerHTML = `${parseInt(json.main.temp)}<span>&deg;C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

            const infoWeather = document.querySelector(".info-weather");
            const infoHumidity = document.querySelector(".info-humidity");
            const infoWind = document.querySelector(".info-wind");

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = "clone-info-weather";
            elCloneInfoWeather.classList.add("active-clone");

            elCloneInfoHumidity.id = "clone-info-humidity";
            elCloneInfoHumidity.classList.add("active-clone");

            elCloneInfoWind.id = "clone-info-wind";
            elCloneInfoWind.classList.add("active-clone");

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            }, 2200);

            const cloneInfoWeather = document.querySelectorAll(".info-weather.active-clone");
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirts = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll(".info-humidity.active-clone");
            const cloneInfoHumidiityFirts = cloneInfoHumidity
            [0];

            const cloneInfoWind = document.querySelectorAll(".info-wind.active-clone");
            const cloneInfoWindFirts = cloneInfoWind
            [0];

            if(totalCloneInfoWeather > 0){
                cloneInfoWeatherFirts.classList.remove("active-clone");
                cloneInfoHumidiityFirts.classList.remove("active-clone");
                cloneInfoWindFirts.classList.remove("active-clone");


                setTimeout(() => {
                    cloneInfoWeatherFirts.remove();
                    cloneInfoHumidiityFirts.remove();
                    cloneInfoWindFirts.remove();
                }, 2200);
            }
        }

        
    })
}


searchBtn.addEventListener("click", getWeather);


document.body.addEventListener("keydown", ()=>{
    if(event.key === 'Enter'){
        getWeather()
    }
})