const apiKey = '6d0bfa163c30a0358dcd4baaafee77be'; // Replace with your OpenWeatherMap API key

// Function to get current weather and forecast
function getWeather() {
    const city = document.getElementById('cityInput').value;
    
    // URL for current weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    // URL for 5-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('cityName').innerText = `Weather in ${data.name}`;
                document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
                document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
                document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
                document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
                document.getElementById('weatherResult').style.display = 'block';
            } else {
                alert('City not found!');
            }
        })
        .catch(error => console.error('Error:', error));

    // Fetch forecast data
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById('forecastResult');
            forecastContainer.innerHTML = ''; // Clear previous forecast

            const forecastList = data.list;

            // Display forecast for the next 5 timestamps (15-hour forecast)
            for (let i = 0; i < 5; i++) {
                const forecastItem = forecastList[i];

                const dateTime = new Date(forecastItem.dt * 1000);
                const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const day = dateTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

                const temp = forecastItem.main.temp;
                const description = forecastItem.weather[0].description;

                // Create forecast item element
                const forecastElement = document.createElement('div');
                forecastElement.className = 'forecast-item';
                forecastElement.innerHTML = `
                    <h4>${day} ${time}</h4>
                    <p>Temp: ${temp}°C</p>
                    <p>${description}</p>
                `;

                forecastContainer.appendChild(forecastElement);
            }
            document.getElementById('forecastResult').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}
