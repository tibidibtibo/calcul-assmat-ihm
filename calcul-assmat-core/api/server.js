'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
const logger = require('simple-node-logger').createSimpleLogger();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//importing route
var routes = require('./routes/calcul-assmat.routes');
routes(app); //register the route

app.listen(port);

logger.info('"calcul-assmat-core" RESTful API démarrée sur le port "' + port + '"');