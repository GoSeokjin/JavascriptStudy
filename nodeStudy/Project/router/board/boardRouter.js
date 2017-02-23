var express = require('express');
var route = express.Router();
var Board = require('./boardModel');

route.get('/board', function(req, res){
    Board.find({} , function(err , board){
       if(err) return res.json({success : false , message : err});
       res.render('page/boardBody', {user : req.user , data: board});
    });
});

route.post('/board' , function(req, res){
    console.log('여기들어와 ? ' ,req.body.boardTitle);
    console.log(req.body.post);
   Board.create(req.body.post, function(err ,post){
       if(err) return res.json({success : false , message : err});
       res.json({success:true , data:post});
   });
});

module.exports = route;
