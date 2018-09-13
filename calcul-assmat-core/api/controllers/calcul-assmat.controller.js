"use strict";

var _ = require("lodash");
var moment = require("moment-timezone");

var dateUtils = require("../utils/date.utils").dateUtils;
var excelReader = require("../utils/excel-reader").excelReader;
var configuration = require("../configuration/configuration").configuration;
const logger = require("simple-node-logger").createSimpleLogger();

const LOUISE = "Louise",
  JOSEPHINE = "Joséphine";

exports.calculMensuel = function(req, res) {
  const month = req.params.mois;
  logger.info("Calcul pour le mois " + month);

  const data = excelReader.readExcelFile(
    "../../../specifications/Suivi garde Louise et Joséphine.xlsx"
  );

  var donneesParDate = mapperParDate(data, month);
  var donneesAvecFraisParJour = dissocierFraisJournaliers(donneesParDate);
  var donneesParPersonne = mapperParPersonne(donneesAvecFraisParJour);
  var donneesParPersonneHoraires = mapperParHoraires(donneesParPersonne);

  var nbJours = calculerNbJours(donneesParPersonneHoraires);
  var nbHeures = calculerNbHeure(donneesParPersonneHoraires);
  var nbRepas = calculerNbRepas(donneesParPersonneHoraires);
  var nbKm = calculerNbKm(donneesParPersonneHoraires);

  var synthese = {
    nbJours: nbJours.mois,
    nbHeuresNormales: nbHeures.normales,
    nbHeuresComplementaires: nbHeures.complementaires,
    salaireHoraireNetHeureNormale: configuration.salaireNetHoraire + " €",
    salaireNetTotal: calculerSalaireNetTotal(nbHeures) + " €",
    indemnitesEntretien: calculerIndemnitesEntretien(nbJours) + " €",
    indemnitesRepas: calculerIndemnitesRepas(nbRepas) + " €",
    indemnitesKm: nbKm * configuration.indemnitesKm + " €"
  };

  res.json({
    synthese: synthese,
    donneesHoraires: donneesParPersonneHoraires
  });
};

function calculerNbKm(donnees) {
  var km = 0;
  for (var key in donnees) {
    if (donnees[key]) {
      if (donnees[key].deplacements && donnees[key].deplacements.length > 0) {
        var trajet = donnees[key].deplacements[0];
        km += getKmTrajet(trajet);
      }
      if (donnees[key].autreDeplacementKm) {
        km += donnees[key].autreDeplacementKm;
      }
    }
  }
  return km;
}

function getKmTrajet(trajet) {
  switch (trajet) {
    case "ARécole":
      return configuration.arEcoleKm;
      break;
    case "ARécoleX2":
      return configuration.arEcoleKm * 2;
      break;
    case "ARécoleX3":
      return configuration.arEcoleKm * 3;
      break;
    case "ARécoleX4":
      return configuration.arEcoleKm * 4;
      break;
    default:
    return 0;
      break;
  }
}

function calculerNbRepas(donnees) {
  var nbGouters = 0;
  var nbDejeuners = 0;
  for (var key in donnees) {
    if (donnees[key]) {
      nbGouters += _.find(donnees[key].repas, repas => {
        return repas === "Goûter";
      })
        ? 1
        : 0;
      nbDejeuners += _.find(donnees[key].repas, repas => {
        return repas === "Déjeuner";
      })
        ? 1
        : 0;
    }
  }
  return {
    nbGouters: nbGouters,
    nbDejeuners: nbDejeuners
  };
}

function calculerIndemnitesRepas(nbRepas) {
  return (
    nbRepas.nbGouters * configuration.fraisGouter +
    nbRepas.nbDejeuners * configuration.fraisDejeuner
  );
}

function calculerIndemnitesEntretien(jours) {
  return (jours.L + jours.J) * configuration.indemnitesEntretien;
}

function calculerSalaireNetTotal(heures) {
  var salaireNetTotal = (configuration.salaireNetMensualise + (heures.complementaires * configuration.salaireNetHoraire));
  var congesPayes = salaireNetTotal * configuration.tauxCongesPayes;
  return salaireNetTotal + congesPayes;
}

function calculerNbJours(donnees) {
  return {
    mois: Object.keys(donnees).length,
    L: compterJours(donnees, "Louise"),
    J: compterJours(donnees, "Joséphine")
  };
}

function compterJours(donnees, prenom) {
  var count = 0;
  for (var key in donnees) {
    if (donnees[key].horaires[prenom]) {
      count++;
    }
  }
  return count;
}

function calculerNbHeure(donnees) {
  var heuresLouise = calculerNbHeureEnfant(donnees, "Louise");
  var heuresJosephine = calculerNbHeureEnfant(donnees, "Joséphine");
  return {
    normales: heuresLouise.normales + heuresJosephine.normales,
    complementaires:
      heuresLouise.complementaires + heuresJosephine.complementaires
  };
}

function calculerNbHeureEnfant(donnees, prenom) {
  var heures = {
    normales: 0,
    complementaires: 0
  };
  for (var key in donnees) {
    if (donnees[key].horaires[prenom]) {
      var jour = moment(key, "DD-MM-YYYY").isoWeekday();
      var heuresNormalesConf = configuration.heuresNormales[prenom][jour];
      var heuresReelles = calculerHeuresReelles(
        donnees[key].horaires[prenom],
        prenom
      );
      var diffHeures = heuresReelles - heuresNormalesConf;
      if (diffHeures > 0) {
        heures.normales += heuresNormalesConf;
        heures.complementaires += diffHeures;
      } else {
        heures.normales += heuresReelles;
      }
    }
  }
  return heures;
}

function calculerHeuresReelles(horaires, prenom) {
  var heures = 0;
  if (prenom === "Louise") {
    if (horaires.arrivee) {
      var debut = moment(horaires.arrivee, "HH:mm");
      var fin = moment(configuration.heureDebutEcole, "HH:mm");
      return fin.diff(debut, "minutes") / 60;
    }
    if (horaires.depart) {
      var debut = moment(configuration.heureFinEcole, "HH:mm");
      var fin = moment(horaires.depart, "HH:mm");
      return fin.diff(debut, "minutes") / 60;
    }
  }
  if (prenom === "Joséphine") {
    if (horaires.arrivee && horaires.depart) {
      var debut = moment(horaires.arrivee, "HH:mm");
      var fin = moment(horaires.depart, "HH:mm");
      return fin.diff(debut, "minutes") / 60;
    }
  }
}

function mapperParHoraires(data) {
  var clonedData = _.cloneDeep(data);
  for (var key in clonedData) {
    data[key].horaires = groupByHoraires(clonedData[key].horaires);
  }
  return data;
}

function groupByHoraires(horaires) {
  var horairesParPersonne = _.groupBy(horaires, "qui");
  for (var key in horairesParPersonne) {
    var arrivee = getHoraire(horairesParPersonne[key], "Arrivée");
    var depart = getHoraire(horairesParPersonne[key], "Départ");
    horairesParPersonne[key] = {
      arrivee: arrivee,
      depart: depart
    };
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
  for (var key in clonedData) {
    data[key].repas = extraireFraisJournalier(
      clonedData[key].horaires,
      "repas",
      true
    );
    data[key].deplacements = extraireFraisJournalier(
      clonedData[key].horaires,
      "deplacements",
      true
    );
    data[key].autreDeplacementKm = extraireFraisJournalier(
      clonedData[key].horaires,
      "autreDeplacementKm",
      false
    );
  }
  return clearFraisJournaliersHoraires(data);
}

function clearFraisJournaliersHoraires(data) {
  for (var key in data) {
    data[key].horaires.forEach(horaire => {
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
  return frais && frais[type]
    ? split
      ? splitListe(frais[type])
      : frais[type]
    : null;
}

function mapperParPersonne(data) {
  var clonedData = _.cloneDeep(data);
  for (var key in clonedData) {
    data[key].horaires = flattenParPersonne(clonedData[key].horaires);
  }
  return data;
}

function flattenParPersonne(horaires) {
  var listeHoraires = [];
  _.forEach(horaires, horaire => {
    if (horaire.qui.length > 1) {
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
    var horodatage = dateUtils.excelDateToDate(
        ligne[excelReader.headers.horodatageSaisie]
      ),
      dateSaisie = dateUtils.excelDateToDate(
        ligne[excelReader.headers.dateSaisie]
      );

    var jsDate = dateSaisie ? dateSaisie : horodatage;
    var stringDate = dateUtils.toDate(jsDate);

    if (stringDate && Number(mois) === moment(jsDate).month() + 1) {
      if (!resultat[stringDate]) {
        var horaires = [
          {
            qui: splitListe(ligne[excelReader.headers.qui]),
            action: ligne[excelReader.headers.action],
            heureAction: dateUtils.excelHourToDate(
              ligne[excelReader.headers.heureAction]
            ),
            repas: ligne[excelReader.headers.repas],
            deplacements: ligne[excelReader.headers.deplacements],
            autreDeplacementKm: ligne[excelReader.headers.autreDeplacementKm]
          }
        ];
        resultat[stringDate] = { horaires: horaires };
      } else {
        resultat[stringDate].horaires.push({
          qui: splitListe(ligne[excelReader.headers.qui]),
          action: ligne[excelReader.headers.action],
          heureAction: dateUtils.excelHourToDate(
            ligne[excelReader.headers.heureAction]
          ),
          repas: ligne[excelReader.headers.repas],
          deplacements: ligne[excelReader.headers.deplacements],
          autreDeplacementKm: ligne[excelReader.headers.autreDeplacementKm]
        });
      }
    }
  });

  return resultat;
}

function splitListe(text) {
  return text ? text.replace(/ /g, "").split(",") : null;
}
