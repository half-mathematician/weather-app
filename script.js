// script.js

document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '703992e8e01e74b73e2283fd65552ffa';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('cityName').innerText = data.name;
                document.getElementById('description').innerText = data.weather[0].description;
                document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
                document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
                document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
                document.getElementById('pressure').innerText = `Pressure: ${data.main.pressure} hPa`;
                document.getElementById('visibility').innerText = `Visibility: ${data.visibility} meters`;
                document.getElementById('sunrise').innerText = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
                document.getElementById('sunset').innerText = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastCards = document.getElementById('forecastCards');
            forecastCards.innerHTML = '';
            data.list.forEach((forecast, index) => {
                if (index % 8 === 0) {
                    const forecastCard = document.createElement('div');
                    forecastCard.classList.add('card');
                    forecastCard.innerHTML = `
                        <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Weather Icon">
                        <p>${forecast.weather[0].description}</p>
                        <p>Temp: ${forecast.main.temp}°C</p>
                        <p>Humidity: ${forecast.main.humidity}%</p>
                    `;
                    forecastCards.appendChild(forecastCard);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
});
