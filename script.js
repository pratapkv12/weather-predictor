document.addEventListener('DOMContentLoaded', () => {
    const locateBtn = document.getElementById('locate-btn');
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const citySpan = document.getElementById('city');
    const tempSpan = document.getElementById('temp');
    const weatherConditionSpan = document.getElementById('weather-condition');
    const humiditySpan = document.getElementById('humidity');
    const precipSpan = document.getElementById('precip');

    function updateWeatherInfo(city, temp, condition, humidity, precip) {
        citySpan.textContent = city;
        tempSpan.textContent = temp;
        weatherConditionSpan.textContent = condition;
        humiditySpan.textContent = humidity;
        precipSpan.textContent = precip;
    }

    function fetchWeatherData(city) {
        const apiKey = 'f78057c22de14fb6b31869c26564ac74'; // Replace with your Weatherbit API key
        const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&units=M`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.length > 0) {
                    const weather = data.data[0];
                    updateWeatherInfo(weather.city_name, weather.temp, weather.weather.description, weather.rh, weather.precip);
                } else {
                    alert('City not found');
                }
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function getCurrentLocationWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiKey = 'f78057c22de14fb6b31869c26564ac74'; // Replace with your Weatherbit API key
                const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=M`;
                
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data.data && data.data.length > 0) {
                            const weather = data.data[0];
                            updateWeatherInfo(weather.city_name, weather.temp, weather.weather.description, weather.rh, weather.precip);
                        } else {
                            alert('Unable to fetch weather data');
                        }
                    })
                    .catch(error => console.error('Error fetching weather data:', error));
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    locateBtn.addEventListener('click', getCurrentLocationWeather);
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        } else {
            alert('Please enter a city name');
        }
    });
});