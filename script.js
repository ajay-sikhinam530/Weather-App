let weather = {
    apiKey:"6d4ec31b4f476ae4b621c14363d684cb",
    fetchWeather: function(city){
        document.querySelector(".weather").classList.add("loading");
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        +city
        +"&units=metric&appid="
        +this.apiKey)
        .then(response=> response.json())
        .then(data => this.displayWhether(data));
    },
    displayWhether: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = "weather in "+name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".temp").innerText = temp+"°C";
        document.querySelector(".description").innerText = description
        document.querySelector(".humidity").innerText = "Humidity: "+humidity+"%";
        document.querySelector(".wind").innerText = "Wind speed: "+speed+"km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.background = "url('https://source.unsplash.com/1600x900/?"+name+"')";
        this.resetSearch();
    },
    resetSearch: function(){
        document.querySelector(".search-bar").value = ""
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
}


window.onload = function(){
    document.querySelector(".search-button")
    .addEventListener("click",function(){
    weather.search();
    })

    document.querySelector(".search-bar")
    .addEventListener("keyup",function(e){
        if(e.key =="Enter"){
            weather.search();
        }
    })
    weather.fetchWeather("Denver");
}