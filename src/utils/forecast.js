const request = require('request')

const forecast = (lat, lon, callback) => {
    url = 'https://api.darksky.net/forecast/1de4bd8edd67f0abf6c9f19a02e35e54/'+lat+','+lon+'?'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to call GeoMap API', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +'It is currently '+ body.currently.temperature+' degrees out. There is '+ body.currently.precipProbability+'% chance of rain with '+ body.currently.humidity + ' units as humidity and'+ body.currently.visibility +' units as visibility respectively')
        }
    })
}



module.exports = forecast