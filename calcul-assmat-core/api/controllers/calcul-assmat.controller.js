'use strict';

var moment = require('moment');
var _ = require('lodash');

var dateUtils = require('../utils/date.utils').dateUtils;
var excelReader = require('../utils/excel-reader').excelReader;
var configuration = require('../configuration/configuration').configuration;


exports.calculMensuel = function(req, res) {
    const month = req.params.mois;
    console.log("Calcul pour le mois " + month);
    const data = excelReader.readExcelFile("../../../specifications/Suivi garde Louise et Joséphine.xlsx");
    res.json(data);
};
