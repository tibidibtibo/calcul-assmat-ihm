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
            "horodatageSaisie": dateUtils.excelDateToDate(ligne[excelReader.headers.horodatageSaisie]),
            "dateSaisie": dateUtils.excelDateToDate(ligne[excelReader.headers.dateSaisie]),
            "qui": identifierEnfants(ligne[excelReader.headers.qui]),
            "action":  ligne[excelReader.headers.action],	
            "heureAction":  dateUtils.excelHourToDate(ligne[excelReader.headers.heureAction]),
            "repas":  ligne[excelReader.headers.repas],
            "deplacements":  ligne[excelReader.headers.deplacements],	
            "autreDeplacementKm":  ligne[excelReader.headers.autreDeplacementKm]
        }
    });

    var listeLouise = selectParPrenom(listeGlobale, "Louise");
    var listeJosephine = selectParPrenom(listeGlobale, "Joséphine");

    var horairesLouise = assemblerHoraires(listeLouise);
    var horairesJosephine = assemblerHoraires(listeJosephine);

    res.json(horairesJosephine);
};

function selectParPrenom(liste, identifiant) {
    var listeClone = _.cloneDeep(liste);
    return _.map(_.filter( listeClone , ligne => {
        return _.find( ligne.qui, prenom => {
            return prenom === identifiant;
        })
    }), ligne => {
        ligne.qui = identifiant;
        return ligne;
    });
}

function assemblerHoraires(listeHoraires) {

    var horaires = {};

    _.forEach( listeHoraires, ligne => {

        var key = dateUtils.toDate(ligne.dateSaisie ? ligne.dateSaisie : ligne.horodatageSaisie);

        if(!horaires[key]) {
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
            var value = horaires[key];
            if(!value.horaires.A) {
                value.horaires.A = findHoraire(ligne, "Arrivée");
            }
            if(!value.horaires.D) {
                value.horaires.D = findHoraire(ligne, "Départ");
            }
            horaires[key] = value;
        }
    });

    return horaires;
}

function findHoraire(ligne, typeHoraire) {
    return (ligne.action === typeHoraire) ? ligne.heureAction : null;
}

function identifierEnfants( text ) {
    return text.replace(/ /g,'').split(',');
}