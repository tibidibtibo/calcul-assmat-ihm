'use strict';

var _ = require('lodash');
var moment = require('moment-timezone');

var dateUtils = require('../utils/date.utils').dateUtils;
var excelReader = require('../utils/excel-reader').excelReader;
var configuration = require('../configuration/configuration').configuration;
const logger = require('simple-node-logger').createSimpleLogger();

const LOUISE = "Louise", JOSEPHINE = "Joséphine";

exports.calculMensuel = function (req, res) {
    const month = req.params.mois;
    logger.info("Calcul pour le mois " + month);

    const data = excelReader.readExcelFile("../../../specifications/Suivi garde Louise et Joséphine.xlsx");

    var donneesParDate = mapperParDate(data, month);
    var resultat = mapperParPersonne(dissocierTrajets(donneesParDate));

    res.json(resultat); 

};

function dissocierTrajets(data) {
    for(var key in data) {
        _.forEach(data[key], ligne => {
            if(!data[key].repas) {
                data[key].repas = ligne.repas ? splitListe(ligne.repas) : null;
            } else {
                if(ligne.repas) {
                    data[key].repas.push(splitListe(ligne.repas));
                }
            }
        });
    }
    return data;
}

function mapperParPersonne(data) {
    return data;
}

function mapperParDate(data, mois) {

    var resultat = {};

    _.forEach(data, ligne => {

        var horodatage = dateUtils.excelDateToDate(ligne[excelReader.headers.horodatageSaisie]),
            dateSaisie = dateUtils.excelDateToDate(ligne[excelReader.headers.dateSaisie]);

        var jsDate = dateSaisie ? dateSaisie : horodatage;
        var stringDate = dateUtils.toDate(jsDate);

        if(stringDate && Number(mois) === (moment(jsDate).month() + 1)) {
            if(!resultat[stringDate]) {
                resultat[stringDate] = [{
                    "qui": splitListe(ligne[excelReader.headers.qui]),
                    "action": ligne[excelReader.headers.action],
                    "heureAction": dateUtils.excelHourToDate(ligne[excelReader.headers.heureAction]),
                    "repas": ligne[excelReader.headers.repas],
                    "deplacements": ligne[excelReader.headers.deplacements],
                    "autreDeplacementKm": ligne[excelReader.headers.autreDeplacementKm]
                }];
            } else {
                resultat[stringDate].push({
                    "qui": splitListe(ligne[excelReader.headers.qui]),
                    "action": ligne[excelReader.headers.action],
                    "heureAction": dateUtils.excelHourToDate(ligne[excelReader.headers.heureAction]),
                    "repas": ligne[excelReader.headers.repas],
                    "deplacements": ligne[excelReader.headers.deplacements],
                    "autreDeplacementKm": ligne[excelReader.headers.autreDeplacementKm]
                });
            }
        }
         
    });

    return resultat;
}

function findHoraire(ligne, typeHoraire) {
    return (ligne.action === typeHoraire) ? ligne.heureAction : null;
}

function splitListe(text) {
    return text.replace(/ /g, '').split(',');
}