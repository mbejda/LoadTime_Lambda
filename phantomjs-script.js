var page = require('webpage').create(),
    system = require('system'),
    t, address;

if (system.args.length === 1) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit();
}

t = Date.now();
address = system.args[1];


page.open(address, function(status) {
    console.log(JSON.stringify(arguments));
    if (status !== 'success') {
        console.log('FAIL to load address');
    } else {
        t = Date.now() - t;
        console.log(JSON.stringify({load_time: t}));
    }
    phantom.exit();
});