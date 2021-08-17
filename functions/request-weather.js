const { default: axios } = require("axios");

exports.handler = async function(event, context) {
    try {
        const KEY = process.env.REACT_APP_KEY;
        
        let weather = await axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${event.queryStringParameters.lat}&lon=${event.queryStringParameters.lon}&units=metric&exclude=minutely&appid=${KEY}`)
            .then(res => res.data);

        return {
            statusCode: 200,
            body: JSON.stringify(weather)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: error.toString()
        }
    }
}