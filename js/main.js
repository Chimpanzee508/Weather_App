import { getCityData } from './api.js'
import { citySearch } from './components/CitySearch.js'
import { weatherData } from './utils/WeatherData.js'
import { currentWeather } from './components/CurrentWeather.js'
import { forecastList } from './components/ForecastList.js'

const search_btn = document.getElementById("search_btn")
const city_searchbar = document.getElementById("city_searchbar")
const error_display = document.getElementById("error_display")

let searchTimeout

function showError(message) {
    error_display.textContent = `✖ Error: ${message}`
    error_display.classList.remove("hidden")
    setTimeout(() => {
        error_display.classList.add("hidden")
    }, 5000)
}

function clearError() {
    error_display.classList.add("hidden")
}

async function onSelectCity(city) {
    try {
        if (!city || !city.longitude || !city.latitude) {
            throw new Error('Invalid city data')
        }

        const data = await weatherData(city)

        if (!data || !data.current_weather || !data.forecast) {
            throw new Error('Invalid weather data received')
        }

        console.log('weather data:','\ncurrent weather:', data.current_weather, '\n7 Day forecast:', data.forecast)

        currentWeather(data.current_weather, city)
        forecastList(data.forecast)
        clearError()
    } catch(error) {
        console.error("Weather Error:", error)
        showError(error.message || 'Failed to load weather data')
    }
}

async function SearchCity() {
    try {
        const searchValue = city_searchbar.value.trim()
        
        if (!searchValue) {
            showError('Please enter a city name')
            return
        }

        const city_data = await getCityData(searchValue)
        
        if (!city_data || city_data.length === 0) {
            showError('City not found. Please try another search.')
            return
        }

        clearError()
        citySearch(city_data, onSelectCity)
    } catch(error) {
        console.error("Search Error:", error)
        showError(error.message || 'Failed to search for cities')
    }
}

async function AutoComplete() {
    clearTimeout(searchTimeout)
    clearError()

    if (city_searchbar.value.length < 3) {
        document.getElementById('city_autocomplete').innerHTML = ''
        return
    }

    searchTimeout = setTimeout(async () => {
        try {
            await SearchCity()
        } catch(error) {
            console.error("AutoComplete Error:", error)
        }
    }, 300)
}

search_btn.addEventListener('click', async (e) => {
    e.preventDefault()
    await SearchCity() 
})

city_searchbar.addEventListener('input', AutoComplete)