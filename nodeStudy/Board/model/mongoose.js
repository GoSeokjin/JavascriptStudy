var mongoose = require('mongoose');


mongoose.connect("mongodb://gilbert:1234@ds159208.mlab.com:59208/gilbert");
var db = mongoose.connection;
db.once('open', function () {
    console.log('DB connect');
});

db.on('error', function (err) {
    console.log('DB err', err);
});

module.exports = mongoose;