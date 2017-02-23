var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    useremail: {type: String, required: true, unique: true},
    userpassword: {type: String, required: true},
    username: {type: String},
    userImg : {type: String , default: "noimg.jpg"},
    createdAt: {type: Date, default: Date.now}
});
var User = mongoose.model('user', userSchema);

module.exports=  User;