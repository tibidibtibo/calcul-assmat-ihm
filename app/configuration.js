'use strict';

// UTILS
var dateUtils = require('./date.utils').dateUtils;

const heureDebutEcole = "08:50";
const heureFinEcole = "16:45";

function getHeureDebutEcole() {
    return dateUtils.toHour(heureDebutEcole);
}

function getHeureFinEcole() {
    return dateUtils.toHour(heureFinEcole);
}

exports.configuration = {
    getHeureDebutEcole: getHeureDebutEcole,
    getHeureFinEcole: getHeureFinEcole
};