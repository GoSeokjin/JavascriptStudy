var mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
    boardTitle : {type:String , required : true},
    boardWriter : {type : String , required : true},
    boardContent : {type:String , required: true},
    createAt : {type: Date , default: Date.now},
    updatedAt : Date
});

var Board = mongoose.model('board' , boardSchema);

module.exports = Board;