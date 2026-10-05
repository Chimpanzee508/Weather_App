import { getWeatherData } from "../api.js"

export async function weatherData(city) {
    try {
        if (!city || !city.longitude || !city.latitude) {
            throw new Error('Invalid city coordinates')
        }

        const data = await getWeatherData(city.longitude, city.latitude)
        
        if (!data || !data.current || !data.daily) {
            throw new Error('Invalid weather data structure')
        }

        const current_weather = data.current
        const forecast = data.daily

        return {
            current_weather,
            forecast
        }
    } catch(error) {
        console.error('Error fetching weather data:', error)
        throw error
    }
}