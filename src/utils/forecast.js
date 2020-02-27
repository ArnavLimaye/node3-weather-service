const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/8482105ce6520ce38f2b9f163847b759/'+latitude+',' +longitude;

    request({url : url, json : true}, (error,response) => {
        if(error){
            callback('Unable to connect to the weather service',undefined);
        } else if(response.body.error){
            callback('Unable to find the given location',undefined);
        } else{
            const currentData = response.body.currently;
            callback(undefined,`It is currently ${currentData.temperature} degrees fahrenheight. There is a ${currentData.precipProbability}% chance of rain`);
        }
    });
}

module.exports = forecast;