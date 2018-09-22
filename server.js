var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var path = require('path')
var port = process.env.PORT || 8080;
var router=express.Router();
var routes = require('./routes');
var db=require('./db');
var bcrypt = require('bcrypt'); 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',routes.user);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

 app.listen(port,()=>{
    console.log("signup Server started on port " + port);
});