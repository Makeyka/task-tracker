

const icon = document.querySelector('.weather-icon')
const location = document.querySelector('.location p')
const notification = document.querySelector('.notification')
const temperature = document.querySelector('.temperature-value p')
const description = document.querySelector('.temperature-descriptio p')

const weather = {}
weather.temperature = { unit: 'celsius'}

const KELVIN = 273
const KEY = '82005d27a116c2880c8f0fcb866998a0'

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notification.style.display = 'block'
    notification.innerHTML = 
    '<h3>Geolocation is not supported on your corrent browser</h3>'
}

function setPosition(position) {
    getWeather(position.coords.latitude, position.coords.longitude)
}

function showError(error) {
    notification.style.display = 'block'
    notification.innerHTML =
    `<h3>${error.message}</h3>`
}