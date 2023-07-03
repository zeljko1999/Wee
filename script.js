const weatherDescription = document.querySelector('.weather-info_description')
const weatherCity = document.querySelector('.weather-info_city')
const weatherDate = document.querySelector('.weather-info_date')
const weatherTemperature = document.querySelector('.weather-info_temperature')
const weatherIcon = document.querySelector('img')
const errorMsg = document.querySelector('.error-msg')
const feelsLike = document.querySelector('.weather-details-container div:nth-child(1)')
const humidity = document.querySelector('.weather-details-container div:nth-child(2)')
const chanceOfRain = document.querySelector('.weather-details-container div:nth-child(3)')
const windSpeed = document.querySelector('.weather-details-container div:nth-child(4)')
const cityInput = document.querySelector('#cityInput')
function getWeatherData (city) {
  const link = 'https://api.weatherapi.com/v1/current.json?key=56f69facb1a642eaa93115146232606&q=' + city
  const link2 = 'https://api.weatherapi.com/v1/forecast.json?key=56f69facb1a642eaa93115146232606&q=' + city + 'days=2'
  fetch(link, { mode: 'cors' })
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      weatherDescription.textContent = (response.current.condition.text)
      console.log(response)
      weatherCity.textContent = response.location.name + ', ' + response.location.country
      weatherIcon.setAttribute('src', 'https:' + response.current.condition.icon)
      weatherTemperature.textContent = response.current.temp_c + '°C'
      feelsLike.textContent = 'Feels Like: ' + response.current.feelslike_c + '°C'
      humidity.textContent = 'Humidity: ' + response.current.humidity + '%'
      windSpeed.textContent = 'Wind Speed: ' + response.current.wind_kph + 'km/h'
      errorMsg.textContent = ''
      const newDate = new Date(response.location.localtime).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
      weatherDate.textContent = newDate
    })
    .catch(function (error) {
      errorMsg.textContent = 'Location not found. Search must be in the form of "City", "City, State" or "City, Country".'
    })
  fetch(link2, { mode: 'cors' })
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

cityInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    getWeatherData(cityInput.value)
  }
})

getWeatherData('new york')
