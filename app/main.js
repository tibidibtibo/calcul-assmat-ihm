var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var xlsx = require('node-xlsx').default;
var moment = require('moment');
var dateUtils = require('./date.utils').dateUtils;

const workSheetsFromFile = xlsx.parse(fs.readFileSync(path.resolve(__dirname, "../specifications/formulaire_mensuel.xlsx")));

const HEADERS = {
    date: 0,
    enfant: 1,
    heureArriveeNormale: 2,
    heureDepartNormale: 3,
    heureArriveeCompl: 4,
    heureDepartCompl: 5,
    dejeuner: 6,
    gouter: 7,
    descriptionTrajets: 8,
    kilometrageTrajets: 9,
    headerOffset: 2
};

var feuille1 = workSheetsFromFile[0];
_.forEach(feuille1.data, function (ligne, key) {
    if (key >= HEADERS.headerOffset) {
        console.log( dateUtils.excelDateToJSDate(ligne[HEADERS.date]) );
    }
});


