var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var User = require('./userModel');
var passport = require('passport');
var userPassport = require('./userPassport')();
var flash = require('connect-flash');
var async= require('async');

//로그인시 local-login으로 등록해놓은 passport를 사용
route.post('/user/login', function (req, res, next) {
        req.flash("email");
        console.log('/user/login/ ' , req.body.useremail);
        if (req.body.useremail.length === 0 || req.body.userpassword.length === 0) {
            req.flash('email', req.body.email);
            req.flash('loginError', 'Please enter both email and password');
            req.redirect('/');
        } else {
            console.log('login next');
            next();
        }
    }, passport.authenticate('local-login', {
        successRedirect: '/main',
        failureRedirect: '/',
        failureFlash: true
    })
);

route.get('/user/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

route.post('/user/new', checkUserRegValidation, function (req, res, next) {
    User.create(req.body.user, function (err, user) {
        console.log(req.body.user);
        if (err) {
            return console.log('err');
        }
        res.redirect('/');
    })
});

function checkUserRegValidation(req, res, next) {
    var isValid = true;
    async.waterfall(
        [function (callback) {
            User.findOne({'useremail': req.body.useremail, _id: {$ne: mongoose.Types.ObjectId(req.params.id)}},
                function (err, user) {
                    if (user) {
                        isValid = false;
                        console.log('-This email is already resistered');
                    }
                    callback(null, isValid);
                })
        }, function (isValid, callback) {
            User.findOne({username: req.body.username, _id: {$ne: mongoose.Types.ObjectId(req.params.id)}},
                function (err, user) {
                    if (user) {
                        isValid = false;
                        console.log('-This is already resistered');
                    }
                    callback(null, isValid);
                })
        }], function (err, isValid) {
            if (err) return res.json({success: "false", message: err});
            if (isValid) {
                return next();
            } else {
                console.log(req.body.user);
                res.redirect('back');
            }
        }
    )
}

module.exports = route;