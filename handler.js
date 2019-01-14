// https://github.com/GoogleChrome/lighthouse
const createLighthouse = require('lighthouse-lambda');


var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();

module.exports = api;




api.get('/ping', function (request,response) {
    return new Promise(function (resolve, reject) {


        let url = request.queryString.url;
        console.log(url);


        Promise.resolve()
            .then(() => createLighthouse(url, { logLevel: 'info' }))
            .then(({ chrome, start }) => {
                return start()
                    .then((results) => {
                        // Do something with `results`
                        return chrome.kill().then(() => resolve(results))
                    })
                    .catch((error) => {
                        // Handle errors when running Lighthouse
                        return chrome.kill().then(() => reject(error))
                    })
            })
            // Handle other errors
            .catch(e=>reject(e));






    });
});



/*

module.exports.ping = async (event, context,callback) => {

    let data = event.queryStringParameters;
    let url = data.url;

    Promise.resolve()
        .then(() => createLighthouse(url, {logLevel: 'info'}))
        .then(({chrome, start}) => {
            return start()
                .then((results) => {
                    // Do something with `results`
                    return chrome.kill().then(() => callback(null,results))
                })
                .catch((error) => {
                    // Handle errors when running Lighthouse
                    return chrome.kill().then(() => callback(error))
                })
        })
        // Handle other errors
        .catch(callback)


}
*/