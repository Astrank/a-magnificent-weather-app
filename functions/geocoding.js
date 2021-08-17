const { default: axios } = require("axios");

exports.handler = async function(event, context) {
    try {
        const KEY = process.env.REACT_APP_KEY;

        let weather = await axios
            .get(`https://api.openweathermap.org/geo/1.0/direct?q=${event.queryStringParameters.input}&limit=5&appid=${KEY}`)
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