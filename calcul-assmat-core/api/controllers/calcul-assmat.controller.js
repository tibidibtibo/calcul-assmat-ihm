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
    var donneesAvecFraisParJour = dissocierFraisJournaliers(donneesParDate);
    var donneesParPersonne = mapperParPersonne(donneesAvecFraisParJour);
    var donneesParPersonneHoraires = mapperParHoraires(donneesParPersonne);

    res.json(donneesParPersonneHoraires); 

};

function mapperParHoraires(data) {
    var clonedData = _.cloneDeep(data);
    for(var key in clonedData) {
        data[key].horaires = groupByHoraires(clonedData[key].horaires);
    }
    return data;
}

function groupByHoraires(horaires) {
    var horairesParPersonne = _.groupBy(horaires, 'qui');
    for(var key in horairesParPersonne) {
        var arrivee = getHoraire(horairesParPersonne[key], "Arrivée");
        var depart = getHoraire(horairesParPersonne[key], "Départ");
        horairesParPersonne[key] = {
            arrivee: arrivee,
            depart: depart
        }
    }
    return horairesParPersonne;
}

function getHoraire(horaires, typeHoraire) {
    var horaire = _.find(horaires, horaire => {
        return horaire.action === typeHoraire;
    });
    return horaire ? horaire.heureAction : null;
}

function dissocierFraisJournaliers(data) {
    var clonedData = _.cloneDeep(data);
    for(var key in clonedData) {
        data[key].repas = extraireFraisJournalier(clonedData[key].horaires, "repas", true);
        data[key].deplacements = extraireFraisJournalier(clonedData[key].horaires, "deplacements", true);
        data[key].autreDeplacementKm = extraireFraisJournalier(clonedData[key].horaires, "autreDeplacementKm", false);
    }
    return clearFraisJournaliersHoraires(data);
}

function clearFraisJournaliersHoraires(data) {
    for(var key in data) {
        data[key].horaires.forEach( horaire => {
            delete horaire["repas"];
            delete horaire["deplacements"];
            delete horaire["autreDeplacementKm"];
        });
    }
    return data;
}

function extraireFraisJournalier(horaires, type, split) {
    var frais = _.find(horaires, horaire => {
        return horaire[type];
    });
    return (frais && frais[type]) ? split ? splitListe(frais[type]) : frais[type] : null;
}

function mapperParPersonne(data) {
    var clonedData = _.cloneDeep(data);
    for(var key in clonedData) {
        data[key].horaires = flattenParPersonne(clonedData[key].horaires);
    }
    return data;
}

function flattenParPersonne(horaires) {
    var listeHoraires = [];
    _.forEach(horaires, horaire => {
        if(horaire.qui.length > 1) {
            _.forEach(horaire.qui, personne => {
                listeHoraires.push({
                    qui: personne,
                    action: horaire.action,
                    heureAction: horaire.heureAction
                });
            });
        } else {
            listeHoraires.push({
                qui: horaire.qui[0],
                action: horaire.action,
                heureAction: horaire.heureAction
            });
        }
    });
    return listeHoraires;
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
                var horaires = [{
                    "qui": splitListe(ligne[excelReader.headers.qui]),
                    "action": ligne[excelReader.headers.action],
                    "heureAction": dateUtils.excelHourToDate(ligne[excelReader.headers.heureAction]),
                    "repas": ligne[excelReader.headers.repas],
                    "deplacements": ligne[excelReader.headers.deplacements],
                    "autreDeplacementKm": ligne[excelReader.headers.autreDeplacementKm]
                }];
                resultat[stringDate] = { horaires: horaires };
            } else {
                resultat[stringDate].horaires.push({
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

function splitListe(text) {
    return text ? text.replace(/ /g, '').split(',') : null;
}