const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d1e1916667077296a1f25c2992e4bd6a&query=' + latitude + ',' + longitude + '&units=f'
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Weather service is not available at this time. Please verify network connectivity and try again', undefined)
        } else if (body.error) {
            callback('There is an error in the search parameters.', undefined)
        } else {
            const temp = body.current.temperature
            const feelsLike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            callback(undefined, {Forecast: `It is ${description} and currently ${temp} degrees with humidity at ${humidity}%, and feels like ${feelsLike} degrees outside.`
            })
        }
    })
}

module.exports = forecast

