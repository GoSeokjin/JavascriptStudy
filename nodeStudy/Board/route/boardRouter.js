var express = require('express');
var route = express.Router();
var mongoose = require('../model/mongoose');
var BoardContents = require('../model/boardSchema');


route.get('/board' , function(req ,res , next){
    res.render('partition/boardMain' , {title : '게시판' , color : '#e61875'});
});
route.get('/boardWrite' , function(req ,res , next){
    res.render('partition/boardWrite' , {title : '게시판글쓰기' , color : '#e61875'});
});




module.exports = route;