// https://github.com/GoogleChrome/lighthouse
var phantomjs = require('phantomjs-prebuilt');


var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();

module.exports = api;




api.get('/ping', function (request,response) {
    return new Promise(function (resolve, reject) {


        let url = request.queryString.url;
        console.log(url);


        var phantom = phantomjs.exec('phantomjs-script.js', url, 'arg2');



        phantom.stdout.on('data', function(buf) {
            console.log('[STR] stdout "%s"', String(buf));
        });
        phantom.stderr.on('data', function(buf) {
            console.log('[STR] stderr "%s"', String(buf));
        });
        phantom.on('close', function(code) {
            console.log('[END] code', code);
        });

        phantom.on('exit', code => {
            resolve()
        });





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