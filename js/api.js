export async function getCityData(city) {
    try {
        const getData = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)
        if (!getData.ok) throw new Error(`HTTP error! status: ${getData.status}`)
        const data = await getData.json()
        return data.results
    } catch (error) {
        console.error('Error fetching city data:', error)
        throw error
    }
}

export async function getWeatherData(lon, lat) {
    try {
        const getData = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,showers,surface_pressure,pressure_msl,cloud_cover,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
        if (!getData.ok) throw new Error(`HTTP error! status: ${getData.status}`)
        const data = await getData.json()
        return data
    } catch (error) {
        console.error('Error fetching weather data:', error)
        throw error
    }
}