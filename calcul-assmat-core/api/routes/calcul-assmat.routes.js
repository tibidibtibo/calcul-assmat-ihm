'use strict';

module.exports = function( app ) {

  var calculAssmatCtrl = require('../controllers/calcul-assmat.controller');

  app.route('/calcul/:mois')
    .get(calculAssmatCtrl.calculMensuel);

};