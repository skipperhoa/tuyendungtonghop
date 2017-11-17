var express = require('express');
var app = express();
const routes = require('express').Router();

routes.get('/',function(req,res,next){
    res.render('pages/index',{title:"Search Robot"});
});

routes.get('/home',function(req,res,next){
    res.render('pages/index',{title:"Search Robot"});
});



module.exports = routes;