var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var DB = function (url, collection)  {
    this.db = null;
    this.temp = {};

    this.connect = function () {
        this.temp = new Promise(function (resolve, reject) {
            MongoClient.connect(url, function (err, db) {
                if (err) reject(Error(err));
                console.log("connected to the mongoDB !");
                this.db = db.collection(collection);
                resolve();
            });
        });
        return this;
    };

    this.insert = function (obj) {
        this.temp = this.temp.then(function () {
            return new Promise(function (resolve, reject) {
                this.db.insert(obj, function (err, result) {
                    if (err) reject(Error(err));
                    resolve("삽입완료");
                });
            });
        });
        return this;
    };

    this.find = function (obj) {
        this.temp = this.temp.then(function () {
            return new Promise(function (resolve, reject) {
                this.db.findOne(obj, function (err, result) {
                    if (err) reject(Error(err));
                    resolve(result.name);
                });
            });
        });
        return this;
    };

    this.del = function (obj) {
        this.temp = this.temp.then(function () {
            return new Promise(function (resolve, reject) {
                this.db.remove(obj, function (err, result) {
                    if (err) reject(Error(err));
                    resolve("삭제완료");
                });
            });
        });
        return this;
    };

    this.output = function () {
        this.temp = this.temp.then(function (text) {
            new Promise(function (resolve, reject) {
                console.log(text);
            });
        });
        return this;
    };
};


app.listen(3000, function () {
    var db = new DB('mongodb://127.0.0.1:27017/test', "icecream")
        .connect().insert({name: "베스킨라빈스1"})
        .output()
        .find({name: "베스킨라빈스1"})
        .output()
        .del({name:'베스킨라빈스'})
        .output();
    console.log('Server on....', 3000);
});

