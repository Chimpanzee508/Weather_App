export function currentWeather(weather_data, city_data) {
    try {
        if (!weather_data || !city_data) {
            throw new Error('Missing weather or city data')
        }

        const weather_section = document.getElementById("weather_section");
        const forecast_section = document.getElementById("forecast_section");
        
        weather_section.classList.remove("hidden");
        forecast_section.classList.remove("hidden");

    const city_h3 = document.getElementById("city")
    const temperature = document.getElementById("temperature")
    const apparent_temperature = document.getElementById("apparent_temperature")
    const cloud_cover = document.getElementById("cloud_cover")
    const precipitation = document.getElementById("precipitation")
    const humidity = document.getElementById("humidity")
    const wind_speed = document.getElementById("wind_speed")
    const wind_direction = document.getElementById("wind_direction")
    const weather_icon = document.getElementById("weather_icon")

    city_h3.textContent = `${city_data.name}, ${city_data.admin1}`
    temperature.textContent = `${weather_data.temperature_2m}°F`
    apparent_temperature.textContent = `Feels like: ${weather_data.apparent_temperature}°F`

    // Set weather icon based on cloud cover
    try {
        if (weather_icon) {
            let iconFile = 'sunny_forecast.svg'
            const cc = Number(weather_data.cloud_cover)
            if (cc <= 30) {
                iconFile = 'sunny_forecast.svg'
            } else if (cc <= 70) {
                iconFile = 'cloudy_sunny_forecast.svg'
            } else {
                iconFile = 'cloudy_forecast.svg'
            }
            weather_icon.src = `svg/${iconFile}`
            weather_icon.classList.remove('hidden')
        }
    } catch (e) {
        console.warn('Could not set weather icon', e)
    }

    let cloudDescription = ""
    if (weather_data.cloud_cover <= 10) {
        cloudDescription = "Sunny"
    } else if (weather_data.cloud_cover <= 30) {
        cloudDescription = "Mostly Sunny"
    } else if (weather_data.cloud_cover <= 50) {
        cloudDescription = "Partly Sunny"
    } else if (weather_data.cloud_cover <= 70) {
        cloudDescription = "Partly Cloudy"
    } else if (weather_data.cloud_cover <= 80) {
        cloudDescription = "Cloudy"
    } else if (weather_data.cloud_cover <= 90) {
        cloudDescription = "Mostly Cloudy"
    } else {
        cloudDescription = "Overcast"
    }

    cloud_cover.textContent = `Cloud Cover: ${cloudDescription}`
    precipitation.textContent = `Precipitation: ${weather_data.precipitation}%`
    humidity.textContent = `Humidity: ${weather_data.relative_humidity_2m}%`
    wind_speed.textContent = `Wind Speed: ${weather_data.wind_speed_10m} mph`

    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    const windDirectionIndex = Math.round(weather_data.wind_direction_10m / 45) % 8
    wind_direction.textContent = `Wind Direction: ${directions[windDirectionIndex]}`
    } catch(error) {
        console.error('Error displaying current weather:', error)
        document.getElementById("weather_section").innerHTML = '<p>Error loading current weather</p>'
    }
}