var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var indexRouter = require('./route/index');
var boardRouter = require('./route/boardRouter');
var mongoose = require('./model/mongoose');
var io = require('./public/js/socket')();

app.set('view engine' , 'ejs');
app.set('views' , __dirname +'/views');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(indexRouter);
app.use(boardRouter);

console.log(__dirname);

app.listen(3001 , function(){
    console.log('Server on....' ,3001);
});

