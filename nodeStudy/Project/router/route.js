var express = require('express');
var route = express.Router();

route.get('/' , function(req , res , next){
    res.render('page/loginPage' );
    next();
});

route.get('/main' , function(req , res , next){
    res.render('page/mainPage', {user : req.user});
    next();
});

route.get('/toDay/main' , function(req ,res , next){
    res.render('page/mainPage.ejs' , {user : req.user});
    next();
});

module.exports = route;

