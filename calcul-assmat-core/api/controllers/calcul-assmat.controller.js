'use strict';

var _ = require('lodash');

var dateUtils = require('../utils/date.utils').dateUtils;
var excelReader = require('../utils/excel-reader').excelReader;
var configuration = require('../configuration/configuration').configuration;

const LOUISE = "Louise", JOSEPHINE = "Joséphine";

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

    var horairesLouise = assemblerHoraires(selectParPrenom(listeGlobale, LOUISE));
    var horairesJosephine = assemblerHoraires(selectParPrenom(listeGlobale, JOSEPHINE));

    res.json({
        JOSEPHINE: horairesJosephine,
        LOUISE: horairesLouise}
    );
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

    var clonedListe = _.cloneDeep(listeHoraires );
    var horaires = {};

    clonedListe = clonedListe.forEach( ligne => {
        
        var key = dateUtils.toDate(ligne.dateSaisie ? ligne.dateSaisie : ligne.horodatageSaisie);
        console.log(key);

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