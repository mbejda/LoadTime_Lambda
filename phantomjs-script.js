var page = require('webpage').create(),
    system = require('system'),
    t, address;

if (system.args.length === 1) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit();
}

t = Date.now();
address = system.args[1];

var resources = [];
page.on('onResourceReceived', function (response) {
    console.log('WOA ',response);
    if (response.stage !== "end") return;
    resources.push(response);
})


page.open(address, function(status) {
    if (status !== 'success') {
        console.log('FAIL to load address');
        console.log('EAD RESOURCES ',resources)
    } else {
        t = Date.now() - t;
        console.log('Loading time ' + t + ' msec');
    }
    phantom.exit();
});