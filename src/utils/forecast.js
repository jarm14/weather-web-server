const request = require('request')

const forecast = (latitud, longitud, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=30347a8a8dc4ae009e31e42666659b31&query=' + latitud + ',' + longitud
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Weather service can`t be access', undefined)
        } else if (body.error) {
            callback('The provided location is wrong', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. Currently it is ' + body.current.temperature + ' degrees. And it feels like ' + body.current.feelslike + ' degrees')
        }
    })
}

module.exports = forecast