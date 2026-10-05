export function forecastList(forecasts) {
    try {
        if (!forecasts || !forecasts.time || forecasts.time.length === 0) {
            throw new Error('Invalid forecast data')
        }
    
        const forecast_cards = document.getElementById('forecast_cards')
        forecast_cards.innerHTML = ''

    const forecast_cards_list = document.createElement('ul')
    forecast_cards_list.id = 'forecast_card_list'

    const day_list = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    for (let i = 0; i < 7; i++) {

        // Create a new forecast card for each day
        const forecast_card = document.createElement('li')
        forecast_card.classList.add('forecast_card')

        // Create an h4 element for each forecasted day
        const h4 = document.createElement('h4')
        const date = new Date(forecasts.time[i])
        const day = date.getDay()
        const dayOfWeek = day_list[day]
        h4.textContent = `${dayOfWeek}`
        
        // Create p elements
        const max_temp = document.createElement('p')
        max_temp.textContent = `Max Temp: ${forecasts.temperature_2m_max[i]}°F`

        const min_temp = document.createElement('p')
        min_temp.textContent = `Min Temp: ${forecasts.temperature_2m_min[i]}°F`

        const uv_index = document.createElement('p')
        uv_index.textContent = `UV Index: ${forecasts.uv_index_max[i]}`

        const sunrise = document.createElement('p')
        const sunriseDate = new Date(forecasts.sunrise[i])
        sunrise.textContent = `Sunrise: ${sunriseDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`

        const sunset = document.createElement('p')
        const sunsetDate = new Date(forecasts.sunset[i])
        sunset.textContent = `Sunset: ${sunsetDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`

        forecast_card.appendChild(h4)
        forecast_card.appendChild(max_temp)
        forecast_card.appendChild(min_temp)
        forecast_card.appendChild(uv_index)
        forecast_card.appendChild(sunrise)
        forecast_card.appendChild(sunset)

        forecast_cards_list.appendChild(forecast_card)
    }
    
    forecast_cards.appendChild(forecast_cards_list)
    } catch(error) {
        console.error('Error displaying forecast:', error)
        const forecast_cards = document.getElementById('forecast_cards')
        forecast_cards.innerHTML = '<p>Error loading forecast</p>'
    }
}