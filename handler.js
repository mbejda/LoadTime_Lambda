// https://github.com/GoogleChrome/lighthouse
const PWMetrics = require('pwmetrics');


var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();

module.exports = api;




api.get('/ping', function (request,response) {
    return new Promise(function (resolve, reject) {


        let url = request.queryString.url;
        console.log(url);




        const options = {
            flags: {
                runs: 1, // number or runs
                submit: false, // turn on submitting to Google Sheets
                upload: false, // turn on uploading to Google Drive
                view: false, // open uploaded traces to Google Drive in DevTools
                chromeFlags: '--headless' // run in headless Chrome
            }
        };

        const pwMetrics = new PWMetrics(url, options); // _All available configuration options_ can be used as `options`
        pwMetrics.start().then((response)=>{
            console.log('DONE ',response)
            resolve(response);
        }).catch(e=>reject(e));





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