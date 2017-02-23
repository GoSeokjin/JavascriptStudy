var express= require('express');
var app = express();
var mongoose = require('./router/mongoose')();
var route = require('./router/route');
var userRoute = require('./router/user/userRouter');
var boardRoute = require('./router/board/boardRouter');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

//view 설정
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//static 폴더설정
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//몽구스 셋팅
app.use(flash());
app.use(session({secret: 'MySecret'}));
app.use(passport.initialize());
app.use(passport.session());
//라우터 설정
app.use(route);
app.use(userRoute);
app.use(boardRoute);

app.listen(3000 , function(){
   console.log('Server on....' ,3000);
});