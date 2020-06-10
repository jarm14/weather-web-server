const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiamFybTE0IiwiYSI6ImNrYXZsNTc1ZTFnOHAyc3AzM21ldnpuc3MifQ.emxUGL17RTfgotLAIOvRcQ&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Geocode service can´t be access', undefined)
        } else if (body.features.length === 0) {
            callback('The provided location is wrong', undefined)
        } else {
            callback(undefined, {
                latitud: body.features[0].center[1],
                longitud: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode