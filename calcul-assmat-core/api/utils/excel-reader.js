'use strict';

var fs = require('fs');
var path = require('path');
var xlsx = require('node-xlsx').default;
var _ = require('lodash');

const HEADERS = {
    headerOffset: 1,
    horodatageSaisie: 0,
    dateSaisie: 1,
    qui: 2,
    action: 3,	
    heureAction: 4,
    repas: 5,
    deplacements: 6,	
    autreDeplacementKm: 7
};

function readExcelFile( filePath ) {
    const workSheetsFromFile = xlsx.parse(fs.readFileSync(path.resolve(__dirname, filePath)));
    var feuille1 = workSheetsFromFile[0];

    var data =  _.map(feuille1.data, function (ligne, key) {
        if (key >= HEADERS.headerOffset) {
            return ligne;
        }
    });

    return _.filter(data, function ( ligne ) {
        return ligne;
    });
       
}

exports.excelReader = {
    readExcelFile: readExcelFile,
    headers: HEADERS
};




