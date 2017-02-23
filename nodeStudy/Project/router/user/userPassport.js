var express = require('express');
var User = require('./userModel');
var passport = require('passport');
var session = require('express-session');
var async = require('async');
var flash = require('connect-flash');
var mongoose = require('mongoose');

module.exports = function(){

//첫 로그인시 id값을 세션에 저장하여 넘겨준다.
    passport.serializeUser(function (user, done) {
        console.log('serializeUser' , user);
        done(null, user.id);
    });

//이미 로그인되어있을시 세션의 id값을 참조하여 user를 반환해준다
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            console.log('deserializeUser' , user)
            done(err, user);
        });
    });

//로그인 Strategy
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('local-login',
        new LocalStrategy({
                usernameField: 'useremail',
                passwordField: 'userpassword',
                passReqToCallback: true
            },
            function (req, useremail, userpassword, done) {
                console.log('여기 오긴오니 ?');
                User.findOne({'useremail': useremail}, function (err, user) {
                    if (err) return done(err);
                    if (!user) {
                        req.flash('useremail', req.body.useremail);
                        return done(null, false, req.flash('loginError', 'No user found'));
                    }
                    if (user.userpassword != userpassword) {
                        req.flash('useremail', req.body.useremail);
                        return done(null, false, req.flash('loginError', 'Password does not Match.'));
                    }
                    return done(null, user);
                });
            }));

}