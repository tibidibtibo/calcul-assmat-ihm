'use strict';

var _ = require('lodash');

var dateUtils = require('../utils/date.utils').dateUtils;
var excelReader = require('../utils/excel-reader').excelReader;
var configuration = require('../configuration/configuration').configuration;


exports.calculMensuel = function(req, res) {
    const month = req.params.mois;
    console.log("Calcul pour le mois " + month);

    const data = excelReader.readExcelFile("../../../specifications/Suivi garde Louise et Joséphine.xlsx");

    var listeGlobale = _.map( data, ligne => {
        return {
            "horodatageSaisie": dateUtils.excelDateToJSDate(ligne[excelReader.headers.horodatageSaisie]),
            "dateSaisie": dateUtils.excelDateToJSDate(ligne[excelReader.headers.dateSaisie]),
        }
    });

    console.log(listeGlobale);
    res.json(listeGlobale);
};
