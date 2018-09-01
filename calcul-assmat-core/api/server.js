'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');
  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//importing route
var routes = require('./routes/calcul-assmat.routes');
routes(app); //register the route

app.listen(port);

console.log('Serveur calcul-assmat-core RESTful API démarré sur le port : ' + port);