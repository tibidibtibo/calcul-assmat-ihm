'use strict';

var _ = require('lodash');

var dateUtils = require('../utils/date.utils').dateUtils;
var excelReader = require('../utils/excel-reader').excelReader;
var configuration = require('../configuration/configuration').configuration;

const LOUISE = "Louise", JOSEPHINE = "Joséphine";

exports.calculMensuel = function (req, res) {
    const month = req.params.mois;
    console.log("Calcul pour le mois " + month);

    const data = excelReader.readExcelFile("../../../specifications/Suivi garde Louise et Joséphine.xlsx");

    var listeGlobale = _.map(data, ligne => {
        return {
            "horodatageSaisie": dateUtils.excelDateToDate(ligne[excelReader.headers.horodatageSaisie]),
            "dateSaisie": dateUtils.excelDateToDate(ligne[excelReader.headers.dateSaisie]),
            "qui": identifierEnfants(ligne[excelReader.headers.qui]),
            "action": ligne[excelReader.headers.action],
            "heureAction": dateUtils.excelHourToDate(ligne[excelReader.headers.heureAction]),
            "repas": ligne[excelReader.headers.repas],
            "deplacements": ligne[excelReader.headers.deplacements],
            "autreDeplacementKm": ligne[excelReader.headers.autreDeplacementKm]
        }
    });

    var horairesLouise = assemblerHoraires(selectParPrenom(listeGlobale, LOUISE));
    var horairesJosephine = assemblerHoraires(selectParPrenom(listeGlobale, JOSEPHINE));

    res.json({
        JOSEPHINE: horairesJosephine,
        LOUISE: horairesLouise
    }
    );
};

function selectParPrenom(liste, identifiant) {
    return _.map(_.filter(_.cloneDeep(liste), ligne => {
        return _.find(ligne.qui, prenom => {
            return prenom === identifiant;
        })
    }), row => {
        row.qui = identifiant;
        return row;
    });
}

function assemblerHoraires(listeHoraires) {

    var horaires = {};

    _.forEach( _.cloneDeep(listeHoraires), ligne => {

        var key = dateUtils.toDate(ligne.dateSaisie ? ligne.dateSaisie : ligne.horodatageSaisie);
        if (!horaires[key]) {

            var horaireAD = {
                "A": findHoraire(ligne, "Arrivée"),
                "D": findHoraire(ligne, "Départ")
            };
            horaires[key] = {
                "qui": ligne.qui,
                "repas": ligne.repas,
                "deplacements": ligne.deplacements,
                "autreDeplacementKm": ligne.autreDeplacementKm,
                "horaires": horaireAD
            };
        } else {
            if (!horaires[key].horaires.A) {
                horaires[key].horaires.A = findHoraire(ligne, "Arrivée");
            }
            if (!horaires[key].horaires.D) {
                horaires[key].horaires.D = findHoraire(ligne, "Départ");
            }
            if(!horaires[key].repas) {
                horaires[key].repas = ligne.repas;
            }
            // horaires[key].deplacements = findHoraire(ligne, "Arrivée");
            // horaires[key].autreDeplacementKm = findHoraire(ligne, "Arrivée");
        }
    });
    return horaires;
}

function findHoraire(ligne, typeHoraire) {
    return (ligne.action === typeHoraire) ? ligne.heureAction : null;
}

function identifierEnfants(text) {
    return text.replace(/ /g, '').split(',');
}