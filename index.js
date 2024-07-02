const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "46a81db5d1998f53e61b27e520b84143";

weatherForm.addEventListener("submit", event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayWeatherInfo(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeatherInfo(data) {
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const weatherId = data.weather[0].id;
    const cityName = data.name;
    const country = data.sys.country;

    card.innerHTML = `
        <h2>${cityName}, ${country}</h2>
        <p>${temperature}°C</p>
        <p>${weatherDescription}</p>
        <p>${getWeatherEmoji(weatherId)}</p>
    `;
    card.style.display = "block";
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈️"; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 500) {
        return "🌧️"; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌧️"; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️"; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫️"; // Atmosphere (fog, mist, etc.)
    } else if (weatherId === 800) {
        return "☀️"; // Clear
    } else if (weatherId > 800 && weatherId < 900) {
        return "☁️"; // Clouds
    } else {
        return "🌈"; // Default
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
