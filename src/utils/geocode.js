const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXJuYXZsaW1heWUiLCJhIjoiY2s3MDFwaXdjMWYwNzNkcW5ueHN4bHcyayJ9.iTcdN-e-zOxyKSG-obz4jg&limit=1';

    request({ url : url , json : true}, (error,response) => {
        if(error){
            callback('Unable to connect to geocode service',undefined);
        } else if(response.body.features.length === 0){
            callback('No results found',undefined);
        } else {
            const feature = response.body.features[0];
            callback(undefined,{
                latitude : feature.center[1],
                longitude : feature.center[0],
                location : feature.place_name
            });
        }
    });
}

module.exports = geocode;