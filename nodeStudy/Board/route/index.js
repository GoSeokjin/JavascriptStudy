var express = require('express');
var route = express.Router();


route.get('/' , function(req ,res , next){
    res.render('partition/mainPage' , {title : '소개' , color : '#00bcd4'});
});


module.exports = route;