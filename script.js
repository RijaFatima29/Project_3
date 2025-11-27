const apiKey = "3fb74d1b755333e6aa31a9888c01ebf5";


const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
    let city = cityInput.value.trim();
    if (city === "") {
        showError("Please enter a city name.");
        return;
    }
    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found!");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            showError("Invalid city name. Try again.");
        });
}

function displayWeather(data) {
    document.getElementById("errorMsg").textContent = "";

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("description").textContent =
        data.weather[0].description;

    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById("weatherResult").classList.remove("hidden");
}

function showError(msg) {
    document.getElementById("errorMsg").textContent = msg;
    document.getElementById("weatherResult").classList.add("hidden");
}
