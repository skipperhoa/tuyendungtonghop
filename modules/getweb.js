var express = require('express');
var app = express();
const routes = require('express').Router();
var request = require("request");
var http = require("http");
var cheerio =  require("cheerio");
var exports = module.exports = {};
exports.tuyendungplus = function(req,res){
  var data =[];
   var tuyendungplus="http://tuyendungplus.com/";
     request(tuyendungplus, function (error, response, html) {
           
    });
}