// https://github.com/GoogleChrome/lighthouse
var phantomjs = require('phantomjs-prebuilt');
var request = require('request');



var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();

module.exports = api;




api.get('/ping', function (req,res) {
    return new Promise(function (resolve, reject) {

        let url = req.queryString.url;
        let header = req.queryString.header;
        console.log(url);

        const response_object = {
            error: null,
            status_code: 0,
            response_time : 0,
            region: process.env.AWS_REGION,
            url
        };


        let request_object = {
            url,
            time : true
        };
        if(header){
            const parsed = JSON.parse(header);
            request_object = Object.assign(request_object,parsed);
        }



        request.get(request_object,function(err, response) {
            if(err || !response){
                response_object.error = err;
                resolve(response_object);
                return;
            }
            response_object.response_time = response.elapsedTime;
            response_object.status_code = response.statusCode;
            resolve(response_object);


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